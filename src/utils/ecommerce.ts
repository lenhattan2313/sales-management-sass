/**
 * Generate unique order number
 */
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${timestamp.slice(-6)}-${random}`;
}

/**
 * Generate unique product SKU
 */
export function generateProductSku(prefix = "PROD"): string {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp.slice(-4)}-${random}`;
}

/**
 * Calculate cart total
 */
export function calculateCartTotal(
  items: Array<{ price: number; quantity: number }>
): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

/**
 * Calculate tax amount
 */
export function calculateTax(subtotal: number, taxRate: number): number {
  return subtotal * (taxRate / 100);
}

/**
 * Calculate shipping cost based on weight and distance
 */
export function calculateShippingCost(
  weight: number,
  distance: number,
  baseRate = 5.99,
  weightRate = 0.5,
  distanceRate = 0.1
): number {
  return baseRate + weight * weightRate + distance * distanceRate;
}

/**
 * Calculate discount amount
 */
export function calculateDiscount(
  subtotal: number,
  discountPercentage: number
): number {
  return subtotal * (discountPercentage / 100);
}

/**
 * Calculate final total with tax and shipping
 */
export function calculateFinalTotal(
  subtotal: number,
  taxRate: number,
  shippingCost: number,
  discountPercentage = 0
): {
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
} {
  const discount = calculateDiscount(subtotal, discountPercentage);
  const discountedSubtotal = subtotal - discount;
  const tax = calculateTax(discountedSubtotal, taxRate);
  const total = discountedSubtotal + tax + shippingCost;

  return {
    subtotal,
    tax,
    shipping: shippingCost,
    discount,
    total,
  };
}

/**
 * Check if product is in stock
 */
export function isInStock(quantity: number, reservedQuantity = 0): boolean {
  return quantity - reservedQuantity > 0;
}

/**
 * Get stock status text
 */
export function getStockStatus(quantity: number, reservedQuantity = 0): string {
  const available = quantity - reservedQuantity;

  if (available <= 0) return "Out of Stock";
  if (available <= 5) return "Low Stock";
  if (available <= 20) return "Limited Stock";
  return "In Stock";
}

/**
 * Calculate average rating from reviews
 */
export function calculateAverageRating(ratings: number[]): number {
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((total, rating) => total + rating, 0);
  return Math.round((sum / ratings.length) * 10) / 10;
}

/**
 * Format rating display
 */
export function formatRating(rating: number): string {
  return `${rating.toFixed(1)}/5.0`;
}

/**
 * Calculate profit margin
 */
export function calculateProfitMargin(
  cost: number,
  sellingPrice: number
): number {
  if (sellingPrice === 0) return 0;
  return ((sellingPrice - cost) / sellingPrice) * 100;
}

/**
 * Calculate markup percentage
 */
export function calculateMarkup(cost: number, sellingPrice: number): number {
  if (cost === 0) return 0;
  return ((sellingPrice - cost) / cost) * 100;
}

/**
 * Validate product data
 */
export function validateProductData(data: {
  name: string;
  price: number;
  description: string;
  category: string;
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 3) {
    errors.push("Product name must be at least 3 characters long");
  }

  if (data.price <= 0) {
    errors.push("Product price must be greater than 0");
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.push("Product description must be at least 10 characters long");
  }

  if (!data.category || data.category.trim().length === 0) {
    errors.push("Product category is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Calculate estimated delivery date
 */
export function calculateEstimatedDelivery(
  orderDate: Date,
  processingDays = 1,
  shippingDays = 3
): Date {
  const deliveryDate = new Date(orderDate);
  deliveryDate.setDate(deliveryDate.getDate() + processingDays + shippingDays);
  return deliveryDate;
}

/**
 * Check if order qualifies for free shipping
 */
export function qualifiesForFreeShipping(
  subtotal: number,
  threshold = 50
): boolean {
  return subtotal >= threshold;
}
