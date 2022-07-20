export const roles = ["user", "admin"];

export const rights = new Map();

rights.set(roles[0], ["loan", "change password", "update profile", "chat"]);
rights.set(roles[1], ["loan", "change password", "users", "dashboard"]);
