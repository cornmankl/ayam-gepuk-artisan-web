import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AIAssistant from './AIAssistant';

// Mocking timers
vi.useFakeTimers();

describe('AIAssistant', () => {
  it('renders the chat button', () => {
    render(<AIAssistant />);
    expect(screen.getByLabelText('Chat with AI Assistant')).toBeInTheDocument();
  });

  it('opens the chat window when the button is clicked', () => {
    render(<AIAssistant />);
    fireEvent.click(screen.getByLabelText('Chat with AI Assistant'));
    expect(screen.getByText('Ayam Gepuk Assistant')).toBeInTheDocument();
  });

  it('closes the chat window when the close button is clicked', () => {
    render(<AIAssistant />);
    fireEvent.click(screen.getByLabelText('Chat with AI Assistant'));
    expect(screen.getByText('Ayam Gepuk Assistant')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Close chat'));
    expect(screen.queryByText('Ayam Gepuk Assistant')).not.toBeInTheDocument();
  });

  it('sends a message and receives a response', async () => {
    render(<AIAssistant />);
    fireEvent.click(screen.getByLabelText('Chat with AI Assistant'));

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
      expect(
        screen.getByText(
          /Our signature dishes include Ayam Krispy and Ayam Klasik/
        )
      ).toBeInTheDocument();
    });
  });
});
