// src/routes/AppRouter.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Mainlayout from '../layout/Mainlayout';
import Dashboard from '../pages/Dashboard';
import Courses from '../pages/Course';
import Home from '../pages/Home';
import Attendance from '../pages/Attendence';
import Login from '../components/Login';
import Register from '../components/Register';
import Authlayout from '../layout/Authlayout.jsx';

const AppRouter = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* PROTECTED ROUTES */}
      <Route element={<Authlayout />}>
        <Route path="/" element={<Mainlayout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="courses" element={<Courses />} />
          <Route path="attendance" element={<Attendance />} />
        </Route>
      </Route>

      {/* FALLBACK: Catch-all unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;