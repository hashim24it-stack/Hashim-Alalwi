import React, { useState } from 'react';
import { Calendar, Clock, ChevronLeft } from 'lucide-react';

export const Schedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState(5);

  const classes = [5, 6, 7, 8, 9];
  const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];
  
  // Mock Data generator
  const getSchedule = (grade: number, dayIndex: number) => {
    const subjects = [
      ['رياضيات', 'لغة عربية', 'علوم', 'لغة إنجليزية', 'تربية إسلامية', 'دراسات', 'مهارات'],
      ['علوم', 'رياضيات', 'لغة إنجليزية', 'لغة عربية', 'مهارات', 'تربية إسلامية', 'رياضة'],
      ['لغة عربية', 'دراسات', 'رياضيات', 'علوم', 'لغة إنجليزية', 'فنون', 'تربية إسلامية'],
      ['لغة إنجليزية', 'تربية إسلامية', 'علوم', 'رياضيات', 'لغة عربية', 'تقنية معلومات', 'دراسات'],
      ['رياضيات', 'علوم', 'لغة عربية', 'لغة إنجليزية', 'دراسات', 'تربية إسلامية', 'نشاط'],
    ];
    // Simple rotation for demo
    const daySubjects = subjects[(grade + dayIndex) % 5];
    return daySubjects;
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-slideUp">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden min-h-[600px] flex flex-col">
        <div className="bg-blue-600 p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Calendar size={32} />
                <h2 className="text-2xl font-bold">الجدول المدرسي</h2>
            </div>
            <div className="hidden md:flex items-center gap-2 text-blue-100 text-sm">
                <Clock size={16} />
                <span>الفصل الدراسي الأول - 2024/2025</span>
            </div>
        </div>

        {/* Grade Tabs */}
        <div className="flex overflow-x-auto bg-blue-50 border-b border-blue-100">
          {classes.map((cls) => (
            <button
              key={cls}
              onClick={() => setActiveTab(cls)}
              className={`flex-1 py-4 px-6 text-center whitespace-nowrap font-bold transition-colors duration-200 border-b-4 ${
                activeTab === cls 
                  ? 'border-blue-600 text-blue-800 bg-white' 
                  : 'border-transparent text-gray-500 hover:text-blue-600 hover:bg-blue-100/50'
              }`}
            >
              الصف {cls}
            </button>
          ))}
        </div>

        {/* Schedule Grid */}
        <div className="p-4 md:p-6 overflow-x-auto flex-1">
          <div className="min-w-[800px]">
            <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="p-4 text-right w-32 font-medium">اليوم / الحصة</th>
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <th key={num} className="p-4 text-center font-medium bg-slate-700/50">
                      <div className="flex flex-col">
                        <span>الحصة {num}</span>
                        <span className="text-xs opacity-60 font-light mt-1">40 دقيقة</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day, dayIdx) => (
                  <tr key={day} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-700 bg-slate-50 border-l border-slate-200">
                      {day}
                    </td>
                    {getSchedule(activeTab, dayIdx).map((subject, subIdx) => (
                      <td key={subIdx} className="p-3 text-center">
                        <span className={`inline-block px-3 py-1.5 rounded-lg text-sm font-medium w-full
                          ${subject === 'رياضيات' ? 'bg-red-100 text-red-700' : ''}
                          ${subject === 'علوم' ? 'bg-green-100 text-green-700' : ''}
                          ${subject === 'لغة عربية' ? 'bg-amber-100 text-amber-700' : ''}
                          ${subject === 'لغة إنجليزية' ? 'bg-blue-100 text-blue-700' : ''}
                          ${subject === 'تربية إسلامية' ? 'bg-purple-100 text-purple-700' : ''}
                          ${!['رياضيات', 'علوم', 'لغة عربية', 'لغة إنجليزية', 'تربية إسلامية'].includes(subject) ? 'bg-slate-100 text-slate-600' : ''}
                        `}>
                          {subject}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="p-4 bg-yellow-50 text-yellow-800 text-sm border-t border-yellow-100 flex items-start gap-2">
            <span className="font-bold">ملاحظة:</span>
            <p>يتم تحديث الجدول بشكل دوري. في حال وجود تغييرات طارئة سيتم إشعار الطلاب عبر الإذاعة المدرسية أو المشرفين.</p>
        </div>
      </div>
    </div>
  );
};