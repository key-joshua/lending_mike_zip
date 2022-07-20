import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  Search,
  ConversationList,
  Conversation,
  ConversationHeader,
  Avatar,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import moment from "moment";
function SmallScreen({ socket, state }) {
  const bottomRef = useRef(null);
  const [chatContainerState, setChatContainerState] = useState("closed");
  const [chats, setChats] = useState([]);
  const [conversation, setConversation] = useState(-1);
  const { user } = useSelector((state) => state.auth);
  const [refresh, setRefresh] = useState(state);
  useEffect(() => {
    if (refresh) {
      socket.emit("new chat", { sender: user.id, receiver: state.reciever });
      setRefresh(undefined);
    }
    const messageListener = (message) => {
      var chatindex = chats.findIndex((value) => value.id === message.id);
      if (chatindex > -1) {
        setChats((state) => {
          state[chatindex] = message;
          return [...state];
        });
      } else {
        setChats((state) => {
          return [message, ...state];
        });
      }
      bottomRef.current.scrollIntoView();
    };
    console.log(chats);
    const chatsMessageListener = (chat) => {
      setChats(chat);
    };
    const newchathandler = (data) => {
      setChats(data.allchats);
      console.log(data.allchats.findIndex((item) => item.id === data.chats.id));
      setChatContainerState("open");
      setConversation(
        data.allchats.findIndex((item) => item.id === data.chats.id)
      );
    };
    socket.on("message", messageListener);
    socket.emit("get chats", user.id);
    socket.on("newchat", newchathandler);
    socket.on("chats", chatsMessageListener);
    return () => {
      socket.off("newchat", newchathandler);
      socket.off("chats", chatsMessageListener);
      socket.off("message", messageListener);
    };
  }, [socket, chats, user.id, conversation, bottomRef]);

  return (
    <>
      <MainContainer
        // responsive
        style={{
          maxHeight: "80vh",
          border: "1px solid white",
          borderRadius: "10px",
          backgroundColor: "transparent",
          marginRight: "7vw",
        }}
      >
        {chatContainerState === "closed" && (
          <div style={{ width: "100%" }}>
            {/* <Search placeholder="Search" /> */}
            <ConversationList>
              {chats.map((chat, index) => {
                var namepic = chat.users
                  .map(function (x) {
                    if (x.id !== user.id) {
                      return { picture: x.pfp, name: x.name, id: x.id };
                    }
                    return undefined;
                  })
                  .filter(function (f) {
                    return f !== undefined;
                  })[0];

                return (
                  <Conversation
                    name={chat.users
                      .map(function (x) {
                        if (x.id !== user.id) {
                          return x.name;
                        }
                        return undefined;
                      })
                      .filter(function (f) {
                        return f !== undefined;
                      })
                      .join(", ")}
                    lastSenderName={
                      chat.messages.length !== 0
                        ? chat.messages[chat.messages.length - 1].sender.name
                        : null
                    }
                    info={
                      chat.messages.length !== 0
                        ? chat.messages[chat.messages.length - 1].message
                        : null
                    }
                    lastActivityTime={moment(chat.updatedAt).format("HH:mm")}
                    onClick={() => {
                      setConversation(index + 1);
                      setChatContainerState("open");
                    }}
                  >
                    {namepic.picture ? (
                      <Avatar
                        src={namepic.picture || null}
                        style={{
                          backgroundColor: "rgb(110, 169, 215)",
                          textAlign: "center",
                          fontSize: "25px",
                        }}
                      />
                    ) : (
                      <Avatar
                        src={null}
                        style={{
                          backgroundColor: "rgb(110, 169, 215)",
                          textAlign: "center",
                          fontSize: "25px",
                        }}
                      >
                        {namepic.name[0]}
                      </Avatar>
                    )}
                  </Conversation>
                );
              })}
            </ConversationList>
          </div>
        )}
        {chatContainerState === "open" && conversation > -1 && (
          <ChatContainer style={{ backgroundColor: "transparent" }}>
            <ConversationHeader style={{ backgroundColor: "white" }}>
              {chats[conversation - 1]?.users.find(
                (item) => item.id !== user.id
              ).pfp ? (
                <Avatar
                  src={
                    chats[conversation - 1]?.users.find(
                      (item) => item.id !== user.id
                    ).pfp || null
                  }
                  style={{
                    backgroundColor: "rgb(110, 169, 215)",
                    textAlign: "center",
                    fontSize: "25px",
                  }}
                />
              ) : (
                <Avatar
                  src={null}
                  style={{
                    backgroundColor: "rgb(110, 169, 215)",
                    textAlign: "center",
                    fontSize: "25px",
                  }}
                >
                  {
                    chats[conversation - 1]?.users.find(
                      (item) => item.id !== user.id
                    ).username[0]
                  }
                </Avatar>
              )}
              <ConversationHeader.Content>
                <span
                  style={{
                    alignSelf: "flex-center",
                  }}
                >
                  {
                    chats[conversation - 1]?.users.find(
                      (item) => item.id !== user.id
                    ).username
                  }
                </span>
              </ConversationHeader.Content>
              <ConversationHeader.Actions>
                <IconButton
                  aria-label="Close"
                  onClick={() => {
                    setChatContainerState("closed");
                    setConversation(-1);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </ConversationHeader.Actions>
            </ConversationHeader>
            <MessageList
              autoScrollToBottom={true}
              style={{ backgroundColor: "transparent" }}
            >
              {chats[conversation - 1]?.messages.map((message, index) => {
                return message.sender.id === user.id ? (
                  <Message
                    model={{
                      message: message.message,
                      sender: message.sender.name,
                      direction: "outgoing",
                      position: "single",
                    }}
                    style={{ marginBottom: "4vh" }}
                  >
                    <Message.Header
                      sentTime={moment(message.createdAt).format("HH:mm")}
                      style={{ marginRight: "100%" }}
                    />
                    {message.sender.pfp ? (
                      <Avatar
                        src={message.sender.pfp || null}
                        style={{
                          backgroundColor: "rgb(110, 169, 215)",
                          textAlign: "center",
                          fontSize: "25px",
                        }}
                      />
                    ) : (
                      <Avatar
                        src={null}
                        style={{
                          backgroundColor: "rgb(110, 169, 215)",
                          textAlign: "center",
                          fontSize: "25px",
                        }}
                      >
                        {message.sender.name}
                      </Avatar>
                    )}
                  </Message>
                ) : (
                  <Message
                    model={{
                      message: message.message,
                      sentTime: `${moment(message.createdAt).format("HH:mm")}`,
                      sender: chats[conversation - 1]?.users.find(
                        (item) => item.id !== user.id
                      ).username,
                      direction: "incoming",
                      position: "single",
                    }}
                    style={{ marginBottom: "4vh" }}
                  >
                    <Message.Header
                      sentTime={moment(message.createdAt).format("HH:mm")}
                    />
                    {chats[conversation - 1]?.users.find(
                      (item) => item.id !== user.id
                    ).pfp ? (
                      <Avatar
                        src={
                          chats[conversation - 1]?.users.find(
                            (item) => item.id !== user.id
                          ).pfp || null
                        }
                        style={{
                          backgroundColor: "rgb(110, 169, 215)",
                          textAlign: "center",
                          fontSize: "25px",
                        }}
                      />
                    ) : (
                      <Avatar
                        src={null}
                        style={{
                          backgroundColor: "rgb(110, 169, 215)",
                          textAlign: "center",
                          fontSize: "25px",
                        }}
                      >
                        {
                          chats[conversation - 1]?.users.find(
                            (item) => item.id !== user.id
                          ).username[0]
                        }
                      </Avatar>
                    )}
                  </Message>
                );
              })}
              <div ref={bottomRef} />
            </MessageList>
            <MessageInput
              attachButton={false}
              style={{ backgroundColor: "transparent" }}
              placeholder="Type message here"
              onSend={(value) => {
                try {
                  socket.emit("new message", {
                    message: value,
                    sender: user.id,
                    receiver: chats[conversation - 1]?.users.find(
                      (item) => item.id !== user.id
                    ).id,
                  });
                } catch (error) {
                  console.log(error);
                }
              }}
            />
          </ChatContainer>
        )}
      </MainContainer>
    </>
  );
}

export default SmallScreen;
