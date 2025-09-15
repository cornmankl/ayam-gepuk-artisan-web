

export type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'krispy' | 'klasik' | 'side' | 'drink';
  popular?: boolean;
};

export const menuItems: MenuItem[] = [
  // Ayam Krispy Sets
  {
    id: 1,
    name: 'Ayam Krispy Set A',
    description: 'Nasi putih, ayam krispy 1 pcs, sambal, kicap, sayuran',
    price: 10.99,
    image: "/498287052_3923290251256080_7790503874418412003_n.jpg",
    category: 'krispy',
    popular: true
  },
  {
    id: 2,
    name: 'Ayam Krispy Set B',
    description: 'Nasi putih, ayam krispy 2 pcs, tempe goreng, tahu goreng, sambal, kicap, sayuran',
    price: 11.99,
    image: "/498287052_3923290251256080_7790503874418412003_n.jpg",
    category: 'krispy'
  },
  {
    id: 3,
    name: 'Ayam Krispy Set C',
    description: 'Nasi putih, ayam krispy 2 pcs, tempe goreng, tahu goreng, kubis goreng, sambal, kicap, sayuran',
    price: 12.99,
    image: "/498287052_3923290251256080_7790503874418412003_n.jpg",
    category: 'krispy'
  },
  // Ayam Klasik Sets
  {
    id: 4,
    name: 'Ayam Klasik Set A',
    description: 'Nasi putih, ayam klasik, tempe goreng, sambal, kicap, sayuran',
    price: 10.99,
    image: "/499146215_3923748704543568_4549314373204496991_n.jpg",
    category: 'klasik',
    popular: true
  },
  {
    id: 5,
    name: 'Ayam Klasik Set B',
    description: 'Nasi putih, ayam klasik, tempe goreng, tahu goreng, sambal, kicap, sayuran',
    price: 11.99,
    image: "/499146215_3923748704543568_4549314373204496991_n.jpg",
    category: 'klasik'
  },
  {
    id: 6,
    name: 'Ayam Klasik Set C',
    description: 'Nasi putih, sambal, ayam klasik, tempe goreng, tahu goreng, kubis goreng, sambal, kicap, sayuran',
    price: 12.99,
    image: "/499146215_3923748704543568_4549314373204496991_n.jpg",
    category: 'klasik'
  },
  // Side Dishes - Individual Items
  {
    id: 7,
    name: 'Ayam Klasik Quarter',
    description: '1 piece quarter chicken',
    price: 6.90,
    image: "/499146215_3923748704543568_4549314373204496991_n.jpg",
    category: 'side'
  },
  {
    id: 8,
    name: 'Ayam Krispy',
    description: '1 piece crispy chicken',
    price: 3.90,
    image: "/498287052_3923290251256080_7790503874418412003_n.jpg",
    category: 'side'
  },
  {
    id: 9,
    name: 'Tempe Goreng',
    description: '6 pieces fried tempeh',
    price: 2.20,
    image: "/ayamgepukartisanseremban2_%281%29.jpg",
    category: 'side'
  },
  {
    id: 10,
    name: 'Sambal Gajus',
    description: 'Spicy sambal sauce',
    price: 2.00,
    image: "/ayamgepukartisanseremban2_%281%29.jpg",
    category: 'side'
  },
  {
    id: 11,
    name: 'Kubis Goreng',
    description: '1 plate fried cabbage',
    price: 3.20,
    image: "/ayamgepukartisanseremban2_%281%29.jpg",
    category: 'side'
  },
  {
    id: 12,
    name: 'Tauhu Goreng',
    description: '2 pieces fried tofu',
    price: 1.40,
    image: "/ayamgepukartisanseremban2_%281%29.jpg",
    category: 'side'
  },
  {
    id: 13,
    name: 'Nasi Putih',
    description: 'White rice',
    price: 2.20,
    image: "/ayamgepukartisanseremban2_%281%29.jpg",
    category: 'side'
  },
  // Drinks
  {
    id: 14,
    name: 'Minuman',
    description: 'Soft drink',
    price: 2.00,
    image: "/ayamgepukartisanseremban2_%281%29.jpg",
    category: 'drink'
  },
  // Additional Menu Items based on provided images
  {
    id: 15,
    name: 'Ayam Gepuk Klasik',
    description: 'Nasi putih, ayam gepuk klasik, tempe goreng, tahu goreng, kubis goreng, lalap sambal, keripik',
    price: 12.99,
    image: "/499146215_3923748704543568_4549314373204496991_n.jpg",
    category: 'klasik',
    popular: true
  },
  {
    id: 16,
    name: 'Ayam Gepuk Krispy',
    description: 'Nasi putih, ayam gepuk krispy, tempe goreng, tahu goreng, sambal, lalap sayuran',
    price: 12.99,
    image: "/498287052_3923290251256080_7790503874418412003_n.jpg",
    category: 'krispy',
    popular: true
  },
  {
    id: 17,
    name: 'Ayam Goreng Krispy 3 Pcs',
    description: '3 pieces crispy fried chicken',
    price: 8.99,
    image: "/498287052_3923290251256080_7790503874418412003_n.jpg",
    category: 'side'
  },
  {
    id: 18,
    name: 'Ayam Goreng Krispy 4 Pcs',
    description: '4 pieces crispy fried chicken',
    price: 11.99,
    image: "/498287052_3923290251256080_7790503874418412003_n.jpg",
    category: 'side'
  },
  {
    id: 19,
    name: 'Ayam Goreng Krispy 5 Pcs',
    description: '5 pieces crispy fried chicken',
    price: 14.99,
    image: "/498287052_3923290251256080_7790503874418412003_n.jpg",
    category: 'side'
  },
  {
    id: 20,
    name: 'Unlimited Refill Set',
    description: 'Nasi, sambal, air, kicap - unlimited refill',
    price: 8.99,
    image: "/ayamgepukartisanseremban2_%281%29.jpg",
    category: 'krispy',
    popular: true
  }
];