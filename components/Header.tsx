import React from 'react';
import { Home, Menu } from 'lucide-react';
import { PageView, NavigationProps } from '../types';

export const Header: React.FC<NavigationProps> = ({ onNavigate, activePage }) => {
  return (
    <header className="bg-school-primary text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => onNavigate(PageView.HOME)}
        >
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-school-primary font-bold text-xl border-2 border-school-accent group-hover:scale-110 transition-transform duration-300">
            ر
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold">مدرسة رافع بن مالك</h1>
            <p className="text-xs text-school-accent">للتعليم الأساسي (5-9)</p>
          </div>
        </div>

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
    </header>
  );
};