import { Product } from "@/types/product";
import {
  CATEGORY,
  FABRIC,
  OCCASION,
  COLOR,
} from "@/constants";
export const bridalProducts: Product[] = [
    {
  id: 13,
  sku: "VAR-BRI-001",
  slug: "royal-bridal-silk-saree",
  name: "Royal Bridal Silk Saree",
  description: "Luxurious bridal silk saree with intricate zari weaving and elegant finish.",
  category: CATEGORY.BRIDAL,
  fabric: FABRIC.SILK,
  occasion: OCCASION.BRIDAL,
  color: COLOR.RED,
  price: 9999,
  originalPrice: 12999,
  discount: 23,
  rating: 4.9,
  reviews: 324,
  stock: 10,
  featured: true,
  bestseller: true,
  images: [
    "/images/products/bridal/bridal-01.jpg"
  ]
},

{
  id: 14,
  sku: "VAR-BRI-002",
  slug: "golden-zari-bridal-saree",
  name: "Golden Zari Bridal Saree",
  description: "Traditional bridal saree crafted with premium silk and rich golden zari work.",
  category: CATEGORY.BRIDAL,
  fabric: FABRIC.SILK,
  occasion: OCCASION.BRIDAL,
  color: COLOR.GOLD,
  price: 11499,
  originalPrice: 14499,
  discount: 21,
  rating: 4.8,
  reviews: 281,
  stock: 8,
  featured: true,
  bestseller: false,
  images: [
    "/images/products/bridal/bridal-02.jpg"
  ]
},

{
  id: 15,
  sku: "VAR-BRI-003",
  slug: "classic-red-bridal-saree",
  name: "Classic Red Bridal Saree",
  description: "Timeless bridal saree designed for weddings with elegant traditional motifs.",
  category: CATEGORY.BRIDAL,
  fabric: FABRIC.SILK,
  occasion: OCCASION.BRIDAL,
  color: COLOR.RED,
  price: 9499,
  originalPrice: 11999,
  discount: 21,
  rating: 4.9,
  reviews: 356,
  stock: 11,
  featured: false,
  bestseller: true,
  images: [
    "/images/products/bridal/bridal-03.jpg"
  ]
},

{
  id: 16,
  sku: "VAR-BRI-004",
  slug: "royal-maroon-bridal-saree",
  name: "Royal Maroon Bridal Saree",
  description: "Elegant maroon bridal saree featuring handcrafted zari detailing.",
  category: CATEGORY.BRIDAL,
  fabric: FABRIC.SILK,
  occasion: OCCASION.BRIDAL,
  color: COLOR.MAROON,
  price: 10799,
  originalPrice: 13799,
  discount: 22,
  rating: 4.8,
  reviews: 248,
  stock: 9,
  featured: false,
  bestseller: false,
  images: [
    "/images/products/bridal/bridal-04.jpg"
  ]
},

{
  id: 17,
  sku: "VAR-BRI-005",
  slug: "premium-pink-bridal-saree",
  name: "Premium Pink Bridal Saree",
  description: "Graceful bridal saree with soft silk texture and premium embroidery.",
  category: CATEGORY.BRIDAL,
  fabric: FABRIC.SILK,
  occasion: OCCASION.BRIDAL,
  color: COLOR.PINK,
  price: 10499,
  originalPrice: 13499,
  discount: 22,
  rating: 4.9,
  reviews: 219,
  stock: 7,
  featured: true,
  bestseller: false,
  images: [
    "/images/products/bridal/bridal-05.jpg"
  ]
},

{
  id: 18,
  sku: "VAR-BRI-006",
  slug: "premium-designer-bridal-saree",
  name: "Premium Designer Bridal Saree",
  description: "Luxury bridal saree blending modern elegance with traditional craftsmanship.",
  category: CATEGORY.BRIDAL,
  fabric: FABRIC.SILK,
  occasion: OCCASION.BRIDAL,
  color: COLOR.PURPLE,
  price: 11999,
  originalPrice: 14999,
  discount: 20,
  rating: 5.0,
  reviews: 189,
  stock: 6,
  featured: true,
  bestseller: true,
  images: [
    "/images/products/bridal/bridal-06.jpg"
  ]
}
];