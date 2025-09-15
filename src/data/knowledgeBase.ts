// Knowledge Base for Ayam Gepuk Artisan
// This file contains structured data for AI assistant and FAQ system

export interface FAQItem {
    id: string;
    question: string;
    answer: string;
    category: 'general' | 'menu' | 'ordering' | 'delivery' | 'payment' | 'hours' | 'location';
    keywords: string[];
    priority: number;
}

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: 'krispy' | 'klasik' | 'side' | 'drink';
    ingredients: string[];
    allergens: string[];
    spiceLevel: 1 | 2 | 3 | 4 | 5;
    preparationTime: number;
    popular: boolean;
    available: boolean;
    nutritionInfo: {
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
    };
}

export interface Location {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    phone: string;
    email: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    openingHours: {
        [key: string]: { open: string; close: string; closed: boolean };
    };
    services: string[];
}

export interface Promotion {
    id: string;
    title: string;
    description: string;
    discountType: 'percentage' | 'fixed' | 'combo';
    discountValue: number;
    validFrom: string;
    validUntil: string;
    terms: string[];
    applicableItems: string[];
}

// FAQ Data
export const faqData: FAQItem[] = [
    {
        id: 'what-is-ayam-gepuk',
        question: 'What is Ayam Gepuk?',
        answer: 'Ayam Gepuk is a traditional Indonesian dish of smashed fried chicken. The chicken is marinated with special spices, then smashed to make it tender and crispy, and served with spicy sambal. It\'s a popular street food in Indonesia and now available in Malaysia!',
        category: 'general',
        keywords: ['ayam gepuk', 'what is', 'indonesian', 'chicken', 'smashed', 'fried'],
        priority: 10
    },
    {
        id: 'halal-certification',
        question: 'Is your food halal?',
        answer: 'Yes! All our food is 100% halal certified. We use only halal ingredients and follow strict halal preparation methods. Our certification is verified and we\'re proud to serve the Muslim community with authentic, halal Indonesian cuisine.',
        category: 'general',
        keywords: ['halal', 'certified', 'muslim', 'islamic', 'permissible'],
        priority: 10
    },
    {
        id: 'opening-hours',
        question: 'What are your opening hours?',
        answer: 'We are open Monday to Sunday from 10:00 AM to 10:00 PM. We\'re available every day for lunch, dinner, and late-night cravings!',
        category: 'hours',
        keywords: ['hours', 'opening', 'time', 'when', 'available', 'open'],
        priority: 9
    },
    {
        id: 'locations',
        question: 'Where are your locations?',
        answer: 'We have two locations:\n\n**Seremban Main Branch:**\n123 Jalan Seremban, Seremban, Negeri Sembilan 70000\n\n**KL Branch:**\n456 Jalan Ampang, Kuala Lumpur 50450\n\nBoth locations offer dine-in, takeaway, and delivery services!',
        category: 'location',
        keywords: ['location', 'where', 'address', 'seremban', 'kl', 'kuala lumpur'],
        priority: 9
    },
    {
        id: 'menu-recommendations',
        question: 'What do you recommend from your menu?',
        answer: 'Our most popular items are:\n\n• **Ayam Gepuk Krispy** - RM 15.90 (Spicy and crispy)\n• **Ayam Gepuk Klasik** - RM 14.90 (Traditional mild spices)\n• **Nasi Lemak Special** - RM 12.00 (Fragrant coconut rice)\n• **Chicken Wings** - RM 15.00 (Spicy marinated wings)\n\nFor first-time visitors, I recommend trying our Ayam Gepuk Krispy!',
        category: 'menu',
        keywords: ['recommend', 'popular', 'best', 'menu', 'what to order'],
        priority: 8
    },
    {
        id: 'spice-levels',
        question: 'How spicy is your food?',
        answer: 'We offer different spice levels:\n\n• **Level 1-2:** Mild (Ayam Gepuk Klasik)\n• **Level 3-4:** Medium to Hot (Ayam Gepuk Krispy)\n• **Level 5:** Extra Spicy (Special requests)\n\nYou can request your preferred spice level when ordering!',
        category: 'menu',
        keywords: ['spicy', 'hot', 'mild', 'spice level', 'heat'],
        priority: 7
    },
    {
        id: 'ordering-methods',
        question: 'How can I place an order?',
        answer: 'You can order through multiple ways:\n\n• **Online:** Use our website menu and add to cart\n• **Phone:** Call us at +60-18-244-2017\n• **WhatsApp:** Message us at +60-18-244-2017\n• **Walk-in:** Visit our restaurant directly\n\nWe accept cash, card, and online payments!',
        category: 'ordering',
        keywords: ['order', 'how to order', 'phone', 'whatsapp', 'online'],
        priority: 8
    },
    {
        id: 'delivery-areas',
        question: 'Do you deliver? What areas do you cover?',
        answer: 'Yes, we offer delivery services! We cover:\n\n• **Seremban area:** Within 10km radius\n• **KL area:** Within 15km radius\n• **Minimum order:** RM 25\n• **Delivery fee:** RM 5-8 depending on distance\n• **Delivery time:** 30-45 minutes\n\nContact us to check if we deliver to your area!',
        category: 'delivery',
        keywords: ['delivery', 'deliver', 'areas', 'coverage', 'distance'],
        priority: 7
    },
    {
        id: 'payment-methods',
        question: 'What payment methods do you accept?',
        answer: 'We accept various payment methods:\n\n• **Cash** (for dine-in and takeaway)\n• **Credit/Debit Cards** (Visa, Mastercard)\n• **Online Banking** (FPX)\n• **E-Wallets** (GrabPay, Touch n Go, Boost)\n• **Bank Transfer** (for large orders)\n\nAll payments are secure and processed safely!',
        category: 'payment',
        keywords: ['payment', 'pay', 'cash', 'card', 'online', 'ewallet'],
        priority: 6
    },
    {
        id: 'group-orders',
        question: 'Do you cater for large groups or events?',
        answer: 'Yes! We offer catering services for:\n\n• **Corporate events**\n• **Birthday parties**\n• **Weddings**\n• **Family gatherings**\n• **Office meetings**\n\n**Minimum order:** 20 people\n**Advance notice:** 24-48 hours\n**Special packages:** Available for large groups\n\nContact us for custom catering arrangements!',
        category: 'ordering',
        keywords: ['catering', 'large group', 'event', 'party', 'corporate'],
        priority: 5
    },
    {
        id: 'allergies',
        question: 'Do you have options for people with allergies?',
        answer: 'We can accommodate some dietary restrictions:\n\n• **Gluten-free:** Some items available\n• **Nut allergies:** Please inform us when ordering\n• **Vegetarian:** Limited options available\n• **Custom requests:** We can modify some dishes\n\nPlease inform us about any allergies when placing your order for your safety!',
        category: 'menu',
        keywords: ['allergies', 'dietary', 'restrictions', 'gluten', 'nuts', 'vegetarian'],
        priority: 4
    },
    {
        id: 'refund-policy',
        question: 'What is your refund policy?',
        answer: 'Our refund policy:\n\n• **Quality issues:** Full refund or replacement\n• **Wrong order:** Immediate correction\n• **Cancellation:** Free cancellation before preparation starts\n• **No-show:** No refund for prepared orders\n• **Contact:** Call us within 30 minutes of delivery\n\nWe want you to be completely satisfied with your order!',
        category: 'general',
        keywords: ['refund', 'return', 'policy', 'money back', 'cancellation'],
        priority: 3
    }
];

