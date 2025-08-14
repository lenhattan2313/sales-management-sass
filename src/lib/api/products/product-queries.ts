import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import {
  ProductFormData,
  ProductsResponse,
  ProductResponse,
} from "@/types/product";

// API functions
async function fetchProducts(
  filters: Record<string, any> = {}
): Promise<ProductsResponse> {
  const params = new URLSearchParams(filters);
  const response = await fetch(`/api/products?${params}`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

async function fetchProduct(id: string): Promise<ProductResponse> {
  const response = await fetch(`/api/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}

async function createProduct(data: ProductFormData): Promise<ProductResponse> {
  const response = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create product");
  }

  return response.json();
}

async function updateProduct(
  id: string,
  data: Partial<ProductFormData>
): Promise<ProductResponse> {
  const response = await fetch(`/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  return response.json();
}

async function deleteProduct(
  id: string
): Promise<{ success: boolean; message?: string }> {
  const response = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }

  return response.json();
}

// Query hooks
export function useProducts(filters: Record<string, any> = {}) {
  return useQuery({
    queryKey: queryKeys.products.list(filters),
    queryFn: () => fetchProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => fetchProduct(id),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!id, // Only run query if id exists
  });
}

// Mutation hooks
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: (newProduct: ProductResponse) => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.lists(),
      });

      // Optimistically update the cache if product data exists
      if (newProduct.product) {
        queryClient.setQueryData(
          queryKeys.products.detail(newProduct.product.id),
          newProduct
        );
      }
    },
    onError: (error: Error) => {
      console.error("Failed to create product:", error);
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<ProductFormData>;
    }) => updateProduct(id, data),
    onSuccess: (updatedProduct: ProductResponse) => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.lists(),
      });

      // Update the specific product in cache if product data exists
      if (updatedProduct.product) {
        queryClient.setQueryData(
          queryKeys.products.detail(updatedProduct.product.id),
          updatedProduct
        );
      }
    },
    onError: (error: Error) => {
      console.error("Failed to update product:", error);
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: (
      _: { success: boolean; message?: string },
      deletedId: string
    ) => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.lists(),
      });

      // Remove the deleted product from cache
      queryClient.removeQueries({
        queryKey: queryKeys.products.detail(deletedId),
      });
    },
    onError: (error: Error) => {
      console.error("Failed to delete product:", error);
    },
  });
}
