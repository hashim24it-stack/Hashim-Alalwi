import React from 'react';
import { Eye, Calendar, Megaphone, GraduationCap, Phone, ArrowLeft } from 'lucide-react';
import { PageView, NavigationProps } from '../types';

export const Home: React.FC<NavigationProps> = ({ onNavigate }) => {
  const menuItems = [
    {
      id: PageView.VISION,
      title: 'رؤية المدرسة',
      icon: <Eye size={40} />,
      color: 'bg-emerald-600',
      desc: 'رسالتنا وأهدافنا التعليمية'
    },
    {
      id: PageView.SCHEDULE,
      title: 'الجدول المدرسي',
      icon: <Calendar size={40} />,
      color: 'bg-blue-600',
      desc: 'جداول الحصص لجميع الصفوف'
    },
    {
      id: PageView.ANNOUNCEMENTS,
      title: 'الإعلانات المدرسية',
      icon: <Megaphone size={40} />,
      color: 'bg-amber-600',
      desc: 'آخر الأخبار والمستجدات'
    },
    {
      id: PageView.RESULTS,
      title: 'استخراج النتائج',
      icon: <GraduationCap size={40} />,
      color: 'bg-purple-600',
      desc: 'بوابة الطالب وولي الأمر'
    },
    {
      id: PageView.CONTACT,
      title: 'تواصل معنا',
      icon: <Phone size={40} />,
      color: 'bg-slate-700',
      desc: 'بيانات الاتصال والموقع'
    },
  ];

  return (
    <div className="flex flex-col items-center animate-fadeIn">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-b from-school-primary to-blue-800 text-white py-16 px-4 text-center rounded-b-[3rem] shadow-xl mb-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://picsum.photos/1200/600')] bg-cover bg-center"></div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">مرحباً بكم في البوابة الرقمية</h1>
          <h2 className="text-xl md:text-2xl text-blue-200 font-light mb-8">لمدرسة رافع بن مالك للتعليم الأساسي</h2>
          <p className="max-w-2xl mx-auto text-blue-100 leading-relaxed">
            نسعى لخلق بيئة تعليمية محفزة للإبداع والتميز، وبناء جيل واعٍ متمسك بقيمه، متطلع لمستقبله.
          </p>
        </div>
      </div>

      {/* Grid Navigation */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`${item.color} group relative overflow-hidden rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center h-64 justify-center border-b-4 border-black/20`}
            >
              <div className="bg-white/20 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
              <p className="text-white/80 text-sm">{item.desc}</p>
              
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                <ArrowLeft size={24} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};