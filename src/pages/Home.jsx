import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  UserPlus, 
  PlusCircle, 
  FileText, 
  ArrowUpRight, 
  Clock, 
  MoreVertical 
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch logged-in user details from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser') || localStorage.getItem('user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch {
        setCurrentUser({ fullName: storedUser });
      }
    }
  }, []);

  const stats = [
    { title: 'Total Students', value: '2,845', change: '+12%', icon: Users, color: 'from-blue-600 to-indigo-600' },
    { title: 'Active Courses', value: '48', change: '+3', icon: BookOpen, color: 'from-indigo-600 to-purple-600' },
    { title: 'Faculty Members', value: '124', change: '0%', icon: GraduationCap, color: 'from-purple-600 to-pink-600' },
    { title: 'Upcoming Events', value: '12', change: 'This week', icon: Calendar, color: 'from-emerald-600 to-teal-600' },
  ];

  const recentActivities = [
    { id: 1, user: 'Sarah Jenkins', action: 'enrolled in', target: 'Advanced Data Structures', time: '10 mins ago', avatar: 'SJ' },
    { id: 2, user: 'Prof. Miller', action: 'updated grades for', target: 'Physics 101', time: '1 hour ago', avatar: 'PM' },
    { id: 3, user: 'David Kim', action: 'submitted assignment for', target: 'Web Development', time: '3 hours ago', avatar: 'DK' },
    { id: 4, user: 'Admin System', action: 'added new course', target: 'AI & Machine Learning', time: '5 hours ago', avatar: 'AS' },
  ];

  const popularCourses = [
    { code: 'CS-301', name: 'Data Structures & Algorithms', students: 142, progress: 78, instructor: 'Dr. Alan Turing' },
    { code: 'ENG-102', name: 'Modern Technical Writing', students: 98, progress: 62, instructor: 'Prof. Jane Austen' },
    { code: 'MATH-201', name: 'Linear Algebra & Calculus', students: 115, progress: 85, instructor: 'Dr. Isaac Newton' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Hero / Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Welcome back,{' '}
              <span className="text-indigo-400 capitalize">
                {currentUser?.fullName || currentUser?.username || 'User'}
              </span>{' '}
              👋
            </h1>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Here is what is happening across your campus portal today.
            </p>
          </div>
          
          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-colors shadow-lg shadow-indigo-600/20">
              <UserPlus className="h-4 w-4" /> Add Student
            </button>
            <button 
              onClick={() => navigate('/courses', { state: { openTab: 'store' } })}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl font-medium text-sm transition-colors"
            >
              <PlusCircle className="h-4 w-4 text-indigo-400" /> New Course
            </button>
          </div>
        </div>

        {/* Analytics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-slate-900 rounded-2xl border border-slate-800 p-5 hover:border-slate-700 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.title}</p>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">{stat.value}</h3>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-md`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs text-emerald-400 font-medium">
                  <TrendingUp className="h-3.5 w-3.5 mr-1" />
                  <span>{stat.change}</span>
                  <span className="text-slate-500 ml-1.5 font-normal">vs last month</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Content Section: Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Popular Courses (2 Cols Wide) */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">Top Active Courses</h2>
                <p className="text-xs text-slate-400">Current enrollment and course progression status</p>
              </div>
              <button 
                onClick={() => navigate('/courses', { state: { openTab: 'store' } })}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
              >
                View All <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              {popularCourses.map((course, idx) => (
                <div key={idx} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 hover:bg-slate-800 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {course.code}
                      </span>
                      <h4 className="font-medium text-slate-100 text-sm">{course.name}</h4>
                    </div>
                    <span className="text-xs text-slate-400">{course.students} Students</span>
                  </div>

                  <div className="mt-3">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-slate-400">Instructor: <strong className="text-slate-300">{course.instructor}</strong></span>
                      <span className="text-indigo-400 font-semibold">{course.progress}% Completed</span>
                    </div>
                    <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-indigo-500 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${course.progress}%` }} 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Recent Activity Log (1 Col Wide) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">Recent Activity</h2>
              <button className="text-slate-400 hover:text-white">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {recentActivities.map((act) => (
                <div key={act.id} className="flex gap-3 text-sm">
                  <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-indigo-400 shrink-0">
                    {act.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-300 text-xs leading-relaxed">
                      <strong className="text-white font-medium">{act.user}</strong> {act.action}{' '}
                      <span className="text-indigo-300">{act.target}</span>
                    </p>
                    <span className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                      <Clock className="h-3 w-3" /> {act.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Link Card */}
            <div className="mt-6 pt-4 border-t border-slate-800">
              <button className="w-full py-2.5 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-xl text-xs font-semibold text-slate-300 transition-colors flex items-center justify-center gap-2">
                <FileText className="h-4 w-4 text-indigo-400" /> Generate System Report
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Home;