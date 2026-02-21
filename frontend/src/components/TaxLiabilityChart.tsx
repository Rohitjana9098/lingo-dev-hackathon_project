"use client";

import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { TrendingUp, Activity } from "lucide-react";

// Mock projection data
const data = [
    { name: "Jan", liability: 1200, profit: 4000 },
    { name: "Feb", liability: 1800, profit: 6000 },
    { name: "Mar", liability: 1500, profit: 5000 },
    { name: "Apr", liability: 2200, profit: 7500 },
    { name: "May", liability: 2800, profit: 9500 },
    { name: "Jun", liability: 2400, profit: 8000 },
    { name: "Jul", liability: 3100, profit: 10500 },
    { name: "Aug", liability: 3800, profit: 12500 },
    { name: "Sep", liability: 4200, profit: 14000 },
    { name: "Oct", liability: 3900, profit: 13000 },
    { name: "Nov", liability: 4500, profit: 15200 },
    { name: "Dec", liability: 5200, profit: 17500 }
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#FFFFFF] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] p-4 rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_20px_rgba(0,0,0,0.4)]">
                <p className="text-[#09090B] dark:text-[#FAFAFA] font-bold pb-2 border-b border-[#E4E4E7]/50 dark:border-[#27272A]/50 mb-2">{label} 2026</p>
                <div className="flex flex-col gap-1.5 font-mono text-sm">
                    <p className="flex justify-between gap-6">
                        <span className="text-[#71717A] dark:text-[#A1A1AA]">Realized P&L:</span>
                        <span className="text-[#10B981] font-bold">+${payload[1].value}</span>
                    </p>
                    <p className="flex justify-between gap-6">
                        <span className="text-[#71717A] dark:text-[#A1A1AA]">Tax Impact:</span>
                        <span className="text-[#EF4444] font-bold">-${payload[0].value}</span>
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

export default function TaxLiabilityChart() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full bg-[#FFFFFF] dark:bg-[#0B0E11] rounded-3xl border border-[#E4E4E7] dark:border-[#27272A] p-6 shadow-sm overflow-hidden"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h3 className="text-xl font-bold font-[family-name:var(--font-space)] tracking-tight text-[#09090B] dark:text-[#FAFAFA] flex items-center gap-2">
                        <TrendingUp className="text-[#A855F7] dark:text-[#D4FF00]" size={20} />
                        Annual Tax Projection Curve
                    </h3>
                    <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] mt-1">Simulating cumulative Realized P&L against computed bracket liabilities.</p>
                </div>

                <div className="bg-[#F4F4F5] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] rounded-xl p-3 flex items-center gap-6 shadow-inner shrink-0 leading-tight">
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-[#A855F7] dark:text-[#D4FF00] font-bold mb-0.5">YTD Tax Delta</p>
                        <p className="font-mono font-bold text-lg text-[#EF4444]">
                            +24.5%
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorLiability" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272A" opacity={0.3} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#71717A', fontSize: 12, fontFamily: 'var(--font-mono)' }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#71717A', fontSize: 12, fontFamily: 'var(--font-mono)' }}
                            tickFormatter={(value) => `$${value / 1000}k`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="liability"
                            stroke="#EF4444"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorLiability)"
                        />
                        <Area
                            type="monotone"
                            dataKey="profit"
                            stroke="#10B981"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorProfit)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-6 pt-4 border-t border-[#E4E4E7]/30 dark:border-[#27272A]/30">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#10B981] flex-shrink-0"></div>
                    <span className="text-[#71717A] dark:text-[#A1A1AA] text-xs font-bold uppercase tracking-wider">Gross Profit (Realized)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#EF4444] flex-shrink-0"></div>
                    <span className="text-[#71717A] dark:text-[#A1A1AA] text-xs font-bold uppercase tracking-wider">Estimated Tax Withholding</span>
                </div>
            </div>
        </motion.div>
    );
}