// Menu Data
export const menuData: MenuItem[] = [
    {
        id: 'ayam-gepuk-krispy',
        name: 'Ayam Gepuk Krispy',
        description: 'Crispy smashed fried chicken with spicy sambal and traditional Indonesian spices',
        price: 15.90,
        category: 'krispy',
        ingredients: ['Chicken', 'Sambal', 'Traditional Spices', 'Rice', 'Cucumber', 'Tomato'],
        allergens: ['Gluten'],
        spiceLevel: 4,
        preparationTime: 15,
        popular: true,
        available: true,
        nutritionInfo: {
            calories: 450,
            protein: 35,
            carbs: 25,
            fat: 20
        }
    },
    {
        id: 'ayam-gepuk-klasik',
        name: 'Ayam Gepuk Klasik',
        description: 'Traditional smashed fried chicken with mild spices and authentic Indonesian flavor',
        price: 14.90,
        category: 'klasik',
        ingredients: ['Chicken', 'Mild Spices', 'Sambal', 'Rice', 'Cucumber', 'Tomato'],
        allergens: ['Gluten'],
        spiceLevel: 2,
        preparationTime: 12,
        popular: true,
        available: true,
        nutritionInfo: {
            calories: 420,
            protein: 32,
            carbs: 28,
            fat: 18
        }
    },
    {
        id: 'nasi-lemak-special',
        name: 'Nasi Lemak Special',
        description: 'Fragrant coconut rice served with traditional sides and sambal',
        price: 12.00,
        category: 'side',
        ingredients: ['Coconut Rice', 'Sambal', 'Cucumber', 'Peanuts', 'Anchovies', 'Egg'],
        allergens: ['Fish', 'Nuts'],
        spiceLevel: 3,
        preparationTime: 10,
        popular: true,
        available: true,
        nutritionInfo: {
            calories: 380,
            protein: 15,
            carbs: 45,
            fat: 12
        }
    },
    {
        id: 'chicken-wings',
        name: 'Chicken Wings',
        description: 'Spicy marinated chicken wings with our signature sauce',
        price: 15.00,
        category: 'side',
        ingredients: ['Chicken Wings', 'Spicy Marinade', 'Signature Sauce'],
        allergens: ['Gluten'],
        spiceLevel: 4,
        preparationTime: 20,
        popular: false,
        available: true,
        nutritionInfo: {
            calories: 320,
            protein: 28,
            carbs: 8,
            fat: 18
        }
    },
    {
        id: 'teh-tarik',
        name: 'Teh Tarik',
        description: 'Traditional Malaysian pulled tea with condensed milk',
        price: 4.50,
        category: 'drink',
        ingredients: ['Black Tea', 'Condensed Milk', 'Sugar'],
        allergens: ['Dairy'],
        spiceLevel: 1,
        preparationTime: 3,
        popular: true,
        available: true,
        nutritionInfo: {
            calories: 120,
            protein: 2,
            carbs: 25,
            fat: 2
        }
    },
    {
        id: 'air-kosong',
        name: 'Air Kosong',
        description: 'Refreshing plain water',
        price: 2.00,
        category: 'drink',
        ingredients: ['Water'],
        allergens: [],
        spiceLevel: 1,
        preparationTime: 1,
        popular: false,
        available: true,
        nutritionInfo: {
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0
        }
    }
];

