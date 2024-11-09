import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { localisable } from "../utils/localisable";

const Home = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center text-white relative overflow-hidden"
      style={{
        backgroundImage: `url('/Home.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60 animate-fade-in"></div>

      <div className="absolute top-10 left-10 w-60 h-60 bg-purple-600 opacity-30 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-indigo-500 opacity-30 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="relative z-10 max-w-lg lg:max-w-2xl text-center p-8 sm:p-12 lg:p-16 rounded-lg shadow-lg bg-white bg-opacity-20 backdrop-blur-md animate-slide-up">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 animate-fade-in">
          {localisable.home.welcomeTitle}
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl font-light mb-6 animate-fade-in delay-100">
          {localisable.home.welcomeMessage}
        </p>

        {!isAuthenticated && (
          <button
            onClick={() => loginWithRedirect()}
            className="px-8 py-4 text-lg sm:text-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 animate-bounce-slow"
          >
            {localisable.home.loginButton}
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
