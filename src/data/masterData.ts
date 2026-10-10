export const BUSINESS_CONFIG = {
  name: 'DISCOVERY HOME TUITION',
  slogan: 'Right Tutor • Right Student',
  tagline: 'Har Bacche Ke Liye Sahi Teacher, Har Ghar Tak.',
  taglineHindi: 'हर बच्चे के लिए सही टीचर, हर घर तक।',
  location: 'Orai, Uttar Pradesh, India',
  city: 'Orai',
  phone: '7268961107',
  formattedPhone: '+91 7268961107',
  whatsappNumber: '917268961107',
  address: 'Rath Road / Rajendra Nagar, Orai, Jalaun, Uttar Pradesh - 285001',
  workingHours: '8:00 AM - 9:00 PM (All 7 Days)',
  email: 'discoveryhometuition.orai@gmail.com',
};

export const CLASSES_LIST = [
  'Nursery',
  'LKG',
  'UKG',
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
  'Class 11',
  'Class 12',
];

export const CLASS_GROUPS = [
  { label: 'Pre-Primary (Nursery, LKG, UKG)', values: ['Nursery', 'LKG', 'UKG'] },
  { label: 'Primary (Class 1 to 5)', values: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'] },
  { label: 'Middle School (Class 6 to 8)', values: ['Class 6', 'Class 7', 'Class 8'] },
  { label: 'Secondary (Class 9 to 10)', values: ['Class 9', 'Class 10'] },
  { label: 'Senior Secondary (Class 11 to 12)', values: ['Class 11', 'Class 12'] },
];

export const BOARDS_LIST = [
  'CBSE',
  'ICSE',
  'UP Board',
];

export const CORE_SUBJECTS = [
  'All Subjects',
  'Mathematics',
  'Science',
  'English',
  'Hindi',
  'Social Science',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer',
  'Accounts',
  'Economics',
  'Business Studies',
];

export const ADDITIONAL_SERVICES = [
  { name: 'Phonics', description: 'Early reading & pronunciation for kids', icon: 'Sparkles' },
  { name: 'Abacus', description: 'Mental math calculation speed & focus', icon: 'Calculator' },
  { name: 'Vedic Maths', description: 'Rapid mental arithmetic shortcuts', icon: 'Brain' },
  { name: 'Handwriting Improvement', description: 'Neat English & Hindi cursive writing', icon: 'PenTool' },
  { name: 'Spoken English', description: 'Fluency, vocabulary & public speaking', icon: 'MessageSquare' },
  { name: 'Coding / Computer Classes', description: 'Python, Scratch, Web & basic computers', icon: 'Code' },
  { name: 'Dance', description: 'Classical & contemporary home training', icon: 'Music' },
  { name: 'Music', description: 'Vocal, Harmonium, Guitar & Keyboard', icon: 'Headphones' },
  { name: 'Competitive Exam Preparation', description: 'Navodaya, Sainik School, NTSE, Olympiad', icon: 'Trophy' },
];

export interface OraiNeighborhood {
  name: string;
  pincode: string;
  landmarks?: string;
}

export const ORAI_NEIGHBORHOODS: OraiNeighborhood[] = [
  { name: 'Indra Nagar', pincode: '285001', landmarks: 'Civil Sector & Main Road' },
  { name: 'Tulsi Nagar', pincode: '285001', landmarks: 'Near Konch Road' },
  { name: 'Sushil Nagar', pincode: '285001', landmarks: 'Behind Railway Station' },
  { name: 'Indra Colony', pincode: '285001', landmarks: 'Near Rath Road & Degree College' },
  { name: 'Vivekanand Colony', pincode: '285001', landmarks: 'Near Station Road / Railway Crossing' },
  { name: 'Officer Colony', pincode: '285001', landmarks: 'Collectorate & District Courts' },
  { name: 'Patel Nagar', pincode: '285001', landmarks: 'Near Gwalior Road / Bypass' },
  { name: 'Shanti Nagar', pincode: '285001', landmarks: 'Shanti Nagar Residential Sector' },
  { name: 'Kuiya Road', pincode: '285001', landmarks: 'Kuiya Road Connecting Belt' },
  { name: 'Gopalganj', pincode: '285001', landmarks: 'Gopalganj Central Market' },
  { name: 'Ram Nagar', pincode: '285001', landmarks: 'Ram Nagar Colony, Central Orai' },
  { name: 'Umrarkhera', pincode: '285002', landmarks: 'Umrarkhera School Hub & Outer Orai' },
  { name: 'Mechanic Nagar', pincode: '285001', landmarks: 'Mechanic Nagar Auto & Workshop Belt' },
  { name: 'Eklaspura', pincode: '285001', landmarks: 'Eklaspura Residential Belt' },
  { name: 'Karmer Road', pincode: '285001', landmarks: 'Karmer Highway Link' },
  { name: 'Baghaura', pincode: '285001', landmarks: 'Baghaura Chowk & Colony' },
  { name: 'Churkhi Road', pincode: '285001', landmarks: 'Churkhi Road & Bypass Area' },
  { name: 'Rajendra Nagar', pincode: '285001', landmarks: 'Water Tank, City Center' },
  { name: 'Rath Road', pincode: '285001', landmarks: 'Rath Chauraha, Degree College' },
  { name: 'Konch Road', pincode: '285001', landmarks: 'Konch Gate, Bypass Road' },
  { name: 'Konch Bus Stand Area', pincode: '285001', landmarks: 'Bus Terminal' },
  { name: 'Jail Road', pincode: '285001', landmarks: 'District Jail & Police Lines' },
  { name: 'Shivaji Nagar', pincode: '285001', landmarks: 'Shivaji Chowk' },
  { name: 'Station Road', pincode: '285001', landmarks: 'Railway Station Colony' },
  { name: 'Kalpi Road', pincode: '285001', landmarks: 'Kalpi Highway Crossing' },
  { name: 'Bajaria', pincode: '285001', landmarks: 'Old Market Central' },
  { name: 'Ambedkar Chauraha', pincode: '285001', landmarks: 'Ambedkar Circle' },
  { name: 'Indira Nagar', pincode: '285001', landmarks: 'Civil Sector' },
  { name: 'Shastri Nagar', pincode: '285001', landmarks: 'Near Head Post Office' },
  { name: 'Betwa Colony', pincode: '285001', landmarks: 'Officers Colony' },
  { name: 'Civil Lines Orai', pincode: '285001', landmarks: 'Collectorate, Court' },
  { name: 'Thana Kotwali Area', pincode: '285001', landmarks: 'Kotwali Old City' },
  { name: 'Mandi Samiti Area', pincode: '285002', landmarks: 'Mandi Samiti & Outer Belt' },
];

export const ORAI_PINCODES = [
  { code: '285001', label: '285001 (Central Orai)' },
  { code: '285002', label: '285002 (Mandi Samiti / Umrarkhera / Outer Orai)' },
];

export function getNeighborhoodPincode(name: string): string {
  const norm = name.toLowerCase().trim();
  const found = ORAI_NEIGHBORHOODS.find(
    (n) => n.name.toLowerCase() === norm ||
      (norm.includes('indra') && n.name.toLowerCase().includes('indra'))
  );
  return found ? found.pincode : '285001';
}

export function getNeighborhoodsByPincode(pincode: string): string[] {
  if (!pincode) return ORAI_NEIGHBORHOODS.map((n) => n.name);
  return ORAI_NEIGHBORHOODS.filter((n) => n.pincode === pincode).map((n) => n.name);
}

export const ORAI_LOCALITIES = [
  'Indra Nagar',
  'Tulsi Nagar',
  'Sushil Nagar',
  'Indra Colony',
  'Vivekanand Colony',
  'Officer Colony',
  'Patel Nagar',
  'Shanti Nagar',
  'Kuiya Road',
  'Gopalganj',
  'Ram Nagar',
  'Umrarkhera',
  'Mechanic Nagar',
  'Eklaspura',
  'Karmer Road',
  'Baghaura',
  'Churkhi Road',
  'Rajendra Nagar',
  'Rath Road',
  'Konch Road',
  'Konch Bus Stand Area',
  'Jail Road',
  'Shivaji Nagar',
  'Station Road',
  'Kalpi Road',
  'Bajaria',
  'Ambedkar Chauraha',
  'Indira Nagar',
  'Shastri Nagar',
  'Betwa Colony',
  'Civil Lines Orai',
  'Thana Kotwali Area',
  'Mandi Samiti Area',
  'All Areas in Orai',
];

export const TIME_SLOTS = [
  'Morning (6:00 AM - 9:00 AM)',
  'Afternoon (2:00 PM - 4:00 PM)',
  'Evening (4:00 PM - 6:00 PM)',
  'Late Evening (6:00 PM - 8:30 PM)',
  'Flexible / Any Convenient Time',
];

export const DAYS_PREFERENCES = [
  '6 Days a Week (Mon - Sat)',
  '5 Days a Week (Mon - Fri)',
  '3 Days a Week (Alternate Days)',
  'Weekend Only (Sat - Sun)',
  'Daily including Sunday Test',
];

export const QUALIFICATIONS_LIST = [
  'B.Sc / M.Sc (Mathematics/Science)',
  'B.Tech / M.Tech',
  'B.A / M.A (English/Literature)',
  'B.Com / M.Com (Commerce/Accounts)',
  'B.Ed / D.El.Ed (Certified Teacher)',
  'Ph.D / Research Scholar',
  'Graduate / Post Graduate',
];

export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;
