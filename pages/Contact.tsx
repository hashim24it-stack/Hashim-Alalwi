import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, Edit2, Save, X, Facebook, Twitter, Instagram } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

export const Contact: React.FC = () => {
  const { contactData, isAdmin, updateContactData } = useSchool();
  const [isEditing, setIsEditing] = useState(false);
  
  // Local state
  const [phone, setPhone] = useState(contactData.phone);
  const [email, setEmail] = useState(contactData.email);
  const [location, setLocation] = useState(contactData.location);
  const [facebook, setFacebook] = useState(contactData.facebook || '');
  const [twitter, setTwitter] = useState(contactData.twitter || '');
  const [instagram, setInstagram] = useState(contactData.instagram || '');

  const handleSave = () => {
    updateContactData({ phone, email, location, facebook, twitter, instagram });
    setIsEditing(false);
  };

  const handleCancel = () => {
      setPhone(contactData.phone);
      setEmail(contactData.email);
      setLocation(contactData.location);
      setFacebook(contactData.facebook || '');
      setTwitter(contactData.twitter || '');
      setInstagram(contactData.instagram || '');
      setIsEditing(false);
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-slideUp">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Contact Info & Map */}
        <div className="space-y-6">
          <div className="bg-slate-800 text-white p-8 rounded-3xl shadow-xl relative group">
            
            {isAdmin && !isEditing && (
                <button 
                    onClick={() => setIsEditing(true)}
                    className="absolute top-4 left-4 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all text-white"
                    title="تعديل البيانات"
                >
                    <Edit2 size={20} />
                </button>
            )}

            {isEditing && (
                 <div className="absolute top-4 left-4 flex gap-2">
                    <button onClick={handleSave} className="bg-green-500 hover:bg-green-600 p-2 rounded-full text-white shadow-lg transition-transform hover:scale-105" title="حفظ">
                        <Save size={18} />
                    </button>
                    <button onClick={handleCancel} className="bg-red-500 hover:bg-red-600 p-2 rounded-full text-white shadow-lg transition-transform hover:scale-105" title="إلغاء">
                        <X size={18} />
                    </button>
                 </div>
            )}

            <h2 className="text-3xl font-bold mb-6">تواصل معنا</h2>
            <p className="text-slate-300 mb-8 leading-relaxed">
              نسعد بتواصلكم معنا للرد على استفساراتكم ومقترحاتكم. أبواب المدرسة مفتوحة دائماً لخدمة المجتمع.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 text-school-accent">
                  <MapPin />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">موقعنا</h3>
                  {isEditing ? (
                      <input 
                        value={location} onChange={e => setLocation(e.target.value)}
                        className="w-full bg-slate-700 border border-slate-500 rounded-lg px-3 py-2 mt-2 text-white focus:outline-none focus:ring-2 focus:ring-school-secondary"
                      />
                  ) : (
                    <p className="text-slate-400 text-sm mt-1">{contactData.location}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 text-school-accent">
                  <Phone />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">اتصل بنا</h3>
                  {isEditing ? (
                      <input 
                        value={phone} onChange={e => setPhone(e.target.value)}
                        className="w-full bg-slate-700 border border-slate-500 rounded-lg px-3 py-2 mt-2 text-white text-left focus:outline-none focus:ring-2 focus:ring-school-secondary dir-ltr"
                      />
                  ) : (
                    <p className="text-slate-400 text-sm mt-1 dir-ltr text-right">{contactData.phone}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 text-school-accent">
                  <Mail />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">البريد الإلكتروني</h3>
                  {isEditing ? (
                      <input 
                        value={email} onChange={e => setEmail(e.target.value)}
                        className="w-full bg-slate-700 border border-slate-500 rounded-lg px-3 py-2 mt-2 text-white focus:outline-none focus:ring-2 focus:ring-school-secondary"
                      />
                  ) : (
                    <p className="text-slate-400 text-sm mt-1">{contactData.email}</p>
                  )}
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

          {/* Social Media Section */}
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center border-b pb-4">تابعنا على وسائل التواصل</h3>
            
            {isEditing ? (
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                             <Facebook size={20} />
                        </div>
                        <input 
                            value={facebook}
                            onChange={(e) => setFacebook(e.target.value)}
                            placeholder="رابط فيسبوك"
                            className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-left dir-ltr outline-none focus:border-school-primary focus:ring-1 focus:ring-school-primary"
                        />
                    </div>
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center text-sky-500">
                             <Twitter size={20} />
                        </div>
                        <input 
                            value={twitter}
                            onChange={(e) => setTwitter(e.target.value)}
                            placeholder="رابط تويتر"
                            className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-left dir-ltr outline-none focus:border-school-primary focus:ring-1 focus:ring-school-primary"
                        />
                    </div>
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600">
                             <Instagram size={20} />
                        </div>
                        <input 
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                            placeholder="رابط انستجرام"
                            className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-left dir-ltr outline-none focus:border-school-primary focus:ring-1 focus:ring-school-primary"
                        />
                    </div>
                </div>
            ) : (
                <div className="flex justify-center gap-8">
                    {(!contactData.facebook && !contactData.twitter && !contactData.instagram) && (
                        <p className="text-gray-400 text-sm">لم يتم إضافة روابط التواصل الاجتماعي بعد</p>
                    )}

                    {contactData.facebook && (
                        <a href={contactData.facebook} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
                            <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <Facebook size={28} />
                            </div>
                            <span className="text-xs font-bold text-gray-600 group-hover:text-blue-600 transition-colors">فيسبوك</span>
                        </a>
                    )}
                    {contactData.twitter && (
                        <a href={contactData.twitter} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
                            <div className="w-14 h-14 bg-sky-500 text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <Twitter size={28} />
                            </div>
                            <span className="text-xs font-bold text-gray-600 group-hover:text-sky-500 transition-colors">تويتر</span>
                        </a>
                    )}
                    {contactData.instagram && (
                         <a href={contactData.instagram} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
                            <div className="w-14 h-14 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <Instagram size={28} />
                            </div>
                            <span className="text-xs font-bold text-gray-600 group-hover:text-pink-600 transition-colors">انستجرام</span>
                        </a>
                    )}
                </div>
            )}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 h-fit">
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