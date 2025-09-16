import React, { useEffect, useState, createContext, useContext } from 'react';
export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
};
type CartContextType = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
export const CartProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    // Calculate totals when items change
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const price = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalItems(itemCount);
    setTotalPrice(price);
  }, [items]);
  const addToCart = (item: CartItem) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id
            ? {
                ...i,
                quantity: i.quantity + item.quantity,
              }
            : i
        );
      }
      return [...prevItems, item];
    });
  };
  const removeFromCart = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  };
  const clearCart = () => {
    setItems([]);
  };
  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
