import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  Home, 
  MessageCircle, 
  Settings, 
  FileText,
  Sun,
  Moon,
  GraduationCap,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from './components/ui/button';
import { useAuth } from './contexts/AuthContext';

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Resources", 
    url: "/resources",
    icon: BookOpen,
  },
  {
    title: "AI Assistant",
    url: "/chatbot",
    icon: MessageCircle,
  },
  {
    title: "Syllabus",
    url: "/syllabus", 
    icon: FileText,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export default function Layout({ children }) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen flex transition-all duration-300 ${
      isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900'
    }`}>
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-64 glass-effect border-r border-white/20">
        <div className="border-b border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg gradient-text">SmartExam</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Preparation Assistant</p>
            </div>
          </div>
          {user && (
            <div className="mt-4 px-3 py-2 glass-effect rounded-lg">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Welcome, {user.full_name?.split(' ')[0] || 'Student'}! 👋
              </p>
            </div>
          )}
        </div>

        <nav className="flex-1 p-3 overflow-y-auto">
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                to={item.url}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                  location.pathname === item.url 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                    : 'text-gray-700 dark:text-gray-300 hover:glass-effect'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.title}</span>
              </Link>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <Button
              variant="ghost"
              onClick={toggleTheme}
              className="w-full justify-start gap-3 glass-effect hover:bg-white/20"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-purple-600" />
              )}
              <span className="font-medium">
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </span>
            </Button>
          </div>
        </nav>

        <div className="border-t border-white/10 p-4">
          {user && (
            <Button
              variant="ghost"
              onClick={logout}
              className="w-full justify-start gap-3 glass-effect hover:bg-red-500/20 text-red-600 dark:text-red-400"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </Button>
          )}
          <div className="glass-effect rounded-xl p-4 text-center mt-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Study smart, not hard! 🚀
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h2 className="font-bold text-lg gradient-text">SmartExam</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 glass-effect border-b border-white/10 p-4">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl ${
                    location.pathname === item.url 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.title}</span>
                </Link>
              ))}
              <Button
                variant="ghost"
                onClick={toggleTheme}
                className="w-full justify-start gap-3"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </Button>
              <Button
                variant="ghost"
                onClick={logout}
                className="w-full justify-start gap-3 text-red-600"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </Button>
            </nav>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto lg:mt-0 mt-16">
        {children}
      </main>
    </div>
  );
}