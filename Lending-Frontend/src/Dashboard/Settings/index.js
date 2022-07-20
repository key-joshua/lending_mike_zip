import React from "react";
import Default from "./Default";
import ChangePassword from "./Change Password";
import { Routes, Route } from "react-router";
const LoanBoard = () => {
  return (
    <div style={{ paddingRight: "1.5em" }}>
      <Routes>
        <Route path="" element={<Default />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </div>
  );
};

export default LoanBoard;
