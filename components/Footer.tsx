import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-slate-300 py-6 mt-auto border-t-4 border-school-secondary">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-2 font-medium">مدرسة رافع بن مالك للتعليم الأساسي (5-9)</p>
        <p className="text-sm opacity-75">جميع الحقوق محفوظة © {new Date().getFullYear()}</p>
        <div className="flex justify-center gap-4 mt-4 text-sm">
           <span className="hover:text-white cursor-pointer transition-colors">سياسة الخصوصية</span>
           <span className="text-slate-600">|</span>
           <span className="hover:text-white cursor-pointer transition-colors">اتصل بنا</span>
        </div>
      </div>
    </footer>
  );
};