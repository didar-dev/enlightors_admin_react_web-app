import React from "react";

function SelectClient({ clients, setClient }) {
  console.log("clients", clients);
  return (
    <div>
      {clients.map((client) => (
        <div
          className="flex flex-row w-full justify-between items-center p-2 cursor-pointer hover:bg-gray-100"
          onClick={() => setClient(client.name)}
        >
          <h1 className="text-gray-800 font-semibold">{client.name}</h1>
        </div>
      ))}
    </div>
  );
}

export default SelectClient;
