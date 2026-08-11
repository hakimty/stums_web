// src/layout/Authlayout.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth.js';
const Authlayout = () => {
  // 1. Get the logged-in user
  const user = getCurrentUser();

  // 2. If no user is logged in, redirect them to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // OPTIONAL: If this layout is strictly for Teachers/Faculty, you can check that here:
  // if (!isTeacherOrFaculty()) {
  //   return <Navigate to="/unauthorized" replace />;
  // }

  // 3. Render child routes inside this layout
  return (
    <div className="auth-layout">
      {/* Optional Navbar / Header */}
      <header>
        <p>Welcome, {user.fullName || user.name || 'User'}!</p>
      </header>

      {/* Renders the matching child route component */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

// IMPORTANT: Keep the default export so AppRouter.jsx imports it without errors!
export default Authlayout;