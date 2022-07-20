import { Schema, model } from "mongoose";
import { Notif, NotifModel } from "./interfaces";
import { paginate, toJSON } from "./plugins";
const schema = new Schema<Notif>(
  {
    type: { type: String, enum: ["chat", "loan"] },
    from: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    to: { type: Schema.Types.ObjectId, required: false, ref: "users" },
    seen: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);

schema.plugin(paginate);
schema.plugin(toJSON);

const loanModel = model<Notif, NotifModel>("notifications", schema);
export default loanModel;
