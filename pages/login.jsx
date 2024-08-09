import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import Router from "next/router";
import { setCookie } from "nookies";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });

      const { token, user, message } = res.data;

      console.log(token, "token");

      setCookie(null, "token", token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      //   alert(message);
      setError("");
      setLoading(true);
      Router.push("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="w-full flex justify-center items-center min-h-dvh bg-blue-500">
      <div className="flex flex-col w-[410px] bg-white p-[30px]">
        <div className="text-[35px] font-600 text-center font-sans mb-[16px]">
          Login Form
        </div>
        <form className="flex flex-col w-full gap-8" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-[18px]">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full text-[17px] border-[1px] border-solid border-[#cbd5e1] py-[8px] px-[10px]"
            />
            <label className="text-[18px] mt-[8px]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-[17px] border-[1px] border-solid border-[#cbd5e1] py-[8px] px-[10px]"
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="text-[#3498db] hover:underline mt-[8px]">
              <Link href="#">Forgot Password?</Link>
            </div>
          </div>
          <button
            className="w-full bg-blue-500 hover:bg-blue-400 text-white text-[18px] font-medium uppercase cursor-pointer tracking-[1px] py-[8px] px-[10px]"
            type="submit"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <div>
            Not a member?{" "}
            <Link
              className="text-[#3498db] hover:underline mt-[8px]"
              href="/register"
            >
              Signup now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
