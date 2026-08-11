import { useNavigate, Link } from 'react-router-dom';
import { LogOut, User, BookOpenCheck } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();

  // Retrieve current active user profile from localStorage safely
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  // Handle Logout Logic
  const handleLogout = () => {
    // 1. Remove active session markers
    localStorage.removeItem('isLogin');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');

    // 2. Alert user
    alert('You have logged out successfully.');

    // 3. Redirect back to login/auth page
    navigate('/auth', { replace: true });
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* Brand Logo & Main Nav Links */}
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center space-x-2.5">
          <div className="p-2 bg-indigo-600 rounded-lg text-white">
            <BookOpenCheck className="h-5 w-5" />
          </div>
          <div>
            <span className="text-base font-bold text-white tracking-tight leading-none block">
              StudentMS
            </span>
            <span className="text-[9px] text-indigo-400 font-medium tracking-wider uppercase">
              Portal
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
          <Link to="/" className="hover:text-indigo-400 transition-colors">
            Home
          </Link>
          <Link to="/dashboard" className="hover:text-indigo-400 transition-colors">
            Dashboard
          </Link>
          <Link to="/courses" className="hover:text-indigo-400 transition-colors">
            Courses
          </Link>
          <Link to="/attendance" className="hover:text-indigo-400 transition-colors">
            Attendance
          </Link>
        </div>
      </div>

      {/* User Info Badge & Logout Action */}
      <div className="flex items-center gap-4">
        {currentUser.fullName && (
          <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
            <User className="h-3.5 w-3.5 text-indigo-400" />
            <span className="font-medium">{currentUser.fullName}</span>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 border border-rose-500/30 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all shadow-sm"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;