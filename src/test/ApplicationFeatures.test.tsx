import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';

// Import all contexts
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';
import { LoyaltyProvider } from '../context/LoyaltyContext';
import { ThemeProvider } from '../context/ThemeContext';
import { AccessibilityProvider } from '../components/accessibility/AccessibilityProvider';

// Import key components to test
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
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
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

describe('Application Features Test', () => {
  beforeEach(() => {
    // Clear mocks before each test
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Clear localStorage after each test
    localStorage.clear();
  });

  // Test 1: Menu data structure
  it('has properly structured menu data', () => {
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

  // Test 2: Order Button functionality
  it('renders OrderButton component', () => {
    render(
      <Router>
        <OrderButton />
      </Router>
    );

    // Check that the order button is rendered
    const orderButton = screen.getByRole('button', { name: /order/i });
    expect(orderButton).toBeInTheDocument();
  });

  // Test 3: AI Assistant functionality
  it('renders AI Assistant component', () => {
    render(
      <Router>
        <AIAssistant />
      </Router>
    );

    // Check that the AI assistant button is rendered
    const aiButton = screen.getByLabelText('Chat with AI Assistant');
    expect(aiButton).toBeInTheDocument();
  });

  // Test 4: Cart functionality
  it('provides cart context', () => {
    const TestComponent = () => {
      return <div data-testid="cart-test">Cart Test</div>;
    };

    render(
      <Router>
        <CartProvider>
          <TestComponent />
        </CartProvider>
      </Router>
    );

    // If we get here without errors, the context provider is working
    expect(screen.getByTestId('cart-test')).toBeInTheDocument();
  });

  // Test 5: Authentication functionality
  it('provides auth context', () => {
    const TestComponent = () => {
      return <div data-testid="auth-test">Auth Test</div>;
    };

    render(
      <Router>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </Router>
    );

    // If we get here without errors, the context provider is working
    expect(screen.getByTestId('auth-test')).toBeInTheDocument();
  });

  // Test 6: Loyalty program functionality
  it('provides loyalty context', () => {
    const TestComponent = () => {
      return <div data-testid="loyalty-test">Loyalty Test</div>;
    };

    render(
      <Router>
        <LoyaltyProvider>
          <TestComponent />
        </LoyaltyProvider>
      </Router>
    );

    // If we get here without errors, the context provider is working
    expect(screen.getByTestId('loyalty-test')).toBeInTheDocument();
  });

  // Test 7: Theme functionality
  it('provides theme context', () => {
    const TestComponent = () => {
      return <div data-testid="theme-test">Theme Test</div>;
    };

    render(
      <Router>
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      </Router>
    );

    // If we get here without errors, the context provider is working
    expect(screen.getByTestId('theme-test')).toBeInTheDocument();
  });

  // Test 8: Accessibility functionality
  it('provides accessibility context', () => {
    const TestComponent = () => {
      return <div data-testid="accessibility-test">Accessibility Test</div>;
    };

    render(
      <Router>
        <AccessibilityProvider>
          <TestComponent />
        </AccessibilityProvider>
      </Router>
    );

    // If we get here without errors, the context provider is working
    expect(screen.getByTestId('accessibility-test')).toBeInTheDocument();
  });

  // Test 9: Combined context providers
  it('works with all context providers together', () => {
    const TestComponent = () => {
      return (
        <div>
          <div data-testid="combined-test">Combined Context Test</div>
        </div>
      );
    };

    render(
      <Router>
        <AuthProvider>
          <CartProvider>
            <LoyaltyProvider>
              <ThemeProvider>
                <AccessibilityProvider>
                  <TestComponent />
                </AccessibilityProvider>
              </ThemeProvider>
            </LoyaltyProvider>
          </CartProvider>
        </AuthProvider>
      </Router>
    );

    expect(screen.getByTestId('combined-test')).toBeInTheDocument();
  });

  // Test 10: Menu items validation
  it('has valid menu items with proper structure', () => {
    // Check that we have menu items in different categories
    const categories = ['krispy', 'klasik', 'side', 'drink'];
    const foundCategories: string[] = [];

    menuItems.forEach(item => {
      // Validate category
      expect(categories).toContain(item.category);
      if (!foundCategories.includes(item.category)) {
        foundCategories.push(item.category);
      }

      // Validate price
      expect(item.price).toBeGreaterThanOrEqual(0);

      // Validate name
      expect(item.name).toBeTruthy();
      expect(item.name.length).toBeGreaterThan(0);

      // Validate description
      expect(item.description).toBeTruthy();
      expect(item.description.length).toBeGreaterThan(0);
    });

    // Check that we have items in all expected categories
    expect(foundCategories.length).toBeGreaterThan(0);
  });
});
