"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: '10am', value: 3000 },
    { name: '11am', value: 3500 },
    { name: '12pm', value: 3200 },
    { name: '1pm', value: 4500 },
    { name: '2pm', value: 4100 },
    { name: '3pm', value: 5500 },
    { name: '4pm', value: 5000 },
];

export default function MainChart() {
    return (
        <div className="bg-white rounded-2xl p-6 border border-[#Eef2f6] shadow-[0_2px_10px_rgba(0,0,0,0.02)] h-[400px] flex flex-col w-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-800">Growth</h2>
                <select className="bg-[#F8FAFD] text-gray-600 text-sm py-1.5 px-3 rounded-lg border-0 outline-none cursor-pointer font-medium">
                    <option>Today</option>
                    <option>This Week</option>
                    <option>This Month</option>
                </select>
            </div>
            <div className="flex-1 w-full relative">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#FF8F3C" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#FF8F3C" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EDF2F7" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#A0AEC0', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#A0AEC0', fontSize: 12 }} dx={-10} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                            itemStyle={{ color: '#FF8F3C', fontWeight: 'bold' }}
                        />
                        <Area type="monotone" dataKey="value" stroke="#FF8F3C" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
