import React, { useState } from 'react';
import { Users, Search, Plus, User, Edit, Trash2, X, GraduationCap, Mail, LayoutGrid, List, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { useSchool, Teacher } from '../context/SchoolContext';

export const Teachers: React.FC = () => {
  const { teachers, isAdmin, addTeacher, updateTeacher, deleteTeacher } = useSchool();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  
  // Form State
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<Teacher, 'id'>>({
    name: '',
    subject: '',
    role: '',
    bio: '',
    email: ''
  });

  // Extract unique subjects for filter
  const subjects = ['all', ...Array.from(new Set(teachers.map(t => t.subject))).filter(Boolean)];

  const filteredTeachers = teachers.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || t.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const handleEdit = (teacher: Teacher, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(teacher.id);
    setFormData({
      name: teacher.name,
      subject: teacher.subject,
      role: teacher.role,
      bio: teacher.bio,
      email: teacher.email || ''
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('هل أنت متأكد من حذف هذا المعلم؟')) {
      deleteTeacher(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateTeacher(editingId, formData);
    } else {
      addTeacher(formData);
    }
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: '', subject: '', role: '', bio: '', email: '' });
  };

  const openAddForm = () => {
    setEditingId(null);
    setFormData({ name: '', subject: '', role: '', bio: '', email: '' });
    setShowForm(true);
  };

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-slideUp">
      
      {/* Header & Controls */}
      <div className="flex flex-col mb-8 gap-6">
        <div className="bg-indigo-600 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-4 mb-6 md:mb-0">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                <Users size={32} />
            </div>
            <div>
                <h2 className="text-3xl font-bold">الهيئة التدريسية</h2>
                <p className="text-indigo-100 mt-1">نخبة من المعلمين المتميزين لبناء جيل المستقبل</p>
            </div>
            </div>

            {/* Admin Add Button */}
            {isAdmin && !showForm && (
                <button 
                    onClick={openAddForm}
                    className="bg-white text-indigo-600 px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1 font-bold"
                >
                    <Plus size={20} />
                    <span>إضافة معلم</span>
                </button>
            )}
        </div>

        {/* Filters Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            <div className="flex items-center gap-4 w-full lg:w-auto flex-1">
                {/* Search */}
                <div className="relative flex-1 lg:max-w-md">
                    <input 
                        type="text"
                        placeholder="بحث عن معلم..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all bg-slate-50 focus:bg-white"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>

                {/* Subject Filter */}
                <div className="relative min-w-[150px]">
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                        <Filter size={16} />
                    </div>
                    <select 
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none bg-slate-50 focus:bg-white appearance-none cursor-pointer"
                    >
                        <option value="all">جميع المواد</option>
                        {subjects.filter(s => s !== 'all').map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* View Toggle */}
            <div className="flex bg-slate-100 p-1 rounded-lg shrink-0">
                <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    title="عرض شبكي"
                >
                    <LayoutGrid size={20} />
                </button>
                <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    title="عرض قائمة"
                >
                    <List size={20} />
                </button>
            </div>
        </div>
      </div>

      {/* Form */}
      {isAdmin && showForm && (
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-12 border border-slate-100 animate-fadeIn relative">
          <button 
            onClick={() => setShowForm(false)} 
            className="absolute top-6 left-6 text-gray-400 hover:text-red-500"
          >
            <X size={24} />
          </button>
          
          <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
            {editingId ? 'تعديل بيانات المعلم' : 'إضافة معلم جديد'}
          </h3>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">الاسم الكامل</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full p-3 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">المادة الدراسية</label>
              <input 
                type="text" 
                required
                value={formData.subject}
                onChange={e => setFormData({...formData, subject: e.target.value})}
                className="w-full p-3 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">المسمى الوظيفي</label>
              <select 
                value={formData.role}
                onChange={e => setFormData({...formData, role: e.target.value})}
                className="w-full p-3 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none"
              >
                <option value="">اختر المسمى...</option>
                <option value="معلم">معلم</option>
                <option value="معلم أول">معلم أول</option>
                <option value="أخصائي">أخصائي</option>
                <option value="إداري">إداري</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">البريد الإلكتروني (اختياري)</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full p-3 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none dir-ltr text-right"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-gray-700">نبذة تعريفية</label>
              <textarea 
                value={formData.bio}
                onChange={e => setFormData({...formData, bio: e.target.value})}
                className="w-full p-3 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none h-24"
                placeholder="خبرات، مؤهلات، أو اهتمامات..."
              />
            </div>

            <div className="md:col-span-2 flex justify-end gap-3 mt-4">
              <button 
                type="button" 
                onClick={() => setShowForm(false)}
                className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-bold"
              >
                إلغاء
              </button>
              <button 
                type="submit" 
                className="px-8 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-bold shadow-md"
              >
                حفظ
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Content Area */}
      {viewMode === 'grid' ? (
        // --- GRID VIEW ---
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {filteredTeachers.map((teacher) => (
            <div key={teacher.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group relative flex flex-col items-center text-center">
                
                {isAdmin && (
                <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button 
                    onClick={(e) => handleEdit(teacher, e)}
                    className="p-2 bg-blue-50 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                    >
                    <Edit size={16} />
                    </button>
                    <button 
                    onClick={(e) => handleDelete(teacher.id, e)}
                    className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                    >
                    <Trash2 size={16} />
                    </button>
                </div>
                )}

                <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-lg text-slate-400 group-hover:scale-110 transition-transform duration-300">
                <User size={48} />
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-1">{teacher.name}</h3>
                <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full mb-4 border border-indigo-100">
                {teacher.role} - {teacher.subject}
                </span>

                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                {teacher.bio}
                </p>

                <div className="mt-auto w-full pt-4 border-t border-slate-50 flex justify-center gap-4 text-gray-400">
                {teacher.email && (
                    <a href={`mailto:${teacher.email}`} className="hover:text-indigo-600 transition-colors" title={teacher.email}>
                    <Mail size={18} />
                    </a>
                )}
                <div className="hover:text-indigo-600 transition-colors cursor-pointer" title="المؤهلات">
                    <GraduationCap size={18} />
                </div>
                </div>
            </div>
            ))}
        </div>
      ) : (
        // --- LIST VIEW ---
        <div className="flex flex-col gap-4 animate-fadeIn">
            {filteredTeachers.map((teacher) => (
                <div key={teacher.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <div 
                        onClick={() => toggleExpand(teacher.id)}
                        className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors relative"
                    >
                        {/* Avatar */}
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 shrink-0">
                            <User size={24} />
                        </div>
                        
                        {/* Main Info */}
                        <div className="flex-1">
                            <h3 className="font-bold text-gray-800 text-lg">{teacher.name}</h3>
                            <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                                <span className="text-indigo-600 font-medium">{teacher.role}</span>
                                <span>•</span>
                                <span>{teacher.subject}</span>
                            </div>
                        </div>

                        {/* Chevron Icon */}
                        <div className="text-gray-400">
                            {expandedId === teacher.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>
                    </div>

                    {/* Expandable Details */}
                    {expandedId === teacher.id && (
                        <div className="bg-slate-50 p-6 border-t border-slate-100 animate-slideDown">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">نبذة تعريفية</h4>
                                    <p className="text-gray-600 leading-relaxed text-sm">
                                        {teacher.bio || "لا توجد نبذة تعريفية متاحة."}
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    {teacher.email && (
                                        <div>
                                            <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">معلومات التواصل</h4>
                                            <a href={`mailto:${teacher.email}`} className="flex items-center gap-2 text-indigo-600 hover:underline">
                                                <Mail size={16} />
                                                <span className="text-sm dir-ltr">{teacher.email}</span>
                                            </a>
                                        </div>
                                    )}
                                    {isAdmin && (
                                        <div className="pt-4 border-t border-slate-200 flex gap-3">
                                            <button 
                                                onClick={(e) => handleEdit(teacher, e)}
                                                className="flex items-center gap-1 text-sm bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-200"
                                            >
                                                <Edit size={14} /> تعديل
                                            </button>
                                            <button 
                                                onClick={(e) => handleDelete(teacher.id, e)}
                                                className="flex items-center gap-1 text-sm bg-red-100 text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-200"
                                            >
                                                <Trash2 size={14} /> حذف
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
      )}

      {filteredTeachers.length === 0 && (
          <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-slate-100 border-dashed mt-6">
             <Search size={48} className="mx-auto mb-4 opacity-20" />
             <p>لا يوجد معلمين يطابقون خيارات البحث</p>
          </div>
      )}
    </div>
  );
};