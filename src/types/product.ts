export interface Product {
  id: number;

  sku: string;

  slug: string;

  name: string;

  description: string;

  category: string;

  fabric: string;

  occasion: string;

  color: string;

  price: number;

  originalPrice: number;

  discount: number;

  rating: number;

  reviews: number;

  stock: number;

  featured: boolean;

  bestseller: boolean;

  images: string[];
}