import { useState, useEffect } from "react";
import { parseCookies, destroyCookie } from "nookies";
import Router from "next/router";
import axios from "axios";
import Link from "next/link";
import EditAccountModal from "./Modals/EditAccountModal";
import useAuthStore from "@/store/useAuthStore";

const Menu = () => {
  const {
    userID,
    currentName,
    name,
    username,
    isLoggedIn,
    initialize,
    logout,
  } = useAuthStore();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userId, setuserID] = useState("");
  // const [letter, setLetter] = useState("");
  // const [name, setName] = useState("");
  // const [username, setUsername] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    initialize();
    // const token = parseCookies().token;
    // if (token) {
    //   axios
    //     .get("http://localhost:3000/profile", {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     })
    //     .then((response) => {
    //       const { id, name, username } = response.data;
    //       setLetter(name);
    //       setuserID(id);
    //       setName(name);
    //       setUsername(username);
    //       setIsLoggedIn(true);
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching user information:", error);
    //       setIsLoggedIn(false);
    //       Router.push("/login");
    //     });
    // } else {
    //   setIsLoggedIn(false);
    // }
  }, [initialize]);

  const handleLogout = () => {
    destroyCookie(null, "token");
    // setIsLoggedIn(false);
    logout();
    Router.push("/login");
  };

  const handleMenu = () => {
    if (!showMenu) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  };

  const openModal = () => {
    setShowModal(true);
    setShowMenu(false);
  };

  // if (!isLoggedIn) {
  //   Router.push("/login");
  //   return null;
  // }

  return (
    <nav className="w-full fixed top-0 bg-white border-y-[1px] border-black py-[10px] z-100">
      <div className="flex items-center justify-between px-[30px]">
        <Link href={"/"}>Home</Link>
        <Link href={"/blogs"}>Blogs</Link>
        <div className="">
          {isLoggedIn ? (
            <button
              onClick={handleMenu}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-[14px] rounded-full uppercase transition-all hover:scale-105 hover:shadow-sm"
            >
              {currentName.charAt(0)}
            </button>
          ) : (
            <button
              onClick={() => Router.push("/login")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>
          )}
        </div>
      </div>
      {showMenu ? (
        <div className="absolute top-16 right-10 bg-white rounded-md shadow-md shadow-gray-400 p-[30px]">
          <div className="absolute top-2 right-2">
            <button
              onClick={handleMenu}
              className="text-[20px] hover:text-red-500"
            >
              X
            </button>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-[20px]">{username}</div>
            <Link
              href={"/profile"}
              title="Go to profile"
              className="bg-red-500 hover:bg-red-600 text-[35px] text-white font-medium py-2 px-[22px] rounded-full uppercase transition-all hover:scale-105 hover:shadow-sm"
            >
              {currentName.charAt(0)}
            </Link>
            <div className="text-[20px] mb-[8px]">Hi, {name}!</div>
            <div className="flex gap-x-2">
              <button
                onClick={openModal}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </button>
              <button
                onClick={handleLogout}
                // onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {showModal && (
        <EditAccountModal
          userId={userID}
          name={name}
          username={username}
          setName={(newName) => useAuthStore.setState({ name: newName })}
          setUsername={(newUsername) =>
            useAuthStore.setState({ username: newUsername })
          }
          closeModal={() => {
            setShowModal(false);
            initialize();
          }}
        />
      )}
    </nav>
  );
};

export default Menu;
