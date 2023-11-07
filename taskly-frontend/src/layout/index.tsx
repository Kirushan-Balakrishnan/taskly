import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../providers/AuthProvider";
import Header from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";

export const LayoutOnboarding = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
      return;
    }
  }, [token, navigate]);

  if (!token) {
    return <Outlet />;
  }

  return <React.Fragment />;
};

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  // if (token) {
  return (
    <div className="container">
      <div
        className="row"
        style={{
          position: "sticky",
          zIndex: 1,
          top: 0,
          backgroundColor: "white",
        }}
      >
        <div className="col">
          <Header />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div style={{ minHeight: "75vh" }}>
            <Outlet />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <Footer />
        </div>
      </div>
    </div>
  );
  // }
  return <React.Fragment />;
};
