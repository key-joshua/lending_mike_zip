import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import {
  authService,
  emailService,
  tokenService,
  userService,
} from "../services";
import ApiError from "../utils/ApiError";
import catchAsync from "../utils/catchAsync";

export const login = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.findUserByEmail(req.body.email);
  if (!user.active) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Account has been suspended");
  }
  await authService.login(user, req.body.password);
  const token = await tokenService.generateToken(user);
  res.json({
    user,
    token,
  });
});

export const register = catchAsync(async (req: Request, res: Response) => {
  const file: any = req.file;
  const user = await userService.createUser({
    ...req.body,
    id_proof: file.path,
  });
  const token = await tokenService.generateToken(user);
  res.json({ user, token });
});

export const changePassword = catchAsync(
  async (req: Request, res: Response) => {
    const user: any = req.user;
    await authService.login(user, req.body.current_password);
    Object.assign(user, { password: req.body.new_password });
    await user.save();
    res.json(user);
  }
);
export const updatePfp = catchAsync(async (req: Request, res: Response) => {
  const user: any = req.user;
  const file: any = req.file;
  Object.assign(user, { pfp: file.path });
  await user.save();
  res.json(user);
});

export const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const user: any = req.user;
  Object.assign(user, req.body);
  await user.save();
  res.json(user);
});

export const forgotPassword = catchAsync(
  async (req: Request, res: Response) => {
    const user = await userService.findUserByEmail(req.body.email);
    const token = await tokenService.generateToken(user, "24h");
    await emailService.sendForgotPasswordEmail(req.body.email, token);
    res.send("Email Sent");
  }
);

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const user: any = req.user;
  Object.assign(user, { password: req.body.new_password });
  await user.save();
  res.json(user);
});
