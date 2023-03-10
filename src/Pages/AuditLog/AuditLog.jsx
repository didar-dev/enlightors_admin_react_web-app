import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogs } from "../../redux/logs";
import Table from "./components/Table";
export default function AuditLog() {
  const dispatch = useDispatch();
  const logs = useSelector((state) => state.logs.logs);
  const getLogs = () => {
    return (dispatch) => {
      fetch(`${process.env.REACT_APP_API}logs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Logs fetched successfully") {
            dispatch(setLogs(data.logs));
          }
        });
    };
  };
  useEffect(() => {
    dispatch(getLogs());
  }, []);
  return (
    <div className="flex p-2 flex-col w-full gap-2">
      <div className="flex flex-row w-full justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Audit Logs</h1>
      </div>
      <Table data={logs} />
    </div>
  );
}
