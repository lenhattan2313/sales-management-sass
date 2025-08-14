/**
 * Track page view for analytics
 */
export function trackPageView(
  page: string,
  properties?: Record<string, any>
): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_ID!, {
      page_title: page,
      page_location: window.location.href,
      ...properties,
    });
  }
}

/**
 * Track custom event for analytics
 */
export function trackEvent(
  eventName: string,
  parameters?: Record<string, any>
): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, parameters);
  }
}

/**
 * Track e-commerce events
 */
export function trackEcommerceEvent(
  eventType:
    | "view_item"
    | "add_to_cart"
    | "remove_from_cart"
    | "begin_checkout"
    | "purchase",
  data: Record<string, any>
): void {
  trackEvent(eventType, data);
}

/**
 * Calculate conversion rate
 */
export function calculateConversionRate(
  conversions: number,
  totalVisitors: number
): number {
  if (totalVisitors === 0) return 0;
  return (conversions / totalVisitors) * 100;
}

/**
 * Calculate average order value
 */
export function calculateAverageOrderValue(
  totalRevenue: number,
  totalOrders: number
): number {
  if (totalOrders === 0) return 0;
  return totalRevenue / totalOrders;
}

/**
 * Calculate customer lifetime value
 */
export function calculateCustomerLifetimeValue(
  averageOrderValue: number,
  averageOrdersPerCustomer: number,
  averageCustomerLifespan: number
): number {
  return averageOrderValue * averageOrdersPerCustomer * averageCustomerLifespan;
}

/**
 * Calculate revenue growth rate
 */
export function calculateRevenueGrowthRate(
  currentRevenue: number,
  previousRevenue: number
): number {
  if (previousRevenue === 0) return 0;
  return ((currentRevenue - previousRevenue) / previousRevenue) * 100;
}

/**
 * Calculate customer retention rate
 */
export function calculateCustomerRetentionRate(
  retainedCustomers: number,
  totalCustomers: number
): number {
  if (totalCustomers === 0) return 0;
  return (retainedCustomers / totalCustomers) * 100;
}

/**
 * Calculate cart abandonment rate
 */
export function calculateCartAbandonmentRate(
  abandonedCarts: number,
  totalCarts: number
): number {
  if (totalCarts === 0) return 0;
  return (abandonedCarts / totalCarts) * 100;
}

/**
 * Generate analytics report data
 */
export function generateAnalyticsReport(data: {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalVisitors: number;
  conversions: number;
  previousPeriodRevenue: number;
  previousPeriodOrders: number;
}): {
  averageOrderValue: number;
  conversionRate: number;
  revenueGrowth: number;
  orderGrowth: number;
} {
  const {
    totalRevenue,
    totalOrders,
    totalVisitors,
    conversions,
    previousPeriodRevenue,
    previousPeriodOrders,
  } = data;

  return {
    averageOrderValue: calculateAverageOrderValue(totalRevenue, totalOrders),
    conversionRate: calculateConversionRate(conversions, totalVisitors),
    revenueGrowth: calculateRevenueGrowthRate(
      totalRevenue,
      previousPeriodRevenue
    ),
    orderGrowth: calculateRevenueGrowthRate(totalOrders, previousPeriodOrders),
  };
}

/**
 * Format analytics metric for display
 */
export function formatAnalyticsMetric(
  value: number,
  type: "currency" | "percentage" | "number" | "decimal" = "number"
): string {
  switch (type) {
    case "currency":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);
    case "percentage":
      return `${value.toFixed(2)}%`;
    case "decimal":
      return value.toFixed(2);
    default:
      return new Intl.NumberFormat("en-US").format(Math.round(value));
  }
}

/**
 * Get trend indicator for metrics
 */
export function getTrendIndicator(
  current: number,
  previous: number
): {
  direction: "up" | "down" | "stable";
  percentage: number;
  color: string;
} {
  if (previous === 0) {
    return { direction: "stable", percentage: 0, color: "text-gray-500" };
  }

  const percentage = ((current - previous) / previous) * 100;

  if (percentage > 0) {
    return {
      direction: "up",
      percentage: Math.abs(percentage),
      color: "text-green-600",
    };
  } else if (percentage < 0) {
    return {
      direction: "down",
      percentage: Math.abs(percentage),
      color: "text-red-600",
    };
  } else {
    return { direction: "stable", percentage: 0, color: "text-gray-500" };
  }
}

/**
 * Calculate moving average
 */
export function calculateMovingAverage(
  values: number[],
  period: number
): number[] {
  if (values.length < period) return [];

  const result: number[] = [];
  for (let i = period - 1; i < values.length; i++) {
    const sum = values.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
    result.push(sum / period);
  }

  return result;
}

/**
 * Generate time series data for charts
 */
export function generateTimeSeriesData(
  data: Array<{ date: string; value: number }>,
  period: "day" | "week" | "month" = "day"
): Array<{ date: string; value: number }> {
  // Group data by period and aggregate values
  const grouped = data.reduce((acc, item) => {
    const date = new Date(item.date);
    let key: string;

    switch (period) {
      case "week":
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = weekStart.toISOString().split("T")[0];
        break;
      case "month":
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}`;
        break;
      default:
        key = date.toISOString().split("T")[0];
    }

    if (!acc[key]) acc[key] = [];
    acc[key].push(item.value);
    return acc;
  }, {} as Record<string, number[]>);

  // Calculate averages and return sorted data
  return Object.entries(grouped)
    .map(([date, values]) => ({
      date,
      value: values.reduce((a, b) => a + b, 0) / values.length,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}
