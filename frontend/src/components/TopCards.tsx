"use client";

import { LineChart, Line, ResponsiveContainer } from 'recharts';

const dataBTC = [{ v: 400 }, { v: 450 }, { v: 420 }, { v: 510 }, { v: 480 }, { v: 550 }];
const dataBNB = [{ v: 300 }, { v: 350 }, { v: 250 }, { v: 400 }, { v: 380 }, { v: 450 }];
const dataETH = [{ v: 200 }, { v: 300 }, { v: 280 }, { v: 450 }, { v: 400 }, { v: 500 }];

const Card = ({ name, price, change, isPositive, data, color }: any) => (
    <div className="bg-white rounded-2xl p-5 border border-[#Eef2f6] shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex-1 min-w-[200px] flex flex-col justify-between hover:shadow-md transition-shadow h-36">
        <div className="flex justify-between items-start mb-2">
            <div>
                <h3 className="text-[#A0AEC0] font-medium text-sm mb-1">{name}</h3>
                <span className="text-2xl font-bold text-gray-800">{price}</span>
            </div>
            <div className={`px-2 py-1 rounded-lg text-xs font-bold ${isPositive ? 'bg-[#05C46B]/10 text-[#05C46B]' : 'bg-[#FF8F3C]/10 text-[#FF8F3C]'}`}>
                {isPositive ? '+' : ''}{change}%
            </div>
        </div>
        <div className="flex-1 w-full -mx-2 -mb-2 mt-4">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <LineChart data={data}>
                    <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2.5} dot={false} isAnimationActive={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
);

export default function TopCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <Card name="Bitcoin (BTC)" price="$42,500.00" change="2.4" isPositive={true} data={dataBTC} color="#4C82FB" />
            <Card name="Binance (BNB)" price="$245.80" change="-0.8" isPositive={false} data={dataBNB} color="#FF8F3C" />
            <Card name="Ethereum (ETH)" price="$2,240.50" change="1.5" isPositive={true} data={dataETH} color="#8A4CFB" />
        </div>
    );
}
