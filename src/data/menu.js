// Authentic Cafe Menu Data for Radhe Radhe Cafe (RRC)
// 100% Real Data strictly from Cafe Rate Card - Zero Dummy Content

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
  baseDeliveryFee: 10,        // Base delivery charge = ₹10 (always applicable)
  baseDeliveryDistanceKm: 2,  // Base distance = 2 km
  extraKmRate: 20,            // Extra charge = ₹20 per km (after 2 km)
  instagramHandle: '@radheradhechatcorner',
  instagramUrl: 'https://www.instagram.com/radheradhechatcorner',
};

// 3 Premier Outlets with exact manager, phone, and operational timings
export const OUTLETS = [
  {
    id: 'thekma-1',
    code: '1.0',
    title: 'Thekma 1.0',
    badge: 'Outlet 1.0 • Original Flagship',
    location: 'Mudhar Mod, Saraimohan, Thekma, Azamgarh 276303',
    manager: 'Dheeraj Gupta',
    phone: '8097799506',
    displayPhone: '+91 80977 99506',
    timing: '10:00 AM – 10:00 PM',
    openHour: 10,
    closeHour: 22,
    mapsQuery: 'Mudhar Mod, Saraimohan, Thekma, Azamgarh 276303',
    tags: ['Dine-In', 'Takeaway', 'Home Delivery', 'Chaat Counter'],
  },
  {
    id: 'thekma-2',
    code: '2.0',
    title: 'Thekma 2.0',
    badge: 'Outlet 2.0 • Express Cafe',
    location: 'Near Madanpur Modh, Thekma, Azamgarh 276303',
    manager: 'Assheeh Kumar',
    phone: '7304645936',
    displayPhone: '+91 73046 45936',
    timing: '10:00 AM – 10:00 PM',
    openHour: 10,
    closeHour: 22,
    mapsQuery: 'Near Madanpur Modh, Thekma, Azamgarh 276303',
    tags: ['Dine-In', 'Beverages & Shakes', 'Quick Bites'],
  },
  {
    id: 'lalganj-3',
    code: '3.0',
    title: 'Lalganj 3.0',
    badge: 'Outlet 3.0 • Trends Mall Front',
    location: 'Front of Trends Mall, Lalganj Market, Azamgarh',
    manager: 'Brijesh',
    phone: '7880582742',
    displayPhone: '+91 78805 82742',
    timing: '3:00 PM – 10:00 PM',
    openHour: 15,
    closeHour: 22,
    mapsQuery: 'Trends Mall, Lalganj Market, Azamgarh',
    tags: ['Prime Location', 'Family Seating', 'Mall Front'],
  },
];

// Helper to check whether an outlet is currently open based on current time
export const isOutletOpen = (outletOrTitle, now = new Date()) => {
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const title = (typeof outletOrTitle === 'string' ? outletOrTitle : outletOrTitle?.title || '').toLowerCase();

  if (title.includes('lalganj') || title.includes('3.0')) {
    // Lalganj 3.0: 3:00 PM (15:00) to 10:00 PM (22:00)
    return currentMinutes >= 15 * 60 && currentMinutes < 22 * 60;
  } else {
    // Thekma 1.0 & 2.0: 10:00 AM (10:00) to 10:00 PM (22:00)
    return currentMinutes >= 10 * 60 && currentMinutes < 22 * 60;
  }
};

// Helper to get formatted timing text
export const getOutletTimingText = (outletOrTitle) => {
  const title = (typeof outletOrTitle === 'string' ? outletOrTitle : outletOrTitle?.title || '').toLowerCase();
  if (title.includes('lalganj') || title.includes('3.0')) {
    return '3:00 PM – 10:00 PM';
  }
  return '10:00 AM – 10:00 PM';
};

// Outlet WhatsApp Number Mapping for automatic order routing
export const OUTLET_CONTACTS = {
  'Thekma 1.0': '918097799506',
  'Thekma 2.0': '917304645936',
  'Lalganj 3.0': '917880582742',
};

// 22 Official Serviceable Delivery Areas (Local Azamgarh & Thekma clusters)
export const DELIVERY_AREAS = [
  'Hajarpur',
  'Jamuaawa',
  'Deekshitpur',
  'Feti',
  'Mahuwari',
  'Zindopur',
  'Bhagwanpur',
  'Shadipur',
  'Kitpur',
  'Ahirauli',
  'Bela',
  'Bhavtar',
  'Saraypaldu',
  'Kharela',
  'Sidhoni',
  'Barkaspur',
  'Thekma',
  'Mirzapur',
  'Bijoli',
  'Saraymohan',
  'Bovapar',
  'Madanpur',
];

// Delivery fee calculation matching exact rule:
// - Base delivery charge = ₹10 (always applicable)
// - If distance ≤ 2 km: Total delivery = ₹10 only
// - If distance > 2 km: Extra charge = ₹20 per km (after 2 km)
//   Total delivery = ₹10 + (extra_km × ₹20)
// Examples:
// - 1.5 km → ₹10
// - 3 km → ₹10 + (1 × 20) = ₹30
// - 5 km → ₹10 + (3 × 20) = ₹70
export const calculateDeliveryFee = (distanceOrSubtotal, maybeDistance) => {
  let distance = 2;
  let subtotal = 1;

  if (maybeDistance !== undefined) {
    subtotal = parseFloat(distanceOrSubtotal);
    distance = parseFloat(maybeDistance);
    if (isNaN(subtotal)) subtotal = 1;
  } else if (distanceOrSubtotal !== undefined) {
    distance = parseFloat(distanceOrSubtotal);
  }

  // If cart is empty, delivery fee is 0
  if (subtotal <= 0) return 0;

  const dist = isNaN(distance) || distance <= 0 ? 2 : distance;

  if (dist <= 2) {
    return 10;
  }

  const extraKm = dist - 2;
  return Math.round(10 + extraKm * 20);
};

