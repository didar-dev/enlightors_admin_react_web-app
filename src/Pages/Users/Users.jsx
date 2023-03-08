import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../redux/users";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import DeleteUser from "./components/DeleteUser";
import NewUser from "./components/NewUser";

import Loading from "../../components/Loading";
function Users() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteUser, setDeleteUser] = useState({
    isOpen: false,
    id: "",
  });
  const [newUser, setNewUser] = useState(false);
  const users = useSelector((state) => state.users.users);
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const getUsers = () => {
    return (dispatch) => {
      fetch("http://localhost:3000/users/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(setUsers(data.users));
        });
      setLoading(false);
    };
  };

  if (loading) {
    return <Loading />;
  }
  const DeleteHandler = (id) => {
    setDeleteUser({
      isOpen: true,
      id: id,
    });
  };

  return (
    <div className="flex p-2 flex-col w-full gap-2">
      <div className="flex flex-row w-full justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        <button
          onClick={() => setNewUser(true)}
          className="bg-gray-800 text-white p-2 rounded-md"
        >
          Add User
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
        {users &&
          users
            .filter(
              (user) =>
                user.email.toLowerCase().includes(search.toLowerCase()) ||
                user.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((user) => {
              return (
                <div
                  key={user.id}
                  className="flex flex-row w-full justify-between items-center p-2 bg-gray-100 rounded-md"
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-gray-800 font-bold">{user.name}</p>
                    {user.active === "true" ? (
                      <p className="text-green-500">Active</p>
                    ) : (
                      <p className="text-red-500">Inactive</p>
                    )}
                  </div>
                  <div className="flex flex-row gap-2">
                    <div className="flex flex-row gap-2bg-gray-200 rounded-md p-2 hover:bg-gray-300 cursor-pointer  transition duration-300">
                      <AiFillEdit className="text-blue-500" size={22} />
                    </div>
                    <div
                      onClick={() => DeleteHandler(user.id)}
                      className="flex flex-row gap-2bg-gray-200 rounded-md p-2 hover:bg-gray-300 cursor-pointer  transition duration-300"
                    >
                      <BsFillTrashFill className="text-red-500" size={22} />
                    </div>
                  </div>
                </div>
              );
            })}
      </div>

      <DeleteUser
        isOpen={deleteUser.isOpen}
        setIsOpen={(value) => setDeleteUser({ ...deleteUser, isOpen: value })}
        id={deleteUser.id}
        dispatch={dispatch}
        getUsers={getUsers}
      />
      <NewUser
        isOpen={newUser}
        setIsOpen={(value) => setNewUser(value)}
        dispatch={dispatch}
        getUsers={getUsers}
      />
    </div>
  );
}

export default Users;