// Location Data
export const locationData: Location[] = [
    {
        id: 'seremban-main',
        name: 'Ayam Gepuk Artisan - Seremban Main',
        address: '123 Jalan Seremban',
        city: 'Seremban',
        state: 'Negeri Sembilan',
        postalCode: '70000',
        phone: '+60-18-244-2017',
        email: 'seremban@ayamgepukartisan.com',
        coordinates: {
            latitude: 2.7297,
            longitude: 101.9381
        },
        openingHours: {
            monday: { open: '10:00', close: '22:00', closed: false },
            tuesday: { open: '10:00', close: '22:00', closed: false },
            wednesday: { open: '10:00', close: '22:00', closed: false },
            thursday: { open: '10:00', close: '22:00', closed: false },
            friday: { open: '10:00', close: '22:00', closed: false },
            saturday: { open: '10:00', close: '22:00', closed: false },
            sunday: { open: '10:00', close: '22:00', closed: false }
        },
        services: ['dine-in', 'takeaway', 'delivery']
    },
    {
        id: 'kl-branch',
        name: 'Ayam Gepuk Artisan - KL Branch',
        address: '456 Jalan Ampang',
        city: 'Kuala Lumpur',
        state: 'Kuala Lumpur',
        postalCode: '50450',
        phone: '+60-18-244-2018',
        email: 'kl@ayamgepukartisan.com',
        coordinates: {
            latitude: 3.1390,
            longitude: 101.6869
        },
        openingHours: {
            monday: { open: '10:00', close: '22:00', closed: false },
            tuesday: { open: '10:00', close: '22:00', closed: false },
            wednesday: { open: '10:00', close: '22:00', closed: false },
            thursday: { open: '10:00', close: '22:00', closed: false },
            friday: { open: '10:00', close: '22:00', closed: false },
            saturday: { open: '10:00', close: '22:00', closed: false },
            sunday: { open: '10:00', close: '22:00', closed: false }
        },
        services: ['dine-in', 'takeaway', 'delivery', 'drive-thru']
    }
];

