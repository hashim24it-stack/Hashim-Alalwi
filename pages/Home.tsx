import React, { useState } from 'react';
import { 
  Compass, 
  CalendarRange, 
  Megaphone, 
  GraduationCap, 
  Phone, 
  ArrowLeft, 
  Edit2, 
  Save, 
  X,
  Palette,
  HeartHandshake,
  Library,
  Monitor,
  Users
} from 'lucide-react';
import { PageView, NavigationProps } from '../types';
import { useSchool } from '../context/SchoolContext';

export const Home: React.FC<NavigationProps> = ({ onNavigate }) => {
  const { isAdmin, heroData, updateHeroData, services, updateService } = useSchool();
  const [isEditingHero, setIsEditingHero] = useState(false);
  const [isEditingServices, setIsEditingServices] = useState(false);
  
  // Local state for Hero editing
  const [editTitle, setEditTitle] = useState(heroData.title);
  const [editSubtitle, setEditSubtitle] = useState(heroData.subtitle);
  const [editDesc, setEditDesc] = useState(heroData.description);

  // Static config for service icons and colors (mapped by ID)
  const serviceConfig = [
    {
      id: 1,
      icon: <Palette size={32} />,
      color: 'text-pink-500 bg-pink-100'
    },
    {
      id: 2,
      icon: <HeartHandshake size={32} />,
      color: 'text-indigo-500 bg-indigo-100'
    },
    {
      id: 3,
      icon: <Library size={32} />,
      color: 'text-amber-500 bg-amber-100'
    },
    {
      id: 4,
      icon: <Monitor size={32} />,
      color: 'text-cyan-500 bg-cyan-100'
    }
  ];

  const handleSaveHero = () => {
    updateHeroData({
      title: editTitle,
      subtitle: editSubtitle,
      description: editDesc
    });
    setIsEditingHero(false);
  };

  const handleSaveService = (id: number, title: string, desc: string) => {
    updateService(id, { title, desc });
  };

  const menuItems = [
    {
      id: PageView.VISION,
      title: 'رؤية المدرسة',
      icon: <Compass size={40} />,
      color: 'bg-emerald-600',
      desc: 'رسالتنا وأهدافنا التعليمية'
    },
    {
      id: PageView.SCHEDULE,
      title: 'الجدول المدرسي',
      icon: <CalendarRange size={40} />,
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
      id: PageView.TEACHERS,
      title: 'الهيئة التدريسية',
      icon: <Users size={40} />,
      color: 'bg-indigo-600',
      desc: 'تعرف على معلمي المدرسة'
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
      <div className="w-full bg-gradient-to-b from-school-primary to-blue-800 text-white py-16 px-4 text-center rounded-b-[3rem] shadow-xl mb-12 relative overflow-hidden group/hero">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://picsum.photos/1200/600')] bg-cover bg-center"></div>
        
        {/* Admin Edit Button for Hero */}
        {isAdmin && !isEditingHero && (
            <button 
                onClick={() => setIsEditingHero(true)}
                className="absolute top-4 left-4 bg-white/20 hover:bg-white/30 backdrop-blur-md p-2 rounded-full transition-opacity opacity-0 group-hover/hero:opacity-100"
            >
                <Edit2 size={20} />
            </button>
        )}

        <div className="relative z-10 max-w-4xl mx-auto">
          {isEditingHero ? (
            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20 animate-fadeIn">
                <input 
                    type="text" 
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full bg-transparent border-b border-white/30 text-3xl md:text-5xl font-bold mb-4 text-center outline-none focus:border-white"
                />
                <input 
                    type="text" 
                    value={editSubtitle}
                    onChange={(e) => setEditSubtitle(e.target.value)}
                    className="w-full bg-transparent border-b border-white/30 text-xl md:text-2xl text-blue-200 font-light mb-8 text-center outline-none focus:border-white"
                />
                <textarea 
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    className="w-full bg-transparent border border-white/30 rounded-lg p-3 text-blue-100 leading-relaxed text-center outline-none focus:border-white h-24"
                />
                <div className="flex justify-center gap-3 mt-4">
                    <button onClick={handleSaveHero} className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-full font-bold flex items-center gap-2">
                        <Save size={18} /> حفظ
                    </button>
                    <button onClick={() => setIsEditingHero(false)} className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-full font-bold flex items-center gap-2">
                        <X size={18} /> إلغاء
                    </button>
                </div>
            </div>
          ) : (
            <>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{heroData.title}</h1>
                <h2 className="text-xl md:text-2xl text-blue-200 font-light mb-8">{heroData.subtitle}</h2>
                <p className="max-w-2xl mx-auto text-blue-100 leading-relaxed">
                    {heroData.description}
                </p>
            </>
          )}
        </div>
      </div>

      {/* Grid Navigation */}
      <div className="container mx-auto px-4 pb-16 border-b border-slate-200 mb-16">
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

      {/* Services Section */}
      <div className="container mx-auto px-4 pb-20 max-w-6xl relative group/services">
        
        {/* Admin Edit Button for Services */}
        {isAdmin && !isEditingServices && (
            <button 
                onClick={() => setIsEditingServices(true)}
                className="absolute top-0 left-4 bg-slate-100 hover:bg-slate-200 text-slate-600 p-2 rounded-full transition-opacity opacity-0 group-hover/services:opacity-100 shadow-sm border border-slate-200"
                title="تعديل الخدمات"
            >
                <Edit2 size={20} />
            </button>
        )}

        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">خدماتنا المدرسية</h2>
            <div className="w-20 h-1 bg-school-secondary mx-auto rounded-full"></div>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                نقدم مجموعة متكاملة من الخدمات لضمان بيئة تعليمية مثالية وتجربة دراسية متميزة لأبنائنا الطلاب
            </p>
        </div>

        {isEditingServices ? (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service) => {
                         const config = serviceConfig.find(c => c.id === service.id) || serviceConfig[0];
                         return (
                            <div key={service.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col items-center text-center relative">
                                <div className={`${config.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                                    {config.icon}
                                </div>
                                <input 
                                    type="text" 
                                    value={service.title}
                                    onChange={(e) => handleSaveService(service.id, e.target.value, service.desc)}
                                    className="w-full text-center font-bold text-gray-800 mb-2 border-b border-gray-200 focus:border-school-secondary outline-none py-1"
                                />
                                <textarea 
                                    value={service.desc}
                                    onChange={(e) => handleSaveService(service.id, service.title, e.target.value)}
                                    className="w-full text-center text-gray-500 text-sm border border-gray-200 rounded p-2 focus:border-school-secondary outline-none h-24"
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="flex justify-center">
                    <button 
                        onClick={() => setIsEditingServices(false)} 
                        className="bg-green-500 hover:bg-green-600 text-white px-8 py-2 rounded-full font-bold shadow-lg"
                    >
                        إتمام التعديل
                    </button>
                </div>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service) => {
                    const config = serviceConfig.find(c => c.id === service.id) || serviceConfig[0];
                    return (
                        <div key={service.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
                            <div className={`${config.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 rotate-3 hover:rotate-6 transition-transform`}>
                                {config.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
                        </div>
                    );
                })}
            </div>
        )}
      </div>
    </div>
  );
};