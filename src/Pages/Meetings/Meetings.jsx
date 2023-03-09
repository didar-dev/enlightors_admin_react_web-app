import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMeetings } from "../../redux/meetings";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import DeleteMeeting from "./components/DeleteMeeting";
import EditMeeting from "./components/EditMeeting";
import Loading from "../../components/Loading";
function Meetings() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [newMeeting, setNewMeeting] = useState(false);
  const [deleteMeeting, setDeleteMeeting] = useState({
    isOpen: false,
    id: "",
  });
  const [editMeeting, setEditMeeting] = useState({
    isOpen: false,
    Meeting: {},
  });

  const meetings = useSelector((state) => state.meetings.meetings);
  const Auth = useSelector((state) => state.Auth.Auth);
  useEffect(() => {
    setLoading(true);
    dispatch(getMeetings());
    setLoading(false);
  }, []);

  const getMeetings = () => {
    return (dispatch) => {
      fetch(`${process.env.REACT_APP_API}/meetings`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(setMeetings(data.meetings));
        });
      setLoading(false);
    };
  };
  const DeleteHandler = (id) => {
    setDeleteMeeting({
      isOpen: true,
      id: id,
    });
  };
  const EditHandler = (Meeting) => {
    setEditMeeting({
      isOpen: true,
      Meeting: Meeting,
    });
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex p-2 flex-col w-full gap-2">
      <div className="flex flex-row w-full justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Meetings</h1>
        <Link
          onClick={() => setNewMeeting(true)}
          className="bg-gray-800 text-white p-2 rounded-md"
          to="/meetings/new"
        >
          Add New Meeting
        </Link>
      </div>
      <input
        type="text"
        placeholder="Search"
        className=" p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-gray-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {meetings &&
          meetings
            .filter((Meeting) => {
              if (search === "") {
                return Meeting;
              } else if (
                Meeting.user.toLowerCase().includes(search.toLowerCase())
              ) {
                return Meeting;
              }
            })
            .sort((a, b) => {
              if (a.meetings_count < b.meetings_count) {
                return 1;
              } else if (a.meetings_count > b.meetings_count) {
                return -1;
              } else {
                return 0;
              }
            })
            .map((Meeting) => (
              <div
                key={Meeting.id}
                className="flex flex-row w-full justify-between items-center p-2 bg-gray-100 rounded-md"
              >
                <div className="flex flex-col ">
                  <p className="text-gray-800 font-bold text-lg">
                    {Meeting.title}
                  </p>
                  <p className="text-gray-800">Client: {Meeting.client}</p>
                  <p className="text-gray-800">Admin: {Meeting.user}</p>
                </div>
                <div className="flex flex-row gap-2">
                  <button
                    onClick={() => EditHandler(Meeting)}
                    className="bg-gray-800 text-white p-2 rounded-md"
                  >
                    <AiFillEdit />
                  </button>
                  <button
                    onClick={() => DeleteHandler(Meeting.id)}
                    className="bg-gray-800 text-white p-2 rounded-md"
                  >
                    <BsFillTrashFill />
                  </button>
                </div>
              </div>
            ))}
      </div>

      <DeleteMeeting
        isOpen={deleteMeeting.isOpen}
        setIsOpen={(value) =>
          setDeleteMeeting({
            isOpen: value,
            id: deleteMeeting.id,
          })
        }
        dispatch={dispatch}
        getMeetings={getMeetings}
        id={deleteMeeting.id}
      />
      {/* <EditMeeting
        isOpen={editMeeting.isOpen}
        setIsOpen={(value) =>
          setEditMeeting({
            isOpen: value,
            Meeting: editMeeting.Meeting,
          })
        }
        dispatch={dispatch}
        getmeetings={getmeetings}
        Meeting={editMeeting.Meeting}
        FormatDate={FormatDate}
      /> */}
    </div>
  );
}

export default Meetings;
