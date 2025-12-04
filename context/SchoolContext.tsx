import React, { createContext, useContext, useState, useEffect } from 'react';

// --- Types ---

export interface Announcement {
  id: number;
  title: string;
  date: string;
  category: string;
  content: string;
  isNew: boolean;
}

export interface StudentResult {
  id: string; // National ID or School ID
  name: string;
  grade: string;
  status: string;
  average: number;
}

export interface HeroData {
  title: string;
  subtitle: string;
  description: string;
}

export interface ContactData {
  phone: string;
  email: string;
  location: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
}

export interface Teacher {
  id: number;
  name: string;
  subject: string;
  role: string;
  bio: string;
  email?: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  desc: string;
}

// Schedule: Grade -> Day Index (0-4) -> Subject Index (0-6) -> Subject Name
export type ScheduleState = Record<number, Record<number, string[]>>;

interface SchoolContextType {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  
  // Announcements
  announcements: Announcement[];
  addAnnouncement: (announcement: Omit<Announcement, 'id'>) => void;
  updateAnnouncement: (id: number, data: Omit<Announcement, 'id'>) => void;
  deleteAnnouncement: (id: number) => void;
  
  // Vision & Mission
  visionText: string;
  missionText: string;
  valuesList: string[];
  visionSlogan: string;
  updateVisionMission: (vision: string, mission: string, values: string[], slogan: string) => void;

  // Schedule
  scheduleData: ScheduleState;
  updateScheduleCell: (grade: number, dayIndex: number, periodIndex: number, value: string) => void;

  // Results
  results: StudentResult[];
  addResult: (result: StudentResult) => void;
  deleteResult: (id: string) => void;
  
  // Teachers
  teachers: Teacher[];
  addTeacher: (teacher: Omit<Teacher, 'id'>) => void;
  updateTeacher: (id: number, teacher: Omit<Teacher, 'id'>) => void;
  deleteTeacher: (id: number) => void;

  // Home Hero
  heroData: HeroData;
  updateHeroData: (data: HeroData) => void;

  // Home Services
  services: ServiceItem[];
  updateService: (id: number, data: Omit<ServiceItem, 'id'>) => void;

  // Contact
  contactData: ContactData;
  updateContactData: (data: ContactData) => void;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

// --- Initial Data Generators ---

const generateInitialSchedule = (): ScheduleState => {
  const grades = [5, 6, 7, 8, 9];
  const days = 5;
  const periods = 7;
  const subjectsPool = ['رياضيات', 'لغة عربية', 'علوم', 'لغة إنجليزية', 'تربية إسلامية', 'دراسات', 'مهارات', 'فنون', 'رياضة', 'تقنية معلومات'];
  
  const schedule: ScheduleState = {};
  
  grades.forEach(grade => {
    schedule[grade] = {};
    for (let d = 0; d < days; d++) {
      schedule[grade][d] = [];
      for (let p = 0; p < periods; p++) {
        // Simple consistent random-like assignment based on indices
        const subjectIndex = (grade + d + p) % subjectsPool.length;
        schedule[grade][d].push(subjectsPool[subjectIndex]);
      }
    }
  });
  return schedule;
};

export const SchoolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  
  // --- Content State ---

  const [heroData, setHeroData] = useState<HeroData>({
    title: 'مرحباً بكم في البوابة الرقمية',
    subtitle: 'لمدرسة رافع بن مالك للتعليم الأساسي',
    description: 'نسعى لخلق بيئة تعليمية محفزة للإبداع والتميز، وبناء جيل واعٍ متمسك بقيمه، متطلع لمستقبله.'
  });

  const [services, setServices] = useState<ServiceItem[]>([
    {
      id: 1,
      title: 'الأنشطة اللاصفية',
      desc: 'برامج متنوعة رياضية وثقافية وفنية لتنمية مواهب الطلاب وصقل شخصياتهم.'
    },
    {
      id: 2,
      title: 'الإرشاد الطلابي',
      desc: 'دعم نفسي وأكاديمي لتعزيز السلوك الإيجابي ومساعدة الطلاب على تجاوز التحديات.'
    },
    {
      id: 3,
      title: 'المكتبة ومصادر التعلم',
      desc: 'مكتبة شاملة توفر الكتب والمراجع الرقمية لتشجيع البحث والقراءة والاطلاع.'
    },
    {
      id: 4,
      title: 'مختبرات التقنية',
      desc: 'قاعات حاسوب مجهزة بأحدث التقنيات لتعزيز مهارات المستقبل والتعلم الرقمي.'
    }
  ]);

  const [contactData, setContactData] = useState<ContactData>({
    phone: '+968 24XXXXXX',
    email: 'info@rafa-school.edu.om',
    location: 'سلطنة عمان، محافظة ...، ولاية ...',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com'
  });

  const [visionText, setVisionText] = useState('الريادة في تقديم تعليم متميز وعالي الجودة لبناء مجتمع معرفي وقيمي، وتخريج أجيال قادرة على مواكبة التطور العالمي مع الحفاظ على الهوية الوطنية والإسلامية.');
  const [visionSlogan, setVisionSlogan] = useState('نحو جيل مبدع، واعٍ، ومنتج');
  
  const [missionText, setMissionText] = useState(`توفير بيئة تعليمية آمنة ومحفزة للإبداع.
تنمية مهارات التفكير النقدي وحل المشكلات لدى الطلاب.
تفعيل الشراكة المجتمعية بين المدرسة والأسرة والمجتمع.
توظيف التقانة الحديثة في العملية التعليمية بفاعلية.`);

