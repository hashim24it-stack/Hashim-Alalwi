import React, { useState } from 'react';
import { Calendar, Clock, Edit3, LayoutGrid, List } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

export const Schedule: React.FC = () => {
  const { scheduleData, isAdmin, updateScheduleCell } = useSchool();
  const [activeTab, setActiveTab] = useState(5);
  const [viewMode, setViewMode] = useState<'weekly' | 'daily'>('weekly');
  
  // Default to today if it's a school day (Sun=0...Thu=4), otherwise Sun
  const [selectedDay, setSelectedDay] = useState(() => {
    const day = new Date().getDay();
    return (day >= 0 && day <= 4) ? day : 0;
  });

  const classes = [5, 6, 7, 8, 9];
  const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];
  
  // Helpers
  const getSubjectColor = (subject: string) => {
    if (!subject) return 'bg-slate-50 text-slate-400 border-slate-200';
    if (subject.includes('رياضيات')) return 'bg-red-100 text-red-700 border-red-200';
    if (subject.includes('علوم')) return 'bg-green-100 text-green-700 border-green-200';
    if (subject.includes('عربية')) return 'bg-amber-100 text-amber-700 border-amber-200';
    if (subject.includes('إنجليزية')) return 'bg-blue-100 text-blue-700 border-blue-200';
    if (subject.includes('إسلامية')) return 'bg-purple-100 text-purple-700 border-purple-200';
    return 'bg-indigo-50 text-indigo-600 border-indigo-200';
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-slideUp">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden min-h-[600px] flex flex-col border border-slate-100">
        
        {/* Header */}
        <div className="bg-blue-600 p-4 md:p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 self-start md:self-auto">
                <Calendar size={32} />
                <div>
                    <h2 className="text-2xl font-bold">الجدول المدرسي</h2>
                    <div className="flex items-center gap-2 text-blue-100 text-xs md:text-sm mt-1">
                        <Clock size={14} />
                        <span>الفصل الدراسي الأول - 2024/2025</span>
                    </div>
                </div>
            </div>

            {/* View Toggle */}
            <div className="bg-blue-700 p-1 rounded-xl flex self-end md:self-auto">
                <button 
                  onClick={() => setViewMode('weekly')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${viewMode === 'weekly' ? 'bg-white text-blue-700 shadow-sm' : 'text-blue-200 hover:bg-blue-600'}`}
                >
                  <LayoutGrid size={18} />
                  <span className="hidden sm:inline">أسبوعي</span>
                </button>
                <button 
                  onClick={() => setViewMode('daily')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${viewMode === 'daily' ? 'bg-white text-blue-700 shadow-sm' : 'text-blue-200 hover:bg-blue-600'}`}
                >
                  <List size={18} />
                  <span className="hidden sm:inline">يومي</span>
                </button>
            </div>
        </div>

        {/* Grade Tabs */}
        <div className="flex overflow-x-auto bg-slate-50 border-b border-slate-200 scrollbar-hide">
          {classes.map((cls) => (
            <button
              key={cls}
              onClick={() => setActiveTab(cls)}
              className={`flex-1 min-w-[100px] py-4 px-6 text-center whitespace-nowrap font-bold transition-all duration-200 border-b-4 ${
                activeTab === cls 
                  ? 'border-blue-600 text-blue-800 bg-white' 
                  : 'border-transparent text-gray-500 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              الصف {cls}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-4 md:p-6 flex-1 bg-white">
            
            {/* View: WEEKLY */}
            {viewMode === 'weekly' && (
                <div className="overflow-x-auto animate-fadeIn">
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
                            {days.map((dayName, dayIdx) => {
                                const dailySubjects = scheduleData[activeTab]?.[dayIdx] || Array(7).fill('');
                                return (
                                    <tr key={dayIdx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="p-4 font-bold text-slate-700 bg-slate-50 border-l border-slate-200">
                                        {dayName}
                                        </td>
                                        {dailySubjects.map((subject, periodIdx) => (
                                        <td key={periodIdx} className="p-2 text-center relative group">
                                            {isAdmin ? (
                                                <input 
                                                    type="text" 
                                                    value={subject}
                                                    onChange={(e) => updateScheduleCell(activeTab, dayIdx, periodIdx, e.target.value)}
                                                    className={`w-full text-center p-2 rounded-lg text-sm font-bold outline-none border-2 focus:ring-2 focus:ring-blue-300 transition-all
                                                        ${subject ? getSubjectColor(subject) : 'bg-gray-50 border-gray-200 text-gray-400 focus:bg-white'}
                                                    `}
                                                    placeholder="-"
                                                />
                                            ) : (
                                                <span className={`inline-block px-3 py-2 rounded-lg text-sm font-bold w-full border ${getSubjectColor(subject)}`}>
                                                    {subject || '-'}
                                                </span>
                                            )}
                                            {isAdmin && !subject && (
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none text-gray-300">
                                                    <Edit3 size={16} />
                                                </div>
                                            )}
                                        </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* View: DAILY */}
            {viewMode === 'daily' && (
                <div className="max-w-3xl mx-auto animate-fadeIn">
                    {/* Day Selector */}
                    <div className="flex flex-wrap gap-2 justify-center mb-8">
                        {days.map((day, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedDay(idx)}
                                className={`px-5 py-2.5 rounded-full font-bold transition-all shadow-sm
                                    ${selectedDay === idx 
                                        ? 'bg-blue-600 text-white shadow-blue-200 scale-105 ring-2 ring-blue-200 ring-offset-2' 
                                        : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-blue-600'
                                    }`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>

                    {/* Periods List */}
                    <div className="space-y-4">
                        {Array.from({length: 7}).map((_, periodIdx) => {
                            const subject = scheduleData[activeTab]?.[selectedDay]?.[periodIdx] || '';
                            const colorClass = getSubjectColor(subject);
                            
                            return (
                                <div key={periodIdx} className="flex items-stretch gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                                    <div className="w-16 flex flex-col items-center justify-center bg-slate-50 rounded-xl border border-slate-100 text-slate-400 font-bold shrink-0">
                                        <span className="text-xs font-normal text-slate-400 mb-1">الحصة</span>
                                        <span className="text-xl text-slate-700">{periodIdx + 1}</span>
                                    </div>
                                    
                                    <div className="flex-1 flex flex-col justify-center py-2">
                                        {isAdmin ? (
                                            <input 
                                                type="text"
                                                value={subject}
                                                onChange={(e) => updateScheduleCell(activeTab, selectedDay, periodIdx, e.target.value)}
                                                className="text-lg font-bold text-gray-800 outline-none border-b-2 border-transparent focus:border-blue-500 bg-transparent w-full placeholder:text-gray-300"
                                                placeholder="أدخل اسم المادة..."
                                            />
                                        ) : (
                                            <h3 className={`text-xl font-bold ${subject ? 'text-gray-800' : 'text-gray-300 italic'}`}>
                                                {subject || 'لا توجد حصة'}
                                            </h3>
                                        )}
                                        <span className="text-xs text-slate-400 mt-1">40 دقيقة</span>
                                    </div>

                                    <div className={`w-2 rounded-r-full ${subject ? colorClass.replace('bg-', 'bg-').split(' ')[0].replace('100', '500') : 'bg-slate-200'}`}></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            
            {/* Footer Note */}
            <div className="mt-8 p-4 bg-amber-50 text-amber-800 text-sm rounded-xl border border-amber-100 flex items-start gap-2">
                <span className="font-bold shrink-0">ملاحظة:</span>
                <p>يتم تحديث الجدول بشكل دوري. في حال وجود تغييرات طارئة سيتم إشعار الطلاب عبر الإذاعة المدرسية أو المشرفين.</p>
            </div>
        </div>
      </div>
    </div>
  );
};