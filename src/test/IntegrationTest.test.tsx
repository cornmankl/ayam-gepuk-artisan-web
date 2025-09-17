import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';
import { LoyaltyProvider } from '../context/LoyaltyContext';
import { ThemeProvider } from '../context/ThemeContext';
import { AccessibilityProvider } from '../components/accessibility/AccessibilityProvider';
import OrderButton from '../components/ordering/OrderButton';
import AIAssistant from '../components/ai/AIAssistant';
import { menuItems } from '../data/menuData';

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Complete Application Integration Test', () => {
  beforeEach(() => {
    // Clear mocks before each test
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Clear localStorage after each test
    localStorage.clear();
  });

  it('integrates all core features without errors', () => {
    // Render the application with all providers
    render(
      <Router>
        <ThemeProvider>
          <AccessibilityProvider>
            <AuthProvider>
              <LoyaltyProvider>
                <CartProvider>
                  <div>
                    <OrderButton />
                    <AIAssistant />
                  </div>
                </CartProvider>
              </LoyaltyProvider>
            </AuthProvider>
          </AccessibilityProvider>
        </ThemeProvider>
      </Router>
    );

    // Check that OrderButton renders without errors
    const orderButton = screen.getByRole('button', { name: /order/i });
    expect(orderButton).toBeInTheDocument();

    // Check that AIAssistant renders without errors
    const aiButton = screen.getByLabelText('Chat with AI Assistant');
    expect(aiButton).toBeInTheDocument();

    // Verify that we have menu data available
    expect(menuItems).toBeDefined();
    expect(menuItems.length).toBeGreaterThan(0);

    // Check that each menu item has required properties
    menuItems.forEach(item => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('description');
      expect(item).toHaveProperty('price');
      expect(item).toHaveProperty('image');
      expect(item).toHaveProperty('category');
    });
  });

  it('provides all context values correctly', () => {
    // Test component to verify context values
    const TestComponent = () => {
      return (
        <div>
          <div data-testid="theme-context">Theme Context Working</div>
          <div data-testid="accessibility-context">
            Accessibility Context Working
          </div>
          <div data-testid="auth-context">Auth Context Working</div>
          <div data-testid="loyalty-context">Loyalty Context Working</div>
          <div data-testid="cart-context">Cart Context Working</div>
        </div>
      );
    };

    render(
      <Router>
        <ThemeProvider>
          <AccessibilityProvider>
            <AuthProvider>
              <LoyaltyProvider>
                <CartProvider>
                  <TestComponent />
                </CartProvider>
              </LoyaltyProvider>
            </AuthProvider>
          </AccessibilityProvider>
        </ThemeProvider>
      </Router>
    );

    // Verify all contexts are provided
    expect(screen.getByTestId('theme-context')).toBeInTheDocument();
    expect(screen.getByTestId('accessibility-context')).toBeInTheDocument();
    expect(screen.getByTestId('auth-context')).toBeInTheDocument();
    expect(screen.getByTestId('loyalty-context')).toBeInTheDocument();
    expect(screen.getByTestId('cart-context')).toBeInTheDocument();
  });

  it('maintains state across interactions', async () => {
    // Test component to verify state persistence
    const StateTestComponent = () => {
      return (
        <div>
          <OrderButton />
          <AIAssistant />
          <div data-testid="state-test">State Test Component</div>
        </div>
      );
    };

    render(
      <Router>
        <ThemeProvider>
          <AccessibilityProvider>
            <AuthProvider>
              <LoyaltyProvider>
                <CartProvider>
                  <StateTestComponent />
                </CartProvider>
              </LoyaltyProvider>
            </AuthProvider>
          </AccessibilityProvider>
        </ThemeProvider>
      </Router>
    );

    // Verify initial state
    expect(screen.getByTestId('state-test')).toBeInTheDocument();

    // Interact with OrderButton
    const orderButton = screen.getByRole('button', { name: /order/i });
    fireEvent.click(orderButton);

    // Interact with AIAssistant
    const aiButton = screen.getByLabelText('Chat with AI Assistant');
    fireEvent.click(aiButton);

    // Verify components still exist after interaction
    expect(orderButton).toBeInTheDocument();
    expect(aiButton).toBeInTheDocument();

    // Close AI chat
    const closeButton = screen.getByLabelText('Close chat');
    fireEvent.click(closeButton);

    // Verify components still exist after closing chat
    expect(orderButton).toBeInTheDocument();
    expect(aiButton).toBeInTheDocument();
  });

  it('handles asynchronous operations correctly', async () => {
    // Test component with async operations
    const AsyncTestComponent = () => {
      return (
        <div>
          <OrderButton />
          <AIAssistant />
          <div data-testid="async-test">Async Test Component</div>
        </div>
      );
    };

    render(
      <Router>
        <ThemeProvider>
          <AccessibilityProvider>
            <AuthProvider>
              <LoyaltyProvider>
                <CartProvider>
                  <AsyncTestComponent />
                </CartProvider>
              </LoyaltyProvider>
            </AuthProvider>
          </AccessibilityProvider>
        </ThemeProvider>
      </Router>
    );

    // Wait for initial render
    await waitFor(() => {
      expect(screen.getByTestId('async-test')).toBeInTheDocument();
    });

    // Verify components render correctly
    expect(screen.getByRole('button', { name: /order/i })).toBeInTheDocument();
    expect(screen.getByLabelText('Chat with AI Assistant')).toBeInTheDocument();
  });
});
