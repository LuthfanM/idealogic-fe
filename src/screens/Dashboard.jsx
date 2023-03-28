import { Typography } from "antd";
import React from "react";
import { useLocation } from "react-router-dom";
import All from "../components/All";
import Full from "../components/Full";
import Parents from "../components/Parents";
import Prorate from "../components/Prorate";

const Dashboard = () => {
  const { state } = useLocation();

  console.log("isinya state", state);

  return (
    <Parents>
      <Typography.Title>Ini halaman dashboard</Typography.Title>
      <All />
      {state.username === "admin" && <Full />}
      <Prorate />
    </Parents>
  );
};

export default Dashboard;
