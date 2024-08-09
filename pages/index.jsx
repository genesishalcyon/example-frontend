import React, { useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";

const Home = () => {
  const { currentName, isLoggedIn, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div className="w-full min-h-dvh flex items-center justify-center">
      {isLoggedIn ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome, {currentName}!</h1>
          <p className="text-lg">You are logged in</p>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome</h1>
          <p className="text-lg">
            Please log in to access your personalized content.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
