"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Plus, Trash2, CalendarClock, Coins, ArrowRight, Activity } from 'lucide-react';

interface PortfolioItem {
    id: string;
    coin: string;
    quantity: number;
    purchasePrice: number;
    purchaseDate: string;
}

export default function PortfolioManager({ onLiabilityChange }: { onLiabilityChange?: (val: number) => void }) {
    const [items, setItems] = useState<PortfolioItem[]>([
        { id: '1', coin: 'BTC', quantity: 0.5, purchasePrice: 42000, purchaseDate: '2024-01-15T10:30' },
        { id: '2', coin: 'ETH', quantity: 4.2, purchasePrice: 2200, purchaseDate: '2024-02-10T14:45' }
    ]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [livePrices, setLivePrices] = useState<Record<string, number>>({ BTC: 65000, ETH: 3500, SOL: 140, BNB: 600 });

    // New item form state
    const [newCoin, setNewCoin] = useState('BTC');
    const [newQty, setNewQty] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newDate, setNewDate] = useState('');

    useEffect(() => {
        // Hydrate from localStorage
        const savedItems = localStorage.getItem('taxlayer_portfolio_items');
        if (savedItems) {
            try {
                setItems(JSON.parse(savedItems));
            } catch (e) {
                console.error("Failed to parse portfolio from localStorage", e);
            }
        }
        setIsLoaded(true);

        // Set default datetime to now
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        setNewDate(now.toISOString().slice(0, 16));
    }, []);

    useEffect(() => {
        // Sync to localStorage
        if (isLoaded) {
            localStorage.setItem('taxlayer_portfolio_items', JSON.stringify(items));
        }
    }, [items, isLoaded]);

    useEffect(() => {
        // Dynamically build the Binance WebSocket streams based on unique items in the portfolio
        const uniqueCoins = Array.from(new Set(items.map(item => item.coin.toLowerCase())));
        if (uniqueCoins.length === 0) return;

        const streams = uniqueCoins.map(coin => `${coin}usdt@ticker`).join('/');
        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${streams}`);

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data && data.s) {
                    const symbol = data.s.replace('USDT', '');
                    const price = parseFloat(data.c);

                    setLivePrices(prev => ({
                        ...prev,
                        [symbol]: price
                    }));
                }
            } catch (error) {
                console.error("WebSocket Error:", error);
            }
        };

        return () => ws.close();
    }, [items]);

    const handleAddItem = () => {
        if (!newQty || !newPrice || !newDate) return;

        const newItem: PortfolioItem = {
            id: Date.now().toString(),
            coin: newCoin,
            quantity: parseFloat(newQty),
            purchasePrice: parseFloat(newPrice),
            purchaseDate: newDate
        };

        setItems([...items, newItem]);
        setNewQty('');
        setNewPrice('');
    };

    const handleRemoveItem = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };

    // Calculate total unrealized profit
    const totalProfit = items.reduce((acc, item) => {
        const currentPrice = livePrices[item.coin] || item.purchasePrice;
        const currentVal = currentPrice * item.quantity;
        const costBasis = item.purchasePrice * item.quantity;
        return acc + (currentVal - costBasis);
    }, 0);

    // Calculate live tax (using India 30% baseline for demonstration)
    const liveTaxLiability = totalProfit > 0 ? totalProfit * 0.30 : 0;
    const isProfitable = totalProfit >= 0;

    useEffect(() => {
        if (onLiabilityChange) {
            onLiabilityChange(liveTaxLiability);
        }
    }, [liveTaxLiability, onLiabilityChange]);

    return (
        <div className="w-full bg-[#FFFFFF] dark:bg-[#0B0E11] rounded-3xl border border-[#E4E4E7] dark:border-[#27272A] p-6 shadow-sm overflow-hidden relative group">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h3 className="text-xl font-bold font-[family-name:var(--font-space)] tracking-tight text-[#09090B] dark:text-[#FAFAFA] flex items-center gap-2">
                        <Activity className="text-[#A855F7] dark:text-[#D4FF00]" size={20} />
                        Live Tax Liability Manager
                    </h3>
                    <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] mt-1">Add assets and purchase dates to compute real-time taxable events driven by Binance data.</p>
                </div>

                <div className="bg-[#F4F4F5] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] rounded-xl p-3 flex items-center gap-6 shadow-inner shrink-0 w-full md:w-auto">
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-[#71717A] dark:text-[#A1A1AA] font-bold mb-0.5">Live Unrealized P&L</p>
                        <p className={`font-mono font-bold text-lg ${isProfitable ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                            {isProfitable ? '+' : ''}${totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                    </div>
                    <div className="w-px h-8 bg-[#E4E4E7] dark:bg-[#27272A]"></div>
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-[#A855F7] dark:text-[#D4FF00] font-bold mb-0.5">Est. Tax (30%)</p>
                        <p className="font-mono font-bold text-lg text-[#09090B] dark:text-[#FAFAFA]">
                            ${liveTaxLiability.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                    </div>
                </div>
            </div>

            {/* Input Form */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-8 p-4 bg-[#F4F4F5]/50 dark:bg-[#18181B]/50 rounded-2xl border border-[#E4E4E7] dark:border-[#27272A]">
                <div className="col-span-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA] mb-1.5 block">Asset Ticker</label>
                    <input
                        type="text"
                        placeholder="e.g. ADA, DOGE"
                        value={newCoin}
                        onChange={(e) => setNewCoin(e.target.value.toUpperCase())}
                        className="w-full bg-[#FFFFFF] dark:bg-[#000000] border border-[#E4E4E7] dark:border-[#27272A] text-sm py-2 px-3 rounded-lg focus:outline-none focus:border-[#A855F7] dark:focus:border-[#D4FF00] font-bold"
                    />
                </div>
                <div className="col-span-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA] mb-1.5 block">Quantity</label>
                    <input
                        type="number"
                        placeholder="0.0"
                        value={newQty}
                        onChange={(e) => setNewQty(e.target.value)}
                        className="w-full bg-[#FFFFFF] dark:bg-[#000000] border border-[#E4E4E7] dark:border-[#27272A] text-sm py-2 px-3 rounded-lg focus:outline-none focus:border-[#A855F7] dark:focus:border-[#D4FF00] font-mono"
                    />
                </div>
                <div className="col-span-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA] mb-1.5 block">Purchase Price ($)</label>
                    <input
                        type="number"
                        placeholder="0.00"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        className="w-full bg-[#FFFFFF] dark:bg-[#000000] border border-[#E4E4E7] dark:border-[#27272A] text-sm py-2 px-3 rounded-lg focus:outline-none focus:border-[#A855F7] dark:focus:border-[#D4FF00] font-mono"
                    />
                </div>
                <div className="col-span-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA] mb-1.5 block">Date & Time</label>
                    <input
                        type="datetime-local"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                        className="w-full bg-[#FFFFFF] dark:bg-[#000000] border border-[#E4E4E7] dark:border-[#27272A] text-sm py-2 px-3 rounded-lg focus:outline-none focus:border-[#A855F7] dark:focus:border-[#D4FF00] text-[#71717A] dark:text-[#A1A1AA]"
                    />
                </div>
                <div className="col-span-1 flex items-end">
                    <button
                        onClick={handleAddItem}
                        className="w-full py-2 bg-[#09090B] dark:bg-[#FAFAFA] text-[#FAFAFA] dark:text-[#09090B] rounded-lg font-bold hover:bg-[#A855F7] dark:hover:bg-[#D4FF00] transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                        disabled={!newQty || !newPrice}
                    >
                        <Plus size={16} /> Add Trade
                    </button>
                </div>
            </div>

            {/* Portfolio Table */}
            <div className="w-full overflow-x-auto rounded-xl border border-[#E4E4E7] dark:border-[#27272A]">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-[#F4F4F5] dark:bg-[#18181B] text-[#71717A] dark:text-[#A1A1AA] text-xs font-bold uppercase tracking-wider border-b border-[#E4E4E7] dark:border-[#27272A]">
                        <tr>
                            <th className="px-4 py-3 font-medium">Asset</th>
                            <th className="px-4 py-3 font-medium">Acquired On</th>
                            <th className="px-4 py-3 font-medium text-right">Avg Cost</th>
                            <th className="px-4 py-3 font-medium text-right">Live Price</th>
                            <th className="px-4 py-3 font-medium text-right">P&L / Tax</th>
                            <th className="px-4 py-3 font-medium text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {items.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center py-8 text-[#71717A] dark:text-[#A1A1AA]">
                                        No assets added yet. Start building your portfolio above.
                                    </td>
                                </tr>
                            )}
                            {items.map((item) => {
                                const currentPrice = livePrices[item.coin] || item.purchasePrice;
                                const costBasis = item.purchasePrice * item.quantity;
                                const currentValue = currentPrice * item.quantity;
                                const profit = currentValue - costBasis;
                                const itemProfitable = profit >= 0;
                                const taxAmount = itemProfitable ? profit * 0.30 : 0;

                                return (
                                    <motion.tr
                                        key={item.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="border-b border-[#E4E4E7] dark:border-[#27272A] hover:bg-[#F4F4F5]/50 dark:hover:bg-[#18181B]/50 transition-colors last:border-b-0"
                                    >
                                        <td className="px-4 py-3 font-bold text-[#09090B] dark:text-[#FAFAFA] flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-[#F4F4F5] dark:bg-[#18181B] flex items-center justify-center border border-[#E4E4E7] dark:border-[#27272A]">
                                                <Coins size={12} className={item.coin === 'BTC' ? 'text-[#F7931A]' : 'text-[#627EEA]'} />
                                            </div>
                                            {item.quantity} {item.coin}
                                        </td>
                                        <td className="px-4 py-3 text-[#71717A] dark:text-[#A1A1AA] font-mono text-xs flex items-center gap-1.5 mt-1">
                                            <CalendarClock size={12} />
                                            {new Date(item.purchaseDate).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                        <td className="px-4 py-3 font-mono text-right text-[#71717A] dark:text-[#A1A1AA]">
                                            ${item.purchasePrice.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3 font-mono text-right font-bold text-[#09090B] dark:text-[#FAFAFA]">
                                            ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </td>
                                        <td className="px-4 py-3 font-mono text-right">
                                            <div className="flex flex-col items-end">
                                                <span className={`font-bold ${itemProfitable ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                                                    {itemProfitable ? '+' : ''}${profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </span>
                                                <span className="text-[10px] text-[#A855F7] dark:text-[#D4FF00] uppercase font-bold tracking-widest mt-0.5" title="Tax Impact">
                                                    tax: ${taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <button
                                                onClick={() => handleRemoveItem(item.id)}
                                                className="p-1.5 text-[#71717A] dark:text-[#A1A1AA] hover:text-[#EF4444] dark:hover:text-[#EF4444] rounded bg-transparent hover:bg-[#EF4444]/10 transition-colors cursor-pointer"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
