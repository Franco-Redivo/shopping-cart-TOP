import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from '../components/Navbar/NavBar';

describe('NavBar', () => {
  it('renders the logo with correct alt text', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const logoImg = screen.getByAltText(/surge logo/i);
    expect(logoImg).not.toBeNull();
  });

  it('renders the cart icon with correct alt text', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const cartImg = screen.getByAltText(/cart/i);
    expect(cartImg.getAttribute("alt")).toBe("cart");
  });

  it('logo links to home page', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const logoLink = screen.getByRole('link', { name: /surge/i });
    expect(logoLink.getAttribute("href")).toBe('/');
  });

  it('cart icon links to cart page', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const cartLink = screen.getByRole('link', { name: /cart/i });
    expect(cartLink.getAttribute("href")).toBe('/cart');
  });
});

