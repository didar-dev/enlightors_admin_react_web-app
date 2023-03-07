import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, signout } from "./redux/user";
import "./App.css";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import NavBar from "./components/NavBar";
import Loading from "./components/Loading";
function App() {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const Token = localStorage.getItem("token");
    if (Token) {
      fetch("http://localhost:3000/auth/me", {
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
      {user && (
        <>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />{" "}
          </Routes>
        </>
      )}
      {!user && (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
