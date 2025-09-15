
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Layout } from './Layout';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// Mock child components
vi.mock('./Navbar', () => ({ default: () => <div>Navbar</div> }));
vi.mock('./Footer', () => ({ default: () => <div>Footer</div> }));
vi.mock('../ai/AIAssistant', () => ({ default: () => <div>AIAssistant</div> }));
vi.mock('../ordering/OrderButton', () => ({ default: () => <div>OrderButton</div> }));
vi.mock('../privacy/CookieConsent', () => ({ default: () => <div>CookieConsent</div> }));
vi.mock('../../utils/performance', () => ({ PerformanceMonitor: () => <div>PerformanceMonitor</div> }));

describe('Layout', () => {
  it('renders Navbar, Footer, and Outlet content', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<div>Home Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Navbar')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
    expect(screen.getByText('AIAssistant')).toBeInTheDocument();
    expect(screen.getByText('OrderButton')).toBeInTheDocument();
    expect(screen.getByText('CookieConsent')).toBeInTheDocument();
    expect(screen.getByText('PerformanceMonitor')).toBeInTheDocument();
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });
});
