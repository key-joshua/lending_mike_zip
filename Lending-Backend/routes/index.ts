import { Router } from "express";

import docsRouter from "./docs.route";
import authRouter from "./auth.route";
import loanRouter from "./loan.route";
import adminRouter from "./admin.route";
import chatRouter from "./chat.route";
const router = Router();

const routes = [
  { path: "/auth", router: authRouter },
  { path: "/loans", router: loanRouter },
  { path: "/admin", router: adminRouter },
  { path: "/chat", router: chatRouter },
];

// if (config.env === "development") {
//   router.use("/docs", docsRoute);
// }

routes.forEach((obj) => {
  return router.use(obj.path, obj.router);
});

export default router;
