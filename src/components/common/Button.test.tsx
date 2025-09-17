import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

import '@testing-library/jest-dom';

describe('Button', () => {
  test('renders with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-red-600');
  });

  test('renders with danger variant', () => {
    render(<Button variant="danger">Delete</Button>);
    const button = screen.getByRole('button', { name: /delete/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-red-800');
    expect(button).not.toHaveClass('bg-red-600');
  });
});
