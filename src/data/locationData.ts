export interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  services: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  image: string;
  rating: number;
  isOpen: boolean;
  state: string;
}

export const locations: Location[] = [
  {
    id: '1',
    name: 'Ayam Gepuk Artisan - Seremban',
    address: '123 Jalan Tuanku Munawir, 70000 Seremban, Negeri Sembilan',
    phone: '+60 6-123 4567',
    hours: 'Mon-Sun: 10:00 AM - 10:00 PM',
    services: ['Dine-in', 'Takeaway', 'Delivery', 'WiFi', 'Parking'],
    coordinates: {
      lat: 2.7297,
      lng: 101.9381,
    },
    image: '/images/seremban-outlet.jpg',
    rating: 4.8,
    isOpen: true,
    state: 'Negeri Sembilan',
  },
  {
    id: '2',
    name: 'Ayam Gepuk Artisan - KL Sentral',
    address: '456 Jalan Stesen Sentral, 50470 Kuala Lumpur',
    phone: '+60 3-1234 5678',
    hours: 'Mon-Sun: 9:00 AM - 11:00 PM',
    services: ['Dine-in', 'Takeaway', 'Delivery', 'WiFi', 'Parking'],
    coordinates: {
      lat: 3.1347,
      lng: 101.6869,
    },
    image: '/images/kl-sentral-outlet.jpg',
    rating: 4.9,
    isOpen: true,
    state: 'Kuala Lumpur',
  },
  {
    id: '3',
    name: 'Ayam Gepuk Artisan - Subang Jaya',
    address: '789 Jalan SS 15/4, 47500 Subang Jaya, Selangor',
    phone: '+60 3-5678 9012',
    hours: 'Mon-Sun: 10:00 AM - 10:00 PM',
    services: ['Dine-in', 'Takeaway', 'Delivery', 'WiFi', 'Parking'],
    coordinates: {
      lat: 3.0738,
      lng: 101.5933,
    },
    image: '/images/subang-outlet.jpg',
    rating: 4.7,
    isOpen: true,
    state: 'Selangor',
  },
];
