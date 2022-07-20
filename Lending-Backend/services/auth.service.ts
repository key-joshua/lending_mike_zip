import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError";

export const login = async (user: any, password: string) => {
  const pass = await user.isPasswordMatch(password);
  if (!pass) {
    throw new ApiError(StatusCodes.FORBIDDEN, "Invalid Username or password");
  } else return true;
};
