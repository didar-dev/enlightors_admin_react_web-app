import React, { useState, useEffect } from "react";
import { getClients } from "../../../utils/functions";
import { setClients } from "../../../redux/clients";
import { useDispatch, useSelector } from "react-redux";
import { Disclosure } from "@headlessui/react";
import SelectClient from "./components/SelectClient";
function NewMeeting() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [client, setClient] = useState({
    name: "",
    id: "",
  });
  const [date, setDate] = useState("");
  const [minutesOfMeeting, setMinutesOfMeeting] = useState("");
  const [nextMeeting, setNextMeeting] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    color: "red",
    message: "",
  });
  const clients = useSelector((state) => state.clients.clients);
  useEffect(() => {
    setLoading(true);
    getClients().then((data) => {
      dispatch(setClients(data.clients));
    });
    setLoading(false);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API}/meetings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title: title,
        client_id: client.id,
        date: date,
        minutes_of_meeting: minutesOfMeeting,
        next_meeting: nextMeeting,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Meeting created successfully") {
          setMessage({
            color: "green",
            message: "Meeting created successfully",
          });
        } else {
          setMessage({
            color: "red",
            message: data.message,
          });
        }
      });
  };
  return (
    <div className="flex p-2 flex-col w-full gap-2">
      <div className="flex flex-row w-full justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">New Meeting</h1>
      </div>
      <form className="flex flex-col w-full gap-2" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full gap-2">
          <label className="text-gray-800 font-semibold">Title</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2"
            value={title}
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
            value={date}
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
            value={minutesOfMeeting}
            placeholder="Enter Minutes of Meeting"
            onChange={(e) => setMinutesOfMeeting(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <label className="text-gray-800 font-semibold">Next Meeting</label>
          <input
            type="date"
            className="border border-gray-300 rounded-md p-2"
            value={nextMeeting}
            onChange={(e) => setNextMeeting(e.target.value)}
          />
        </div>
        <div className="flex flex-row w-full justify-end items-center gap-2">
          <h1 className={`text-${message.color}-500`}>{message.message}</h1>
          <button
            type="submit"
            className="bg-gray-800 text-white font-semibold rounded-md p-2"
          >
            Create Meeting
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewMeeting;
