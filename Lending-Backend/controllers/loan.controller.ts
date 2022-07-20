import { Request, Response } from "express";
import { Loan } from "../models";
import { loanService } from "../services";
import ApiError from "../utils/ApiError";
import catchAsync from "../utils/catchAsync";
import pick from "../utils/pick";

export const getLoans = catchAsync(async (req: Request, res: Response) => {
  const filters = {
    ...("granted" in req.query
      ? { granted_by: { $exists: req.query.granted === "true" ? true : false } }
      : {}),
    ...(req.query.id ? { created_by: { $ne: req.query.id } } : {}),
    ...(req.query.createdBy ? { created_by: req.query.createdBy } : {}),
    ...(req.query.grantedBy ? { granted_by: req.query.grantedBy } : {}),
  };

  const options = pick(req.query, ["sortBy", "page", "limit"]);
  const loans = await loanService.queryLoan(filters, {
    ...options,
    populate: "created_by,granted_by",
  });
  res.json(loans);
});

export const getLoanById = catchAsync(async (req: Request, res: Response) => {
  const loan = await loanService.getLoanById(req.params.id);
  res.json(loan);
});

export const createLoan = catchAsync(async (req: Request, res: Response) => {
  const user: any = req.user;
  const images: any = req.files;
  const loan = await loanService.createRequest(user.id, req.body);
  res.json(loan);
});

export const grantLoan = catchAsync(async (req: Request, res: Response) => {
  const user: any = req.user;
  const socket: any = req.app.locals.settings.socket;
  const users: any = req.app.locals.settings.socket_users;

  const loan = await loanService.grantLoan(
    req.params.id,
    socket,
    user.id,
    users
  );
  res.json(loan);
});

export const deleteLoan = catchAsync(async (req: Request, res: Response) => {
  const loan = await loanService.getLoanById(req.params.id);
  if (loan.granted_by) {
    throw new ApiError(401, "The loan has been granted");
  }
  Loan.findByIdAndDelete(req.params.id, (error: any, result: any) => {
    if (!error) {
      res.json({ message: "Loan Removed" });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  });
});