// 20 Exact Menu Categories with premium matching food photography
export const CATEGORIES = [
  {
    id: 'lassi',
    name: 'लस्सी',
    englishName: 'LASSI',
    icon: '🍹',
    description: 'ठंडी, मलाईदार और ताज़ा पारंपरिक व फ्लेवर्ड लस्सी',
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mojito',
    name: 'मॉकटेल / मोजिटो',
    englishName: 'MOCKTAIL / MOJITO',
    icon: '🍸',
    description: 'ठंडे, ताजगी भरे मिंट व फ्रूट फ्लेवर्ड रिफ्रेशिंग मोजिटो',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sweet-corn',
    name: 'स्वीट कॉर्न',
    englishName: 'SWEET CORN',
    icon: '🌽',
    description: 'गर्मा-गर्म मसालेदार व क्रीमी मक्खन स्वीट कॉर्न',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'coffee-tea',
    name: 'कॉफी / चाय',
    englishName: 'COFFEE / TEA',
    icon: '☕',
    description: 'कुल्हड़ अदरक-इलायची चाय और गर्मा-गर्म व कोल्ड कॉफी',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'snacks',
    name: 'स्नैक्स',
    englishName: 'SNACKS',
    icon: '🥪',
    description: 'ताजा मस्का बन और क्रिस्पी बटर गार्लिक ब्रेड',
    image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'shakes',
    name: 'शेक',
    englishName: 'SHAKES',
    icon: '🥤',
    description: 'गाढ़े, टेस्टी और रिच फ्लेवर्ड मिल्कशेक व ओरियो-किटकेट',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'burger',
    name: 'बर्गर',
    englishName: 'BURGER',
    icon: '🍔',
    description: 'क्रिस्पी पेटी, चीज व फ्रेश पनीर से लोडेड बर्गर',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'roll',
    name: 'रोल',
    englishName: 'ROLL',
    icon: '🌯',
    description: 'क्रिस्पी लच्छा पराठे में लिपटा स्वादिष्ट पनीर व वेज रोल',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'momos',
    name: 'मोमोज',
    englishName: 'MOMOS',
    icon: '🥟',
    description: 'स्टीम, फ्राइड, तंदूरी व चीज लोडेड पनीर मोमोज तीखी चटनी के साथ',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'maggi',
    name: 'मैगी',
    englishName: 'MAGGI',
    icon: '🍜',
    description: 'गरमा-गरम वेज, चीज, पनीर और देसी तड़का मसाला मैगी',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pasta',
    name: 'पास्ता',
    englishName: 'PASTA',
    icon: '🍝',
    description: 'चीजी व्हाइट सॉस और चटपटा इटैलियन रेड सॉस पास्ता',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pizza',
    name: 'पिज्जा',
    englishName: 'PIZZA',
    icon: '🍕',
    description: 'क्रिस्पी क्रस्ट, लोडेड चीज, पनीर व वेजी से भरपूर हॉट पिज्जा',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sandwich',
    name: 'सैंडविच',
    englishName: 'SANDWICH',
    icon: '🥪',
    description: 'ग्रिल्ड मुंबई टोस्ट, चीज व पनीर सैंडविच हरी चटनी संग',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'chaat',
    name: 'चाट (GENUINE CHAAT)',
    englishName: 'CHAAT',
    icon: '🥟',
    description: 'देसी घी, अमूल बटर, दही व पनीर की असली जायकेदार चाट',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mumbai-chaat',
    name: 'मुंबई चाट',
    englishName: 'MUMBAI CHAAT',
    icon: '🥟',
    description: 'क्रंची सेव पूरी, भेल पूरी, पानी पूरी और स्पेशल दही वड़ा',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'south-indian',
    name: 'साउथ इंडियन',
    englishName: 'SOUTH INDIAN',
    icon: '🥘',
    description: 'क्रिस्पी डोसा, सॉफ्ट इडली और सांभर-चटनी के साथ स्पेशल उत्तपम',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'chinese',
    name: 'चाइनीज (HALF / FULL)',
    englishName: 'CHINESE (HALF / FULL)',
    icon: '🍛',
    description: 'हाफ व फुल में उपलब्ध वोक फ्राइड राइस और हक्का नूडल्स',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'soup',
    name: 'सूप',
    englishName: 'SOUP',
    icon: '🍲',
    description: 'गरमा-गरम मनचाऊ, हॉट एंड सोर और पनीर व मशरूम सूप',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'chilli',
    name: 'चिली व स्टार्टर्स',
    englishName: 'CHILLI & STARTERS',
    icon: '🌶️',
    description: 'पनीर चिली ड्राई/ग्रेवी, पनीर 65, मशरूम 65 और वेज लॉलीपॉप',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'vada-pav',
    name: 'वड़ा पाव / दाबेली',
    englishName: 'VADA PAV / DABELI',
    icon: '🍔',
    description: 'मुंबई स्टाइल तीखा वड़ा पाव, चीज वड़ा पाव और कच्छी दाबेली',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80',
  },
];

