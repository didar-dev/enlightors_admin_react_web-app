import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
function NewArticle({ isOpen, setIsOpen, dispatch, getArticles }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const createArticle = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    fetch(`${process.env.REACT_APP_API}article/create`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.error) {
          setError(data.error);
        } else {
          dispatch(getArticles());
          setIsOpen(false);
        }
      });
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
            Create New Article
          </Dialog.Title>
          <form className="flex flex-col gap-2" onSubmit={createArticle}>
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-gray-500"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Description"
              className="w-full p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-gray-500"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="file"
              placeholder="Image"
              className="w-full p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-gray-500"
              id="image"
              accept=".jpg,.png,.jpeg"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <button
              type="submit"
              className="bg-gray-800 text-white p-2 rounded-md"
            >
              Create
            </button>
          </form>
        </Dialog.Panel>
      </motion.div>
    </Dialog>
  );
}
export default NewArticle;
