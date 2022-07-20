import { Schema, model } from "mongoose";
import { Loan, LoanModel } from "./interfaces";
import { paginate, toJSON } from "./plugins";
const schema = new Schema<Loan>(
  {
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    collateral: { type: String, required: true },
    created_by: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    granted_by: { type: Schema.Types.ObjectId, required: false, ref: "users" },
    airbnb_url: { type: String, required: false },
  },
  { timestamps: true }
);

schema.plugin(paginate);
schema.plugin(toJSON);

const loanModel = model<Loan, LoanModel>("loan", schema);
export default loanModel;
