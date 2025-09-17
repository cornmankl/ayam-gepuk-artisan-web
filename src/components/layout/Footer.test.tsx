import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Footer', () => {
  it('renders the main sections of the footer', () => {
    render(
      <Router>
        <Footer />
      </Router>
    );

    expect(
      screen.getByText('Get Exclusive Offers & Updates')
    ).toBeInTheDocument();
    expect(screen.getByText('Opening Hours')).toBeInTheDocument();
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  it('handles newsletter signup', () => {
    render(
      <Router>
        <Footer />
      </Router>
    );

    const emailInput = screen.getByPlaceholderText('Your email address');
    const subscribeButton = screen.getByRole('button', { name: 'Subscribe' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput).toHaveValue('test@example.com');

    // This is a basic test. In a real app, you would mock the form submission
    // and assert that the correct data is sent.
    fireEvent.click(subscribeButton);
  });

  it('has the correct social media links', () => {
    render(
      <Router>
        <Footer />
      </Router>
    );

    expect(screen.getByLabelText('Facebook')).toHaveAttribute(
      'href',
      'https://www.facebook.com/AyamGepukArtisan'
    );
    expect(screen.getByLabelText('Instagram')).toHaveAttribute(
      'href',
      'https://www.instagram.com/ayamgepukartisan'
    );
    expect(screen.getByLabelText('TikTok')).toHaveAttribute(
      'href',
      'https://www.tiktok.com/@ayamgepukartisan'
    );
  });

  it('displays the current year in the copyright notice', () => {
    render(
      <Router>
        <Footer />
      </Router>
    );

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(
        `© ${currentYear} Ayam Gepuk Artisan. All rights reserved.`
      )
    ).toBeInTheDocument();
  });
});
