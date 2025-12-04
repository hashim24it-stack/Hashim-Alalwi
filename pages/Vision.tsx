import React from 'react';
import { Target, Award, BookOpen } from 'lucide-react';

export const Vision: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-slideUp">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-emerald-600 py-10 px-6 text-center text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <Target size={64} className="mx-auto mb-4 text-emerald-100" />
          <h2 className="text-3xl font-bold mb-2">رؤية ورسالة المدرسة</h2>
          <p className="text-emerald-100">نحو جيل مبدع، واعٍ، ومنتج</p>
        </div>

        <div className="p-8 space-y-12">
          {/* Vision Section */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600 shrink-0">
              <EyeIcon />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-emerald-500 inline-block pb-1">الرؤية</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                الريادة في تقديم تعليم متميز وعالي الجودة لبناء مجتمع معرفي وقيمي، وتخريج أجيال قادرة على مواكبة التطور العالمي مع الحفاظ على الهوية الوطنية والإسلامية.
              </p>
            </div>
          </div>

          {/* Mission Section */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-blue-100 p-4 rounded-2xl text-blue-600 shrink-0">
              <BookOpen size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-blue-500 inline-block pb-1">الرسالة</h3>
              <ul className="space-y-3 text-gray-600 text-lg">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  توفير بيئة تعليمية آمنة ومحفزة للإبداع.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  تنمية مهارات التفكير النقدي وحل المشكلات لدى الطلاب.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  تفعيل الشراكة المجتمعية بين المدرسة والأسرة والمجتمع.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  توظيف التقانة الحديثة في العملية التعليمية بفاعلية.
                </li>
              </ul>
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
             <div className="flex items-center gap-3 mb-6 justify-center">
                <Award className="text-amber-500" size={32} />
                <h3 className="text-2xl font-bold text-gray-800 text-center">قيمنا الجوهرية</h3>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {['الأمانة', 'المسؤولية', 'الاحترام', 'الإتقان', 'التعاون', 'المواطنة', 'الابتكار', 'التميز'].map((val, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 font-medium text-gray-700 hover:text-school-primary hover:border-school-primary transition-colors cursor-default">
                        {val}
                    </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
);