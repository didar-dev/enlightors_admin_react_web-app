import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../redux/users";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import DeleteUser from "./components/DeleteUser";
import NewUser from "./components/NewUser";
import EditUser from "./components/EditUser";
import Loading from "../../components/Loading";
function Clients() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const clients = useSelector((state) => state.clients.clients);
  const Auth = useSelector((state) => state.Auth.Auth);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="flex p-2 flex-col w-full gap-2">
      <div className="flex flex-row w-full justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Clients</h1>
        <button className="bg-gray-800 text-white p-2 rounded-md">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"></div>

      {/* <DeleteUser />
      <NewUser />
      <EditUser /> */}
    </div>
  );
}

export default Clients;