// Complete Real Menu Items matching exact customer data
export const MENU_ITEMS = [
  // ----------------------------------------------------
  // 1. 🍹 LASSI
  // ----------------------------------------------------
  {
    id: 'lassi-normal',
    name: 'Normal Lassi',
    hindiName: 'नॉर्मल लस्सी',
    category: 'lassi',
    price: 40,
    isVeg: true,
  },
  {
    id: 'lassi-mango',
    name: 'Mango Lassi',
    hindiName: 'मैंगो लस्सी',
    category: 'lassi',
    price: 70,
    isVeg: true,
  },
  {
    id: 'lassi-chocolate',
    name: 'Chocolate Lassi',
    hindiName: 'चॉकलेट लस्सी',
    category: 'lassi',
    price: 70,
    isVeg: true,
  },
  {
    id: 'lassi-strawberry',
    name: 'Strawberry Lassi',
    hindiName: 'स्ट्रॉबेरी लस्सी',
    category: 'lassi',
    price: 70,
    isVeg: true,
  },

  // ----------------------------------------------------
  // 2. 🍸 MOCKTAIL / MOJITO
  // ----------------------------------------------------
  {
    id: 'mojito-virgin',
    name: 'Virgin Mojito',
    hindiName: 'वर्जिन मोजिटो',
    category: 'mojito',
    price: 40,
    isVeg: true,
  },
  {
    id: 'mojito-blue-lagoon',
    name: 'Blue Lagoon',
    hindiName: 'ब्लू लैगून',
    category: 'mojito',
    price: 70,
    isVeg: true,
  },
  {
    id: 'mojito-blue-berry',
    name: 'Blue Berry',
    hindiName: 'ब्लू बेरी मोजिटो',
    category: 'mojito',
    price: 70,
    isVeg: true,
  },
  {
    id: 'mojito-watermelon',
    name: 'Watermelon',
    hindiName: 'वाटरमेलन मोजिटो',
    category: 'mojito',
    price: 70,
    isVeg: true,
  },
  {
    id: 'mojito-green-apple',
    name: 'Green Apple',
    hindiName: 'ग्रीन एप्पल मोजिटो',
    category: 'mojito',
    price: 70,
    isVeg: true,
  },
  {
    id: 'mojito-strawberry',
    name: 'Strawberry',
    hindiName: 'स्ट्रॉबेरी मोजिटो',
    category: 'mojito',
    price: 70,
    isVeg: true,
  },
  {
    id: 'mojito-litchi',
    name: 'Litchi',
    hindiName: 'लीची मोजिटो',
    category: 'mojito',
    price: 70,
    isVeg: true,
  },
  {
    id: 'mojito-kala-khatta',
    name: 'Kala Khatta',
    hindiName: 'काला खट्टा मोजिटो',
    category: 'mojito',
    price: 70,
    isVeg: true,
  },
  {
    id: 'mojito-pineapple',
    name: 'Pineapple',
    hindiName: 'पाइनएप्पल मोजिटो',
    category: 'mojito',
    price: 70,
    isVeg: true,
  },

  // ----------------------------------------------------
  // 3. 🌽 SWEET CORN
  // ----------------------------------------------------
  {
    id: 'sweet-corn-spicy',
    name: 'Spicy Sweet Corn',
    hindiName: 'स्पाइसी स्वीट कॉर्न',
    category: 'sweet-corn',
    price: 49,
    isVeg: true,
  },
  {
    id: 'sweet-corn-creamy',
    name: 'Creamy Sweet Corn',
    hindiName: 'क्रीमी स्वीट कॉर्न',
    category: 'sweet-corn',
    price: 99,
    isVeg: true,
  },

  // ----------------------------------------------------
  // 4. ☕ COFFEE / TEA
  // ----------------------------------------------------
  {
    id: 'coffee-adrak-elaichi-chai',
    name: 'Adrak Elaichi Chai',
    hindiName: 'अदरक इलायची चाय',
    category: 'coffee-tea',
    price: 20,
    isVeg: true,
  },
  {
    id: 'coffee-normal',
    name: 'Normal Coffee',
    hindiName: 'नॉर्मल हॉट कॉफी',
    category: 'coffee-tea',
    price: 40,
    isVeg: true,
  },
  {
    id: 'coffee-chocolate',
    name: 'Chocolate Coffee',
    hindiName: 'चॉकलेट कॉफी',
    category: 'coffee-tea',
    price: 50,
    isVeg: true,
  },
  {
    id: 'coffee-cold',
    name: 'Cold Coffee',
    hindiName: 'कोल्ड कॉफी',
    category: 'coffee-tea',
    price: 80,
    isVeg: true,
  },

  // ----------------------------------------------------
  // 5. 🥪 SNACKS
  // ----------------------------------------------------
  {
    id: 'snack-maska-bun',
    name: 'Maska Bun',
    hindiName: 'मस्का बन',
    category: 'snacks',
    price: 29,
    isVeg: true,
  },
  {
    id: 'snack-garlic-bread',
    name: 'Garlic Bread',
    hindiName: 'गार्लिक ब्रेड',
    category: 'snacks',
    price: 49,
    isVeg: true,
  },

  // ----------------------------------------------------
  // 6. 🥤 SHAKES
  // ----------------------------------------------------
  {
    id: 'shake-chocolate',
    name: 'Chocolate Shake',
    hindiName: 'चॉकलेट शेक',
    category: 'shakes',
    price: 69,
    isVeg: true,
  },
  {
    id: 'shake-strawberry',
    name: 'Strawberry Shake',
    hindiName: 'स्ट्रॉबेरी शेक',
    category: 'shakes',
    price: 69,
    isVeg: true,
  },
  {
    id: 'shake-mango',
    name: 'Mango Shake',
    hindiName: 'मैंगो शेक',
    category: 'shakes',
    price: 69,
    isVeg: true,
  },
  {
    id: 'shake-vanilla',
    name: 'Vanilla Shake',
    hindiName: 'वैनिला शेक',
    category: 'shakes',
    price: 69,
    isVeg: true,
  },
  {
    id: 'shake-kitkat',
    name: 'KitKat Shake',
    hindiName: 'किटकेट शेक',
    category: 'shakes',
    price: 79,
    isVeg: true,
  },
  {
    id: 'shake-oreo',
    name: 'Oreo Shake',
    hindiName: 'ओरियो शेक',
    category: 'shakes',
    price: 79,
    isVeg: true,
  },
  {
    id: 'shake-butterscotch',
    name: 'Butterscotch Shake',
    hindiName: 'बटरस्कॉच शेक',
    category: 'shakes',
    price: 69,
    isVeg: true,
  },

  // ----------------------------------------------------
  // 7. 🍔 BURGER
  // ----------------------------------------------------
  {
    id: 'burger-veg',
    name: 'Veg Burger',
    hindiName: 'वेज बर्गर',
    category: 'burger',
    price: 50,
    isVeg: true,
  },
  {
    id: 'burger-cheese',
    name: 'Cheese Burger',
    hindiName: 'चीज बर्गर',
    category: 'burger',
    price: 60,
    isVeg: true,
  },
  {
    id: 'burger-paneer',
    name: 'Paneer Burger',
    hindiName: 'पनीर बर्गर',
    category: 'burger',
    price: 70,
    isVeg: true,
  },
  {
    id: 'burger-paneer-cheese',
    name: 'Paneer Cheese Burger',
    hindiName: 'पनीर चीज बर्गर',
    category: 'burger',
    price: 80,
    isVeg: true,
  },

  // ----------------------------------------------------
  // 8. 🌯 ROLL
  // ----------------------------------------------------
  {
    id: 'roll-paneer',
    name: 'Paneer Roll',
    hindiName: 'पनीर रोल',
    category: 'roll',
    price: 80,
    isVeg: true,
  },
  {
    id: 'roll-veg',
    name: 'Veg Roll',
    hindiName: 'वेज रोल',
    category: 'roll',
    price: 60,
    isVeg: true,
  },

  // ----------------------------------------------------
  // 9. 🥟 MOMOS
  // ----------------------------------------------------
  {
    id: 'momos-steam-paneer',
    name: 'Steam Paneer Momos (6 pcs)',
    hindiName: 'स्टीम पनीर मोमोज (6 pcs)',
    category: 'momos',
    price: 60,
    plateType: '6 pcs',
    isVeg: true,
  },
  {
    id: 'momos-fried-paneer',
    name: 'Fried Paneer Momos',
    hindiName: 'फ्राइड पनीर मोमोज',
    category: 'momos',
    price: 80,
    isVeg: true,
  },
  {
    id: 'momos-chilli-paneer',
    name: 'Chilli Paneer Momos',
    hindiName: 'चिली पनीर मोमोज',
    category: 'momos',
    price: 80,
    isVeg: true,
  },
  {
    id: 'momos-cheese-loaded',
    name: 'Cheese Loaded Momos',
    hindiName: 'चीज लोडेड मोमोज',
    category: 'momos',
    price: 180,
    isVeg: true,
  },
  {
    id: 'momos-afghani-paneer',
    name: 'Afghani Paneer Momos',
    hindiName: 'अफगानी पनीर मोमोज',
    category: 'momos',
    price: 160,
    isVeg: true,
  },
  {
    id: 'momos-tandoori',
    name: 'Tandoori Momos',
    hindiName: 'तंदूरी मोमोज',
    category: 'momos',
    price: 160,
    isVeg: true,
  },

  // ----------------------------------------------------
  // 10. 🍜 MAGGI
  // ----------------------------------------------------
  {
    id: 'maggi-garlic',
    name: 'Garlic Maggi',
    hindiName: 'गार्लिक मैगी',
    category: 'maggi',
    price: 49,
    isVeg: true,
  },
  {
    id: 'maggi-paneer',
    name: 'Paneer Maggi',
    hindiName: 'पनीर मैगी',
    category: 'maggi',
    price: 59,
    isVeg: true,
  },
  {
    id: 'maggi-cheese',
    name: 'Cheese Maggi',
    hindiName: 'चीज मैगी',
    category: 'maggi',
    price: 90,
    isVeg: true,
  },
  {
    id: 'maggi-veg',
    name: 'Veg Maggi',
    hindiName: 'वेज मैगी',
    category: 'maggi',
    price: 69,
    isVeg: true,
  },
  {
    id: 'maggi-masala',
    name: 'Masala Maggi',
    hindiName: 'मसाला मैगी',
    category: 'maggi',
    price: 69,
    isVeg: true,
  },
  {
    id: 'maggi-plain',
    name: 'Plain Maggi',
    hindiName: 'प्लेन मैगी',
    category: 'maggi',
    price: 25,
    isVeg: true,
  },

  // ----------------------------------------------------
  // 11. 🍝 PASTA
  // ----------------------------------------------------
  {
    id: 'pasta-red-sauce',
    name: 'Red Sauce Pasta',
    hindiName: 'रेड सॉस पास्ता',
    category: 'pasta',
    price: 80,
    isVeg: true,
  },
  {
    id: 'pasta-white-sauce',
    name: 'White Sauce Pasta',
    hindiName: 'व्हाइट सॉस पास्ता',
    category: 'pasta',
    price: 110,
    isVeg: true,
  },

  // ----------------------------------------------------
  // 12. 🍕 PIZZA
  // ----------------------------------------------------
  {
    id: 'pizza-margherita',
    name: 'Margherita',
    hindiName: 'मार्गेरीटा पिज्जा',
    category: 'pizza',
    price: 140,
    isVeg: true,
  },
  {
    id: 'pizza-mix-veg',
    name: 'Mix Veg Pizza',
    hindiName: 'मिक्स वेज पिज्जा',
    category: 'pizza',
    price: 160,
    isVeg: true,
  },
  {
    id: 'pizza-sweet-corn',
    name: 'Sweet Corn Pizza',
    hindiName: 'स्वीट कॉर्न पिज्जा',
    category: 'pizza',
    price: 170,
    isVeg: true,
  },
  {
    id: 'pizza-tandoori',
    name: 'Tandoori Pizza',
    hindiName: 'तंदूरी पिज्जा',
    category: 'pizza',
    price: 160,
    isVeg: true,
  },
  {
    id: 'pizza-capsicum',
    name: 'Capsicum Pizza',
    hindiName: 'कैप्सिकम पिज्जा',
    category: 'pizza',
    price: 150,
    isVeg: true,
  },
  {
    id: 'pizza-paneer',
    name: 'Paneer Pizza',
    hindiName: 'पनीर पिज्जा',
    category: 'pizza',
    price: 190,
    isVeg: true,
  },
  {
    id: 'pizza-paneer-sweet-corn',
    name: 'Paneer Sweet Corn Pizza',
    hindiName: 'पनीर स्वीट कॉर्न पिज्जा',
    category: 'pizza',
    price: 230,
    isVeg: true,
  },
  {
    id: 'pizza-paneer-tandoori',
    name: 'Paneer Tandoori Pizza',
    hindiName: 'पनीर तंदूरी पिज्जा',
    category: 'pizza',
    price: 220,
    isVeg: true,
  },
  {
    id: 'pizza-mushroom',
    name: 'Mushroom Pizza',
    hindiName: 'मशरूम पिज्जा',
    category: 'pizza',
    price: 200,
    isVeg: true,
  },
  {
    id: 'pizza-special',
    name: 'Special Pizza',
    hindiName: 'स्पेशल पिज्जा',
    category: 'pizza',
    price: 299,
    isVeg: true,
  },

  // ----------------------------------------------------
  // 13. 🥪 SANDWICH
  // ----------------------------------------------------
  {
    id: 'sandwich-simple',
    name: 'Simple Sandwich',
    hindiName: 'सिंपल सैंडविच',
    category: 'sandwich',
    price: 50,
    isVeg: true,
  },
  {
    id: 'sandwich-mumbai-toast',
    name: 'Mumbai Toast Sandwich',
    hindiName: 'मुंबई टोस्ट सैंडविच',
    category: 'sandwich',
    price: 50,
    isVeg: true,
  },
  {
    id: 'sandwich-regular',
    name: 'Regular Sandwich',
    hindiName: 'रेगुलर सैंडविच',
    category: 'sandwich',
    price: 60,
    isVeg: true,
  },
  {
    id: 'sandwich-cheese',
    name: 'Cheese Sandwich',
    hindiName: 'चीज सैंडविच',
    category: 'sandwich',
    price: 80,
    isVeg: true,
  },
  {
    id: 'sandwich-paneer',
    name: 'Paneer Sandwich',
    hindiName: 'पनीर सैंडविच',
    category: 'sandwich',
    price: 110,
    isVeg: true,
  },
  {
    id: 'sandwich-chilli-cheese',
    name: 'Chilli Cheese Sandwich',
    hindiName: 'चिली चीज सैंडविच',
    category: 'sandwich',
    price: 100,
    isVeg: true,
  },

  // ----------------------------------------------------
  // 14. 🥟 CHAAT (GENUINE CHAAT)
  // ----------------------------------------------------
  {
    id: 'chaat-tomato',
    name: 'Tomato Chaat',
    hindiName: 'टमाटर चाट',
    category: 'chaat',
    price: 25,
    isVeg: true,
  },
  {
    id: 'chaat-desi-ghee',
    name: 'Desi Ghee Chaat',
    hindiName: 'देसी घी चाट',
    category: 'chaat',
    price: 35,
    isVeg: true,
  },
  {
    id: 'chaat-amul-butter',
    name: 'Amul Butter Chaat',
    hindiName: 'अमुल बटर चाट',
    category: 'chaat',
    price: 35,
    isVeg: true,
  },
  {
    id: 'chaat-cheese',
    name: 'Cheese Chaat',
    hindiName: 'चीज चाट',
    category: 'chaat',
    price: 50,
    isVeg: true,
  },
  {
    id: 'chaat-dahi',
    name: 'Dahi Chaat',
    hindiName: 'दही चाट',
    category: 'chaat',
    price: 35,
    isVeg: true,
  },
  {
    id: 'chaat-paneer',
    name: 'Paneer Chaat',
    hindiName: 'पनीर चाट',
    category: 'chaat',
    price: 35,
    isVeg: true,
  },
  {
    id: 'chaat-tikki',
    name: 'Tikki Chaat',
    hindiName: 'टिक्की चाट',
    category: 'chaat',
    price: 35,
    isVeg: true,
  },

  // ----------------------------------------------------
  // 15. 🥟 MUMBAI CHAAT
  // ----------------------------------------------------
  {
    id: 'mumbai-sev-puri',
    name: 'Sev Puri',
    hindiName: 'सेव पूरी',
    category: 'mumbai-chaat',
    price: 30,
    isVeg: true,
  },
  {
    id: 'mumbai-dahi-sev-puri',
    name: 'Dahi Sev Puri',
    hindiName: 'दही सेव पूरी',
    category: 'mumbai-chaat',
    price: 35,
    isVeg: true,
  },
  {
    id: 'mumbai-cheese-sev-puri',
    name: 'Cheese Sev Puri',
    hindiName: 'चीज सेव पूरी',
    category: 'mumbai-chaat',
    price: 50,
    isVeg: true,
  },
  {
    id: 'mumbai-chocolate-sev-puri',
    name: 'Chocolate Sev Puri',
    hindiName: 'चॉकलेट सेव पूरी',
    category: 'mumbai-chaat',
    price: 70,
    isVeg: true,
  },
  {
    id: 'mumbai-bhel-puri',
    name: 'Bhel Puri',
    hindiName: 'भेल पूरी',
    category: 'mumbai-chaat',
    price: 30,
    isVeg: true,
  },
  {
    id: 'mumbai-dahi-bhel',
    name: 'Dahi Bhel',
    hindiName: 'दही भेल',
    category: 'mumbai-chaat',
    price: 30,
    isVeg: true,
  },
  {
    id: 'mumbai-cheese-bhel',
    name: 'Cheese Bhel',
    hindiName: 'चीज भेल',
    category: 'mumbai-chaat',
    price: 45,
    isVeg: true,
  },
  {
    id: 'mumbai-pani-puri',
    name: 'Pani Puri',
    hindiName: 'पानी पूरी',
    category: 'mumbai-chaat',
    price: 15,
    isVeg: true,
  },
  {
    id: 'mumbai-dahi-puri',
    name: 'Dahi Puri',
    hindiName: 'दही पूरी',
    category: 'mumbai-chaat',
    price: 30,
    isVeg: true,
  },
  {
    id: 'mumbai-chocolate-dahi-puri',
    name: 'Chocolate Dahi Puri',
    hindiName: 'चॉकलेट दही पूरी',
    category: 'mumbai-chaat',
    price: 50,
    isVeg: true,
  },
  {
    id: 'mumbai-dahi-vada',
    name: 'Dahi Vada',
    hindiName: 'दही वड़ा',
    category: 'mumbai-chaat',
    price: 40,
    isVeg: true,
  },
  {
    id: 'mumbai-chocolate-dahi-vada',
    name: 'Chocolate Dahi Vada',
    hindiName: 'चॉकलेट दही वड़ा',
    category: 'mumbai-chaat',
    price: 60,
    isVeg: true,
  },

  // ----------------------------------------------------
  // 16. 🥘 SOUTH INDIAN
  // ----------------------------------------------------
  {
    id: 'south-idli',
    name: 'Idli (3 pcs)',
    hindiName: 'इडली (3 pcs)',
    category: 'south-indian',
    price: 40,
    plateType: '3 pcs',
    isVeg: true,
  },
  {
    id: 'south-plain-dosa',
    name: 'Plain Dosa',
    hindiName: 'प्लेन डोसा',
    category: 'south-indian',
    price: 50,
    isVeg: true,
  },
  {
    id: 'south-masala-dosa',
    name: 'Masala Dosa',
    hindiName: 'मसाला डोसा',
    category: 'south-indian',
    price: 70,
    isVeg: true,
  },
  {
    id: 'south-mysore-masala-dosa',
    name: 'Mysore Masala Dosa',
    hindiName: 'मैसूर मसाला डोसा',
    category: 'south-indian',
    price: 90,
    isVeg: true,
  },
  {
    id: 'south-paneer-masala-dosa',
    name: 'Paneer Masala Dosa',
    hindiName: 'पनीर मसाला डोसा',
    category: 'south-indian',
    price: 120,
    isVeg: true,
  },
  {
    id: 'south-cheese-masala-dosa',
    name: 'Cheese Masala Dosa',
    hindiName: 'चीज मसाला डोसा',
    category: 'south-indian',
    price: 120,
    isVeg: true,
  },
  {
    id: 'south-pav-bhaji-dosa',
    name: 'Pav Bhaji Dosa',
    hindiName: 'पाव भाजी डोसा',
    category: 'south-indian',
    price: 130,
    isVeg: true,
  },
  {
    id: 'south-chocolate-dosa',
    name: 'Chocolate Dosa',
    hindiName: 'चॉकलेट डोसा',
    category: 'south-indian',
    price: 120,
    isVeg: true,
  },
  {
    id: 'south-onion-dosa',
    name: 'Onion Dosa',
    hindiName: 'अनियन डोसा',
    category: 'south-indian',
    price: 50,
    isVeg: true,
  },
  {
    id: 'south-special-uttapam',
    name: 'Special Uttapam',
    hindiName: 'स्पेशल उत्तपम',
    category: 'south-indian',
    price: 70,
    isVeg: true,
  },
  {
    id: 'south-tomato-uttapam',
    name: 'Tomato Uttapam',
    hindiName: 'टमाटर उत्तपम',
    category: 'south-indian',
    price: 70,
    isVeg: true,
  },
  {
    id: 'south-cheese-uttapam',
    name: 'Cheese Uttapam',
    hindiName: 'चीज उत्तपम',
    category: 'south-indian',
    price: 80,
    isVeg: true,
  },
  {
    id: 'south-fried-idli',
    name: 'Fried Idli',
    hindiName: 'फ्राइड इडली',
    category: 'south-indian',
    price: 70,
    isVeg: true,
  },

  // ----------------------------------------------------
  // 17. 🍛 CHINESE (HALF / FULL) - RICE & NOODLES
  // ----------------------------------------------------
  // RICE SUB-GROUP
  {
    id: 'chinese-rice-manchurian',
    name: 'Manchurian Rice',
    hindiName: 'मंचूरियन राइस',
    category: 'chinese',
    subGroup: 'Rice',
    halfPrice: 50,
    fullPrice: 90,
    isVeg: true,
  },
  {
    id: 'chinese-rice-paneer',
    name: 'Paneer Rice',
    hindiName: 'पनीर राइस',
    category: 'chinese',
    subGroup: 'Rice',
    halfPrice: 70,
    fullPrice: 130,
    isVeg: true,
  },
  {
    id: 'chinese-rice-mushroom',
    name: 'Mushroom Rice',
    hindiName: 'मशरूम राइस',
    category: 'chinese',
    subGroup: 'Rice',
    halfPrice: 70,
    fullPrice: 130,
    isVeg: true,
  },
  {
    id: 'chinese-rice-paneer-manchurian',
    name: 'Paneer Manchurian Rice',
    hindiName: 'पनीर मंचूरियन राइस',
    category: 'chinese',
    subGroup: 'Rice',
    halfPrice: 80,
    fullPrice: 150,
    isVeg: true,
  },
  {
    id: 'chinese-rice-singapore',
    name: 'Singapore Rice',
    hindiName: 'सिंगापोर राइस',
    category: 'chinese',
    subGroup: 'Rice',
    halfPrice: 90,
    fullPrice: 170,
    isVeg: true,
  },
  {
    id: 'chinese-rice-hyderabadi',
    name: 'Hyderabadi Rice',
    hindiName: 'हैदराबादी राइस',
    category: 'chinese',
    subGroup: 'Rice',
    halfPrice: 90,
    fullPrice: 170,
    isVeg: true,
  },
  {
    id: 'chinese-rice-triple',
    name: 'Triple Rice',
    hindiName: 'ट्रिपल राइस',
    category: 'chinese',
    subGroup: 'Rice',
    halfPrice: 120,
    fullPrice: 230,
    isVeg: true,
  },
  {
    id: 'chinese-rice-paneer-triple',
    name: 'Paneer Triple Rice',
    hindiName: 'पनीर ट्रिपल राइस',
    category: 'chinese',
    subGroup: 'Rice',
    halfPrice: 130,
    fullPrice: 250,
    isVeg: true,
  },
  {
    id: 'chinese-rice-mushroom-triple',
    name: 'Mushroom Triple Rice',
    hindiName: 'मशरूम ट्रिपल राइस',
    category: 'chinese',
    subGroup: 'Rice',
    halfPrice: 130,
    fullPrice: 250,
    isVeg: true,
  },
  {
    id: 'chinese-rice-special',
    name: 'Special Rice',
    hindiName: 'स्पेशल राइस',
    category: 'chinese',
    subGroup: 'Rice',
    halfPrice: 150,
    fullPrice: 280,
    isVeg: true,
  },

  // NOODLES SUB-GROUP
  {
    id: 'chinese-noodles-veg',
    name: 'Veg Noodles',
    hindiName: 'वेज नूडल्स',
    category: 'chinese',
    subGroup: 'Noodles',
    halfPrice: 50,
    fullPrice: 90,
    isVeg: true,
  },
  {
    id: 'chinese-noodles-hakka',
    name: 'Hakka Noodles',
    hindiName: 'हक्का नूडल्स',
    category: 'chinese',
    subGroup: 'Noodles',
    halfPrice: 60,
    fullPrice: 110,
    isVeg: true,
  },
  {
    id: 'chinese-noodles-manchurian',
    name: 'Manchurian Noodles',
    hindiName: 'मंचूरियन नूडल्स',
    category: 'chinese',
    subGroup: 'Noodles',
    halfPrice: 60,
    fullPrice: 110,
    isVeg: true,
  },
  {
    id: 'chinese-noodles-paneer',
    name: 'Paneer Noodles',
    hindiName: 'पनीर नूडल्स',
    category: 'chinese',
    subGroup: 'Noodles',
    halfPrice: 70,
    fullPrice: 130,
    isVeg: true,
  },
  {
    id: 'chinese-noodles-schezwan',
    name: 'Schezwan Noodles',
    hindiName: 'शेजवान नूडल्स',
    category: 'chinese',
    subGroup: 'Noodles',
    halfPrice: 60,
    fullPrice: 110,
    isVeg: true,
  },
  {
    id: 'chinese-noodles-singapore',
    name: 'Singapore Noodles',
    hindiName: 'सिंगापोर नूडल्स',
    category: 'chinese',
    subGroup: 'Noodles',
    halfPrice: 70,
    fullPrice: 130,
    isVeg: true,
  },
  {
    id: 'chinese-noodles-mushroom',
    name: 'Mushroom Noodles',
    hindiName: 'मशरूम नूडल्स',
    category: 'chinese',
    subGroup: 'Noodles',
    halfPrice: 80,
    fullPrice: 150,
    isVeg: true,
  },
  {
    id: 'chinese-noodles-special',
    name: 'Special Noodles',
    hindiName: 'स्पेशल नूडल्स',
    category: 'chinese',
    subGroup: 'Noodles',
    halfPrice: 90,
    fullPrice: 170,
    isVeg: true,
  },

  // ----------------------------------------------------
  // 18. 🍲 SOUP
  // ----------------------------------------------------
  {
    id: 'soup-hot-sour',
    name: 'Hot & Sour Soup',
    hindiName: 'हॉट एंड सोर सूप',
    category: 'soup',
    price: 60,
    isVeg: true,
  },
  {
    id: 'soup-manchow',
    name: 'Manchow Soup',
    hindiName: 'मनचाऊ सूप',
    category: 'soup',
    price: 60,
    isVeg: true,
  },
  {
    id: 'soup-paneer',
    name: 'Paneer Soup',
    hindiName: 'पनीर सूप',
    category: 'soup',
    price: 70,
    isVeg: true,
  },
  {
    id: 'soup-mushroom',
    name: 'Mushroom Soup',
    hindiName: 'मशरूम सूप',
    category: 'soup',
    price: 70,
    isVeg: true,
  },
  {
    id: 'soup-special',
    name: 'Special Soup',
    hindiName: 'स्पेशल सूप',
    category: 'soup',
    price: 90,
    isVeg: true,
  },

  // ----------------------------------------------------
  // 19. 🌶️ CHILLI
  // ----------------------------------------------------
  {
    id: 'chilli-gravy',
    name: 'Chilli Gravy',
    hindiName: 'चिली ग्रेवी',
    category: 'chilli',
    price: 35,
    isVeg: true,
  },
  {
    id: 'chilli-dry',
    name: 'Chilli Dry',
    hindiName: 'चिली ड्राई',
    category: 'chilli',
    price: 49,
    isVeg: true,
  },
  {
    id: 'chilli-paneer',
    name: 'Paneer Chilli',
    hindiName: 'पनीर चिली',
    category: 'chilli',
    price: 99,
    isVeg: true,
  },
  {
    id: 'chilli-paneer-gravy',
    name: 'Paneer Chilli Gravy',
    hindiName: 'पनीर चिली ग्रेवी',
    category: 'chilli',
    price: 99,
    isVeg: true,
  },
  {
    id: 'chilli-paneer-65',
    name: 'Paneer 65',
    hindiName: 'पनीर 65',
    category: 'chilli',
    price: 119,
    isVeg: true,
  },
  {
    id: 'chilli-mushroom-65',
    name: 'Mushroom 65',
    hindiName: 'मशरूम 65',
    category: 'chilli',
    price: 129,
    isVeg: true,
  },
  {
    id: 'chilli-veg-lollipop',
    name: 'Veg Lollipop',
    hindiName: 'वेज लॉलीपॉप',
    category: 'chilli',
    price: 99,
    isVeg: true,
  },

  // ----------------------------------------------------
  // 20. 🍔 VADA PAV / DABELI
  // ----------------------------------------------------
  {
    id: 'vadapav-regular',
    name: 'Vada Pav',
    hindiName: 'वड़ा पाव',
    category: 'vada-pav',
    price: 20,
    isVeg: true,
  },
  {
    id: 'vadapav-butter',
    name: 'Butter Vada Pav',
    hindiName: 'बटर वड़ा पाव',
    category: 'vada-pav',
    price: 25,
    isVeg: true,
  },
  {
    id: 'vadapav-cheese',
    name: 'Cheese Vada Pav',
    hindiName: 'चीज वड़ा पाव',
    category: 'vada-pav',
    price: 40,
    isVeg: true,
  },
  {
    id: 'vadapav-schezwan',
    name: 'Schezwan Vada Pav',
    hindiName: 'शेजवान वड़ा पाव',
    category: 'vada-pav',
    price: 20,
    isVeg: true,
  },
  {
    id: 'vadapav-mayonnaise',
    name: 'Mayonnaise Vada Pav',
    hindiName: 'मेयोनेज वड़ा पाव',
    category: 'vada-pav',
    price: 20,
    isVeg: true,
  },
  {
    id: 'vadapav-desi-ghee',
    name: 'Desi Ghee Vada Pav',
    hindiName: 'देसी घी वड़ा पाव',
    category: 'vada-pav',
    price: 25,
    isVeg: true,
  },
  {
    id: 'dabeli-regular',
    name: 'Dabeli',
    hindiName: 'दाबेली',
    category: 'vada-pav',
    price: 15,
    isVeg: true,
  },
  {
    id: 'dabeli-butter',
    name: 'Butter Dabeli',
    hindiName: 'बटर दाबेली',
    category: 'vada-pav',
    price: 20,
    isVeg: true,
  },
  {
    id: 'dabeli-cheese',
    name: 'Cheese Dabeli',
    hindiName: 'चीज दाबेली',
    category: 'vada-pav',
    price: 40,
    isVeg: true,
  },
];
