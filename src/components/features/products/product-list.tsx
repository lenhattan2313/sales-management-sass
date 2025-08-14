"use client";

import { useProducts } from "@/lib/api/products/product-queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCardData, ProductFilters } from "@/types/product";

interface ProductListProps {
  initialData?: ProductCardData[];
  filters?: ProductFilters;
}

export function ProductList({ initialData, filters = {} }: ProductListProps) {
  const {
    data: productsResponse,
    isLoading,
    error,
    refetch,
  } = useProducts(filters);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <p className="text-red-600 mb-4">Failed to load products</p>
        <Button onClick={() => refetch()} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  if (isLoading && !initialData) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Extract products array from response or use initial data
  const displayProducts = productsResponse?.products || initialData || [];

  if (displayProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <p className="text-gray-500 mb-4">No products found</p>
        <Button onClick={() => refetch()} variant="outline">
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {displayProducts.map((product: ProductCardData) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-9 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}

interface ProductCardProps {
  product: ProductCardData;
}

function ProductCard({ product }: ProductCardProps) {
  const inStock = product.stock > 0;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold truncate">
          {product.name}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant={inStock ? "default" : "secondary"}>
            {inStock ? "In Stock" : "Out of Stock"}
          </Badge>
          {product.category && (
            <Badge variant="outline">{product.category.name}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
          <Button size="sm" disabled={!inStock}>
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
