"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

const ASSETS = [
    { id: 'BTCUSDT', label: 'BTC', name: 'Bitcoin' },
    { id: 'ETHUSDT', label: 'ETH', name: 'Ethereum' },
    { id: 'SOLUSDT', label: 'SOL', name: 'Solana' },
    { id: 'PAXGUSDT', label: 'XAU', name: 'Paxos Gold' },
];

export default function OptionsMatrix() {
    const [prices, setPrices] = useState<Record<string, { price: string; percentChange: string; isUp: boolean; lastUpdate: number }>>({});

    useEffect(() => {
        // Initialize with default states to prevent hydration mismatch / empty renders
        const initialPrices: Record<string, any> = {};
        ASSETS.forEach(a => {
            initialPrices[a.id] = { price: '0.00', percentChange: '0.00', isUp: true, lastUpdate: Date.now() };
        });
        setPrices(initialPrices);

        // Construct multi-stream Binance WebSocket URL
        const streams = ASSETS.map(a => `${a.id.toLowerCase()}@ticker`).join('/');
        const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data && data.data) {
                const ticker = data.data;
                const symbol = ticker.s;

                // Only format and update state if it belongs to our tracked assets
                if (ASSETS.find(a => a.id === symbol)) {
                    setPrices(prev => ({
                        ...prev,
                        [symbol]: {
                            price: parseFloat(ticker.c).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                            percentChange: parseFloat(ticker.P).toFixed(2),
                            isUp: parseFloat(ticker.P) >= 0,
                            lastUpdate: Date.now()
                        }
                    }));
                }
            }
        };

        return () => {
            if (ws.readyState === 1 || ws.readyState === 0) {
                ws.close();
            }
        };
    }, []);

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-[#FFFFFF] dark:bg-[#18181B] rounded-3xl p-8 border border-[#E4E4E7] dark:border-[#27272A] shadow-xl relative overflow-hidden transition-colors duration-300 w-full"
        >
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#A855F7]/20 dark:from-[#D4FF00]/10 to-transparent blur-3xl rounded-full opacity-50 pointer-events-none transition-colors" />

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-[#E4E4E7] dark:border-[#27272A] pb-4 mb-6 relative z-10 transition-colors duration-300 gap-4">
                <div className="flex items-center gap-3">
                    <h3 className="text-[#09090B] dark:text-[#FAFAFA] text-xl font-[family-name:var(--font-space)] tracking-tight transition-colors">Live Market Prices</h3>
                    <span className="inline-flex items-center gap-1.5 text-[#10B981] text-xs uppercase font-[family-name:var(--font-mono)] border border-[#10B981]/30 px-3 py-1 rounded-full bg-[#10B981]/10 transition-colors font-bold shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                        <Activity size={12} className="animate-pulse" /> Binance WebSockets
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                {ASSETS.map((asset) => {
                    const data = prices[asset.id];
                    const isLoading = !data || data.price === '0.00';
                    return (
                        <div key={asset.id} className="bg-[#F4F4F5] dark:bg-[#09090B] rounded-2xl p-6 border border-[#E4E4E7] dark:border-[#27272A] shadow-sm flex flex-col hover:border-[#A855F7] dark:hover:border-[#D4FF00]/50 hover:shadow-md transition-all duration-300 group">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h4 className="font-bold text-[#09090B] dark:text-[#FAFAFA] text-xl font-[family-name:var(--font-space)] tracking-tight">{asset.label}</h4>
                                    <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-wider">{asset.name}</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-[#FFFFFF] dark:bg-[#18181B] flex items-center justify-center border border-[#E4E4E7] dark:border-[#27272A] shadow-inner text-[#A855F7] dark:text-[#D4FF00] font-[family-name:var(--font-space)] font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                                    {asset.label[0]}
                                </div>
                            </div>

                            <div className="mt-auto">
                                <div className="text-3xl font-bold font-[family-name:var(--font-mono)] text-[#09090B] dark:text-[#FAFAFA] tracking-tight mb-2 flex items-center gap-1">
                                    <span className="text-lg text-[#71717A] dark:text-[#A1A1AA]">$</span>
                                    {isLoading ? (
                                        <span className="animate-pulse bg-[#E4E4E7] dark:bg-[#27272A] h-8 w-28 rounded"></span>
                                    ) : (
                                        <motion.span key={data?.price} initial={{ scale: 1.02, color: data.isUp ? '#10B981' : '#EF4444' }} animate={{ scale: 1, color: '' }} transition={{ duration: 0.4 }}>
                                            {data?.price}
                                        </motion.span>
                                    )}
                                </div>
                                {!isLoading && (
                                    <div className={`flex items-center gap-1 text-sm font-bold tracking-tight ${data.isUp ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                                        {data.isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                        {data.isUp ? '+' : ''}{data.percentChange}%
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}
