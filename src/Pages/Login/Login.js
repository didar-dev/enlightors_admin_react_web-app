import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/Auth";
export default function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const Auth = useSelector((state) => state.Auth.Auth);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }).then((res) => res.json());

      if (data.message === "User logged in successfully") {
        if (data.user.role === "admin" || data.user.role === "super_admin") {
          dispatch(login(data.user));
          localStorage.setItem("token", data.token);
          setLoading(false);
        } else {
          setError("You are not an admin");
          setLoading(false);
        }
      } else {
        setError(data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center bg-gray-500 items-center  h-screen">
      <div className=" bg-gray-200 rounded-lg shadow-lg p-5">
        <form onSubmit={handleSubmit}>
          <div className="w-[300px] grid gap-2">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-gray-500 "
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby="emailHelp"
            />
            <div className="flex items-center">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                className="w-full p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-gray-500"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                aria-describedby="emailHelp"
              />
              <button
                type="button"
                className="p-2 rounded-lg text-black"
                onClick={() => setShow(!show)}
              >
                {show ? (
                  <AiFillEyeInvisible color="black" size="20px" />
                ) : (
                  <AiFillEye color="black" size="20px" />
                )}
              </button>
            </div>
            <button
              type="submit"
              className="w-full p-2 rounded-lg bg-gray-800 text-white disabled:opacity-50"
              disabled={email === "" || password === "" || loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
            {error && (
              <div
                className="text-red-500 bg-red-100 p-2 rounded-lg border-2 border-red-300
                "
              >
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
