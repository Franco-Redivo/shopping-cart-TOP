import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../components/ProductCard/ProductCard';

// Mock product data for testing
const mockProduct = {
  id: 1,
  title: "Test Product",
  category: "test category",
  description: "This is a test product description",
  price: 29.99,
  image: "https://example.com/test-image.jpg"
};

// Mock cart data
const mockCart = [];

// Mock useOutletContext
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useOutletContext: () => ({ cart: mockCart })
  };
});

describe('ProductCard', () => {
  const mockAddToCart = vi.fn();

  beforeEach(() => {
    mockAddToCart.mockClear();
  });

  it('renders product information correctly', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} addToCart={mockAddToCart} />
      </MemoryRouter>
    );

    // Check if product image is rendered
    const productImg = screen.getByRole('img');
    expect(productImg).not.toBeNull();
    expect(productImg.getAttribute('src')).toBe(mockProduct.image);

    // Check if product title is rendered
    expect(screen.getByText(mockProduct.title)).not.toBeNull();

    // Check if product category is rendered
    expect(screen.getByText(mockProduct.category)).not.toBeNull();

    // Check if product description is rendered
    expect(screen.getByText(mockProduct.description)).not.toBeNull();

    // Check if product price is rendered
    expect(screen.getByText(`$${mockProduct.price}`)).not.toBeNull();
  });

  it('displays initial quantity as 1', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} addToCart={mockAddToCart} />
      </MemoryRouter>
    );

    const quantityDisplay = screen.getByText('1');
    expect(quantityDisplay).not.toBeNull();
  });

  it('increases quantity when plus button is clicked', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} addToCart={mockAddToCart} />
      </MemoryRouter>
    );

    const increaseBtn = screen.getByLabelText('Increase quantity');
    fireEvent.click(increaseBtn);

    expect(screen.getByText('2')).not.toBeNull();
  });

  it('decreases quantity when minus button is clicked', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} addToCart={mockAddToCart} />
      </MemoryRouter>
    );

    const increaseBtn = screen.getByLabelText('Increase quantity');
    const decreaseBtn = screen.getByLabelText('Decrease quantity');

    // First increase to 2
    fireEvent.click(increaseBtn);
    expect(screen.getByText('2')).not.toBeNull();

    // Then decrease back to 1
    fireEvent.click(decreaseBtn);
    expect(screen.getByText('1')).not.toBeNull();
  });

  it('does not decrease quantity below 1', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} addToCart={mockAddToCart} />
      </MemoryRouter>
    );

    const decreaseBtn = screen.getByLabelText('Decrease quantity');
    
    // Try to decrease from initial quantity of 1
    fireEvent.click(decreaseBtn);
    
    // Should still be 1
    expect(screen.getByText('1')).not.toBeNull();
  });

  it('calls addToCart with correct parameters when Add to Cart is clicked', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} addToCart={mockAddToCart} />
      </MemoryRouter>
    );

    const addToCartBtn = screen.getByText('Add to Cart');
    fireEvent.click(addToCartBtn);

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 1);
  });

  it('calls addToCart with updated quantity', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} addToCart={mockAddToCart} />
      </MemoryRouter>
    );

    const increaseBtn = screen.getByLabelText('Increase quantity');
    const addToCartBtn = screen.getByText('Add to Cart');

    // Increase quantity to 3
    fireEvent.click(increaseBtn);
    fireEvent.click(increaseBtn);
    
    // Add to cart
    fireEvent.click(addToCartBtn);

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 3);
  });

  it('resets quantity to 1 after adding to cart', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} addToCart={mockAddToCart} />
      </MemoryRouter>
    );

    const increaseBtn = screen.getByLabelText('Increase quantity');
    const addToCartBtn = screen.getByText('Add to Cart');

    // Increase quantity to 2
    fireEvent.click(increaseBtn);
    expect(screen.getByText('2')).not.toBeNull();

    // Add to cart
    fireEvent.click(addToCartBtn);

    // Quantity should reset to 1
    expect(screen.getByText('1')).not.toBeNull();
  });

  it('renders all required buttons', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} addToCart={mockAddToCart} />
      </MemoryRouter>
    );

    expect(screen.getByLabelText('Decrease quantity')).not.toBeNull();
    expect(screen.getByLabelText('Increase quantity')).not.toBeNull();
    expect(screen.getByText('Add to Cart')).not.toBeNull();
  });
});