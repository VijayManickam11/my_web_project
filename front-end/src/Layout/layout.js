// src/components/Layout.jsx
import React from "react";
import ResponsiveAppBar from "../pages/Header/header";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
    let location = useLocation();
  return (
    <div>
     {!(location.pathname == "/") && < ResponsiveAppBar/>} {/* Header Component */}
      
    </div>
  );
};

export default Layout;
