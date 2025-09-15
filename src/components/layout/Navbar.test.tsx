
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Navbar from './Navbar';
import { CartContext } from '../../context/CartContext';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

const mockCartContext = {
  cart: [],
  setCart: vi.fn(),
  addToCart: vi.fn(),
  removeFromCart: vi.fn(),
  updateQuantity: vi.fn(),
  clearCart: vi.fn(),
  totalItems: 5,
  totalPrice: 0,
};

describe('Navbar', () => {
  it('renders the logo and navigation links', () => {
    render(
      <MemoryRouter>
        <CartContext.Provider value={mockCartContext}>
          <Navbar />
        </CartContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /ayam gepuk artisan/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /menu/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /promotions/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  it('displays the correct number of items in the cart', () => {
    render(
      <MemoryRouter>
        <CartContext.Provider value={mockCartContext}>
          <Navbar />
        </CartContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('opens and closes the mobile menu', () => {
    render(
      <MemoryRouter>
        <CartContext.Provider value={mockCartContext}>
          <Navbar />
        </CartContext.Provider>
      </MemoryRouter>
    );

    const menuButton = screen.getByLabelText('Open menu');
    fireEvent.click(menuButton);

    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();

    const closeButton = screen.getByLabelText('Close menu');
    fireEvent.click(closeButton);

    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
  });

  it('highlights the active link', () => {
    render(
      <MemoryRouter initialEntries={['/menu']}>
        <CartContext.Provider value={mockCartContext}>
          <Navbar />
        </CartContext.Provider>
      </MemoryRouter>
    );

    const menuLink = screen.getByRole('link', { name: /menu/i });
    expect(menuLink).toHaveClass('after:absolute');
  });
});
