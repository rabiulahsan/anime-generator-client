/* eslint-disable react/prop-types */
import { useState } from "react";

const LoginModals = ({ showModal, handleClose, type }) => {
  if (!showModal) return null;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md w-[400px] relative">
        <button
          className="absolute top-2 right-2 text-red-500"
          onClick={handleClose}
        >
          Close
        </button>
        <h2 className="text-2xl font-bold mb-4">
          {type === "login" ? "Log In" : "Sign Up"}
        </h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {type === "login" ? "Log In" : "Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default LoginModals;
