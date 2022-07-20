import { StatusCodes } from "http-status-codes";
import { User } from "../models";
import ApiError from "../utils/ApiError";

export const queryUsers = async (filters: object) => {
  const users = await User.find(filters).sort({ createdAt: -1 });
  return users;
};

export const findUserById = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Invalid user id");
  }
  return user;
};

export const findUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Invalid email");
  }
  return user;
};

export const createUser = async (body: any) => {
  if (await User.isEmailTaken(body.email)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "email already in use");
  }
  const user = await User.create({ ...body });
  return user;
};

export const suspendAccounts = async (ids: string[]) => {
  const users = await User.updateMany(
    { _id: { $in: ids } },
    { $set: { active: false } }
  ).then(async () => {
    const users = await queryUsers({ role: "user" });
    return users;
  });

  return users;
};

export const deleteAccounts = async (ids: string[]) => {
  const users = await User.deleteMany(
    { _id: { $in: ids } },
    { $set: { active: false } }
  ).then(async () => {
    const users = await queryUsers({ role: "user" });
    return users;
  });

  return users;
};
