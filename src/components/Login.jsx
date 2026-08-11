import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/auth.js';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  ArrowRight, 
  BookOpenCheck,
} from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('student');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    rememberMe: false,
  });

  const roles = [
    { id: 'student', label: 'Student' },
    { id: 'faculty', label: 'Faculty' },
    { id: 'admin', label: 'Admin' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fetch permanently registered users list or initialize empty
    const registeredUsers = JSON.parse(localStorage.getItem('users') || '[]');

    if (isSignUp) {
      // --- REGISTRATION LOGIC ---
      const userExists = registeredUsers.some(
        (u) => u.email.toLowerCase() === formData.email.toLowerCase()
      );

      if (userExists) {
        alert('An account with this institutional email already exists! Please Sign In.');
        return;
      }

      // Create new user record
      const newUser = {
        id: Date.now(),
        fullName: formData.fullName,
        email: formData.email.toLowerCase(),
        password: formData.password, // Saved permanently in browser local storage
        role: selectedRole,
      };

      // Store back to localStorage array
      registeredUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(registeredUsers));

      // Alert & switch view to Sign In
      alert('Your registration is successful! Please go to login.');
      setIsSignUp(false);

    } else {
      // --- LOGIN LOGIC ---
      const foundUser = registeredUsers.find(
        (u) =>
          u.email.toLowerCase() === formData.email.toLowerCase() &&
          u.password === formData.password
      );

      if (!foundUser) {
        alert('Invalid institutional email or password! If you are new, please Register first.');
        return;
      }

      // Set active login flags
      localStorage.setItem('isLogin', JSON.stringify(true));
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      localStorage.setItem('userRole', selectedRole);

      alert(`Login successful! Welcome back, ${foundUser.fullName || 'User'}.`);

      // Navigate to home route
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background Glow Accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10">
        
        {/* Left Side Banner (Hidden on Mobile) */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-indigo-900/50 via-slate-900 to-slate-950 p-10 flex-col justify-between border-r border-slate-800 relative">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-600/30">
                <BookOpenCheck className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-tight leading-none block">
                  StudentMS
                </span>
                <span className="text-[10px] text-indigo-400 font-medium tracking-wider uppercase">
                  Portal
                </span>
              </div>
            </div>

            <div className="pt-8">
              <h2 className="text-2xl font-bold text-white leading-tight">
                Streamline Campus Life & Learning
              </h2>
              <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                Access your grades, course materials, attendance logs, and campus notices in one secure platform.
              </p>
            </div>
          </div>

          {/* Feature Badges */}
          <div className="space-y-3 pt-6 border-t border-slate-800">
            {[
              'Real-time Grade Tracking',
              'Integrated Attendance Records',
              'Faculty & Department Portal'
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} StudentMS Portal. All rights reserved.
          </p>
        </div>

        {/* Right Side Auth Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          
          {/* Header Mobile Brand */}
          <div className="flex lg:hidden items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-indigo-600 rounded-lg text-white">
                <BookOpenCheck className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">StudentMS</span>
            </div>
          </div>

          {/* Form Switcher */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {isSignUp ? 'Create an Account' : 'Welcome back'}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {isSignUp 
                ? 'Fill in your details to register for campus access.' 
                : 'Enter your credentials to access your dashboard.'}
            </p>

            {/* Toggle Switch */}
            <div className="grid grid-cols-2 bg-slate-950 p-1 rounded-xl border border-slate-800 mt-5">
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                  !isSignUp ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                  isSignUp ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Register
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Role Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Select Your Role
              </label>
              <div className="grid grid-cols-3 gap-2">
                {roles.map((role) => {
                  const isSelected = selectedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-semibold transition-all ${
                        isSelected 
                          ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400' 
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span>{role.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Full Name Input (Sign Up Only) */}
            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Alex Morgan"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Institutional Email</label>
              <div className="relative">
                <Mail className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="alex.morgan@university.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">Password</label>
                {!isSignUp && (
                  <a href="#forgot" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">
                    Forgot Password?
                  </a>
                )}
              </div>
              <div className="relative">
                <Lock className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 pl-10 pr-10 py-2.5 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            {!isSignUp && (
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  className="h-4 w-4 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="remember" className="ml-2 text-xs text-slate-400">
                  Remember this device for 30 days
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2"
            >
              <span>{isSignUp ? 'Complete Registration' : 'Sign In to Portal'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>

          </form>

          {/* Alternative Footer Switcher */}
          <p className="text-center text-xs text-slate-400 mt-6">
            {isSignUp ? 'Already have an account?' : "Don't have access yet?"}{' '}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              {isSignUp ? 'Sign In' : 'Register Here'}
            </button>
          </p>

        </div>

      </div>
    </div>
  );
};

export default Login;