import { Token, PulseSectionType } from './types';

const SYMBOLS = ['SDOGE', 'MPEPE', 'ACAT', 'LUNA', 'SOL', 'BTC', 'ETH', 'STARK', 'APT', 'SUI', 'ARB', 'OP'];
const NAMES = ['Solana Doge', 'Moon Pepe', 'Axiom Cat', 'Luna Plus', 'Solana', 'Bitcoin', 'Ethereum', 'StarkNet', 'Aptos', 'Sui', 'Arbitrum', 'Optimism'];

export const generateMockToken = (id: string): Token => {
    const symbolIdx = Math.floor(Math.random() * SYMBOLS.length);
    return {
        id,
        name: NAMES[symbolIdx],
        symbol: SYMBOLS[symbolIdx],
        price: Math.random() * 10,
        priceChange24h: (Math.random() * 20) - 10,
        marketCap: Math.random() * 1000000,
        liquidity: Math.random() * 500000,
        volume24h: Math.random() * 200000,
        age: `${Math.floor(Math.random() * 60)}m`,
        logoUrl: `https://api.dicebear.com/7.x/identicon/svg?seed=${id}`,
        isPumped: Math.random() > 0.8,
        bondingCurve: Math.random() * 100,
        holders: Math.floor(Math.random() * 1000),
        socials: {
            twitter: 'https://twitter.com',
            website: 'https://example.com',
            telegram: 'https://t.me',
        },
        security: {
            isAudit: Math.random() > 0.5,
            isVerified: Math.random() > 0.3,
            isLocked: Math.random() > 0.7,
        },
        stats: {
            buyers: Math.floor(Math.random() * 500),
            sellers: Math.floor(Math.random() * 300),
            totalTx: Math.floor(Math.random() * 1000),
            percentage1: Math.floor(Math.random() * 100),
            percentage2: Math.floor(Math.random() * 100),
            percentage3: Math.floor(Math.random() * 100),
        }
    };
};

export const getInitialTokens = (section: PulseSectionType): Token[] => {
    return Array.from({ length: 50 }, (_, i) => generateMockToken(`${section}-${i}`));
};
