// Product form types
export interface ProductFormData {
  name: string;
  description?: string;
  price: number;
  comparePrice?: number;
  sku?: string;
  barcode?: string;
  stock: number;
  lowStockThreshold?: number;
  trackInventory: boolean;
  weight?: number;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
  };
  categoryId?: string;
  isActive: boolean;
  isFeatured: boolean;
  images: string[];
  metaTitle?: string;
  metaDescription?: string;
}

// Product variant types
export interface ProductVariantFormData {
  name: string;
  sku?: string;
  price?: number;
  stock: number;
  options: Record<string, string | number | boolean>; // { size: "L", color: "Red" }
}

// Product display types
export interface ProductCardData {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  images: string[];
  isActive: boolean;
  isFeatured: boolean;
  stock: number;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface ProductDetailData extends ProductCardData {
  description?: string;
  sku?: string;
  barcode?: string;
  weight?: number;
  dimensions?: Record<string, number>;
  variants: ProductVariantData[];
  metaTitle?: string;
  metaDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductVariantData {
  id: string;
  name: string;
  sku?: string;
  price?: number;
  stock: number;
  options: Record<string, string | number | boolean>;
}

// Category types
export interface CategoryFormData {
  name: string;
  description?: string;
  parentId?: string;
  image?: string;
  isActive: boolean;
}

export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
  parentId?: string;
  children?: CategoryData[];
  productCount?: number;
}

// Product filter types
export interface ProductFilters {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  inStock?: boolean;
  featured?: boolean;
  search?: string;
  sortBy?: "name" | "price" | "createdAt" | "popularity";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

// Product API response types
export interface ProductResponse {
  success: boolean;
  product?: ProductDetailData;
  error?: string;
  message?: string;
}

export interface ProductsResponse {
  success: boolean;
  products?: ProductCardData[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  error?: string;
  message?: string;
}

export interface CategoryResponse {
  success: boolean;
  category?: CategoryData;
  error?: string;
  message?: string;
}

export interface CategoriesResponse {
  success: boolean;
  categories?: CategoryData[];
  error?: string;
  message?: string;
}
