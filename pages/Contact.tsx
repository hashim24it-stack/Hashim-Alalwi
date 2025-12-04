import React from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-slideUp">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Contact Info & Map */}
        <div className="space-y-6">
          <div className="bg-slate-800 text-white p-8 rounded-3xl shadow-xl">
            <h2 className="text-3xl font-bold mb-6">تواصل معنا</h2>
            <p className="text-slate-300 mb-8 leading-relaxed">
              نسعد بتواصلكم معنا للرد على استفساراتكم ومقترحاتكم. أبواب المدرسة مفتوحة دائماً لخدمة المجتمع.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 text-school-accent">
                  <MapPin />
                </div>
                <div>
                  <h3 className="font-bold text-lg">موقعنا</h3>
                  <p className="text-slate-400 text-sm">سلطنة عمان، محافظة ...، ولاية ...</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 text-school-accent">
                  <Phone />
                </div>
                <div>
                  <h3 className="font-bold text-lg">اتصل بنا</h3>
                  <p className="text-slate-400 text-sm dir-ltr text-right">+968 24XXXXXX</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 text-school-accent">
                  <Mail />
                </div>
                <div>
                  <h3 className="font-bold text-lg">البريد الإلكتروني</h3>
                  <p className="text-slate-400 text-sm">info@rafa-school.edu.om</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-200 h-64 rounded-3xl overflow-hidden shadow-inner border-4 border-white">
             {/* Placeholder for Map */}
             <div className="w-full h-full flex items-center justify-center text-gray-500 bg-[url('https://picsum.photos/800/400?grayscale&blur=2')] bg-cover">
                <span className="bg-white/80 px-4 py-2 rounded-lg font-bold backdrop-blur-md">خريطة الموقع (جوجل ماب)</span>
             </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">أرسل لنا رسالة</h3>
          <form className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">الاسم الكامل</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-school-primary focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="اسم ولي الأمر / الطالب" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">رقم الهاتف</label>
                <input type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-school-primary focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-gray-50 focus:bg-white text-right" placeholder="9XXXXXXX" dir="ltr" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">الموضوع</label>
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-school-primary focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-gray-50 focus:bg-white">
                <option>استفسار عام</option>
                <option>شؤون الطلاب</option>
                <option>الإدارة المدرسية</option>
                <option>شكوى / مقترح</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">الرسالة</label>
              <textarea rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-school-primary focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="اكتب تفاصيل رسالتك هنا..."></textarea>
            </div>

            <button type="button" className="w-full py-4 bg-school-primary hover:bg-blue-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
              <Send size={18} />
              إرسال الرسالة
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};