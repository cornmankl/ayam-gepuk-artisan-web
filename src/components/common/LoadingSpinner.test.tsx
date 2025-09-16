import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders with a small size', () => {
    const { container } = render(<LoadingSpinner size="sm" />);
    const spinnerDiv = container.querySelector('.w-6.h-6');
    expect(spinnerDiv).toBeInTheDocument();
  });

  it('renders with a large size', () => {
    const { container } = render(<LoadingSpinner size="lg" />);
    const spinnerDiv = container.querySelector('.w-16.h-16');
    expect(spinnerDiv).toBeInTheDocument();
  });

  it('renders with custom text', () => {
    render(<LoadingSpinner text="Please wait" />);
    expect(screen.getByText('Please wait')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('does not render text when text prop is an empty string', () => {
    render(<LoadingSpinner text="" />);
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('renders in full-screen mode', () => {
    const { container } = render(<LoadingSpinner fullScreen />);
    const fullScreenDiv = container.querySelector('.fixed.inset-0');
    expect(fullScreenDiv).toBeInTheDocument();
  });
});
