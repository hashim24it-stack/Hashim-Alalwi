import React, { useState, useEffect } from 'react';
import { Target, Award, BookOpen, Edit2, Save, X, Plus, Trash } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

export const Vision: React.FC = () => {
  const { isAdmin, visionText, missionText, valuesList, visionSlogan, updateVisionMission } = useSchool();
  const [isEditing, setIsEditing] = useState(false);
  
  // Local state
  const [localVision, setLocalVision] = useState(visionText);
  const [localMission, setLocalMission] = useState(missionText);
  const [localValues, setLocalValues] = useState<string[]>([...valuesList]);
  const [localSlogan, setLocalSlogan] = useState(visionSlogan);

  // Sync local state when context changes (if not editing)
  useEffect(() => {
    if (!isEditing) {
      setLocalVision(visionText);
      setLocalMission(missionText);
      setLocalValues([...valuesList]);
      setLocalSlogan(visionSlogan);
    }
  }, [visionText, missionText, valuesList, visionSlogan, isEditing]);

  const handleSave = () => {
    updateVisionMission(localVision, localMission, localValues, localSlogan);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalVision(visionText);
    setLocalMission(missionText);
    setLocalValues([...valuesList]);
    setLocalSlogan(visionSlogan);
    setIsEditing(false);
  };

  const handleValueChange = (index: number, val: string) => {
    const newValues = [...localValues];
    newValues[index] = val;
    setLocalValues(newValues);
  };

  const addValue = () => setLocalValues([...localValues, 'قيمة جديدة']);
  const removeValue = (index: number) => setLocalValues(localValues.filter((_, i) => i !== index));

  const missionPoints = isEditing ? [] : missionText.split('\n').filter(line => line.trim() !== '');

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-slideUp">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden relative border border-slate-100">
        
        {isAdmin && (
            <div className="absolute top-4 left-4 z-10">
                {isEditing ? (
                    <div className="flex gap-2">
                        <button 
                            onClick={handleSave} 
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-bold transition-transform hover:scale-105"
                        >
                            <Save size={16} /> حفظ
                        </button>
                        <button 
                            onClick={handleCancel} 
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-bold transition-transform hover:scale-105"
                        >
                            <X size={16} /> إلغاء
                        </button>
                    </div>
                ) : (
                    <button 
                        onClick={() => setIsEditing(true)} 
                        className="bg-white/20 hover:bg-white/40 backdrop-blur-md text-white border border-white/50 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-bold transition-transform hover:scale-105"
                    >
                        <Edit2 size={16} /> تعديل
                    </button>
                )}
            </div>
        )}

        <div className="bg-emerald-600 py-10 px-6 text-center text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <Target size={64} className="mx-auto mb-4 text-emerald-100" />
          <h2 className="text-3xl font-bold mb-2">رؤية ورسالة المدرسة</h2>
          
          {isEditing ? (
            <input 
                value={localSlogan}
                onChange={(e) => setLocalSlogan(e.target.value)}
                className="bg-white/20 border border-white/30 text-white placeholder-emerald-200 text-center rounded-lg px-4 py-1 w-full max-w-md outline-none focus:bg-white/30 transition-colors"
            />
          ) : (
            <p className="text-emerald-100">{visionSlogan}</p>
          )}
        </div>

        <div className="p-8 space-y-12">
          {/* Vision Section */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600 shrink-0">
              <EyeIcon />
            </div>
            <div className="w-full">
              <h3 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-emerald-500 inline-block pb-1">الرؤية</h3>
              {isEditing ? (
                  <textarea
                    value={localVision}
                    onChange={(e) => setLocalVision(e.target.value)}
                    className="w-full p-4 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 outline-none min-h-[100px] text-lg text-gray-700 bg-emerald-50"
                  />
              ) : (
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {visionText}
                  </p>
              )}
            </div>
          </div>

          {/* Mission Section */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-blue-100 p-4 rounded-2xl text-blue-600 shrink-0">
              <BookOpen size={32} />
            </div>
            <div className="w-full">
              <h3 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-blue-500 inline-block pb-1">الرسالة</h3>
              {isEditing ? (
                  <textarea
                    value={localMission}
                    onChange={(e) => setLocalMission(e.target.value)}
                    className="w-full p-4 border-2 border-blue-200 rounded-xl focus:border-blue-500 outline-none min-h-[150px] text-lg text-gray-700 bg-blue-50"
                    placeholder="ضع كل نقطة في سطر جديد"
                  />
              ) : (
                  <ul className="space-y-3 text-gray-600 text-lg">
                    {missionPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2.5 shrink-0"></span>
                        <span>{point}</span>
                        </li>
                    ))}
                  </ul>
              )}
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
             <div className="flex items-center gap-3 mb-6 justify-center">
                <Award className="text-amber-500" size={32} />
                <h3 className="text-2xl font-bold text-gray-800 text-center">قيمنا الجوهرية</h3>
             </div>
             
             {isEditing ? (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {localValues.map((val, idx) => (
                            <div key={idx} className="relative">
                                <input 
                                    type="text"
                                    value={val}
                                    onChange={(e) => handleValueChange(idx, e.target.value)}
                                    className="w-full p-2 border border-slate-300 rounded-lg text-center"
                                />
                                <button 
                                    onClick={() => removeValue(idx)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <button 
                        onClick={addValue}
                        className="w-full py-2 bg-amber-100 text-amber-700 rounded-lg border border-amber-200 hover:bg-amber-200 flex items-center justify-center gap-2 font-bold"
                    >
                        <Plus size={16} /> إضافة قيمة
                    </button>
                </div>
             ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    {localValues.map((val, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 font-medium text-gray-700 hover:text-school-primary hover:border-school-primary transition-colors cursor-default">
                            {val}
                        </div>
                    ))}
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
);