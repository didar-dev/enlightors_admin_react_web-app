import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";

function NewClient({ isOpen, setIsOpen, dispatch, getClients }) {
  const [name, setName] = useState("");
  const [contact_number, setContactNumber] = useState("");
  const [joined_date, setJoinedDate] = useState("");

  const [error, setError] = useState("");

  const addClient = async (e) => {
    e.preventDefault();
    const data = {
      name,
      contact_number,
      joined_date,
    };
    const response = await fetch("http://localhost:3000/clients", {
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

    if (result.message === "Client created successfully") {
      setIsOpen(false);
      dispatch(getClients());
      setName("");
      setContactNumber("");
      setJoinedDate("");
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
            Add Client
          </Dialog.Title>
          <form className="flex flex-col gap-2" onSubmit={addClient}>
            <input
              type="text"
              placeholder="Client Name"
              className="w-full p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-gray-500"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Contact Number"
              className="w-full p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-gray-500"
              id="contact_number"
              onChange={(e) =>
                setContactNumber(e.target.value).replace(/[^0-9]/g, "")
              }
            />
            <p className="text-gray-500 text-sm font-semibold">Joined Date</p>
            <input
              type="date"
              placeholder="Joined Date"
              className="w-full p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-gray-500"
              id="joined_date"
              onChange={(e) => setJoinedDate(e.target.value)}
            />

            {error && (
              <p className="text-red-500 text-sm font-semibold">{error}</p>
            )}

            <button
              type="submit"
              className="bg-gray-800 text-white p-2 rounded-md"
            >
              Add Client
            </button>
          </form>
        </Dialog.Panel>
      </motion.div>
    </Dialog>
  );
}
export default NewClient;
