import { useState } from "react";
import axios from "axios";
import useAuthStore from "@/store/useAuthStore";
import useBlogsStore from "@/store/useBlogsStore";

const EditAccountModal = ({
  userId,
  name,
  username,
  setName,
  setUsername,
  closeModal,
}) => {
  const { initialize } = useAuthStore();
  const { fetchBlogs } = useBlogsStore();
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put("http://localhost:3000/profile", {
        userId,
        name,
        username,
      });

      setError("");
      initialize();
      fetchBlogs();
      alert(res.data.message);
      closeModal();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-20">
      <div className="relative bg-white rounded-lg shadow-lg p-[30px]">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-4">Edit Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            hidden
            type="text"
            value={userId}
            className="w-full text-[17px] border-[1px] border-solid border-[#cbd5e1] py-[8px] px-[10px]"
          />
          <label className="text-[18px]">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full text-[17px] border-[1px] border-solid border-[#cbd5e1] py-[8px] px-[10px]"
          />
          <label className="text-[18px]">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full text-[17px] border-[1px] border-solid border-[#cbd5e1] py-[8px] px-[10px]"
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <div className="flex gap-x-2 mt-4">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-all hover:scale-105 hover:shadow-sm"
            >
              Save
            </button>
            <button
              onClick={closeModal}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-all hover:scale-105 hover:shadow-sm"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAccountModal;
