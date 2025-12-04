import React, { useState } from 'react';
import { Lock, LogIn } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { PageView, NavigationProps } from '../types';

export const Login: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useSchool();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      onNavigate(PageView.HOME);
    } else {
      setError('كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[60vh] animate-slideUp">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-school-primary to-school-secondary"></div>
        
        <div className="text-center mb-8">
          <div className="bg-school-light w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-school-primary shadow-inner">
            <Lock size={36} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">بوابة المشرفين</h2>
          <p className="text-gray-500 mt-2 text-sm">أدخل كلمة المرور لتعديل محتوى الموقع</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-school-primary focus:ring-4 focus:ring-blue-50 outline-none transition-all text-center text-lg tracking-widest"
              placeholder="••••••••"
              autoFocus
            />
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg text-center animate-bounce">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-school-primary hover:bg-blue-800 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            <LogIn size={20} />
            تسجيل الدخول
          </button>
        </form>

        <div className="mt-8 text-center">
            <button 
                onClick={() => onNavigate(PageView.HOME)}
                className="text-gray-400 hover:text-gray-600 text-sm underline"
            >
                العودة للرئيسية
            </button>
        </div>
      </div>
    </div>
  );
};