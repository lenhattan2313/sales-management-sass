// Order form types
export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: string;
  customerNotes?: string;
}

export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

// Order data types
export interface OrderData {
  id: string;
  orderNumber: string;
  status:
    | "PENDING"
    | "CONFIRMED"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED"
    | "REFUNDED";
  customer?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
  user?: {
    id: string;
    email: string;
    name?: string;
  };
  subtotal: number;
  taxAmount: number;
  shippingAmount: number;
  discountAmount: number;
  total: number;
  shippingAddress?: Address;
  billingAddress?: Address;
  paymentStatus:
    | "PENDING"
    | "PAID"
    | "FAILED"
    | "REFUNDED"
    | "PARTIALLY_REFUNDED";
  paymentMethod?: string;
  transactionId?: string;
  trackingNumber?: string;
  shippingMethod?: string;
  shippedAt?: Date;
  deliveredAt?: Date;
  customerNotes?: string;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
  items: OrderItemData[];
}

export interface OrderItemData {
  id: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    slug: string;
    images: string[];
  };
  variant?: {
    id: string;
    name: string;
    options: Record<string, any>;
  };
}

// Order list types
export interface OrderListData {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  customer?: {
    email: string;
    firstName?: string;
    lastName?: string;
  };
  paymentStatus: string;
  createdAt: Date;
  itemCount: number;
}

// Order filter types
export interface OrderFilters {
  status?: string;
  paymentStatus?: string;
  dateFrom?: Date;
  dateTo?: Date;
  customerEmail?: string;
  orderNumber?: string;
  sortBy?: "createdAt" | "total" | "orderNumber";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

// Order update types
export interface OrderStatusUpdateData {
  status: string;
  adminNotes?: string;
}

export interface OrderShippingUpdateData {
  trackingNumber?: string;
  shippingMethod?: string;
  shippedAt?: Date;
}

// Order API response types
export interface OrderResponse {
  success: boolean;
  order?: OrderData;
  error?: string;
  message?: string;
}

export interface OrdersResponse {
  success: boolean;
  orders?: OrderListData[];
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

// Cart types
export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
  product: {
    name: string;
    images: string[];
    slug: string;
    stock: number;
  };
  variant?: {
    name: string;
    options: Record<string, any>;
  };
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  taxAmount: number;
  shippingAmount: number;
  total: number;
}

// Cart API response types
export interface CartResponse {
  success: boolean;
  cart?: Cart;
  error?: string;
  message?: string;
}

export interface AddToCartData {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface UpdateCartItemData {
  itemId: string;
  quantity: number;
}
