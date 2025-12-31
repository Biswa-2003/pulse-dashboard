export const formatPrice = (price: number): string => {
    if (price === 0) return '$0.00';
    if (price < 0.0001) return `$${price.toFixed(8)}`;
    if (price < 0.01) return `$${price.toFixed(6)}`;
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}`;
};

export const formatCurrency = (value: number): string => {
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(2)}B`;
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
    return `$${value.toFixed(2)}`;
};

export const formatMarketCap = (mc: number): string => {
    if (mc >= 1000000) return `$${(mc / 1000000).toFixed(1)}M`;
    return `$${(mc / 1000).toFixed(1)}K`;
};

export const formatPercentage = (value: number): string => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
};
