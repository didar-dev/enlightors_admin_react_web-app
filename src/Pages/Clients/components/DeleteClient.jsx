import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
function DeleteClient({ isOpen, setIsOpen, id, dispatch, getClients }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const DeleteHandler = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}clients/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Client deleted successfully") {
          dispatch(getClients());
          setIsOpen(false);
          setLoading(false);
        } else {
          setError(data.message);
          setLoading(false);
        }
      });
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
            Delete Client
          </Dialog.Title>
          <Dialog.Description className="text-gray-800">
            Are you sure you want to delete this client?
          </Dialog.Description>
          <div className="flex flex-row justify-between items-center mt-4">
            <p className="text-red-500 text-sm mr-2">{error}</p>
            <div className="flex flex-row gap-2">
              <button
                className="bg-black text-white px-4 py-2 rounded-lg mr-2"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={() => DeleteHandler()}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </motion.div>
    </Dialog>
  );
}
export default DeleteClient;
