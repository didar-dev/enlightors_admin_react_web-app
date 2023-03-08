import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClients } from "../../redux/clients";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import DeleteClient from "./components/DeleteClient";
import NewClient from "./components/NewClient";
import EditClient from "./components/EditClient";
import Loading from "../../components/Loading";
function Clients() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [newClient, setNewClient] = useState(false);
  const clients = useSelector((state) => state.clients.clients);
  const Auth = useSelector((state) => state.Auth.Auth);
  useEffect(() => {
    setLoading(true);
    dispatch(getClients());
    setLoading(false);
  }, []);
  useEffect(() => {
    console.log(clients);
  }, [clients]);
  const getClients = () => {
    return (dispatch) => {
      fetch("http://localhost:3000/clients", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(setClients(data.clients));
        });
      setLoading(false);
    };
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="flex p-2 flex-col w-full gap-2">
      <div className="flex flex-row w-full justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Clients</h1>
        <button
          onClick={() => setNewClient(true)}
          className="bg-gray-800 text-white p-2 rounded-md"
        >
          Add New Client
        </button>
      </div>
      <input
        type="text"
        placeholder="Search"
        className=" p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-gray-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {clients &&
          clients
            .filter((client) => {
              if (search === "") {
                return client;
              } else if (
                client.name.toLowerCase().includes(search.toLowerCase())
              ) {
                return client;
              }
            })
            .map((client) => (
              <div
                key={client.id}
                className="flex flex-col p-2 bg-white rounded-md shadow-md"
              >
                <p className="text-gray-800 font-bold text-lg">{client.name}</p>
              </div>
            ))}
      </div>
      <NewClient
        isOpen={newClient}
        setIsOpen={setNewClient}
        dispatch={dispatch}
        getClients={getClients}
      />
      {/* <DeleteUser />
      <EditUser /> */}
    </div>
  );
}

export default Clients;
