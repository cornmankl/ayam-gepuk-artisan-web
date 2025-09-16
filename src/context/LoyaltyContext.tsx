import React, { createContext, useContext, useEffect, useState } from 'react';

interface LoyaltyPoints {
  total: number;
  available: number;
  used: number;
  expired: number;
}

interface LoyaltyTier {
  id: string;
  name: string;
  minPoints: number;
  maxPoints: number;
  benefits: string[];
  color: string;
  multiplier: number;
}

interface LoyaltyTransaction {
  id: string;
  type: 'earned' | 'redeemed' | 'expired' | 'bonus';
  points: number;
  description: string;
  orderId?: string;
  createdAt: Date;
  expiresAt?: Date;
}

interface LoyaltyReward {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  image: string;
  category: 'food' | 'discount' | 'freebie' | 'upgrade';
  isActive: boolean;
  stock?: number;
  maxRedemptions?: number;
}

interface LoyaltyContextType {
  points: LoyaltyPoints;
  currentTier: LoyaltyTier | null;
  nextTier: LoyaltyTier | null;
  transactions: LoyaltyTransaction[];
  rewards: LoyaltyReward[];
  isLoading: boolean;
  earnPoints: (
    orderId: string,
    amount: number,
    description: string
  ) => Promise<void>;
  redeemReward: (rewardId: string) => Promise<boolean>;
  getAvailableRewards: () => LoyaltyReward[];
  getTierProgress: () => { current: number; next: number; percentage: number };
}

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

export const useLoyalty = () => {
  const context = useContext(LoyaltyContext);
  if (context === undefined) {
    throw new Error('useLoyalty must be used within a LoyaltyProvider');
  }
  return context;
};

interface LoyaltyProviderProps {
  children: React.ReactNode;
}

const loyaltyTiers: LoyaltyTier[] = [
  {
    id: 'bronze',
    name: 'Bronze Member',
    minPoints: 0,
    maxPoints: 499,
    benefits: ['Welcome bonus', 'Birthday treat'],
    color: 'text-amber-600',
    multiplier: 1,
  },
  {
    id: 'silver',
    name: 'Silver Member',
    minPoints: 500,
    maxPoints: 999,
    benefits: ['2x points on orders', 'Free drink upgrade', 'Priority support'],
    color: 'text-gray-500',
    multiplier: 2,
  },
  {
    id: 'gold',
    name: 'Gold Member',
    minPoints: 1000,
    maxPoints: 1999,
    benefits: [
      '3x points on orders',
      'Free side dish',
      'Exclusive menu access',
      'Free delivery',
    ],
    color: 'text-yellow-500',
    multiplier: 3,
  },
  {
    id: 'platinum',
    name: 'Platinum Member',
    minPoints: 2000,
    maxPoints: Infinity,
    benefits: [
      '5x points on orders',
      'Free meal monthly',
      'VIP events',
      'Personal chef consultation',
    ],
    color: 'text-purple-600',
    multiplier: 5,
  },
];

