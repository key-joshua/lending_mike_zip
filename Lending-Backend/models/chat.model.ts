import { Schema, model } from "mongoose";
import { Chat, Messages } from "./interfaces";
const messageschema = new Schema<Messages>(
  {
    sender: { type: Schema.Types.ObjectId, ref: "users" },
    message: { type: String },
  },
  { timestamps: true }
);

const schema = new Schema<Chat>(
  {
    users: { type: [Schema.Types.ObjectId], ref: "users", default: [] },
    messages: {
      type: [messageschema],
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

const userModel = model<Chat>("chats", schema);
export default userModel;