  const [valuesList, setValuesList] = useState([
    'الأمانة', 'المسؤولية', 'الاحترام', 'الإتقان', 'التعاون', 'المواطنة', 'الابتكار', 'التميز'
  ]);
  
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 1,
      title: 'موعد بدء اختبارات منتصف الفصل الدراسي الأول',
      date: '2024-10-15',
      category: 'اختبارات',
      content: 'تعلن إدارة المدرسة أن اختبارات منتصف الفصل ستبدأ يوم الأحد الموافق 25 أكتوبر. نرجو من جميع الطلاب الاستعداد الجيد ومراجعة الدروس بانتظام.',
      isNew: true
    },
    {
      id: 2,
      title: 'رحلة مدرسية إلى المتحف الوطني',
      date: '2024-10-10',
      category: 'أنشطة',
      content: 'ينظم قسم الأنشطة الطلابية رحلة تعليمية لطلاب الصف السابع لزيارة المتحف الوطني للتعرف على تاريخ وحضارة الوطن.',
      isNew: true
    },
    {
      id: 3,
      title: 'اجتماع مجلس الآباء والمعلمين',
      date: '2024-09-28',
      category: 'اجتماعات',
      content: 'ندعو أولياء الأمور الكرام لحضور الاجتماع الأول لهذا العام لمناقشة الخطة الدراسية ومستوى التحصيل الدراسي للطلاب.',
      isNew: false
    }
  ]);

  const [scheduleData, setScheduleData] = useState<ScheduleState>(generateInitialSchedule());

  const [results, setResults] = useState<StudentResult[]>([
    { id: '1234', name: 'أحمد بن محمد العماني', grade: 'الصف الثامن - 3', status: 'ناجح', average: 94.5 },
    { id: '5678', name: 'سعيد بن علي العامري', grade: 'الصف التاسع - 1', status: 'ناجح', average: 88.0 },
  ]);

  const [teachers, setTeachers] = useState<Teacher[]>([
    { id: 1, name: 'أ. سالم بن حمد', subject: 'لغة عربية', role: 'معلم أول', bio: 'خبرة 15 عاماً في تدريس اللغة العربية وآدابها.' },
    { id: 2, name: 'أ. خالد المعمري', subject: 'رياضيات', role: 'معلم', bio: 'متخصص في طرائق تدريس الرياضيات الحديثة.' },
    { id: 3, name: 'أ. محمد البلوشي', subject: 'علوم', role: 'معلم', bio: 'مشرف نادي العلوم والابتكار بالمدرسة.' },
    { id: 4, name: 'أ. عبدالله الشامسي', subject: 'لغة إنجليزية', role: 'معلم أول', bio: 'حاصل على ماجستير في طرق تدريس اللغة الإنجليزية.' },
  ]);

  // --- Actions ---

  const login = (password: string) => {
    if (password === 'admin123') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAdmin(false);

  // Announcements
  const addAnnouncement = (news: Omit<Announcement, 'id'>) => {
    const newId = Math.max(...announcements.map(a => a.id), 0) + 1;
    setAnnouncements([{ ...news, id: newId }, ...announcements]);
  };

  const updateAnnouncement = (id: number, data: Omit<Announcement, 'id'>) => {
    setAnnouncements(announcements.map(a => a.id === id ? { ...data, id } : a));
  };

  const deleteAnnouncement = (id: number) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  // Vision
  const updateVisionMission = (vision: string, mission: string, values: string[], slogan: string) => {
    setVisionText(vision);
    setMissionText(mission);
    setValuesList(values);
    setVisionSlogan(slogan);
  };

  // Schedule
  const updateScheduleCell = (grade: number, dayIndex: number, periodIndex: number, value: string) => {
    setScheduleData(prev => ({
      ...prev,
      [grade]: {
        ...prev[grade],
        [dayIndex]: prev[grade][dayIndex].map((sub, idx) => idx === periodIndex ? value : sub)
      }
    }));
  };

  // Results
  const addResult = (result: StudentResult) => {
    // Remove if exists then add (upsert)
    setResults(prev => [...prev.filter(r => r.id !== result.id), result]);
  };

  const deleteResult = (id: string) => {
    setResults(prev => prev.filter(r => r.id !== id));
  };

  // Teachers
  const addTeacher = (teacher: Omit<Teacher, 'id'>) => {
    const newId = Math.max(...teachers.map(t => t.id), 0) + 1;
    setTeachers([...teachers, { ...teacher, id: newId }]);
  };

  const updateTeacher = (id: number, data: Omit<Teacher, 'id'>) => {
    setTeachers(teachers.map(t => t.id === id ? { ...data, id } : t));
  };

  const deleteTeacher = (id: number) => {
    setTeachers(teachers.filter(t => t.id !== id));
  };

  // Home Hero
  const updateHeroData = (data: HeroData) => setHeroData(data);
  
  // Home Services
  const updateService = (id: number, data: Omit<ServiceItem, 'id'>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
  };

  // Contact
  const updateContactData = (data: ContactData) => setContactData(data);

  return (
    <SchoolContext.Provider value={{ 
      isAdmin, login, logout, 
      announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement,
      visionText, missionText, valuesList, visionSlogan, updateVisionMission,
      scheduleData, updateScheduleCell,
      results, addResult, deleteResult,
      teachers, addTeacher, updateTeacher, deleteTeacher,
      heroData, updateHeroData,
      services, updateService,
      contactData, updateContactData
    }}>
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) throw new Error('useSchool must be used within SchoolProvider');
  return context;
};