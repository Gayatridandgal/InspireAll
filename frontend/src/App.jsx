// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import CoreFeatures from "./components/CoreFeatures";
import StatsSection from "./components/StatsSection";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import BusinessInfo from "./components/BusinessInfo";
import PostSection from "./components/PostSection";
import SchemeSearchForm from "./components/SchemeSearchForm";
import EntrepreneurProfile from "./components/profiles/EntrepreneurProfile";
import InvestorProfile from "./components/profiles/InvestorProfile";
import Resources from "./pages/Resources";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <HowItWorks />
              <CoreFeatures />
              <StatsSection />
            </>
          }
        />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/BusinessInfo" element={<BusinessInfo />} />
        <Route path="/PostSection" element={<PostSection />} />
        <Route path="/SchemeSearchForm" element={<SchemeSearchForm />} />
        <Route path="/profiles/EntrepreneurProfile" element={<EntrepreneurProfile />} />
        <Route path="/profiles/InvestorProfile" element={<InvestorProfile />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
    </Layout>
  );
};

export default App;
