import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Added Router Navigation
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Building, 
  IdCard, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  BookOpenCheck,
} from 'lucide-react';

const Register = () => {
  const navigate = useNavigate(); // 2. Initialize navigate hook
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('student');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    roleId: '',
    department: '',
    agreeTerms: false,
  });

  const roles = [
    { id: 'student', label: 'Student', icon: GraduationCap, idPlaceholder: 'Student ID (e.g., STU-2026-09)' },
    { id: 'faculty', label: 'Faculty', icon: BookOpenCheck, idPlaceholder: 'Faculty ID (e.g., FAC-1042)' },
    { id: 'admin', label: 'Admin', icon: ShieldCheck, idPlaceholder: 'Admin Security Key' },
  ];

  const getPasswordStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const passwordStrength = getPasswordStrength(formData.password);

  // 3. Updated Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Fetch existing registered users from localStorage or initialize an empty array
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if user already exists with this email
    const userExists = existingUsers.some((u) => u.email.toLowerCase() === formData.email.toLowerCase());
    if (userExists) {
      alert('An account with this email already exists! Please log in.');
      return;
    }

    // Create new user object
    const newUser = {
      id: Date.now(),
      fullName: formData.fullName,
      email: formData.email.toLowerCase(),
      password: formData.password, // Saved permanently in browser local storage
      role: selectedRole,
      roleId: formData.roleId,
      department: formData.department,
    };

    // Save updated list back to localStorage
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    // Success alert & redirect
    alert('Your registration is successful! Please go to Login.');
    navigate('/auth', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background Glow Accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10">
        
        {/* Left Side Branding Banner */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-indigo-900/50 via-slate-900 to-slate-950 p-10 flex-col justify-between border-r border-slate-800 relative">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-600/30">
                <GraduationCap className="h-7 w-7" />
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
                Join the Campus Digital Portal
              </h2>
              <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                Create your verified account to access institutional resources, grade registers, and course materials.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-800">
            {[
              'Instant Academic Verification',
              'Role-based Dashboard Permissions',
              'Encrypted Data Privacy'
            ].map((perk, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{perk}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} StudentMS Portal. All rights reserved.
          </p>
        </div>

        {/* Right Side Registration Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white tracking-tight">Create Account</h1>
            <p className="text-xs text-slate-400 mt-1">
              Select your role and complete your details to apply for portal access.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Account Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {roles.map((role) => {
                  const Icon = role.icon;
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
                      <Icon className={`h-5 w-5 mb-1 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                      <span>{role.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Name & ID Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {selectedRole === 'student' ? 'Student ID' : selectedRole === 'faculty' ? 'Faculty ID' : 'Admin Key'}
                </label>
                <div className="relative">
                  <IdCard className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder={roles.find(r => r.id === selectedRole)?.idPlaceholder}
                    value={formData.roleId}
                    onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Email & Department Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Institutional Email</label>
                <div className="relative">
                  <Mail className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="alex@university.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Department</label>
                <div className="relative">
                  <Building className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors font-medium"
                  >
                    <option value="">Select Department</option>
                    <option value="cs">Computer Science</option>
                    <option value="math">Mathematics</option>
                    <option value="eng">Engineering</option>
                    <option value="hum">Humanities</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Password Input & Strength Gauge */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Create a strong password"
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

              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-300 ${passwordStrength >= 1 ? 'w-1/4 bg-rose-500' : 'w-0'}`} />
                    <div className={`h-full transition-all duration-300 ${passwordStrength >= 2 ? 'w-1/4 bg-amber-500' : 'w-0'}`} />
                    <div className={`h-full transition-all duration-300 ${passwordStrength >= 3 ? 'w-1/4 bg-blue-500' : 'w-0'}`} />
                    <div className={`h-full transition-all duration-300 ${passwordStrength >= 4 ? 'w-1/4 bg-emerald-500' : 'w-0'}`} />
                  </div>
                </div>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start pt-1">
              <input
                id="terms"
                type="checkbox"
                required
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                className="h-4 w-4 mt-0.5 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="terms" className="ml-2 text-xs text-slate-400 leading-normal">
                I agree to the <a href="#terms" className="text-indigo-400 hover:underline">Terms of Service</a>.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 mt-2"
            >
              <span>Complete Registration</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-6">
            Already registered?{' '}
            <button
              type="button"
              onClick={() => navigate('/auth')}
              className="text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;