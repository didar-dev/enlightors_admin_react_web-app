import React from "react";

function SelectClient({ clients, setClient }) {
  const [search, setSearch] = React.useState("");
  const [selectedClient, setSelectedClient] = React.useState("");
  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Search Client"
        className="w-full p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-gray-500"
        id="search"
        value={search || ""}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="max-h-96 overflow-y-auto">
        {clients
          .filter(
            (client) =>
              client.name.toLowerCase().includes(search.toLowerCase()) ||
              client.contact_number.toLowerCase().includes(search.toLowerCase())
          )
          .map((client) => (
            <div
              className="flex flex-row w-full justify-between items-center p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setClient({
                  name: client.name,
                  id: client.id,
                });
                setSelectedClient(client.id);
              }}
              key={client.id}
            >
              <div className="flex flex-col">
                <h1 className="text-gray-800 font-semibold">{client.name}</h1>
                <h1 className="text-gray-400 font-semibold">
                  {client.contact_number}
                </h1>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SelectClient;
