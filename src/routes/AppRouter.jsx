// src/routes/AppRouter.jsx
import { Routes, Route } from 'react-router';
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
    <div>
      <Routes>
        {/* PUBLIC ROUTES (No login required) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED ROUTES (Wrapped inside Authlayout) */}
        <Route element={<Authlayout />}>
          <Route path="/" element={<Mainlayout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="courses" element={<Courses />} />
            <Route path="attendance" element={<Attendance />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default AppRouter;