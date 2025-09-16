import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AIAssistantWidget from './AIAssistantWidget';
import { useCart } from '../../context/CartContext';
import React from 'react';

// Mocking timers
vi.useFakeTimers();

// Mock the useCart hook
vi.mock('../../context/CartContext', () => ({
  useCart: vi.fn(),
}));

describe('AIAssistantWidget', () => {
  beforeEach(() => {
    // Reset the mock before each test
    useCart.mockReturnValue({
      items: [],
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      clearCart: vi.fn(),
      totalItems: 0,
      totalPrice: 0,
    });
  });

  it('renders the widget', () => {
    render(<AIAssistantWidget />);
    expect(screen.getByText('AI Assistant')).toBeInTheDocument();
  });

  it('minimizes and restores the widget', () => {
    render(<AIAssistantWidget />);

    // Minimize
    fireEvent.click(screen.getByTitle('Minimize'));
    expect(screen.queryByText('AI Assistant')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /message/i })
    ).toBeInTheDocument();

    // Restore
    fireEvent.click(screen.getByRole('button', { name: /message/i }));
    expect(screen.getByText('AI Assistant')).toBeInTheDocument();
  });

  it('sends a message and receives a response', async () => {
    render(<AIAssistantWidget />);

    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByRole('button', { name: /send/i });

    // Send a message
    fireEvent.change(input, { target: { value: 'menu' } });
    fireEvent.click(sendButton);

    // Check if the user message appears
    expect(screen.getByText('menu')).toBeInTheDocument();

    // Fast-forward timers to get the bot's response
    vi.runAllTimers();

    // Check for bot's response
    await waitFor(() => {
      expect(screen.getByText(/Our Menu Highlights/)).toBeInTheDocument();
    });
  });

  it('uses a quick action', async () => {
    render(<AIAssistantWidget />);

    // Click on the "View Menu" quick action
    fireEvent.click(screen.getByText('View Menu'));

    // Check if the user message appears
    expect(screen.getByText('Show me the menu')).toBeInTheDocument();

    // Fast-forward timers to get the bot's response
    vi.runAllTimers();

    // Check for bot's response
    await waitFor(() => {
      expect(screen.getByText(/Our Menu Highlights/)).toBeInTheDocument();
    });
  });

  it('clears the chat', () => {
    render(<AIAssistantWidget />);

    // Send a message
    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByRole('button', { name: /send/i });
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(sendButton);

    // Check if the message is there
    expect(screen.getByText('test')).toBeInTheDocument();

    // Clear the chat
    fireEvent.click(screen.getByTitle('Clear chat'));

    // Check if the chat is cleared
    expect(screen.queryByText('test')).not.toBeInTheDocument();
  });
});
