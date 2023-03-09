import React from "react";
import { GiBrokenWall } from "react-icons/gi";
function index() {
  return (
    <div className="flex w-full flex-col items-center justify-center h-screen">
      <GiBrokenWall size={100} />
      <h1 className="text-3xl mt-2 font-semibold">404 Not Found</h1>
    </div>
  );
}

export default index;
