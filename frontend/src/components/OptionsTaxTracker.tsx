"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { AlertTriangle, TrendingUp, PiggyBank, FileText } from 'lucide-react';

const donutData = [
    { name: 'BTC', value: 4500 },
    { name: 'ETH', value: 3200 },
    { name: 'Altcoins', value: 1800 },
];
const COLORS = ['#FF8F3C', '#8A4CFB', '#4C82FB'];

const ledgerData = [
    { id: 1, ticker: 'BTC', strategy: 'Covered Call', strike: '$45,000', expiry: 'Oct 25, 2026', premium: '+$1,200', status: 'Taxable' },
    { id: 2, ticker: 'ETH', strategy: 'Cash Secured Put', strike: '$2,000', expiry: 'Nov 12, 2026', premium: '+$450', status: 'Deferred' },
    { id: 3, ticker: 'SOL', strategy: 'Covered Call', strike: '$120', expiry: 'Oct 18, 2026', premium: '+$150', status: 'Taxable' },
    { id: 4, ticker: 'BNB', strategy: 'Iron Condor', strike: '$250-$260', expiry: 'Dec 01, 2026', premium: '+$550', status: 'Deferred' },
];

export default function OptionsTaxTracker() {
    return (
        <div className="mt-12 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Options Tax Tracker</h2>
                    <p className="text-sm text-[#A0AEC0] font-medium mt-1">Manage your derivatives and options tax liabilities</p>
                </div>
                <button className="flex items-center gap-2 bg-[#4C82FB] hover:bg-[#3B6EE6] text-white font-bold py-3 px-6 rounded-xl shadow-[0_4px_14px_rgba(76,130,251,0.4)] transition-all active:scale-[0.98]">
                    <FileText size={18} />
                    Generate Tax Report
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 border border-[#Eef2f6] shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 min-w-[3rem] rounded-full bg-[#05C46B]/10 flex items-center justify-center text-[#05C46B]">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <h3 className="text-[#A0AEC0] font-medium text-sm mb-1">Total Realized P&L</h3>
                        <span className="text-2xl font-bold text-gray-800">+$24,500.00</span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-[#Eef2f6] shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 min-w-[3rem] rounded-full bg-[#4C82FB]/10 flex items-center justify-center text-[#4C82FB]">
                        <PiggyBank size={24} />
                    </div>
                    <div>
                        <h3 className="text-[#A0AEC0] font-medium text-sm mb-1">Est. Liability (ST / LT)</h3>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-gray-800">$4,200</span>
                            <span className="text-sm font-medium text-[#A0AEC0]">/ $1,800</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-[#Eef2f6] shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 min-w-[3rem] rounded-full bg-red-100 flex items-center justify-center text-red-500">
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <h3 className="text-[#A0AEC0] font-medium text-sm mb-1">Wash Sale Alerts</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-gray-800">3 Alerts</span>
                            <span className="text-sm font-medium text-red-500">+$850 adj.</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Ledger Table */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-[#Eef2f6] shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-x-auto">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">Options Ledger</h3>
                    <table className="w-full text-left border-collapse min-w-[650px]">
                        <thead>
                            <tr className="text-[#A0AEC0] text-sm border-b border-[#Eef2f6]">
                                <th className="pb-4 font-medium px-4">Ticker</th>
                                <th className="pb-4 font-medium px-4">Strategy</th>
                                <th className="pb-4 font-medium px-4">Strike Price</th>
                                <th className="pb-4 font-medium px-4">Expiration</th>
                                <th className="pb-4 font-medium px-4">Premium</th>
                                <th className="pb-4 font-medium px-4 text-right">Tax Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ledgerData.map((row) => (
                                <tr key={row.id} className="border-b border-[#Eef2f6]/50 hover:bg-[#F8FAFD]/50 transition-colors last:border-0 group">
                                    <td className="py-4 px-4 font-bold text-gray-800 group-hover:text-[#4C82FB] transition-colors">{row.ticker}</td>
                                    <td className="py-4 px-4 text-gray-600 font-medium">{row.strategy}</td>
                                    <td className="py-4 px-4 text-gray-600">{row.strike}</td>
                                    <td className="py-4 px-4 text-[#A0AEC0] text-sm font-medium">{row.expiry}</td>
                                    <td className="py-4 px-4 font-bold text-[#05C46B]">{row.premium}</td>
                                    <td className="py-4 px-4 text-right">
                                        <span className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-block border ${row.status === 'Taxable' ? 'bg-red-50 text-red-500 border-red-100' : 'bg-blue-50 text-[#4C82FB] border-blue-100'}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Donut Chart */}
                <div className="bg-white rounded-2xl p-6 border border-[#Eef2f6] shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col items-center">
                    <div className="w-full text-left mb-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-1">Tax Distribution</h3>
                        <p className="text-sm text-[#A0AEC0]">Liability by asset class</p>
                    </div>
                    <div className="h-[220px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                            <PieChart>
                                <Pie
                                    data={donutData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {donutData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #Eef2f6', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                                    itemStyle={{ fontWeight: 'bold', color: '#1F2937' }}
                                    formatter={(value) => `$${value}`}
                                />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                            </PieChart>
                        </ResponsiveContainer>

                        {/* Center Text in Donut */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8 text-center">
                            <span className="text-[#A0AEC0] text-xs font-medium">Total</span>
                            <span className="text-xl font-bold text-gray-800">$9,500</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
