import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CartPage from './CartPage';
import { CartContext } from '../context/CartContext';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const emptyCartContext = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  addToCart: vi.fn(),
  removeFromCart: vi.fn(),
  updateQuantity: vi.fn(),
  clearCart: vi.fn(),
  setCart: vi.fn(),
};

const filledCartContext = {
  items: [
    {
      id: '1',
      name: 'Test Item 1',
      price: 10,
      quantity: 2,
      image: 'test1.jpg',
    },
    { id: '2', name: 'Test Item 2', price: 5, quantity: 1, image: 'test2.jpg' },
  ],
  totalItems: 3,
  totalPrice: 25,
  addToCart: vi.fn(),
  removeFromCart: vi.fn(),
  updateQuantity: vi.fn(),
  clearCart: vi.fn(),
  setCart: vi.fn(),
};

describe('CartPage', () => {
  it('displays a message when the cart is empty', () => {
    render(
      <MemoryRouter>
        <CartContext.Provider value={emptyCartContext}>
          <CartPage />
        </CartContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Your Cart is Empty')).toBeInTheDocument();
    expect(screen.getByText('Browse Our Menu')).toBeInTheDocument();
  });

  it('displays cart items and summary when the cart is not empty', () => {
    render(
      <MemoryRouter>
        <CartContext.Provider value={filledCartContext}>
          <CartPage />
        </CartContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Test Item 1')).toBeInTheDocument();
    expect(screen.getByText('Test Item 2')).toBeInTheDocument();
    expect(screen.getByText('Order Summary')).toBeInTheDocument();
  });

  it('updates the quantity of an item', () => {
    render(
      <MemoryRouter>
        <CartContext.Provider value={filledCartContext}>
          <CartPage />
        </CartContext.Provider>
      </MemoryRouter>
    );

    const plusButton = screen.getAllByRole('button', { name: /plus/i })[0];
    fireEvent.click(plusButton);

    expect(filledCartContext.updateQuantity).toHaveBeenCalledWith('1', 3);
  });

  it('removes an item from the cart', () => {
    render(
      <MemoryRouter>
        <CartContext.Provider value={filledCartContext}>
          <CartPage />
        </CartContext.Provider>
      </MemoryRouter>
    );

    const removeButton = screen.getAllByRole('button', { name: /trash/i })[1]; // The second trash icon
    fireEvent.click(removeButton);

    expect(filledCartContext.removeFromCart).toHaveBeenCalledWith('1');
  });

  it('clears the cart', () => {
    render(
      <MemoryRouter>
        <CartContext.Provider value={filledCartContext}>
          <CartPage />
        </CartContext.Provider>
      </MemoryRouter>
    );

    const clearCartButton = screen.getByText('Clear Cart');
    fireEvent.click(clearCartButton);

    expect(filledCartContext.clearCart).toHaveBeenCalled();
  });

  it('navigates to checkout', () => {
    render(
      <MemoryRouter>
        <CartContext.Provider value={filledCartContext}>
          <CartPage />
        </CartContext.Provider>
      </MemoryRouter>
    );

    const checkoutButton = screen.getByText('Proceed to Checkout');
    fireEvent.click(checkoutButton);

    expect(mockNavigate).toHaveBeenCalledWith('/checkout');
  });
});
