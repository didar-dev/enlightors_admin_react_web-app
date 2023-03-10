import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, signout } from "./redux/Auth";
import "./App.css";
import Home from "./Pages/Home/Home";
import Users from "./Pages/Users/Users";
import Articles from "./Pages/Articles/Articles";
import Clients from "./Pages/Clients/Clients";
import Meetings from "./Pages/Meetings/Meetings";
import NewMeeting from "./Pages/Meetings/New/NewMeeting";
import AuditLog from "./Pages/AuditLog/AuditLog";
import NotFound from "./Pages/NotFound";
import Login from "./Pages/Login/Login.";
import NavBar from "./components/NavBar";
import Loading from "./components/Loading";
import RightBar from "./components/RightBar";
//// dotenv
function App() {
  const [loading, setLoading] = useState(true);
  const Auth = useSelector((state) => state.Auth.Auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const Token = localStorage.getItem("token");
    if (Token) {
      fetch(`${process.env.REACT_APP_API}auth/me`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "User fetched successfully") {
            dispatch(login(data.user));
            setLoading(false);
          }
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {Auth && (
        <>
          <NavBar />
          <div className="flex gap-2">
            <RightBar />
            <Routes>
              <Route path="/" element={<Articles />} />
              <Route path="/users" element={<Users />} />
              <Route path="/Articles" element={<Articles />} />
              <Route path="/Clients" element={<Clients />} />
              <Route path="/Meetings" element={<Meetings />} />
              <Route path="/Meetings/New" element={<NewMeeting />} />
              {Auth.role === "super_admin" && (
                <Route path="/auditlogs" element={<AuditLog />} />
              )}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </>
      )}
      {!Auth && (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
