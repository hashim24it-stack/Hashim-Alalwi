import React, { useState } from 'react';
import { GraduationCap, Search, AlertCircle, CheckCircle2 } from 'lucide-react';

export const Results: React.FC = () => {
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | { name: string; grade: string; status: string; average: number }>(null);
  const [error, setError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId.trim()) return;

    setLoading(true);
    setResult(null);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Mock validation
      if (studentId === '1234') {
        setResult({
          name: 'أحمد بن محمد العماني',
          grade: 'الصف الثامن - 3',
          status: 'ناجح',
          average: 94.5
        });
      } else {
        setError('رقم الطالب غير موجود في النظام، يرجى التأكد وإعادة المحاولة.');
      }
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[60vh] animate-slideUp">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        <div className="bg-purple-700 p-8 text-center text-white">
          <GraduationCap size={64} className="mx-auto mb-4 text-purple-200" />
          <h2 className="text-3xl font-bold mb-2">نظام النتائج المدرسية</h2>
          <p className="text-purple-200">أدخل رقم الطالب المدني أو الرقم المدرسي للاستعلام</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="studentId" className="block text-sm font-bold text-gray-700 text-right">
                رقم الطالب
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="studentId"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all text-left dir-ltr pl-10"
                  placeholder="مثال: 12345678"
                  dir="ltr"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !studentId}
              className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2
                ${loading || !studentId 
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
                'استخراج النتيجة'
              )}
            </button>
          </form>

          {/* Result Display */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-start gap-3 border border-red-100 animate-fadeIn">
              <AlertCircle className="shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {result && (
            <div className="mt-8 pt-6 border-t border-dashed border-gray-200 animate-fadeIn">
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full mb-4">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{result.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{result.grade}</p>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm">
                    <span className="block text-xs text-gray-400 mb-1">الحالة</span>
                    <span className="font-bold text-emerald-600">{result.status}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl shadow-sm">
                    <span className="block text-xs text-gray-400 mb-1">المعدل</span>
                    <span className="font-bold text-gray-800 dir-ltr">{result.average}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};