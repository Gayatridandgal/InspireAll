import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import "./SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userCaptcha: "",
    role: "Select Role",
  });

  const [captcha, setCaptcha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    setCaptcha(Math.floor(1000 + Math.random() * 9000).toString());
  };

  const validatePassword = (password) => {
    const schema = z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Za-z]/, "Password must contain letters.")
      .regex(/\d/, "Password must contain numbers.");

    try {
      schema.parse(password);
      return true;
    } catch (e) {
      setErrorMessage(e.errors[0].message);
      return false;
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const { name, email, password, userCaptcha, role } = formData;

    if (!name || !email || !password || !userCaptcha || !role) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (!validatePassword(password)) return;

    if (userCaptcha !== captcha) {
      setErrorMessage("CAPTCHA mismatch. Try again.");
      generateCaptcha();
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const result = await res.text();

      if (res.ok) {
        alert("Signup successful!");
        generateCaptcha();
        navigate(
  role === "investor"
    ? "/profiles/InvestorProfile"
    : "/profiles/EntrepreneurProfile"
);

      } else {
        setErrorMessage("Signup failed: " + result);
        generateCaptcha();
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage("Server error. Please try again.");
    }
  };

  return (
    <div className="signup-page">
      <h1>Sign up to Connect with Peers</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <label>Name</label>
        <input name="name" value={formData.name} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Min 8 chars, letters & numbers"
          required
        />

        <label>CAPTCHA: <strong>{captcha}</strong></label>
        <input
          name="userCaptcha"
          value={formData.userCaptcha}
          onChange={handleChange}
          placeholder="Enter CAPTCHA"
          required
        />

        <RoleSelector formData={formData} handleChange={handleChange} />

        <button type="submit">Sign Up</button>
      </form>

      <div className="login-link">
        <p>Already have an account? <Link to="/SignIn">Sign In</Link></p>
      </div>
    </div>
  );
};

const RoleSelector = ({ formData, handleChange }) => (
  <div className="form-group">
    <label htmlFor="role" className="form-label">
      I am a... <span className="required">*</span>
    </label>
    <div className="select-wrapper">
      <select
        id="role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="form-select"
        required
      >
        <option value="entrepreneur">🚀 Entrepreneur</option>
        <option value="investor">💼 Investor</option>
      </select>
    </div>
  </div>
);

export default SignUp;
