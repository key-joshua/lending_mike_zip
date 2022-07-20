import ApiError from "../utils/ApiError";
import { Response, Request } from "express";
import { Chat } from "../models";
import catchAsync from "../utils/catchAsync";

export const createNewChat = catchAsync(async (req: Request, res: Response) => {
  if (!req.body.reciever) {
    throw new ApiError(401, "Receiver Id not found");
  }
  const user: any = req.user;
  var chat = await Chat.findOne({
    users: { $in: [user.id, req.body.receiver] },
  });

  let isNewChat = false;
  if (!chat) {
    isNewChat = true;
    chat = await Chat.create({ users: [user.id, req.body.receiver] });
  }
  const chats = await Chat.findById(chat._id).populate([
    { path: "users" },
    { path: "messages.sender" },
  ]);
  const allchats = await Chat.find({
    users: { $in: [user.id, req.body.receiver] },
  }).populate([{ path: "users" }, { path: "messages.sender" }]);

  res.json({ isNewChat, chats, allchats });
});
