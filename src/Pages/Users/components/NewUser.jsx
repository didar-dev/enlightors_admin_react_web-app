import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

function NewUser({ isOpen, setIsOpen, dispatch, getUsers }) {
  const Auth = useSelector((state) => state.Auth.Auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [active, setActive] = useState("true");
  const [error, setError] = useState("");

  const addUser = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
      role,
      active,
    };
    const response = await fetch(`${process.env.REACT_APP_API}/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (response.status === 400) {
      setError(result.message);
      return;
    }

    if (result.message === "User created successfully") {
      dispatch(getUsers());
      setIsOpen(false);
      setName("");
      setEmail("");
      setPassword("");
      setRole("user");
      setActive("true");
      setError("");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/30"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center"
      >
        <Dialog.Panel className="mx-auto w-screen md:w-1/3 bg-white rounded-lg p-4">
          <Dialog.Title
            as="h1"
            className="text-2xl mb-2 font-bold text-gray-800"
          >
            Add User
          </Dialog.Title>
          <form className="flex flex-col gap-2" onSubmit={addUser}>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-gray-500"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-gray-500"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby="emailHelp"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-gray-500"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <select
              className="w-full p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-gray-500"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option
                disabled={Auth.role !== "super_admin" ? true : false}
                value="super_admin"
              >
                Super Admin
              </option>
            </select>
            <select
              className="w-full p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-gray-500"
              onChange={(e) => setActive(e.target.value)}
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
            {error && (
              <p className="text-red-500 text-sm font-semibold">{error}</p>
            )}

            <button
              type="submit"
              className="bg-gray-800 text-white p-2 rounded-md"
            >
              Add User
            </button>
          </form>
        </Dialog.Panel>
      </motion.div>
    </Dialog>
  );
}
export default NewUser;
