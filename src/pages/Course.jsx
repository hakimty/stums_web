import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CourseCheckoutModal from '../components/Checkout';
import { 
  BookOpen, Search, GraduationCap, Clock, CreditCard, 
  CheckCircle2, Sparkles, ShoppingBag, ArrowRight
} from 'lucide-react';

// Helper: Detect if logged-in user is a Teacher / Faculty
const isTeacher = () => {
  const storedUser = localStorage.getItem('currentUser') || localStorage.getItem('user');
  if (!storedUser) return false;
  try {
    const user = JSON.parse(storedUser);
    const role = (user.role || user.userType || '').toLowerCase();
    return role === 'teacher' || role === 'faculty' || role === 'instructor' || user.isTeacher === true;
  } catch {
    return false;
  }
};

const Courses = () => {
  const location = useLocation();
  const teacherMode = isTeacher();

  // Active Tab defaults to location state ('store' if came from Home button, else 'enrolled')
  const [activeTab, setActiveTab] = useState(location.state?.openTab || 'enrolled'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCourseForCheckout, setSelectedCourseForCheckout] = useState(null);

  // Sync tab if navigation state changes
  useEffect(() => {
    if (location.state?.openTab) {
      setActiveTab(location.state.openTab);
    }
  }, [location.state]);

  // 1. Fetch current logged-in user dynamically
  const getCurrentUser = () => {
    const storedUser = localStorage.getItem('user') || localStorage.getItem('username') || localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        const name = (parsed.username || parsed.email || parsed.fullName || parsed).toLowerCase().trim();
        return name;
      } catch {
        return storedUser.toLowerCase().trim();
      }
    }
    return 'shivamdubey931584@gmail.com';
  };

  const currentUser = getCurrentUser();

  // 2. Load enrollments stored per user
  const [userEnrollments, setUserEnrollments] = useState(() => {
    const saved = localStorage.getItem('user_enrollments');
    const parsed = saved ? JSON.parse(saved) : {};

    const primaryShivamEmail = 'shivamdubey931584@gmail.com';

    // Permanently ensure shivamdubey931584@gmail.com owns CS-301 (DDA)
    if (!parsed[primaryShivamEmail]) {
      parsed[primaryShivamEmail] = ['CS-301'];
    } else if (!parsed[primaryShivamEmail].includes('CS-301')) {
      parsed[primaryShivamEmail].push('CS-301');
    }

    // Secondary fallback for alias 'shivam'
    if (!parsed['shivam']) {
      parsed['shivam'] = ['CS-301'];
    }

    return parsed;
  });

  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem('user_enrollments', JSON.stringify(userEnrollments));
  }, [userEnrollments]);

  // Check if current user owns a course (or if user is a teacher)
  const checkIsEnrolled = (courseId) => {
    if (teacherMode) return true; // Teachers get all courses unlocked automatically

    const enrolledList = userEnrollments[currentUser] || [];
    if (currentUser.includes('shivam') && userEnrollments['shivamdubey931584@gmail.com']?.includes(courseId)) {
      return true;
    }
    return enrolledList.includes(courseId);
  };

  // Called after payment is verified
  const handlePaymentSuccess = (course) => {
    setUserEnrollments((prev) => {
      const userList = prev[currentUser] || [];
      if (!userList.includes(course.id)) {
        return {
          ...prev,
          [currentUser]: [...userList, course.id]
        };
      }
      return prev;
    });
  };

  const categories = ['All', 'Computer Science', 'Data Science', 'Mathematics', 'Engineering', 'Design', 'Humanities'];

  // Master List of 12 Distinct Courses
  const masterCoursesList = [
    {
      id: 'CS-301',
      title: 'Data Structures & Algorithms (DDA)',
      category: 'Computer Science',
      instructor: 'Dr. Alan Turing',
      price: 10,
      duration: '14 Weeks',
      schedule: 'Mon / Wed • 10:00 AM'
    },
    {
      id: 'CS-405',
      title: 'Artificial Intelligence & Neural Nets',
      category: 'Computer Science',
      instructor: 'Dr. Geoffrey Hinton',
      price: 10,
      duration: '12 Weeks',
      schedule: 'Wed / Fri • 09:00 AM'
    },
    {
      id: 'CS-101',
      title: 'Full-Stack Web Development (React & Node)',
      category: 'Computer Science',
      instructor: 'Sarah Connor',
      price: 10,
      duration: '10 Weeks',
      schedule: 'Tue / Thu • 04:00 PM'
    },
    {
      id: 'CS-502',
      title: 'Cybersecurity & Ethical Hacking',
      category: 'Computer Science',
      instructor: 'Kevin Mitnick',
      price: 10,
      duration: '12 Weeks',
      schedule: 'Mon / Wed • 06:00 PM'
    },
    {
      id: 'DS-202',
      title: 'Data Science & Big Data Analytics',
      category: 'Data Science',
      instructor: 'Prof. Andrew Ng',
      price: 10,
      duration: '12 Weeks',
      schedule: 'Mon / Fri • 03:00 PM'
    },
    {
      id: 'DS-310',
      title: 'Machine Learning & Predictive Modeling',
      category: 'Data Science',
      instructor: 'Dr. Yann LeCun',
      price: 10,
      duration: '14 Weeks',
      schedule: 'Tue / Sat • 11:00 AM'
    },
    {
      id: 'MATH-201',
      title: 'Linear Algebra & Advanced Calculus',
      category: 'Mathematics',
      instructor: 'Dr. Isaac Newton',
      price: 10,
      duration: '16 Weeks',
      schedule: 'Mon / Fri • 01:00 PM'
    },
    {
      id: 'MATH-305',
      title: 'Discrete Mathematics & Probability',
      category: 'Mathematics',
      instructor: 'Dr. Carl Friedrich Gauss',
      price: 10,
      duration: '10 Weeks',
      schedule: 'Tue / Thu • 10:00 AM'
    },
    {
      id: 'ENG-304',
      title: 'Embedded Systems & IoT Hardware',
      category: 'Engineering',
      instructor: 'Prof. Nikola Tesla',
      price: 10,
      duration: '14 Weeks',
      schedule: 'Tue / Thu • 11:00 AM'
    },
    {
      id: 'ENG-108',
      title: 'Robotics & Control Systems',
      category: 'Engineering',
      instructor: 'Dr. Robert Ford',
      price: 10,
      duration: '12 Weeks',
      schedule: 'Wed / Sat • 02:00 PM'
    },
    {
      id: 'DES-101',
      title: 'UI/UX Design & Figma Systems',
      category: 'Design',
      instructor: 'Dieter Rams',
      price: 10,
      duration: '8 Weeks',
      schedule: 'Fri / Sat • 11:00 AM'
    },
    {
      id: 'HUM-102',
      title: 'Technical Writing & AI Ethics',
      category: 'Humanities',
      instructor: 'Prof. Jane Austen',
      price: 10,
      duration: '10 Weeks',
      schedule: 'Tue / Thu • 02:00 PM'
    }
  ];

  // Filter courses based on active tab, category, and search query
  const displayedCourses = masterCoursesList.filter((course) => {
    const enrolled = checkIsEnrolled(course.id);

    // Tab Filter
    if (activeTab === 'enrolled' && !enrolled) return false;

    // Category Filter
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;

    // Search Filter
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const currentUserEnrolledCount = masterCoursesList.filter(c => checkIsEnrolled(c.id)).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Course Portal <Sparkles className="h-5 w-5 text-indigo-400" />
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Access your purchased courses or enroll in new ones.
          </p>
        </div>

        {/* Profile Badge */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs">
            <span className="text-slate-400">Logged in as: </span>
            <strong className="text-indigo-400 font-bold">{currentUser}</strong>
            {teacherMode && (
              <span className="ml-2 px-2 py-0.5 text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full font-bold">
                Faculty
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tabs & Search Header */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Navigation Tabs */}
        <div className="flex bg-slate-900 p-1 border border-slate-800 rounded-xl shrink-0">
          <button
            onClick={() => setActiveTab('enrolled')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'enrolled'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            My Purchased Courses ({currentUserEnrolledCount})
          </button>

          <button
            onClick={() => setActiveTab('store')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'store'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Browse Catalog (12)
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          {activeTab === 'store' && (
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500 w-full sm:w-auto"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          )}

          <div className="relative w-full sm:w-64">
            <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-400 pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      {displayedCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCourses.map((course) => {
            const enrolled = checkIsEnrolled(course.id);

            return (
              <div 
                key={course.id} 
                className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {course.id}
                    </span>
                    
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      enrolled 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {enrolled ? 'Unlocked' : '₹10 Only'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug">{course.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                    <GraduationCap className="h-3.5 w-3.5 text-slate-500" />
                    <span>{course.instructor}</span>
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-300">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> Duration
                      </span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Course Fee</span>
                      <span className="font-bold text-emerald-400">₹{course.price}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  {enrolled ? (
                    <button
                      onClick={() => alert(`Opening course content for ${course.title}...`)}
                      className="w-full py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="h-4 w-4" /> Access Course
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedCourseForCheckout(course)}
                      className="w-full py-2.5 rounded-xl font-semibold text-xs bg-indigo-600 hover:bg-indigo-500 text-white transition-all flex items-center justify-center gap-2"
                    >
                      <CreditCard className="h-3.5 w-3.5" /> Buy Course for ₹10
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-4 max-w-lg mx-auto mt-8">
          <BookOpen className="h-12 w-12 text-indigo-400 mx-auto" />
          <div>
            <h3 className="text-lg font-bold text-white">No Enrolled Courses Found</h3>
            <p className="text-xs text-slate-400 mt-1">
              Account <strong className="text-indigo-400">{currentUser}</strong> has not purchased any courses yet.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('store')}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-600/20"
          >
            Browse Catalog & Buy Courses <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Checkout Modal */}
      {selectedCourseForCheckout && (
        <CourseCheckoutModal
          course={selectedCourseForCheckout}
          onClose={() => setSelectedCourseForCheckout(null)}
          onSuccess={handlePaymentSuccess}
        />
      )}

    </div>
  );
};

export default Courses;