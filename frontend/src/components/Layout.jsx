// src/components/Layout.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import Header from "./Header";
import Headertwo from "./Headertwo";

const Layout = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // or a spinner

  return (
    <>
      {user ? <Headertwo /> : <Header />}
      <main>{children}</main>
    </>
  );
};


export default Layout;
