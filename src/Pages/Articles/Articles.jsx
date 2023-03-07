import React from "react";

function Articles() {
  return (
    <div className="flex p-2 flex-col w-full gap-2">
      <div className="flex flex-row w-full justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Articles</h1>
        <button className="bg-gray-800 text-white p-2 rounded-md">
          Add Article
        </button>
      </div>
    </div>
  );
}

export default Articles;
