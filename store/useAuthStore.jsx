import { create } from "zustand";
import axios from "axios";
import { parseCookies } from "nookies";

const useAuthStore = create((set) => ({
  token: null,
  userID: null,
  currentName: "",
  name: "",
  username: "",
  posts: "",
  isLoggedIn: false,
  error: "",

  initialize: async () => {
    const { token } = parseCookies();

    if (token) {
      try {
        const response = await axios.get("http://localhost:3000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { id, name, username, posts } = response.data;
        set({
          token,
          userID: id,
          currentName: name,
          name: name,
          username: username,
          posts: posts,
          isLoggedIn: true,
          error: null,
        });
      } catch (error) {
        set({
          token: null,
          userID: null,
          currentName: "",
          name: "",
          username: "",
          posts: "",
          isLoggedIn: false,
          error: error.response.data.message,
        });
      }
    } else {
      set({
        toke: null,
        userID: null,
        currentName: "",
        name: "",
        username: "",
        posts: "",
        isLoggedIn: false,
        error: null,
      });
    }
  },

  logout: () =>
    set({
      token: null,
      userID: null,
      letter: "",
      name: "",
      username: "",
      isLoggedIn: false,
      error: null,
    }),

  //   clearForm: () =>
  //     set({
  //       name: "",
  //       username: "",
  //       error: "",
  //     }),
}));

export default useAuthStore;
