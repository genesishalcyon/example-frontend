import { create } from "zustand";
import axios from "axios";

const useBlogsStore = create((set) => ({
  blogs: [],
  userBlogs: [],
  loading: false,
  error: "",

  fetchBlogs: async () => {
    set({ loading: true });

    try {
      const res = await axios.get("http://localhost:3000/blogs");
      set({ blogs: res.data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message });
    }
  },

  fetchUserBlogs: async (userID) => {
    if (!userID) {
      set({ error: "User ID is not available", loading: false });
    }

    set({ loading: true, error: "" });

    try {
      const res = await axios.get(
        `http://localhost:3000/user-blogs?userID=${userID}`
      );
      set({ userBlogs: res.data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message, loading: false });
    }
  },

  updateBlog: async (id, title, description, userID, closeModal) => {
    set({ loading: true, error: "" });

    try {
      const res = await axios.put("http://localhost:3000/user-blogs", {
        id,
        title,
        description,
      });
      set({ error: "" });
      alert(res.data.message);
      await fetchUserBlogs(userID);
      closeModal();
    } catch (error) {
      set({ error: error.response?.data?.message });
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: "" }),
}));

export default useBlogsStore;
