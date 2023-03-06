import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./redux/user";

function App() {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
    </Routes>
  );
}

export default App;
