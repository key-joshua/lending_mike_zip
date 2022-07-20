import React from "react";
import Home from "./Home";
import Request from "./Request";
import Single from "./Single";
import { Routes, Route } from "react-router";
const LoanBoard = ({ socket }) => {
  return (
    <div style={{ paddingRight: "1.5em" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/request" element={<Request />} />
        <Route path="/:id" element={<Single socket={socket} />} />
      </Routes>
    </div>
  );
};

export default LoanBoard;
