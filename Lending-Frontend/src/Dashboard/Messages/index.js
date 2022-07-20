import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./styles.css";
import { useLocation } from "react-router-dom";
import LargeScreen from "./LargeScreen";
import SmallScreen from "./SmallScreen";

function Messaging({ socket }) {
  const { state } = useLocation();
  return (
    socket &&
    (window.innerWidth > 900 ? (
      <LargeScreen socket={socket} state={state} />
    ) : (
      <SmallScreen socket={socket} state={state} />
    ))
  );
}

export default Messaging;
