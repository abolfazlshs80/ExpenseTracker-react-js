import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import Inputs from "../Inputs/Inputs";
import userIcon from "../../images/profile.png";
import lockIcon from "../../images/setting.png";
import loginIcon from "../../images/login.png";
import Button from "../Button/Button";

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const success = login(username, password);
    if (!success) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg shadow-black/10 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <img src={loginIcon} alt="login" className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700">Login</h2>
          <p className="text-gray-500 mt-1">Enter your credentials</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Inputs
            type="text"
            placeholder="Username"
            value={username}
            icon={userIcon}
            onchange={(e) => setUsername(e.target.value)}
          />

          <Inputs
            type="password"
            placeholder="Password"
            value={password}
            icon={lockIcon}
            onchange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" label="Login" className="w-full mt-4" />
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-center text-gray-600">
          <p className="font-medium">Demo Credentials:</p>
          <p>Username: <span className="font-mono font-bold">admin</span></p>
          <p>Password: <span className="font-mono font-bold">123</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;