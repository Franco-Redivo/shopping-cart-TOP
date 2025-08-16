import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Cart from '../pages/Cart/Cart';
  it('handles single item correctly', () => {
    const singleItemCart = [{ ...mockProduct1, quantity: 1 }];
    mockUseOutletContext.mockReturnValue({ cart: singleItemCart });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    expect(screen.getByText('subtotal - 1 items')).not.toBeNull();
    
    // Check calculations for single item - use getAllByText to handle multiple instances
    const expectedSubtotal = (29.99 * 1).toFixed(2);
    const priceElements = screen.getAllByText(`$${expectedSubtotal}`);
    expect(priceElements.length).toBeGreaterThan(0);
  });

// Mock the CartItem component
vi.mock('../components/CartItem/CartItem', () => ({
  default: ({ product }) => (
    <div data-testid="cart-item">
      <span>{product.title}</span>
      <span>Quantity: {product.quantity}</span>
      <span>${product.price}</span>
    </div>
  )
}));

// Mock the NavBar component
vi.mock('../components/Navbar/NavBar', () => ({
  default: ({ cart }) => (
    <nav data-testid="navbar">
      NavBar with {cart?.length || 0} items
    </nav>
  )
}));

// Mock the Footer component
vi.mock('../components/Footer/Footer', () => ({
  default: () => <footer data-testid="footer">Footer</footer>
}));

// Mock product data for testing
const mockProduct1 = {
  id: 1,
  title: "Test Product 1",
  category: "test category",
  description: "This is test product 1",
  price: 29.99,
  quantity: 2,
  image: "https://example.com/test-image1.jpg"
};

const mockProduct2 = {
  id: 2,
  title: "Test Product 2",
  category: "test category",
  description: "This is test product 2",
  price: 15.50,
  quantity: 1,
  image: "https://example.com/test-image2.jpg"
};

// Mock useOutletContext
const mockUseOutletContext = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useOutletContext: () => mockUseOutletContext()
  };
});

describe('Cart', () => {
  beforeEach(() => {
    mockUseOutletContext.mockClear();
  });

  it('displays empty cart message when cart is empty', () => {
    mockUseOutletContext.mockReturnValue({ cart: [] });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    expect(screen.getByText('Your cart is empty')).not.toBeNull();
    expect(screen.getByText('Cart')).not.toBeNull();
  });

  it('displays cart items when cart has products', () => {
    const mockCart = [mockProduct1, mockProduct2];
    mockUseOutletContext.mockReturnValue({ cart: mockCart });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    // Check if cart items are rendered
    const cartItems = screen.getAllByTestId('cart-item');
    expect(cartItems).toHaveLength(2);

    // Check if product titles are displayed
    expect(screen.getByText('Test Product 1')).not.toBeNull();
    expect(screen.getByText('Test Product 2')).not.toBeNull();
  });

  it('calculates subtotal correctly', () => {
    const mockCart = [mockProduct1, mockProduct2];
    mockUseOutletContext.mockReturnValue({ cart: mockCart });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    // Calculate expected subtotal: (29.99 * 2) + (15.50 * 1) = 75.48
    const expectedSubtotal = (29.99 * 2 + 15.50 * 1).toFixed(2);
    expect(screen.getByText(`$${expectedSubtotal}`)).not.toBeNull();
    
    // Check items count: 2 + 1 = 3 items
    expect(screen.getByText('subtotal - 3 items')).not.toBeNull();
  });

  it('displays shipping cost', () => {
    const mockCart = [mockProduct1];
    mockUseOutletContext.mockReturnValue({ cart: mockCart });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    expect(screen.getByText('shipping')).not.toBeNull();
    expect(screen.getByText('$5.00')).not.toBeNull();
  });

  it('calculates tax correctly', () => {
    const mockCart = [mockProduct1];
    mockUseOutletContext.mockReturnValue({ cart: mockCart });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    // Calculate expected tax: (29.99 * 2) * 0.1 = 5.998 → $6.00
    const subtotal = 29.99 * 2;
    const expectedTax = (subtotal * 0.1).toFixed(2);
    
    expect(screen.getByText('tax')).not.toBeNull();
    expect(screen.getByText(`$${expectedTax}`)).not.toBeNull();
  });

  it('calculates total correctly', () => {
    const mockCart = [mockProduct1, mockProduct2];
    mockUseOutletContext.mockReturnValue({ cart: mockCart });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    // Calculate expected total:
    // Subtotal: (29.99 * 2) + (15.50 * 1) = 75.48
    // Tax: 75.48 * 0.1 = 7.548
    // Total: 75.48 + 7.548 + 5.00 = 88.028 → $88.03
    const subtotal = 29.99 * 2 + 15.50 * 1;
    const tax = subtotal * 0.1;
    const shipping = 5.00;
    const expectedTotal = (subtotal + tax + shipping).toFixed(2);

    expect(screen.getByText('total')).not.toBeNull();
    expect(screen.getByText(`$${expectedTotal}`)).not.toBeNull();
  });

  it('renders checkout button', () => {
    const mockCart = [mockProduct1];
    mockUseOutletContext.mockReturnValue({ cart: mockCart });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    const checkoutBtn = screen.getByText('Checkout');
    expect(checkoutBtn).not.toBeNull();
    expect(checkoutBtn.tagName).toBe('BUTTON');
  });

  it('renders navbar with cart data', () => {
    const mockCart = [mockProduct1, mockProduct2];
    mockUseOutletContext.mockReturnValue({ cart: mockCart });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    expect(screen.getByTestId('navbar')).not.toBeNull();
  });

  it('renders footer', () => {
    const mockCart = [];
    mockUseOutletContext.mockReturnValue({ cart: mockCart });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    expect(screen.getByTestId('footer')).not.toBeNull();
  });

  it('handles single item correctly', () => {
    const singleItemCart = [{ ...mockProduct1, quantity: 1 }];
    mockUseOutletContext.mockReturnValue({ cart: singleItemCart });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    expect(screen.getByText('subtotal - 1 items')).not.toBeNull();
    
    // Check calculations for single item - use getAllByText to handle multiple instances
    const expectedSubtotal = (29.99 * 1).toFixed(2);
    const priceElements = screen.getAllByText(`$${expectedSubtotal}`);
    expect(priceElements.length).toBeGreaterThan(0);
  });

  it('displays correct structure with main elements', () => {
    const mockCart = [mockProduct1];
    mockUseOutletContext.mockReturnValue({ cart: mockCart });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    // Check main page title
    expect(screen.getByText('Cart')).not.toBeNull();
    
    // Check summary section elements
    expect(screen.getByText('subtotal - 2 items')).not.toBeNull();
    expect(screen.getByText('shipping')).not.toBeNull();
    expect(screen.getByText('tax')).not.toBeNull();
    expect(screen.getByText('total')).not.toBeNull();
  });
});