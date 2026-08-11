import  { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  Save, 
  UserCheck, 
  Download
} from 'lucide-react';

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState('2026-07-20');
  const [selectedCourse, setSelectedCourse] = useState('CS-301');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Initial student attendance data
  const [students, setStudents] = useState([
    { id: 'STU-1092', name: 'Sophia Chen', rollNo: 'CS2024-01', status: 'Present', notes: '' },
    { id: 'STU-1093', name: 'Marcus Vance', rollNo: 'CS2024-02', status: 'Present', notes: '' },
    { id: 'STU-1094', name: 'Elena Rostova', rollNo: 'CS2024-03', status: 'Late', notes: 'Arrived 15m late' },
    { id: 'STU-1095', name: 'Liam O’Connor', rollNo: 'CS2024-04', status: 'Absent', notes: 'Sick leave requested' },
    { id: 'STU-1096', name: 'Aria Montgomery', rollNo: 'CS2024-05', status: 'Present', notes: '' },
    { id: 'STU-1097', name: 'Jackson Reed', rollNo: 'CS2024-06', status: 'Excused', notes: 'Sports event' },
    { id: 'STU-1098', name: 'Zoe Miller', rollNo: 'CS2024-07', status: 'Present', notes: '' },
  ]);

  // Handle individual status toggle
  const handleStatusChange = (id, newStatus) => {
    setStudents(prev =>
      prev.map(student => (student.id === id ? { ...student, status: newStatus } : student))
    );
  };

  // Bulk action: Mark all filtered students with a specific status
  const markAllAs = (status) => {
    setStudents(prev => prev.map(student => ({ ...student, status })));
  };

  // Compute metrics
  const totalStudents = students.length;
  const presentCount = students.filter(s => s.status === 'Present').length;
  const absentCount = students.filter(s => s.status === 'Absent').length;
  const lateCount = students.filter(s => s.status === 'Late').length;
  const attendanceRate = Math.round(((presentCount + lateCount) / totalStudents) * 100);

  // Filter students based on search and status pills
  const filteredStudents = students.filter(student => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Attendance Register <UserCheck className="h-6 w-6 text-indigo-400" />
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Track daily class presence, mark absences, and generate roll call logs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors">
            <Download className="h-4 w-4" /> Export Report
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all">
            <Save className="h-4 w-4" /> Save Attendance
          </button>
        </div>
      </div>

      {/* Class & Date Controls Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          
          {/* Course Selector */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Select Course</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500 font-medium"
            >
              <option value="CS-301">CS-301: Data Structures & Algorithms</option>
              <option value="ENG-102">ENG-102: Modern Technical Writing</option>
              <option value="MATH-201">MATH-201: Linear Algebra & Calculus</option>
              <option value="CS-405">CS-405: Artificial Intelligence</option>
            </select>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Session Date</label>
            <div className="relative">
              <CalendarIcon className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-xs text-white rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Quick Bulk Actions */}
        <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
          <span className="text-xs text-slate-400 font-medium mr-1">Mark All:</span>
          <button
            onClick={() => markAllAs('Present')}
            className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 rounded-lg text-xs font-semibold transition-colors"
          >
            Present
          </button>
          <button
            onClick={() => markAllAs('Absent')}
            className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 rounded-lg text-xs font-semibold transition-colors"
          >
            Absent
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex justify-between items-center text-slate-400 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Attendance Rate</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <h3 className="text-2xl font-extrabold text-white">{attendanceRate}%</h3>
          <p className="text-[11px] text-emerald-400 mt-1 font-medium">{presentCount + lateCount} / {totalStudents} attending</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex justify-between items-center text-slate-400 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Present</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <h3 className="text-2xl font-extrabold text-white">{presentCount}</h3>
          <p className="text-[11px] text-slate-500 mt-1">Students on time</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex justify-between items-center text-slate-400 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Late</span>
            <Clock className="h-4 w-4 text-amber-400" />
          </div>
          <h3 className="text-2xl font-extrabold text-white">{lateCount}</h3>
          <p className="text-[11px] text-slate-500 mt-1">Delayed arrival</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex justify-between items-center text-slate-400 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Absent</span>
            <XCircle className="h-4 w-4 text-rose-400" />
          </div>
          <h3 className="text-2xl font-extrabold text-white">{absentCount}</h3>
          <p className="text-[11px] text-slate-500 mt-1">Unexcused / Excused</p>
        </div>
      </div>

      {/* Student Attendance List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        
        {/* Table Filters & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {['All', 'Present', 'Absent', 'Late', 'Excused'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  statusFilter === status
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="relative min-w-[200px]">
            <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by student name or roll no..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-xs text-slate-200 placeholder-slate-400 pl-8 pr-3 py-2 rounded-xl focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="pb-3 px-3">Roll No</th>
                <th className="pb-3 px-3">Student Name</th>
                <th className="pb-3 px-3 text-center">Status</th>
                <th className="pb-3 px-3">Remarks / Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-3 font-mono text-slate-400">{student.rollNo}</td>
                  <td className="py-3.5 px-3">
                    <div className="font-semibold text-white">{student.name}</div>
                    <div className="text-[11px] text-slate-500">{student.id}</div>
                  </td>
                  
                  {/* Status Button Toggles */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center justify-center gap-1">
                      {[
                        { label: 'Present', activeColor: 'bg-emerald-600 text-white', hover: 'hover:border-emerald-500' },
                        { label: 'Late', activeColor: 'bg-amber-600 text-white', hover: 'hover:border-amber-500' },
                        { label: 'Absent', activeColor: 'bg-rose-600 text-white', hover: 'hover:border-rose-500' },
                        { label: 'Excused', activeColor: 'bg-indigo-600 text-white', hover: 'hover:border-indigo-500' },
                      ].map((st) => (
                        <button
                          key={st.label}
                          onClick={() => handleStatusChange(student.id, st.label)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-transparent transition-all ${
                            student.status === st.label 
                              ? st.activeColor 
                              : `bg-slate-800 text-slate-400 ${st.hover}`
                          }`}
                        >
                          {st.label}
                        </button>
                      ))}
                    </div>
                  </td>

                  {/* Notes / Remarks */}
                  <td className="py-3.5 px-3">
                    <input
                      type="text"
                      placeholder="Add note..."
                      value={student.notes}
                      onChange={(e) => {
                        const val = e.target.value;
                        setStudents(prev =>
                          prev.map(s => s.id === student.id ? { ...s, notes: val } : s)
                        );
                      }}
                      className="w-full bg-slate-800/50 border border-slate-700/60 text-xs text-slate-300 placeholder-slate-500 px-2.5 py-1 rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <span>Showing {filteredStudents.length} of {totalStudents} students</span>
          <span className="text-slate-500">Unsaved changes will auto-sync on submit</span>
        </div>

      </div>

    </div>
  );
};

export default Attendance;