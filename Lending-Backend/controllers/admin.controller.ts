import { Request, Response } from "express";
import { loanService, userService } from "../services";
import catchAsync from "../utils/catchAsync";

export const getUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await userService.queryUsers({ role: "user" });
  res.json(users);
});

export const suspendUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await userService.suspendAccounts(req.body);
  res.json(users);
});

export const deleteUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await userService.deleteAccounts(req.body);
  res.json(users);
});

export const getDashboardCounts = catchAsync(
  async (req: Request, res: Response) => {
    const loans = await loanService.queryLoan({}, {});
    const users = await userService.queryUsers({});
    const granted = await loanService.queryLoan(
      { granted_by: { $exists: true } },
      {}
    );

    console.log(granted);
    res.json({
      users: users.length,
      loans: loans.totalResults - 1,
      granted: granted.totalResults - 1,
    });
  }
);

export const getDasboardGraph = catchAsync(
  async (req: Request, res: Response) => {
    console.log(req.query);
    const data = await loanService.getDashboardGraph(req.query);
    console.log(data);
    res.json(data);
  }
);
