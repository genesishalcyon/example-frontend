import { useState } from "react";
import axios from "axios";
import Router from "next/router";

export default function Test() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });
      setError("");
      Router.push("/");
    } catch (error) {
      //   console.log(error.response.data.message);
      setError(error.response.data.message);
    }

    console.log("submit");
  };

  console.log(username, "username");
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <form
        className="border-2 border-black flex flex-col p-[30px]"
        onSubmit={handleSubmit}
      >
        <div>Login</div>
        <label>Username</label>
        <input
          name="username"
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-[1px] border-black"
        />
        <label>Password</label>
        <input
          name="password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-[1px] border-black"
        />
        <p className="text-red-600">{error}</p>
        <button type="submit" className=" bg-gray-600 text-white mt-[8px]">
          Login
        </button>
      </form>
    </div>
  );
}
