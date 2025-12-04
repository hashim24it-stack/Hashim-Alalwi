import React, { useState } from 'react';
import { GraduationCap, Search, AlertCircle, CheckCircle2, Plus, Trash2 } from 'lucide-react';
import { useSchool, StudentResult } from '../context/SchoolContext';

export const Results: React.FC = () => {
  const { results, isAdmin, addResult, deleteResult } = useSchool();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<StudentResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Admin State
  const [showAdd, setShowAdd] = useState(false);
  const [newStudent, setNewStudent] = useState<StudentResult>({
      id: '', name: '', grade: '', status: 'ناجح', average: 0
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setSearchResults([]);
    setHasSearched(false);

    // Simulate delay for realism
    setTimeout(() => {
      setLoading(false);
      setHasSearched(true);
      const query = searchQuery.trim().toLowerCase();
      
      const found = results.filter(r => 
        r.id.includes(query) || 
        r.name.includes(query) || 
        r.grade.includes(query)
      );
      
      setSearchResults(found);
    }, 800);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      addResult(newStudent);
      setShowAdd(false);
      setNewStudent({ id: '', name: '', grade: '', status: 'ناجح', average: 0 });
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col animate-slideUp">
      
      {/* Search Section */}
      <div className="w-full max-w-xl mx-auto mb-12">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
            <div className="bg-purple-700 p-8 text-center text-white">
            <GraduationCap size={64} className="mx-auto mb-4 text-purple-200" />
            <h2 className="text-3xl font-bold mb-2">نظام النتائج المدرسية</h2>
            <p className="text-purple-200">أدخل رقم الطالب، الاسم، أو الصف للاستعلام</p>
            </div>

            <div className="p-8">
            <form onSubmit={handleSearch} className="space-y-6">
                <div className="space-y-2">
                <label htmlFor="searchQuery" className="block text-sm font-bold text-gray-700 text-right">
                    البحث
                </label>
                <div className="relative">
                    <input
                    type="text"
                    id="searchQuery"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all pl-10"
                    placeholder="مثال: أحمد، 1234، الصف الثامن..."
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
                </div>

                <button
                type="submit"
                disabled={loading || !searchQuery}
                className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2
                    ${loading || !searchQuery 
                    ? 'bg-slate-300 cursor-not-allowed shadow-none' 
                    : 'bg-purple-600 hover:bg-purple-700 hover:shadow-purple-200 hover:-translate-y-1'
                    }`}
                >
                {loading ? (
                    <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    جاري البحث...
                    </>
                ) : (
                    'استخراج النتائج'
                )}
                </button>
            </form>

            {/* Result Display */}
            {hasSearched && searchResults.length === 0 && (
                <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-start gap-3 border border-red-100 animate-fadeIn">
                <AlertCircle className="shrink-0 mt-0.5" />
                <p>لم يتم العثور على نتائج تطابق بحثك. يرجى التأكد وإعادة المحاولة.</p>
                </div>
            )}

            <div className="space-y-4 mt-8">
            {searchResults.map((result) => (
                <div key={result.id} className="pt-6 border-t border-dashed border-gray-200 animate-fadeIn first:border-0 first:pt-0">
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center relative overflow-hidden">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full mb-4">
                    <CheckCircle2 size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{result.name}</h3>
                    <p className="text-gray-500 text-sm mb-4">{result.grade} (#{result.id})</p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-white p-3 rounded-xl shadow-sm">
                        <span className="block text-xs text-gray-400 mb-1">الحالة</span>
                        <span className={`font-bold ${result.status === 'ناجح' ? 'text-emerald-600' : 'text-red-600'}`}>{result.status}</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl shadow-sm">
                        <span className="block text-xs text-gray-400 mb-1">المعدل</span>
                        <span className="font-bold text-gray-800 dir-ltr">{result.average}%</span>
                    </div>
                    </div>
                </div>
                </div>
            ))}
            </div>
            </div>
        </div>
      </div>

      {/* Admin Management Section */}
      {isAdmin && (
          <div className="max-w-4xl mx-auto w-full bg-white rounded-3xl p-8 shadow-lg border-2 border-purple-100">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">إدارة النتائج (مشرف)</h3>
                <button 
                    onClick={() => setShowAdd(!showAdd)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2 text-sm"
                >
                    <Plus size={16} /> إضافة نتيجة
                </button>
             </div>

             {showAdd && (
                 <form onSubmit={handleAddSubmit} className="bg-purple-50 p-6 rounded-xl mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 border border-purple-200">
                    <input 
                        type="text" placeholder="رقم الطالب" required
                        value={newStudent.id} onChange={e => setNewStudent({...newStudent, id: e.target.value})}
                        className="p-3 rounded-lg border focus:ring-2 ring-purple-300 outline-none"
                    />
                    <input 
                        type="text" placeholder="الاسم الكامل" required
                        value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})}
                        className="p-3 rounded-lg border focus:ring-2 ring-purple-300 outline-none"
                    />
                    <input 
                        type="text" placeholder="الصف (مثال: الثامن - 1)" required
                        value={newStudent.grade} onChange={e => setNewStudent({...newStudent, grade: e.target.value})}
                        className="p-3 rounded-lg border focus:ring-2 ring-purple-300 outline-none"
                    />
                    <select 
                        value={newStudent.status} onChange={e => setNewStudent({...newStudent, status: e.target.value})}
                        className="p-3 rounded-lg border focus:ring-2 ring-purple-300 outline-none"
                    >
                        <option value="ناجح">ناجح</option>
                        <option value="راسب">راسب</option>
                        <option value="دور ثاني">دور ثاني</option>
                    </select>
                    <input 
                        type="number" placeholder="المعدل" step="0.1" required
                        value={newStudent.average} onChange={e => setNewStudent({...newStudent, average: parseFloat(e.target.value)})}
                        className="p-3 rounded-lg border focus:ring-2 ring-purple-300 outline-none"
                    />
                    <button type="submit" className="bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700">حفظ</button>
                 </form>
             )}

             <div className="overflow-x-auto">
                 <table className="w-full text-right">
                     <thead className="bg-purple-50 text-purple-900">
                         <tr>
                             <th className="p-3 rounded-r-lg">الرقم</th>
                             <th className="p-3">الاسم</th>
                             <th className="p-3">الصف</th>
                             <th className="p-3">الحالة</th>
                             <th className="p-3 rounded-l-lg">إجراء</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-100">
                         {results.map(r => (
                             <tr key={r.id}>
                                 <td className="p-3 text-gray-600">{r.id}</td>
                                 <td className="p-3 font-bold text-gray-800">{r.name}</td>
                                 <td className="p-3 text-gray-500">{r.grade}</td>
                                 <td className="p-3">
                                     <span className={`text-xs px-2 py-1 rounded-full ${r.status === 'ناجح' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {r.status}
                                     </span>
                                 </td>
                                 <td className="p-3">
                                     <button 
                                        onClick={() => deleteResult(r.id)}
                                        className="text-red-400 hover:text-red-600 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={16} />
                                     </button>
                                 </td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
                 {results.length === 0 && <p className="text-center text-gray-400 py-8">لا توجد نتائج مسجلة</p>}
             </div>
          </div>
      )}

    </div>
  );
};