// Promotion Data
export const promotionData: Promotion[] = [
    {
        id: 'weekend-family-feast',
        title: 'Weekend Family Feast',
        description: 'Enjoy our special family bundle with 2 Ayam Gepuk Klasik, 2 Ayam Gepuk Krispy, 4 rice, and 4 drinks!',
        discountType: 'combo',
        discountValue: 20,
        validFrom: '2023-10-20',
        validUntil: '2023-10-22',
        terms: ['Valid on weekends only', 'Minimum 4 people', 'Cannot combine with other offers'],
        applicableItems: ['ayam-gepuk-krispy', 'ayam-gepuk-klasik']
    },
    {
        id: 'spicy-monday-discount',
        title: 'Spicy Monday Discount',
        description: 'Get 15% off on all Ayam Gepuk Krispy orders every Monday!',
        discountType: 'percentage',
        discountValue: 15,
        validFrom: '2023-10-01',
        validUntil: '2023-12-31',
        terms: ['Valid on Mondays only', 'Only for Ayam Gepuk Krispy', 'Maximum discount RM10'],
        applicableItems: ['ayam-gepuk-krispy']
    },
    {
        id: 'combo-jimat',
        title: 'Combo Jimat',
        description: 'Save more with our Combo Jimat! Choose any Ayam Gepuk with a drink for only RM15.',
        discountType: 'fixed',
        discountValue: 5,
        validFrom: '2023-09-01',
        validUntil: '2023-11-30',
        terms: ['Any Ayam Gepuk + Drink', 'Valid for all items', 'Cannot combine with other offers'],
        applicableItems: ['ayam-gepuk-krispy', 'ayam-gepuk-klasik']
    }
];

// AI Response Templates
export const aiResponseTemplates = {
    greeting: [
        "Hello! Welcome to Ayam Gepuk Artisan! How can I help you today? 😊",
        "Hi there! I'm here to help you with anything about our delicious Indonesian cuisine! 🍗",
        "Welcome! What would you like to know about our Ayam Gepuk? 🤗"
    ],
    menu: [
        "Here's our delicious menu! What catches your eye? 🍽️",
        "Check out our authentic Indonesian dishes! Which one sounds good to you? 😋",
        "Our menu is full of amazing flavors! What would you like to try? 🌶️"
    ],
    ordering: [
        "Great choice! Let me help you place that order! 🛒",
        "Perfect! I'll guide you through the ordering process! 📝",
        "Excellent! Let's get that delicious food to you! 🚀"
    ],
    location: [
        "Here are our locations! Which one is closer to you? 📍",
        "Find us at these convenient locations! 🗺️",
        "We're located in these areas! Come visit us! 🏪"
    ],
    hours: [
        "Here are our opening hours! We're open every day! 🕒",
        "Check out when we're available! We're here for you! ⏰",
        "Our hours are perfect for any time of day! 🌅"
    ],
    fallback: [
        "I'm not sure about that, but I can help you with our menu, location, or ordering! 🤔",
        "Let me connect you with our team for that question! In the meantime, what else can I help with? 💬",
        "That's a great question! Let me help you with something else while I find the answer! 🔍"
    ]
};

// Search function for FAQ
export const searchFAQ = (query: string): FAQItem[] => {
    const searchTerm = query.toLowerCase();
    return faqData
        .filter(faq =>
            faq.question.toLowerCase().includes(searchTerm) ||
            faq.answer.toLowerCase().includes(searchTerm) ||
            faq.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
        )
        .sort((a, b) => b.priority - a.priority);
};

// Get FAQ by category
export const getFAQByCategory = (category: string): FAQItem[] => {
    return faqData
        .filter(faq => faq.category === category)
        .sort((a, b) => b.priority - a.priority);
};

// Get menu item by ID
export const getMenuItemById = (id: string): MenuItem | undefined => {
    return menuData.find(item => item.id === id);
};

// Get popular menu items
export const getPopularMenuItems = (): MenuItem[] => {
    return menuData
        .filter(item => item.popular)
        .sort((a, b) => b.price - a.price);
};

// Get menu items by category
export const getMenuItemsByCategory = (category: string): MenuItem[] => {
    return menuData
        .filter(item => item.category === category)
        .sort((a, b) => a.price - b.price);
};

// Get active promotions
export const getActivePromotions = (): Promotion[] => {
    const now = new Date();
    return promotionData.filter(promo => {
        const validFrom = new Date(promo.validFrom);
        const validUntil = new Date(promo.validUntil);
        return now >= validFrom && now <= validUntil;
    });
};

// Get location by ID
export const getLocationById = (id: string): Location | undefined => {
    return locationData.find(location => location.id === id);
};

// Get all locations
export const getAllLocations = (): Location[] => {
    return locationData;
};
