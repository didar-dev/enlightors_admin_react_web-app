import { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { Disclosure } from "@headlessui/react";
import SelectClient from "./SelectClient";
import { useDispatch, useSelector } from "react-redux";
import { getClients } from "../../../utils/functions";
import { setClients } from "../../../redux/clients";

function EditMeeting({ isOpen, setIsOpen, dispatch, getMeetings, Meeting }) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [client, setClient] = useState({
    name: "",
    id: "",
  });
  const [date, setDate] = useState("");
  const [minutesOfMeeting, setMinutesOfMeeting] = useState("");
  const [nextMeeting, setNextMeeting] = useState("");
  const [message, setMessage] = useState({
    color: "red",
    message: "",
  });
  const clients = useSelector((state) => state.clients.clients);

  useEffect(() => {
    getClients().then((data) => {
      dispatch(setClients(data.clients));
    });
    if (Meeting) {
      setTitle(Meeting.title);
      setClient({
        name: Meeting.client,
        id: Meeting.client_id,
      });
      setDate(Meeting.date?.split("T")[0]);
      setMinutesOfMeeting(Meeting.minutes_of_meeting);
      setNextMeeting(Meeting.next_meeting_date?.split("T")[0]);
    }
  }, [Meeting]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API}meetings/${Meeting.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title,
            date,
            minutes_of_meeting: minutesOfMeeting,
            next_meeting_date: nextMeeting,
            client_id: client.id,
          }),
        }
      );
      const data = await res.json();
      if (data.message === "Meeting updated successfully") {
        dispatch(getMeetings());
        setIsOpen(false);
      } else {
        setMessage({
          color: "red",
          message: data.message,
        });
      }
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
          <form className="flex flex-col w-full gap-2" onSubmit={handleSubmit}>
            <div className="flex flex-col w-full gap-2">
              <label className="text-gray-800 font-semibold">Title</label>
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2"
                value={title || ""}
                placeholder="Enter Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-gray-800 font-semibold">Client</label>
              <Disclosure
                as="div"
                className="flex flex-col w-full gap-2 border border-gray-300 rounded-md px-2"
              >
                <Disclosure.Button className="py-2">
                  <div className="flex flex-row w-full justify-between items-center">
                    <h1 className=" font-semibold">
                      {client.name ? client.name : "Select Client"}
                    </h1>
                  </div>
                </Disclosure.Button>
                <Disclosure.Panel className="text-gray-500">
                  <SelectClient clients={clients} setClient={setClient} />
                </Disclosure.Panel>
              </Disclosure>
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-gray-800 font-semibold">Date</label>
              <input
                type="date"
                className="border border-gray-300 rounded-md p-2"
                value={date || ""}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-gray-800 font-semibold">
                Minutes of Meeting
              </label>
              <input
                /// number only
                type="number"
                className="border border-gray-300 rounded-md p-2"
                value={minutesOfMeeting || ""}
                placeholder="Enter Minutes of Meeting"
                onChange={(e) => setMinutesOfMeeting(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-gray-800 font-semibold">
                Next Meeting
              </label>
              <input
                type="date"
                className="border border-gray-300 rounded-md p-2"
                value={nextMeeting || ""}
                onChange={(e) => setNextMeeting(e.target.value)}
              />
            </div>
            <div className="flex flex-row w-full justify-end items-center gap-2">
              <h1 className={`text-${message.color}-500`}>{message.message}</h1>
              <button
                type="submit"
                className="bg-gray-800 text-white font-semibold rounded-md p-2"
              >
                Edit Meeting
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </motion.div>
    </Dialog>
  );
}
export default EditMeeting;
