import { create } from "zustand";
import axios from "axios";

const useUserStore = create((set) => ({
  userId: "",
  name: "",
  username: "",
  error: "",

  setUserId: (userId) => set({ userId }),
  setName: (name) => set({ name }),
  setUsername: (username) => set({ username }),
  setError: (error) => set({ error }),

  updateUser: async (closeModal) => {
    try {
      const { userId, name, username } = get();
      const res = await axios.put("http://localhost:3000/profile", {
        userId,
        name,
        username,
      });

      set({ error: "" });
      alert(res.data.message);
      set({ userId: "", name: "", username: "" });
      closeModal();
    } catch (error) {
      set({ error: error.response?.data?.message });
    }
  },
}));

export default useUserStore;
