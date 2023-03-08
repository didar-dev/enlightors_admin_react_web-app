import React, { useState, useEffect } from "react";
import { getClients } from "../../../utils/functions";
import { setClients } from "../../../redux/clients";
import { useDispatch, useSelector } from "react-redux";
import { Disclosure } from "@headlessui/react";
import SelectClient from "./components/SelectClient";
function NewMeeting() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [client, setClient] = useState("");
  const [date, setDate] = useState("");
  const [minutesOfMeeting, setMinutesOfMeeting] = useState("");
  const [nextMeeting, setNextMeeting] = useState("");
  const [loading, setLoading] = useState(false);
  const users = useSelector((state) => state.users.users);
  const Auth = useSelector((state) => state.Auth.Auth);
  const clients = useSelector((state) => state.clients.clients);

  useEffect(() => {
    setLoading(true);
    getClients().then((data) => {
      dispatch(setClients(data.clients));
    });
    setLoading(false);
  }, []);

  return (
    <div className="flex p-2 flex-col w-full gap-2">
      <div className="flex flex-row w-full justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">New Meeting</h1>
      </div>
      <div className="flex flex-col w-full gap-2">
        <div className="flex flex-col w-full gap-2">
          <label className="text-gray-800 font-semibold">Title</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <Disclosure
          as="div"
          className="flex flex-col w-full gap-2 border border-gray-300 rounded-md p-2"
        >
          <Disclosure.Button className="py-2">
            <div className="flex flex-row w-full justify-between items-center">
              <h1 className=" font-semibold">
                {client ? client : "Select Client"}
              </h1>
            </div>
          </Disclosure.Button>
          <Disclosure.Panel className="text-gray-500 max-h-96 overflow-y-auto">
            <SelectClient clients={clients} setClient={setClient} />
          </Disclosure.Panel>
        </Disclosure>
      </div>
    </div>
  );
}

export default NewMeeting;
