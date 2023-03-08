import { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
function EditArticle({ isOpen, setIsOpen, dispatch, getClients, client }) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [contact_number, setContactNumber] = useState("");
  const [joined_date, setJoinedDate] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (client) {
      setName(client.name);
      setContactNumber(client.contact_number);
      setJoinedDate(client?.joined_date?.split("T")[0]);
    }
  }, [client]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API}/clients/${client.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name,
            contact_number,
            joined_date,
          }),
        }
      );
      const data = await res.json();
      dispatch(getClients());
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
            Edit Client
          </Dialog.Title>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Client Name"
              className="w-full p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-gray-500"
              id="name"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Contact Number"
              className="w-full p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-gray-500"
              id="contact_number"
              value={contact_number || ""}
              onChange={(e) => setContactNumber(e.target.value)}
            />
            <p className="text-gray-500 text-sm font-semibold">Joined Date</p>
            <input
              type="date"
              placeholder="Joined Date"
              className="w-full p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-gray-500"
              id="joined_date"
              value={joined_date || ""}
              onChange={(e) => setJoinedDate(e.target.value)}
            />
            {error && (
              <p className="text-red-500 text-sm font-semibold">{error}</p>
            )}
            <button
              type="submit"
              className="bg-gray-800 text-white p-2 rounded-md"
            >
              {loading ? "Loading..." : "Edit Client"}
            </button>
          </form>
        </Dialog.Panel>
      </motion.div>
    </Dialog>
  );
}
export default EditArticle;
