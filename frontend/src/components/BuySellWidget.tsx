"use client";
import React, { useState } from 'react';

export default function BuySellWidget() {
    const [tab, setTab] = useState('buy');

    return (
        <div className="bg-white rounded-2xl p-6 border border-[#Eef2f6] shadow-[0_2px_10px_rgba(0,0,0,0.02)] w-full h-full flex flex-col justify-between max-h-[400px]">
            <div className="flex bg-[#F8FAFD] rounded-xl p-1 mb-6">
                <button
                    onClick={() => setTab('buy')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${tab === 'buy' ? 'bg-white text-gray-800 shadow-sm' : 'text-[#A0AEC0]'}`}
                >
                    Buy
                </button>
                <button
                    onClick={() => setTab('sell')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${tab === 'sell' ? 'bg-white text-gray-800 shadow-sm' : 'text-[#A0AEC0]'}`}
                >
                    Sell
                </button>
            </div>

            <div className="space-y-4 mb-6">
                <div className="bg-[#F8FAFD] rounded-xl p-4 border border-[#Eef2f6]/50">
                    <div className="flex justify-between text-xs text-[#A0AEC0] mb-2 font-medium">
                        <span>Pay</span>
                        <span>Balance: $12,450.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <input type="number" placeholder="0.00" className="bg-transparent text-2xl font-bold text-gray-800 w-1/2 outline-none" defaultValue="1000" />
                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-[#Eef2f6] font-bold text-gray-700 shadow-sm">
                            <span className="w-5 h-5 bg-green-500 rounded-full text-white flex items-center justify-center text-[10px] font-bold">$</span>
                            USD
                        </div>
                    </div>
                </div>

                <div className="flex justify-center -my-3 relative z-10 pointer-events-none">
                    <div className="bg-white border border-[#Eef2f6] rounded-full p-2 text-[#4C82FB] bg-blue-50/50 shadow-[0_2px_5px_rgba(0,0,0,0.05)]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
                    </div>
                </div>

                <div className="bg-[#F8FAFD] rounded-xl p-4 border border-[#Eef2f6]/50">
                    <div className="flex justify-between text-xs text-[#A0AEC0] mb-2 font-medium">
                        <span>Receive</span>
                        <span>1 BTC = $42,500</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <input type="text" placeholder="0.00" className="bg-transparent text-2xl font-bold text-gray-800 w-1/2 outline-none" readOnly value="0.0235" />
                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-[#Eef2f6] font-bold text-gray-700 shadow-sm">
                            <span className="w-5 h-5 bg-orange-500 rounded-full text-white flex items-center justify-center text-[10px] font-bold">₿</span>
                            BTC
                        </div>
                    </div>
                </div>
            </div>

            <button className="w-full bg-[#4C82FB] hover:bg-[#3B6EE6] text-white font-bold py-3.5 rounded-xl shadow-[0_4px_14px_rgba(76,130,251,0.4)] transition-all active:scale-[0.98] mt-auto">
                {tab === 'buy' ? 'Buy Bitcoin' : 'Sell Bitcoin'}
            </button>
        </div>
    );
}
