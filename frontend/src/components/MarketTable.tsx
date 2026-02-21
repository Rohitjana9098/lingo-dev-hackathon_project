const data = [
    { id: 1, name: 'Bitcoin', symbol: 'BTC', price: '$42,500.00', h1: '+0.5%', h24: '+2.4%', icon: '₿', bg: 'bg-orange-500', isUp: true },
    { id: 2, name: 'Ethereum', symbol: 'ETH', price: '$2,240.50', h1: '-0.2%', h24: '+1.5%', icon: 'Ξ', bg: 'bg-indigo-500', isUp: true },
    { id: 3, name: 'Binance', symbol: 'BNB', price: '$245.80', h1: '+0.1%', h24: '-0.8%', icon: 'B', bg: 'bg-[#FF8F3C]', isUp: false },
    { id: 4, name: 'Solana', symbol: 'SOL', price: '$98.20', h1: '+1.2%', h24: '+5.4%', icon: 'S', bg: 'bg-purple-500', isUp: true },
];

export default function MarketTable() {
    return (
        <div className="bg-white rounded-2xl p-6 border border-[#Eef2f6] shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-x-auto w-full">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Market Value</h2>
            <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                    <tr className="text-[#A0AEC0] text-sm border-b border-[#Eef2f6]">
                        <th className="pb-4 font-medium px-4">Asset</th>
                        <th className="pb-4 font-medium px-4">Price</th>
                        <th className="pb-4 font-medium px-4">1h Change</th>
                        <th className="pb-4 font-medium px-4">24h Change</th>
                        <th className="pb-4 font-medium px-4 text-right">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id} className="border-b border-[#Eef2f6]/50 hover:bg-[#F8FAFD]/50 transition-colors group last:border-0">
                            <td className="py-4 px-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 ${row.bg} text-white rounded-full flex items-center justify-center font-bold text-xl shadow-sm`}>{row.icon}</div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 group-hover:text-[#4C82FB] transition-colors">{row.name}</h4>
                                        <span className="text-xs text-[#A0AEC0] font-medium">{row.symbol}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="py-4 px-4 font-bold text-gray-800">{row.price}</td>
                            <td className={`py-4 px-4 font-medium text-sm ${row.h1.startsWith('+') ? 'text-[#05C46B]' : 'text-red-500'}`}>{row.h1}</td>
                            <td className={`py-4 px-4 font-medium text-sm ${row.h24.startsWith('+') ? 'text-[#05C46B]' : 'text-red-500'}`}>{row.h24}</td>
                            <td className="py-4 px-4 text-right">
                                <button className="text-[#05C46B] border border-[#05C46B]/30 bg-[#05C46B]/5 hover:bg-[#05C46B] hover:text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm">
                                    Transfer now
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
