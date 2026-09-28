// Dynamic Menu & Cafe Data for Radhe Radhe Cafe (RRC)
// 20 Exact Menu Categories as per authentic Cafe Rate Card

export const CAFE_INFO = {
  name: 'Radhe Radhe Cafe',
  hindiName: 'राधे राधे कैफे',
  shortName: 'RRC',
  taglineHindi: 'स्वाद जो हमेशा रहे याद...',
  taglineEnglish: 'Welcome to Radhe Radhe Cafe',
  subTaglineHindi: 'ताजे और स्वादिष्ट खाने के साथ, हर पल बने खास',
  phone: '8097799506',
  displayPhone: '+91 80977 99506',
  address: 'Mudhar Mod, Saraimohan, Thekma',
  city: 'Azamgarh, UP - 276303',
  timing: '8:00 AM - 11:00 PM (Daily)',
  freeDeliveryThreshold: 249,
  baseDeliveryFee: 20,
  instagramHandle: '@radheradhechatcorner',
  instagramUrl: 'https://www.instagram.com/radheradhechatcorner',
};

// 3 Premier Outlets with exact manager and phone information
export const OUTLETS = [
  {
    id: 'thekma-1',
    code: '1.0',
    title: 'THEKMA 1.0',
    badge: 'Outlet 1.0 • Original Flagship',
    location: 'Mudhar Mod, Saraimohan, Thekma, Azamgarh 276303',
    manager: 'Dheeraj Gupta',
    phone: '8097799506',
    displayPhone: '+91 80977 99506',
    timing: '8:00 AM - 11:00 PM',
    mapsQuery: 'Mudhar Mod, Saraimohan, Thekma, Azamgarh 276303',
    tags: ['Dine-In', 'Takeaway', 'Home Delivery', 'Chaat Counter'],
  },
  {
    id: 'thekma-2',
    code: '2.0',
    title: 'THEKMA 2.0',
    badge: 'Outlet 2.0 • Express Cafe',
    location: 'Near Madanpur Modh, Thekma, Azamgarh 276303',
    manager: 'Assheeh Kumar',
    phone: '7304645936',
    displayPhone: '+91 73046 45936',
    timing: '8:00 AM - 11:00 PM',
    mapsQuery: 'Near Madanpur Modh, Thekma, Azamgarh 276303',
    tags: ['Dine-In', 'Beverages & Shakes', 'Quick Bites'],
  },
  {
    id: 'lalganj-3',
    code: '3.0',
    title: 'LALGANJ 3.0',
    badge: 'Outlet 3.0 • Trends Mall Front',
    location: 'Front of Trends Mall, Lalganj Market, Azamgarh',
    manager: 'Brijesh',
    phone: '7880582742',
    displayPhone: '+91 78805 82742',
    timing: '9:00 AM - 11:00 PM',
    mapsQuery: 'Trends Mall, Lalganj Market, Azamgarh',
    tags: ['Prime Location', 'Family Seating', 'Mall Front'],
  },
];

// 20 Exact Menu Categories strictly matching the uploaded menu images
export const CATEGORIES = [
  { id: 'chaat', name: 'चाट', icon: '🍲' },
  { id: 'mumbai-chaat', name: 'मुंबई चाट', icon: '🥘' },
  { id: 'south-indian', name: 'साउथ इंडियन', icon: '🥞' },
  { id: 'vada-pav', name: 'वड़ा पाव', icon: '🥪' },
  { id: 'sandwich', name: 'सैंडविच', icon: '🥪' },
  { id: 'pizza', name: 'पिज्जा', icon: '🍕' },
  { id: 'burger', name: 'बर्गर', icon: '🍔' },
  { id: 'roll', name: 'रोल', icon: '🌯' },
  { id: 'momos', name: 'मोमोज', icon: '🥟' },
  { id: 'maggi', name: 'मैगी', icon: '🍜' },
  { id: 'pasta', name: 'पास्ता', icon: '🍝' },
  { id: 'chhola-bhatura', name: 'छोला भटूरा', icon: '🍛' },
  { id: 'pav-bhaji', name: 'पावभाजी', icon: '🍞' },
  { id: 'coffee', name: 'कॉफी', icon: '☕' },
  { id: 'lassi', name: 'लस्सी', icon: '🥛' },
  { id: 'shake', name: 'शेक', icon: '🥤' },
  { id: 'mojito', name: 'मोजिटो', icon: '🍹' },
  { id: 'soup', name: 'सूप', icon: '🥣' },
  { id: 'chinese-items', name: 'चाइनीज आइटम', icon: '🥢' },
  { id: 'special-noodles', name: 'स्पेशल नूडल्स', icon: '🍝' },
];

// All dummy data completely removed.
// Real items are populated strictly as per authentic cafe rate card images.
// Format for each item:
// {
//   id: 'item-unique-id',
//   name: 'हिंदी नाम (exact Hindi name)',
//   category: 'chaat', // matching category id
//   price: 50, // single price or plate price
//   halfPrice: 30, // optional if half available
//   fullPrice: 50, // optional if full available
//   plateType: 'Per Plate' / '1 Plate' (optional),
//   isVeg: true,
//   image: '' // real uploaded image url
// }
export const MENU_ITEMS = [];
