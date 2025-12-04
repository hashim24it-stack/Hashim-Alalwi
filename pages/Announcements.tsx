import React, { useState } from 'react';
import { Megaphone, CalendarDays, ArrowLeft, Search, Plus, Trash2, X, Edit, Filter } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

export const Announcements: React.FC = () => {
  const { announcements, isAdmin, addAnnouncement, updateAnnouncement, deleteAnnouncement } = useSchool();
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Form State
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('عام');

  const filteredNews = announcements.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Date comparison (using string comparison YYYY-MM-DD works correctly for ISO format)
    const matchesStart = startDate ? item.date >= startDate : true;
    const matchesEnd = endDate ? item.date <= endDate : true;

    return matchesSearch && matchesStart && matchesEnd;
  });

  const openAddForm = () => {
    setEditId(null);
    setTitle('');
    setContent('');
    setCategory('عام');
    setShowForm(true);
  };

  const openEditForm = (item: any) => {
    setEditId(item.id);
    setTitle(item.title);
    setContent(item.content);
    setCategory(item.category);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    if (editId) {
      updateAnnouncement(editId, {
        title,
        content,
        category,
        date: new Date().toISOString().split('T')[0],
        isNew: true
      });
    } else {
      addAnnouncement({
        title,
        content,
        category,
        date: new Date().toISOString().split('T')[0],
        isNew: true
      });
    }

    setShowForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl animate-slideUp">
      
      {/* Admin Add Button */}
      {isAdmin && !showForm && (
        <button 
          onClick={openAddForm}
          className="mb-8 w-full bg-green-500 hover:bg-green-600 text-white p-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-transform hover:-translate-y-1 font-bold text-lg"
        >
          <Plus size={24} />
          إضافة إعلان جديد
        </button>
      )}

      {/* Admin Form (Add/Edit) */}
      {isAdmin && showForm && (
        <div className="mb-8 bg-white p-6 rounded-2xl shadow-lg border-2 border-green-500 animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-green-700">{editId ? 'تعديل الإعلان' : 'إعلان جديد'}</h3>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-red-500">
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">العنوان</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border rounded-xl focus:border-green-500 outline-none"
                placeholder="عنوان الإعلان"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">التصنيف</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border rounded-xl focus:border-green-500 outline-none"
              >
                <option>عام</option>
                <option>اختبارات</option>
                <option>أنشطة</option>
                <option>اجتماعات</option>
                <option>تكريم</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">المحتوى</label>
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-3 border rounded-xl focus:border-green-500 outline-none h-32"
                placeholder="تفاصيل الإعلان..."
                required
              />
            </div>
            <div className="flex justify-end gap-3">
               <button 
                 type="button" 
                 onClick={() => setShowForm(false)}
                 className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-bold"
               >
                 إلغاء
               </button>
               <button 
                 type="submit" 
                 className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 font-bold shadow-md"
               >
                 {editId ? 'حفظ التعديلات' : 'نشر الإعلان'}
               </button>
            </div>
          </form>
        </div>
      )}

      {/* Header & Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border-r-4 border-amber-500 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-2">
            <div className="w-full md:w-auto text-center md:text-right">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center md:justify-start gap-3">
                <Megaphone className="text-amber-500" />
                لوحة الإعلانات
                </h2>
                <p className="text-gray-500 mt-2">ابق على اطلاع دائم بكل ما هو جديد في مدرستنا</p>
            </div>
            
            <div className="w-full md:w-auto flex flex-col gap-3">
                <div className="relative w-full md:w-80">
                    <input 
                    type="text"
                    placeholder="بحث في الإعلانات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none transition-all bg-gray-50 focus:bg-white"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
                <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors w-full ${showFilters ? 'bg-amber-100 text-amber-700' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                >
                    <Filter size={16} />
                    {showFilters ? 'إخفاء خيارات التصفية' : 'تصفية حسب التاريخ'}
                </button>
            </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100 animate-fadeIn mt-4">
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <label className="block text-xs font-bold text-gray-500 mb-2">من تاريخ</label>
                    <input 
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full p-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-amber-500 outline-none"
                    />
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <label className="block text-xs font-bold text-gray-500 mb-2">إلى تاريخ</label>
                    <input 
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full p-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-amber-500 outline-none"
                    />
                </div>
                {(startDate || endDate) && (
                    <button 
                        onClick={() => { setStartDate(''); setEndDate(''); }}
                        className="col-span-1 sm:col-span-2 text-red-500 text-sm font-bold hover:underline text-center"
                    >
                        إلغاء تصفية التاريخ
                    </button>
                )}
            </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNews.length > 0 ? (
          filteredNews.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col relative group">
              
              {/* Admin Actions */}
              {isAdmin && (
                <div className="absolute top-4 left-4 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                        onClick={() => openEditForm(item)}
                        className="bg-blue-50 text-blue-500 p-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors shadow-sm"
                        title="تعديل"
                    >
                        <Edit size={18} />
                    </button>
                    <button 
                        onClick={() => deleteAnnouncement(item.id)}
                        className="bg-red-50 text-red-500 p-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors shadow-sm"
                        title="حذف"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
              )}

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
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 text-center py-12 text-gray-500 bg-white rounded-2xl border border-gray-100 border-dashed">
            <Search size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg">لا توجد إعلانات تطابق بحثك</p>
            <button 
              onClick={() => { setSearchQuery(''); setStartDate(''); setEndDate(''); }}
              className="mt-4 text-school-primary font-bold hover:underline"
            >
              عرض جميع الإعلانات
            </button>
          </div>
        )}
      </div>
    </div>
  );
};