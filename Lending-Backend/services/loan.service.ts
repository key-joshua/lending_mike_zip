import { StatusCodes } from "http-status-codes";
import { Socket } from "socket.io";
import { Loan, Notif } from "../models";
import ApiError from "../utils/ApiError";

export const queryLoan = async (filter: any, options: any) => {
  const loans = await Loan.paginate(filter, options);

  return loans;
};

export const createRequest = async (id: string, data: object) => {
  const loan = await Loan.create({
    ...data,
    created_by: id,
  });
  return loan;
};

export const grantLoan = async (
  loan_id: string,
  socket: Socket,
  id: string,
  users: any
) => {
  const loan = await Loan.findById(loan_id);

  if (!loan) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Invalid Id");
  }
  await Notif.create({ type: "loan", from: id, to: loan.created_by });
  console.log(users);
  const receiver = users.find((item: any) => item.user.id === loan.created_by);

  const notifications = receiver && (await Notif.find({ to: loan.created_by }));
  receiver && socket.to(receiver.id).emit("notifications", notifications);
  Object.assign(loan, { granted_by: id });
  loan.save();
  return loan;
};

export const getLoanById = async (id: string) => {
  const loan = await Loan.findById(id);
  if (!loan) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Invalid Loan Id");
  }
  return loan;
};

export const getDashboardGraph = async (query: any) => {
  const { type, range } = query;
  const now = new Date();
  // Last date
  // THIs week
  // This month
  // This year
  // var last = new Date(
  //   now.getFullYear(),
  //   now.getMonth(),
  //   now.getDate() - (range === "weekly" ? 7 : 30)
  // );
  let data;
  if (range == "thisweek") {
    const last = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    data = await Loan.aggregate([
      // First Stage
      {
        $match: {
          ...(type === "granted" ? { granted_by: { $exists: true } } : {}),
          createdAt: {
            $gte: last,
            $lt: now,
          },
        },
      },
      // Second Stage
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: query.type === "granted" ? "$updatedAt" : "$createdAt",
            },
          },
          count: { $sum: 1 },
        },
      },
      // Third Stage
      {
        $sort: { _id: 1 },
      },
    ]);
  } else {
    var currentdate = new Date();
    var oneJan = new Date(currentdate.getFullYear(), 0, 1);
    var numberOfDays = Math.floor(
      (currentdate.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000)
    );
    var result = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
    data = await Loan.aggregate([
      // First Stage
      {
        $project: {
          description: 1,
          amount: 1,
          date: 1,
          collateral: 1,
          collateral_images: 1,
          created_by: 1,
          granted_by: 1,
          createdAt: 1,
          updatedAt: 1,
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          week: { $week: "$createdAt" },
        },
      },
      {
        $match: {
          ...(type === "granted" ? { granted_by: { $exists: true } } : {}),
          ...(range == "yearly"
            ? { year: now.getFullYear() }
            : range == "monthly"
            ? { year: now.getFullYear(), month: now.getMonth() }
            : {
                year: now.getFullYear(),
                month: now.getMonth() + 1,
                week: result,
              }),
        },
      },
      // Second Stage
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: query.type === "granted" ? "$updatedAt" : "$createdAt",
            },
          },
          count: { $sum: 1 },
        },
      },
      // Third Stage
      {
        $sort: { _id: 1 },
      },
    ]);
  }
  return data;
};
