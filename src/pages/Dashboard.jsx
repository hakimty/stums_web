import React, { useState, useEffect } from 'react';
import {
  Users,
  GraduationCap,
  Search,
  Filter,
  Plus,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreHorizontal,
  ChevronRight,
  BarChart3,
  FileText,
  Download,
  X,
  Eye,
  Check,
  Trash2,
  TrendingUp,
  Activity,
  FileSpreadsheet
} from 'lucide-react';

// --- ROLE AUTH HELPER ---
const getCurrentUserRole = () => {
  const storedUser = localStorage.getItem('currentUser') || localStorage.getItem('user');
  if (!storedUser) return 'student';
  try {
    const user = JSON.parse(storedUser);
    const role = (user.role || user.userType || '').toLowerCase();
    if (role === 'teacher' || role === 'faculty' || role === 'instructor' || user.isTeacher) {
      return 'teacher';
    }
  } catch {
    // Plain string stored
  }
  return 'student';
};

// --- SUB-VIEW 1: OVERVIEW ---
const OverviewView = ({
  stats,
  students,
  deadlines,
  searchQuery,
  setSearchQuery,
  onApproveStudent,
  onDeleteStudent,
  onViewStudent,
  onAddDeadlineClick,
  onDeleteDeadline
}) => {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAllRows, setShowAllRows] = useState(false);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' ? true : student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const displayedStudents = showAllRows ? filteredStudents : filteredStudents.slice(0, 4);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700 transition-all hover:-translate-y-0.5 cursor-pointer shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{stat.title}</span>
                <div className={`p-2.5 rounded-xl border ${stat.bg} ${stat.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-white tracking-tight">{stat.value}</span>
                <span className={`text-xs font-semibold flex items-center gap-0.5 ${stat.trend === 'up' ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Table View) */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">Recent Student Registrations</h2>
                <p className="text-xs text-slate-400">Latest students added to the portal</p>
              </div>

              {/* Live Search & Filter Controls */}
              <div className="flex items-center gap-2 relative">
                <div className="relative">
                  <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search ID, name, major..."
                    className="bg-slate-800 border border-slate-700 text-xs text-slate-200 placeholder-slate-400 pl-8 pr-8 py-1.5 rounded-lg focus:outline-none focus:border-indigo-500 w-48 sm:w-56"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>

                {/* Filter Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    className={`p-1.5 rounded-lg transition-colors ${showFilterDropdown || statusFilter !== 'All' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}
                  >
                    <Filter className="h-4 w-4" />
                  </button>

                  {showFilterDropdown && (
                    <div className="absolute right-0 top-10 z-30 w-40 bg-slate-800 border border-slate-700 rounded-xl shadow-xl p-2 text-xs space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1 block">Filter Status</span>
                      {['All', 'Active', 'Pending Approval'].map((st) => (
                        <button
                          key={st}
                          onClick={() => { setStatusFilter(st); setShowFilterDropdown(false); }}
                          className={`w-full text-left px-2 py-1 rounded flex items-center justify-between ${statusFilter === st ? 'bg-indigo-600 text-white font-medium' : 'text-slate-300 hover:bg-slate-700'}`}
                        >
                          {st}
                          {statusFilter === st && <Check className="h-3 w-3" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Table View */}
            <div className="overflow-x-auto min-h-[200px]">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="pb-3 px-2">ID</th>
                    <th className="pb-3 px-2">Student</th>
                    <th className="pb-3 px-2">Major</th>
                    <th className="pb-3 px-2">GPA</th>
                    <th className="pb-3 px-2">Status</th>
                    <th className="pb-3 px-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {displayedStudents.length > 0 ? (
                    displayedStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-2 font-mono text-slate-400">{student.id}</td>
                        <td className="py-3 px-2 font-medium text-white">{student.name}</td>
                        <td className="py-3 px-2 text-slate-300">{student.major}</td>
                        <td className="py-3 px-2 text-indigo-400 font-bold">{student.gpa}</td>
                        <td className="py-3 px-2">
                          <button
                            onClick={() => onApproveStudent(student.id)}
                            className={`px-2 py-0.5 rounded-full border text-[11px] font-medium transition-all ${student.statusColor} ${student.status === 'Pending Approval' ? 'hover:scale-105 cursor-pointer shadow-sm' : 'cursor-default'}`}
                          >
                            {student.status}
                          </button>
                        </td>
                        <td className="py-3 px-2 text-right relative">
                          <button
                            onClick={() => setOpenDropdownId(openDropdownId === student.id ? null : student.id)}
                            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>

                          {openDropdownId === student.id && (
                            <div className="absolute right-2 top-8 z-30 w-36 bg-slate-800 border border-slate-700 rounded-xl shadow-xl py-1 text-left text-xs">
                              <button
                                onClick={() => { onViewStudent(student); setOpenDropdownId(null); }}
                                className="w-full px-3 py-1.5 text-slate-300 hover:bg-slate-700 hover:text-white flex items-center gap-2"
                              >
                                <Eye className="h-3.5 w-3.5" /> View Details
                              </button>
                              {student.status === 'Pending Approval' && (
                                <button
                                  onClick={() => { onApproveStudent(student.id); setOpenDropdownId(null); }}
                                  className="w-full px-3 py-1.5 text-emerald-400 hover:bg-slate-700 flex items-center gap-2"
                                >
                                  <Check className="h-3.5 w-3.5" /> Approve
                                </button>
                              )}
                              <button
                                onClick={() => { onDeleteStudent(student.id); setOpenDropdownId(null); }}
                                className="w-full px-3 py-1.5 text-rose-400 hover:bg-slate-700 flex items-center gap-2"
                              >
                                <Trash2 className="h-3.5 w-3.5" /> Remove
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-slate-500">No records found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-400">Showing {displayedStudents.length} of {filteredStudents.length} entries</span>
              <button
                onClick={() => setShowAllRows(!showAllRows)}
                className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
              >
                {showAllRows ? 'Show Less' : 'View Full Student Directory'}
                <ChevronRight className={`h-3.5 w-3.5 transition-transform ${showAllRows ? 'rotate-90' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (Deadlines & Schedule) */}
        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-white">Academic Deadlines</h2>
              <span className="text-xs text-indigo-400 font-semibold cursor-pointer hover:underline">Manage ({deadlines.length})</span>
            </div>

            <div className="space-y-3">
              {deadlines.map((item, idx) => (
                <div key={idx} className="p-3.5 bg-slate-800/40 border border-slate-800 rounded-xl hover:bg-slate-800/80 transition-colors group relative">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="text-xs font-semibold text-slate-200">{item.title}</h4>
                    <div className="flex items-center gap-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${item.priority === 'High' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-slate-700 text-slate-300'}`}>
                        {item.priority}
                      </span>
                      <button onClick={() => onDeleteDeadline(idx)} className="text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">{item.department}</p>
                  <div className="flex items-center gap-1 text-[11px] text-indigo-400 font-medium mt-2">
                    <Calendar className="h-3 w-3" />
                    <span>{item.date}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={onAddDeadlineClick}
              className="w-full mt-5 py-2 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-medium text-xs rounded-xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
            >
              <Plus className="h-3.5 w-3.5" /> Add New Deadline
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- SUB-VIEW 2: ANALYTICS ---
const AnalyticsView = () => {
  const [timeframe, setTimeframe] = useState('Yearly');

  const chartDatasets = {
    Weekly: {
      title: 'Weekly Attendance & Class Activity',
      growth: '+2.1% vs Last Week',
      rate: '96.2%',
      bars: [
        { label: 'Mon', val1: 88, val2: 70 },
        { label: 'Tue', val1: 92, val2: 82 },
        { label: 'Wed', val1: 96, val2: 89 },
        { label: 'Thu', val1: 91, val2: 85 },
        { label: 'Fri', val1: 84, val2: 78 },
        { label: 'Sat', val1: 60, val2: 40 },
        { label: 'Sun', val1: 30, val2: 20 },
      ]
    },
    Monthly: {
      title: 'Monthly Enrollment & Course Completion',
      growth: '+4.2% vs Last Month',
      rate: '94.8%',
      bars: [
        { label: 'Jan', val1: 65, val2: 45 },
        { label: 'Feb', val1: 75, val2: 55 },
        { label: 'Mar', val1: 85, val2: 70 },
        { label: 'Apr', val1: 70, val2: 60 },
        { label: 'May', val1: 90, val2: 80 },
        { label: 'Jun', val1: 95, val2: 88 },
        { label: 'Jul', val1: 88, val2: 82 },
      ]
    },
    Yearly: {
      title: 'Historical Campus Growth (2020 - 2026)',
      growth: '+48.5% Total Growth',
      rate: '3,240 Enrolled',
      bars: [
        { label: '2020', val1: 42, val2: 30 },
        { label: '2021', val1: 52, val2: 40 },
        { label: '2022', val1: 64, val2: 50 },
        { label: '2023', val1: 75, val2: 62 },
        { label: '2024', val1: 84, val2: 72 },
        { label: '2025', val1: 92, val2: 85 },
        { label: '2026', val1: 98, val2: 92 },
      ]
    }
  };

  const currentData = chartDatasets[timeframe];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Bar with Dynamic Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-4 border border-slate-800 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 rounded-xl">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Live System Analytics</h2>
            <p className="text-xs text-slate-400">Interactive performance trends and historical comparative analysis</p>
          </div>
        </div>

        {/* Dynamic Timeframe Selector */}
        <div className="flex gap-1 bg-slate-800 p-1.5 rounded-xl text-xs font-semibold">
          {['Weekly', 'Monthly', 'Yearly'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1.5 rounded-lg transition-all ${timeframe === tf ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-400 hover:text-white'}`}
            >
              {tf === 'Yearly' ? 'Yearly (2020-2026)' : tf}
            </button>
          ))}
        </div>
      </div>

      {/* Main Dynamic Chart Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between sm:mb-6">
          <div>
            <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">{currentData.title}</span>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-2xl font-extrabold text-white">{currentData.rate}</span>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> {currentData.growth}
              </span>
            </div>
          </div>
          <div className="flex gap-4 text-xs font-medium mt-4 sm:mt-0">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-indigo-500 rounded-md" />
              <span className="text-slate-300">Attendance / Capacity</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-emerald-400 rounded-md" />
              <span className="text-slate-300">Passing Rate</span>
            </div>
          </div>
        </div>

        {/* Dynamic Bar Graph Grid */}
        <div className="h-56 flex items-end justify-between gap-3 pt-8 pb-2 px-2 border-b border-slate-800">
          {currentData.bars.map((bar, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <div className="w-full flex items-end justify-center gap-1.5 h-full">
                {/* Bar 1 */}
                <div
                  style={{ height: `${bar.val1}%` }}
                  className="w-1/2 bg-indigo-500 rounded-t-md group-hover:bg-indigo-400 transition-all relative group"
                >
                  <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-slate-800 text-white px-2 py-0.5 rounded border border-slate-700 z-10 shadow-lg">
                    {bar.val1}%
                  </span>
                </div>
                {/* Bar 2 */}
                <div
                  style={{ height: `${bar.val2}%` }}
                  className="w-1/2 bg-emerald-400 rounded-t-md group-hover:bg-emerald-300 transition-all relative group"
                >
                  <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-slate-800 text-white px-2 py-0.5 rounded border border-slate-700 z-10 shadow-lg">
                    {bar.val2}%
                  </span>
                </div>
              </div>
              <span className="text-[11px] text-slate-400 font-mono font-medium">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">6-Year Student Retention</p>
            <h3 className="text-2xl font-bold text-white mt-1">96.8%</h3>
            <span className="text-[10px] text-emerald-400">+12% increase since 2020</span>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 flex items-center justify-center font-bold text-xs text-indigo-400">
            96%
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Avg Cumulative GPA</p>
            <h3 className="text-2xl font-bold text-white mt-1">3.58</h3>
            <span className="text-[10px] text-emerald-400">Steady academic rise</span>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 flex items-center justify-center font-bold text-xs text-emerald-400">
            3.58
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Placement Benchmark</p>
            <h3 className="text-2xl font-bold text-white mt-1">92.4%</h3>
            <span className="text-[10px] text-amber-400">Top-tier tech hirings</span>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-amber-500/20 border-t-amber-400 flex items-center justify-center font-bold text-xs text-amber-400">
            92%
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SUB-VIEW 3: REPORTS WITH TEACHER RESTRICTION CHECK ---
const ReportsView = ({ onGenerateReport }) => {
  const [reportsList] = useState([
    { id: 1, name: 'Semester Academic Performance Audit', type: 'PDF', date: 'Jul 20, 2026', size: '2.4 MB' },
    { id: 2, name: 'Faculty Workload & Attendance Metrics', type: 'CSV', date: 'Jul 18, 2026', size: '1.1 MB' },
    { id: 3, name: 'New Admission Demographic Breakdown', type: 'PDF', date: 'Jul 15, 2026', size: '4.8 MB' },
  ]);

  const handleDownload = (name) => {
    const role = getCurrentUserRole();
    if (role !== 'teacher') {
      alert('🔒 Access Denied: Only teachers and faculty members are authorized to download academic reports.');
      return;
    }
    alert(`Downloading "${name}" to your device...`);
  };

  const handleGenerateClick = () => {
    const role = getCurrentUserRole();
    if (role !== 'teacher') {
      alert('🔒 Access Denied: Report generation is restricted to Teachers and Faculty members.');
      return;
    }
    onGenerateReport();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div>
          <h2 className="text-lg font-bold text-white">Generated Academic Reports</h2>
          <p className="text-xs text-slate-400 mt-0.5">Download or compile custom operational audits in PDF/CSV format.</p>
        </div>
        <button
          onClick={handleGenerateClick}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-indigo-600/30 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Generate New Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reportsList.map((report) => (
          <div key={report.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4">
            <div className="flex justify-between items-start">
              <div className="p-2.5 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 rounded-xl">
                {report.type === 'PDF' ? <FileText className="h-5 w-5" /> : <FileSpreadsheet className="h-5 w-5" />}
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {report.type}
              </span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white leading-snug">{report.name}</h4>
              <p className="text-xs text-slate-400 mt-1">Generated on {report.date} • {report.size}</p>
            </div>

            <button
              onClick={() => handleDownload(report.name)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Download className="h-3.5 w-3.5" /> Download Report
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- MAIN DASHBOARD ---
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAlert, setShowAlert] = useState(true);
  const [userRole, setUserRole] = useState('student');

  // Modals
  const [isDeadlineModalOpen, setIsDeadlineModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Form State
  const [newDeadline, setNewDeadline] = useState({ title: '', department: '', date: '', priority: 'Medium' });

  // Data
  const [deadlines, setDeadlines] = useState([
    { title: 'Midterm Grade Submission', department: 'Computer Science', date: 'Tomorrow, 5:00 PM', priority: 'High' },
    { title: 'Spring Registration Opens', department: 'Academic Affairs', date: 'Jul 24, 2026', priority: 'Medium' },
    { title: 'Faculty Evaluation Deadline', department: 'Human Resources', date: 'Jul 28, 2026', priority: 'Low' },
  ]);

  const [students, setStudents] = useState([
    { id: 'STU-1092', name: 'Sophia Chen', major: 'Data Science', gpa: '3.92', status: 'Active', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    { id: 'STU-1093', name: 'Marcus Vance', major: 'Cyber Security', gpa: '3.65', status: 'Active', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    { id: 'STU-1094', name: 'Elena Rostova', major: 'Software Eng.', gpa: '3.88', status: 'Pending Approval', statusColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    { id: 'STU-1095', name: 'Liam O\'Connor', major: 'Artificial Intel.', gpa: '3.41', status: 'Active', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  ]);

  useEffect(() => {
    setUserRole(getCurrentUserRole());
  }, []);

  const stats = [
    { title: 'Total Enrolled', value: '3,240', change: '+8.4%', trend: 'up', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    { title: 'Avg. Attendance', value: '94.2%', change: '+1.2%', trend: 'up', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { title: 'Course Completion', value: '88.6%', change: '+4.5%', trend: 'up', icon: GraduationCap, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
    { title: 'Pending Applications', value: '42', change: '-5', trend: 'down', icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  ];

  const handleApproveStudent = (id) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: 'Active', statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' } : s));
  };

  const handleDeleteStudent = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const handleDeleteDeadline = (index) => {
    setDeadlines(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddDeadlineSubmit = (e) => {
    e.preventDefault();
    if (!newDeadline.title) return;
    setDeadlines([...deadlines, newDeadline]);
    setNewDeadline({ title: '', department: '', date: '', priority: 'Medium' });
    setIsDeadlineModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8">
      
      {/* Top Header & Tab Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-white">System Dashboard</h1>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${userRole === 'teacher' ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
              {userRole === 'teacher' ? 'Faculty Mode' : 'Student Mode'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Real-time overview of academic performance, admissions, and campus operations.</p>
        </div>

        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          {['overview', 'analytics', 'reports'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-400 hover:text-slate-200'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Notice Banner */}
      {showAlert && (
        <div className="bg-gradient-to-r from-indigo-900/40 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600/20 border border-indigo-500/30 rounded-lg text-indigo-400">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Scheduled System Maintenance</h4>
              <p className="text-xs text-slate-300 mt-0.5">Database index optimization on Saturday at 02:00 UTC. Expect minor latency.</p>
            </div>
          </div>
          <button onClick={() => setShowAlert(false)} className="p-1 text-slate-400 hover:text-white rounded-lg">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Dynamic Tab Views */}
      {activeTab === 'overview' && (
        <OverviewView
          stats={stats}
          students={students}
          deadlines={deadlines}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onApproveStudent={handleApproveStudent}
          onDeleteStudent={handleDeleteStudent}
          onViewStudent={(student) => setSelectedStudent(student)}
          onAddDeadlineClick={() => setIsDeadlineModalOpen(true)}
          onDeleteDeadline={handleDeleteDeadline}
        />
      )}

      {activeTab === 'analytics' && <AnalyticsView />}

      {activeTab === 'reports' && <ReportsView onGenerateReport={() => setIsReportModalOpen(true)} />}

      {/* MODAL 1: Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl relative">
            <button onClick={() => setSelectedStudent(null)} className="absolute right-4 top-4 text-slate-400 hover:text-white">
              <X className="h-4 w-4" />
            </button>
            <h3 className="text-base font-bold text-white mb-4">Student Profile Overview</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800"><span className="text-slate-400">Student ID:</span><span className="font-mono text-white">{selectedStudent.id}</span></div>
              <div className="flex justify-between py-1 border-b border-slate-800"><span className="text-slate-400">Full Name:</span><span className="text-white font-medium">{selectedStudent.name}</span></div>
              <div className="flex justify-between py-1 border-b border-slate-800"><span className="text-slate-400">Major:</span><span className="text-slate-200">{selectedStudent.major}</span></div>
              <div className="flex justify-between py-1 border-b border-slate-800"><span className="text-slate-400">GPA Score:</span><span className="text-indigo-400 font-bold">{selectedStudent.gpa}</span></div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Account Status:</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${selectedStudent.statusColor}`}>{selectedStudent.status}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Add Deadline Modal */}
      {isDeadlineModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setIsDeadlineModalOpen(false)} className="absolute right-4 top-4 text-slate-400 hover:text-white">
              <X className="h-4 w-4" />
            </button>
            <h3 className="text-base font-bold text-white mb-4">Add Academic Deadline</h3>
            <form onSubmit={handleAddDeadlineSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={newDeadline.title}
                  onChange={(e) => setNewDeadline({ ...newDeadline, title: e.target.value })}
                  placeholder="e.g. Final Project Submission"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Department</label>
                <input
                  type="text"
                  required
                  value={newDeadline.department}
                  onChange={(e) => setNewDeadline({ ...newDeadline, department: e.target.value })}
                  placeholder="e.g. Computer Science"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Due Date</label>
                <input
                  type="text"
                  required
                  value={newDeadline.date}
                  onChange={(e) => setNewDeadline({ ...newDeadline, date: e.target.value })}
                  placeholder="e.g. Aug 10, 2026"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Priority</label>
                <select
                  value={newDeadline.priority}
                  onChange={(e) => setNewDeadline({ ...newDeadline, priority: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <button type="submit" className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl">
                Save Deadline
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;