export interface Token {
    id: string;
    name: string;
    symbol: string;
    price: number;
    priceChange24h: number;
    marketCap: number;
    liquidity: number;
    volume24h: number;
    age: string;
    logoUrl?: string;
    isPumped?: boolean;
    bondingCurve?: number;
    holders?: number;
    // Enhanced UI stats
    socials?: {
        twitter?: string;
        website?: string;
        telegram?: string;
    };
    security?: {
        isAudit?: boolean;
        isVerified?: boolean;
        isLocked?: boolean;
    };
    stats?: {
        buyers?: number;
        sellers?: number;
        totalTx?: number;
        percentage1?: number;
        percentage2?: number;
        percentage3?: number;
    };
}

export type PulseSectionType = 'new-pairs' | 'final-stretch' | 'migrated';
