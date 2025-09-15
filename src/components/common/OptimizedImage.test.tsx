
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import OptimizedImage from './OptimizedImage';

// Mock IntersectionObserver
const intersectionObserverMock = () => ({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = vi.fn().mockImplementation(intersectionObserverMock);

describe('OptimizedImage', () => {
  const src = 'test.jpg';
  const alt = 'Test Image';

  it('renders the placeholder initially', () => {
    render(<OptimizedImage src={src} alt={alt} />);
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  it('renders the image when it loads successfully', () => {
    render(<OptimizedImage src={src} alt={alt} />);
    const image = screen.getByAltText(alt);
    fireEvent.load(image);
    expect(image).toHaveClass('opacity-100');
  });

  it('renders the error state when the image fails to load', () => {
    render(<OptimizedImage src={src} alt={alt} />);
    const image = screen.getByAltText(alt);
    fireEvent.error(image);
    expect(screen.getByText('Image unavailable')).toBeInTheDocument();
  });

  it('loads the image eagerly when priority is true', () => {
    render(<OptimizedImage src={src} alt={alt} priority />);
    const image = screen.getByAltText(alt);
    expect(image).toHaveAttribute('loading', 'eager');
  });
});
