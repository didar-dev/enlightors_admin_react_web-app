import { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
function EditArticle({ Auth, isOpen, setIsOpen, dispatch, getUsers, user }) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [active, setActive] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password);
      setRole(user.role);
      setActive(user.active);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API}/users/edit/${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role,
            active,
          }),
        }
      );
      const data = await res.json();

      dispatch(getUsers());
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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
            Edit User
          </Dialog.Title>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-gray-500"
              id="name"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-gray-500"
              id="email"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-gray-500"
              id="password"
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
            />
            <select
              className="w-full p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-gray-500"
              id="role"
              value={role || ""}
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
              id="active"
              value={active || ""}
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
              {loading ? "Loading..." : "Edit Article"}
            </button>
          </form>
        </Dialog.Panel>
      </motion.div>
    </Dialog>
  );
}
export default EditArticle;
