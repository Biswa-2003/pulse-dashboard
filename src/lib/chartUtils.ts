export interface ChartPoint {
    time: string;
    price: number;
}

export const generateMockChartData = (basePrice: number, points: number = 20): ChartPoint[] => {
    const data: ChartPoint[] = [];
    let currentPrice = basePrice;

    const now = new Date();

    for (let i = 0; i < points; i++) {
        const change = (Math.random() - 0.45) * (basePrice * 0.05); // biased slightly upwards
        currentPrice += change;

        const time = new Date(now.getTime() - (points - i) * 60000); // 1 minute intervals

        data.push({
            time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            price: Math.max(0.000001, currentPrice),
        });
    }

    return data;
};
