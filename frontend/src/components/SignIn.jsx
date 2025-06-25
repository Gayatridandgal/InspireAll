import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./SignIn.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  useEffect(() => {
    const storeGoogleUser = async () => {
      try {
        const { data } = await axios.post("http://localhost:5000/auth/google/callback", {
          name: user.name,
          email: user.email,
          picture: user.picture,
        });

        if (data.role === "investor") {
          navigate("/profiles/investorProfile");
        } else if (data.role === "entrepreneur") {
          navigate("/profiles/entrepreneurProfile");
        } else {
          navigate("/Mainpage");
        }
      } catch (err) {
        console.error("Google sign-in error:", err);
        setErrorMessage("Google sign-in failed. Please try again.");
      }
    };

    if (isAuthenticated && user) {
      storeGoogleUser();
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });
      const { role } = res.data;

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

      <div className="or-divider">OR</div>

      <div className="google-login">
        {!isAuthenticated && !isLoading ? (
          <button onClick={() => loginWithRedirect({ connection: "google-oauth2" })}>
            Sign in with Google
          </button>
        ) : (
          isAuthenticated && (
            <div className="profile-section">
              <p>Welcome, {user.name}</p>
              <img src={user.picture} alt="profile" />
              <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
            </div>
          )
        )}
      </div>

      <div className="signup-redirect">
        <p>
          Don&apos;t have an account?{" "}
          <span className="signup-link" onClick={() => navigate("/SignUp")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
