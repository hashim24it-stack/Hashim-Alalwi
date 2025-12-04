import React from 'react';
import { Home, LogOut, ShieldCheck } from 'lucide-react';
import { PageView, NavigationProps } from '../types';
import { useSchool } from '../context/SchoolContext';

export const Header: React.FC<NavigationProps> = ({ onNavigate, activePage }) => {
  const { isAdmin, logout } = useSchool();

  const handleLogout = () => {
    logout();
    onNavigate(PageView.HOME);
  };

  return (
    <header className="bg-school-primary text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => onNavigate(PageView.HOME)}
        >
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-school-primary font-bold text-xl border-2 border-school-accent group-hover:scale-110 transition-transform duration-300 relative">
            ر
            {isAdmin && <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white"></div>}
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold flex items-center gap-2">
                مدرسة رافع بن مالك
                {isAdmin && <span className="text-[10px] bg-green-500/20 border border-green-500/50 text-green-300 px-2 py-0.5 rounded-full hidden sm:inline-block">مشرف</span>}
            </h1>
            <p className="text-xs text-school-accent">للتعليم الأساسي (5-9)</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
            {isAdmin && (
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500 text-red-100 px-3 py-2 rounded-lg transition-all duration-300 text-sm border border-red-500/30"
                    title="تسجيل الخروج"
                >
                    <LogOut size={16} />
                    <span className="hidden md:inline">خروج</span>
                </button>
            )}

            {activePage !== PageView.HOME && (
            <button 
                onClick={() => onNavigate(PageView.HOME)}
                className="flex items-center gap-2 bg-school-secondary hover:bg-school-accent text-white px-4 py-2 rounded-full transition-all duration-300 shadow-md text-sm md:text-base"
            >
                <Home size={18} />
                <span className="hidden md:inline">الرئيسية</span>
            </button>
            )}
        </div>
      </div>
    </header>
  );
};