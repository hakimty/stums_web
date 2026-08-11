import { 
    GraduationCap, 
    BookOpen, 
    Users, 
    Calendar, 
    Mail, 
    Phone, 
    MapPin,  
    
  
    
  } from 'lucide-react';
  
  const Footer = () => {
    return (
      <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-600 rounded-lg text-white">
                </div>
                <span className="text-xl font-bold text-white tracking-tight">StudentMS</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Streamlining campus administration, student records, and academic workflows in one unified portal.
              </p>
              <div className="flex space-x-4 pt-2">
                <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  {/* <Github className="h-5 w-5" /> */}
                </a>
                <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  {/* <Twitter className="h-5 w-5" /> */}
                </a>
                <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  {/* <Linkedin className="h-5 w-5" /> */}
                </a>
              </div>
            </div>
  
            {/* Quick Navigation */}
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a href="#dashboard" className="hover:text-indigo-400 transition-colors flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-slate-500" /> Dashboard
                  </a>
                </li>
                <li>
                  <a href="#students" className="hover:text-indigo-400 transition-colors flex items-center gap-2">
                    <Users className="h-4 w-4 text-slate-500" /> Student Directory
                  </a>
                </li>
                <li>
                  <a href="#schedule" className="hover:text-indigo-400 transition-colors flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-slate-500" /> Course Schedules
                  </a>
                </li>
                <li>
                  <a href="#grades" className="hover:text-indigo-400 transition-colors">Grades & Attendance</a>
                </li>
              </ul>
            </div>
  
            {/* Portal Modules */}
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                Resources
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#help" className="hover:text-indigo-400 transition-colors">Help Center & FAQ</a></li>
                <li><a href="#docs" className="hover:text-indigo-400 transition-colors">API Documentation</a></li>
                <li><a href="#privacy" className="hover:text-indigo-400 transition-colors">Data Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
  
            {/* Contact Details */}
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                Support
              </h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-indigo-400 shrink-0" />
                  <span>123 University Campus Dr, Academic Block A</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-indigo-400 shrink-0" />
                  <span>+1 (800) 555-0199</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-indigo-400 shrink-0" />
                  <span>support@studentms.edu</span>
                </li>
              </ul>
            </div>
  
          </div>
  
          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} StudentMS. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#privacy" className="hover:text-slate-400">Privacy</a>
              <a href="#terms" className="hover:text-slate-400">Terms</a>
              <a href="#cookies" className="hover:text-slate-400">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;