// src/components/SignIn.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./SignIn.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // 👈 import login function

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });
      const { role, name, email: userEmail } = res.data;

      // 👇 Save user data to context
      login({ role, name, email: userEmail });

      if (role === "investor") {
        navigate("/profiles/InvestorProfile");
      } else if (role === "entrepreneur") {
        navigate("/profiles/EntrepreneurProfile");
      } else {
        navigate("/Mainpage");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed. Check credentials.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="SignIn-page">
      <h1>Sign in to Continue Your Learning Journey</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="login-form">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isSubmitting}
          required
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}

export default SignIn;
