import React from "react";
import { DotLoader } from "react-spinners";
function Loading() {
  const LoadingColor = "#f7b731";
  return (
    <div className="flex justify-center items-center h-screen">
      <DotLoader color={LoadingColor} />
    </div>
  );
}

export default Loading;
