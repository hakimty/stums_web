// src/utils/auth.js

// Persistent Login
export const loginUser = (userData) => {
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };
  
  export const logoutUser = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('user');
  };
  
  export const getCurrentUser = () => {
    const stored = localStorage.getItem('currentUser') || localStorage.getItem('user');
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch {
      return { fullName: stored, role: 'student' };
    }
  };
  
  // Check if logged-in user is a Teacher or Faculty member
  export const isTeacherOrFaculty = () => {
    const user = getCurrentUser();
    if (!user) return false;
    
    const role = (user.role || user.userType || '').toLowerCase();
    return role === 'teacher' || role === 'faculty' || role === 'instructor' || user.isTeacher === true;
  };