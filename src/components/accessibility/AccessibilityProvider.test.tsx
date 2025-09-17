import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  AccessibilityProvider,
  useAccessibility,
  AccessibilitySettingsPanel,
} from './AccessibilityProvider';
import React from 'react';

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

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

const TestConsumer = () => {
  const { settings, updateSettings, resetSettings } = useAccessibility();
  return (
    <div>
      <div data-testid="highContrast">{settings.highContrast.toString()}</div>
      <div data-testid="largeText">{settings.largeText.toString()}</div>
      <button onClick={() => updateSettings({ highContrast: true })}>
        Update
      </button>
      <button onClick={() => resetSettings()}>Reset</button>
    </div>
  );
};

describe('AccessibilityProvider', () => {
  it('renders children', () => {
    render(
      <AccessibilityProvider>
        <div>Child</div>
      </AccessibilityProvider>
    );
    expect(screen.getByText('Child')).toBeInTheDocument();
  });

  it('provides default settings', () => {
    render(
      <AccessibilityProvider>
        <TestConsumer />
      </AccessibilityProvider>
    );
    expect(screen.getByTestId('highContrast').textContent).toBe('false');
    expect(screen.getByTestId('largeText').textContent).toBe('false');
  });

  it('updates settings', () => {
    render(
      <AccessibilityProvider>
        <TestConsumer />
      </AccessibilityProvider>
    );
    fireEvent.click(screen.getByText('Update'));
    expect(screen.getByTestId('highContrast').textContent).toBe('true');
  });

  it('resets settings', () => {
    render(
      <AccessibilityProvider>
        <TestConsumer />
      </AccessibilityProvider>
    );
    fireEvent.click(screen.getByText('Update'));
    expect(screen.getByTestId('highContrast').textContent).toBe('true');
    fireEvent.click(screen.getByText('Reset'));
    expect(screen.getByTestId('highContrast').textContent).toBe('false');
  });
});

describe('AccessibilitySettingsPanel', () => {
  it('opens and closes the panel', () => {
    render(
      <AccessibilityProvider>
        <AccessibilitySettingsPanel />
      </AccessibilityProvider>
    );

    // Panel should be closed initially
    expect(
      screen.queryByText('Accessibility Settings')
    ).not.toBeInTheDocument();

    // Open the panel
    fireEvent.click(screen.getByLabelText('Accessibility Settings'));
    expect(screen.getByText('Accessibility Settings')).toBeInTheDocument();

    // Close the panel
    fireEvent.click(screen.getByLabelText('Close'));
    expect(
      screen.queryByText('Accessibility Settings')
    ).not.toBeInTheDocument();
  });

  it('updates context when a setting is changed', () => {
    render(
      <AccessibilityProvider>
        <TestConsumer />
        <AccessibilitySettingsPanel />
      </AccessibilityProvider>
    );

    // Open the panel
    fireEvent.click(screen.getByLabelText('Accessibility Settings'));

    // Check initial state
    expect(screen.getByTestId('highContrast').textContent).toBe('false');

    // Toggle high contrast
    fireEvent.click(screen.getByLabelText('High Contrast'));

    // Check if the context is updated
    expect(screen.getByTestId('highContrast').textContent).toBe('true');
  });
});
