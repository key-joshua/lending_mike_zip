import { Document, Model, Types } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  username: string;
  password: string;
  id_type: string;
  country?: string;
  number: string;
  pass_len: number;
  expiry?: Date;
  id_proof: string;
  role: string;
  pfp?: string;
  active: boolean;
}

export interface UserModel extends Model<User> {
  isPasswordMatch(password: string): boolean;
  isEmailTaken(email: string): boolean;
  paginate: any;
  toJSON: any;
}

export interface Loan extends Document {
  description: string;
  amount: number;
  collateral_images: string[];
  collateral: string;
  date: Date;
  created_by: Types.ObjectId;
  granted_by?: Types.ObjectId;
  airbnb_url: String;
}
export interface Messages {
  sender: Types.ObjectId;
  message: string;
}
export interface Chat extends Document {
  users: Types.ObjectId[];
  messages: Messages[];
}

export interface LoanModel extends Model<Loan> {
  paginate: any;
  toJSON: any;
}

export interface Notif extends Document {
  type: string;
  from: Types.ObjectId;
  to: Types.ObjectId;
  seen: boolean;
}

export interface NotifModel extends Model<Notif> {
  paginate: any;
  toJSON: any;
}
