import { Server, Socket } from "socket.io";
import { Chat, Notif } from "../models";
import app from "../app";

const socket = (server: Server, users: any) => {
  server.on("connection", (socket: Socket) => {
    socket.on("add user", (user) => {
      console.log("user added", socket.id);
      users.push({ id: socket.id, user });
    });

    socket.on("new message", async (data: any) => {
      const chat: any = await Chat.findOne({
        $and: [
          { users: { $in: [data.sender] } },
          { users: { $in: [data.receiver] } },
        ],
      }).populate([{ path: "users" }, { path: "messages.sender" }]);
      const receiver = users.find(
        (item: any) => item.user.id === data.receiver
      );
      const sender = users.find((item: any) => item.user.id === data.sender);

      chat.messages.push({ sender: data.sender, message: data.message });
      chat.save();
      sender && socket.to(sender.id).emit("message", chat);

      await Notif.create({
        type: "chat",
        from: data.sender,
        to: data.receiver,
      });
      const notifs =
        receiver &&
        (await Notif.paginate(
          { to: receiver.user.id, seen: false },
          { limit: 5, populate: "from,to", sort: "createdAt" }
        ));
      receiver && socket.to(receiver.id).emit("notifications", notifs);
      receiver && socket.to(receiver.id).emit("message", chat);
    });

    socket.on("get messages", async (id) => {
      const chat = await Chat.findById(id).populate([
        { path: "users" },
        { path: "messages.sender" },
      ]);
      socket.emit("messages", chat);
    });
    socket.on("get chats", async (id) => {
      const chats = await Chat.find({
        users: { $in: id },
      })
        .populate([{ path: "users" }, { path: "messages.sender" }])
        .sort({ updatedAt: -1 });
      socket.emit("chats", chats);
    });

    socket.on("new chat", async ({ sender, receiver }) => {
      var chat = await Chat.findOne({
        $and: [{ users: { $in: [sender] } }, { users: { $in: [receiver] } }],
      });
      const socket_receiver = users.find(
        (item: any) => item.user.id === receiver
      );
      let isNewChat = false;
      if (!chat) {
        isNewChat = true;
        chat = await Chat.create({ users: [sender, receiver] });
      }
      const chats = await Chat.findById(chat._id).populate([
        { path: "users" },
        { path: "messages.sender" },
      ]);
      const senderchats = await Chat.find({
        users: { $in: sender },
      }).populate([{ path: "users" }, { path: "messages.sender" }]);
      socket.emit("newchat", { isNewChat, chats, allchats: senderchats });
      const receiverchats = await Chat.find({
        users: { $in: receiver },
      }).populate([{ path: "users" }, { path: "messages.sender" }]);
      socket_receiver &&
        socket
          .to(socket_receiver.id)
          .emit("newchat", { allchats: receiverchats, isNewChat, chats });
    });
    socket.on("notification", async (data) => {
      const user = users.find((item: any) => item.user.id === data);
      const notifs =
        user &&
        (await Notif.paginate(
          { to: data, seen: false },
          { limit: 5, populate: "from,to", sort: "createdAt" }
        ));

      user && socket.emit("notifications", notifs);
    });

    socket.on("loan", async (data) => {
      console.log(data);
      const notif = await Notif.create({
        type: "loan",
        from: data.from,
        to: data.to,
      });
      const receiver = users.find((item: any) => item.user.id === data.to);
      const notifs =
        receiver &&
        (await Notif.paginate(
          { to: receiver.user.id, seen: false },
          { limit: 5, populate: "from,to", sort: "createdAt" }
        ));
      receiver && socket.to(receiver.id).emit("notifications", notifs);
    });
    socket.on("seen", async (data) => {
      const notif: any = await Notif.findById(data);
      notif.seen = true;
      await notif.save();
      const notifs = await Notif.paginate(
        { to: data, seen: false },
        { limit: 5, populate: "from,to", sort: "createdAt" }
      );
      socket.emit("notifications", notifs);
    });

    socket.on("disconnect", () => {
      console.log("disconnected", socket.id);
      users.filter((item: any) => item.id !== socket.id);
    });
    app.set("socket", socket);
    app.set("socket_users", users);
  });
};

export default socket;
