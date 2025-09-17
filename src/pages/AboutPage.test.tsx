import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AboutPage from './AboutPage';
import { BrowserRouter as Router } from 'react-router-dom';

describe('AboutPage', () => {
  it('renders the main sections of the page', () => {
    render(
      <Router>
        <AboutPage />
      </Router>
    );

    expect(screen.getByText('Our Story')).toBeInTheDocument();
    expect(screen.getByText('A Journey of Flavor')).toBeInTheDocument();
    expect(screen.getByText('Our Values')).toBeInTheDocument();
    expect(screen.getByText('Meet Our Team')).toBeInTheDocument();
    expect(
      screen.getByText('Ready to Experience Authentic Indonesian Cuisine?')
    ).toBeInTheDocument();
  });
});