export const LoyaltyProvider: React.FC<LoyaltyProviderProps> = ({
  children,
}) => {
  const [points, setPoints] = useState<LoyaltyPoints>({
    total: 0,
    available: 0,
    used: 0,
    expired: 0,
  });
  const [transactions, setTransactions] = useState<LoyaltyTransaction[]>([]);
  const [rewards, setRewards] = useState<LoyaltyReward[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLoyaltyData();
  }, []);

  const fetchLoyaltyData = async () => {
    setIsLoading(true);
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock data
      const mockPoints: LoyaltyPoints = {
        total: 1250,
        available: 1200,
        used: 50,
        expired: 0,
      };

      const mockTransactions: LoyaltyTransaction[] = [
        {
          id: '1',
          type: 'earned',
          points: 50,
          description: 'Order #1001 - Ayam Gepuk Krispy',
          orderId: '1001',
          createdAt: new Date('2023-10-20'),
          expiresAt: new Date('2024-10-20'),
        },
        {
          id: '2',
          type: 'redeemed',
          points: -100,
          description: 'Free drink upgrade',
          orderId: '1002',
          createdAt: new Date('2023-10-19'),
        },
        {
          id: '3',
          type: 'bonus',
          points: 25,
          description: 'Birthday bonus',
          createdAt: new Date('2023-10-18'),
        },
      ];

      const mockRewards: LoyaltyReward[] = [
        {
          id: '1',
          name: 'Free Drink',
          description: 'Get a free drink with your order',
          pointsRequired: 100,
          image:
            'https://uploadthingy.s3.us-west-1.amazonaws.com/p5irPgQNgTn2ETzne3anjp/free-drink.jpg',
          category: 'freebie',
          isActive: true,
          stock: 50,
        },
        {
          id: '2',
          name: '10% Discount',
          description: 'Get 10% off your next order',
          pointsRequired: 200,
          image:
            'https://uploadthingy.s3.us-west-1.amazonaws.com/p5irPgQNgTn2ETzne3anjp/discount.jpg',
          category: 'discount',
          isActive: true,
        },
        {
          id: '3',
          name: 'Free Side Dish',
          description: 'Add a free side dish to your order',
          pointsRequired: 150,
          image:
            'https://uploadthingy.s3.us-west-1.amazonaws.com/p5irPgQNgTn2ETzne3anjp/free-side.jpg',
          category: 'food',
          isActive: true,
          stock: 25,
        },
        {
          id: '4',
          name: 'VIP Meal',
          description: 'Exclusive VIP meal experience',
          pointsRequired: 500,
          image:
            'https://uploadthingy.s3.us-west-1.amazonaws.com/p5irPgQNgTn2ETzne3anjp/vip-meal.jpg',
          category: 'food',
          isActive: true,
          maxRedemptions: 5,
        },
      ];

      setPoints(mockPoints);
      setTransactions(mockTransactions);
      setRewards(mockRewards);
    } catch (error) {
      console.error('Failed to fetch loyalty data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentTier = (totalPoints: number): LoyaltyTier | null => {
    return (
      loyaltyTiers.find(
        tier => totalPoints >= tier.minPoints && totalPoints < tier.maxPoints
      ) || loyaltyTiers[loyaltyTiers.length - 1]
    );
  };

  const getNextTier = (currentTier: LoyaltyTier | null): LoyaltyTier | null => {
    if (!currentTier) return loyaltyTiers[0];
    const currentIndex = loyaltyTiers.findIndex(
      tier => tier.id === currentTier.id
    );
    return currentIndex < loyaltyTiers.length - 1
      ? loyaltyTiers[currentIndex + 1]
      : null;
  };

  const earnPoints = async (
    orderId: string,
    amount: number,
    description: string
  ) => {
    try {
      const currentTier = getCurrentTier(points.total);
      const multiplier = currentTier?.multiplier || 1;
      const earnedPoints = Math.floor(amount * multiplier);

      const newTransaction: LoyaltyTransaction = {
        id: Date.now().toString(),
        type: 'earned',
        points: earnedPoints,
        description,
        orderId,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      };

      setPoints(prev => ({
        total: prev.total + earnedPoints,
        available: prev.available + earnedPoints,
        used: prev.used,
        expired: prev.expired,
      }));

      setTransactions(prev => [newTransaction, ...prev]);
    } catch (error) {
      console.error('Failed to earn points:', error);
    }
  };

  const redeemReward = async (rewardId: string): Promise<boolean> => {
    try {
      const reward = rewards.find(r => r.id === rewardId);
      if (!reward || !reward.isActive) return false;

      if (points.available < reward.pointsRequired) return false;

      if (reward.stock !== undefined && reward.stock <= 0) return false;

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const newTransaction: LoyaltyTransaction = {
        id: Date.now().toString(),
        type: 'redeemed',
        points: -reward.pointsRequired,
        description: `Redeemed: ${reward.name}`,
        createdAt: new Date(),
      };

      setPoints(prev => ({
        total: prev.total,
        available: prev.available - reward.pointsRequired,
        used: prev.used + reward.pointsRequired,
        expired: prev.expired,
      }));

      setTransactions(prev => [newTransaction, ...prev]);

      if (reward.stock !== undefined) {
        setRewards(prev =>
          prev.map(r => (r.id === rewardId ? { ...r, stock: r.stock! - 1 } : r))
        );
      }

      return true;
    } catch (error) {
      console.error('Failed to redeem reward:', error);
      return false;
    }
  };

  const getAvailableRewards = (): LoyaltyReward[] => {
    return rewards.filter(
      reward =>
        reward.isActive &&
        points.available >= reward.pointsRequired &&
        (reward.stock === undefined || reward.stock > 0)
    );
  };

  const getTierProgress = () => {
    const currentTier = getCurrentTier(points.total);
    const nextTier = getNextTier(currentTier);

    if (!currentTier || !nextTier) {
      return { current: points.total, next: 0, percentage: 100 };
    }

    const current = points.total - currentTier.minPoints;
    const next = nextTier.minPoints - currentTier.minPoints;
    const percentage = Math.min((current / next) * 100, 100);

    return { current, next, percentage };
  };

  const currentTier = getCurrentTier(points.total);
  const nextTier = getNextTier(currentTier);

  const value: LoyaltyContextType = {
    points,
    currentTier,
    nextTier,
    transactions,
    rewards,
    isLoading,
    earnPoints,
    redeemReward,
    getAvailableRewards,
    getTierProgress,
  };

  return (
    <LoyaltyContext.Provider value={value}>{children}</LoyaltyContext.Provider>
  );
};
