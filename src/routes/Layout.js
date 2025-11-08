import React from "react";
import { useAuth } from "../contexts/AuthContext";

// Layout component for authenticated users (dashboard pages)
export const DashboardLayout = ({ children }) => {
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Dashboard content without main navigation */}
      {children}
    </div>
  );
};

// Layout component for public pages (includes navigation)
export const PublicLayout = ({ children }) => {
  return <div>{children}</div>;
};
