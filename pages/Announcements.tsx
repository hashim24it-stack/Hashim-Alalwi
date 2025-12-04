import React from 'react';
import { Megaphone, CalendarDays, ArrowLeft } from 'lucide-react';

export const Announcements: React.FC = () => {
  const news = [
    {
      id: 1,
      title: 'موعد بدء اختبارات منتصف الفصل الدراسي الأول',
      date: '2024-10-15',
      category: 'اختبارات',
      content: 'تعلن إدارة المدرسة أن اختبارات منتصف الفصل ستبدأ يوم الأحد الموافق 25 أكتوبر. نرجو من جميع الطلاب الاستعداد الجيد ومراجعة الدروس بانتظام.',
      isNew: true
    },
    {
      id: 2,
      title: 'رحلة مدرسية إلى المتحف الوطني',
      date: '2024-10-10',
      category: 'أنشطة',
      content: 'ينظم قسم الأنشطة الطلابية رحلة تعليمية لطلاب الصف السابع لزيارة المتحف الوطني للتعرف على تاريخ وحضارة الوطن.',
      isNew: true
    },
    {
      id: 3,
      title: 'اجتماع مجلس الآباء والمعلمين',
      date: '2024-09-28',
      category: 'اجتماعات',
      content: 'ندعو أولياء الأمور الكرام لحضور الاجتماع الأول لهذا العام لمناقشة الخطة الدراسية ومستوى التحصيل الدراسي للطلاب.',
      isNew: false
    },
    {
      id: 4,
      title: 'تكريم الطلاب المتفوقين',
      date: '2024-09-15',
      category: 'تكريم',
      content: 'سيتم إقامة حفل لتكريم أوائل الطلبة يوم الخميس القادم في طابور الصباح، تقديراً لجهودهم وتميزهم.',
      isNew: false
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl animate-slideUp">
      <div className="flex items-center justify-between mb-8 bg-white p-6 rounded-2xl shadow-sm border-r-4 border-amber-500">
        <div>
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Megaphone className="text-amber-500" />
            لوحة الإعلانات
            </h2>
            <p className="text-gray-500 mt-2">ابق على اطلاع دائم بكل ما هو جديد في مدرستنا</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.isNew ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-600'}`}>
                  {item.isNew ? 'جديد' : item.category}
                </span>
                <div className="flex items-center text-gray-400 text-sm gap-1">
                  <CalendarDays size={14} />
                  <span>{item.date}</span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3 leading-snug hover:text-school-primary transition-colors cursor-pointer">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {item.content}
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-end">
                <button className="text-school-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                    اقرأ المزيد <ArrowLeft size={16} />
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};