"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShieldCheck, ChevronRight, Link2, Loader2, CheckCircle2, Info } from 'lucide-react';

const CexLogos: Record<string, React.ReactNode> = {
    'Binance': (
        <div className="w-5 h-5 rounded-[4px] bg-[#0B0E11] flex items-center justify-center shadow-sm border border-[#27272A]/50">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#F3BA2F]">
                <path d="M12 2.7l3.8 3.8-1.5 1.5L12 5.7l-2.3 2.3-1.5-1.5L12 2.7zm0 16.6l-3.8-3.8 1.5-1.5L12 16.3l2.3-2.3 1.5 1.5L12 19.3zm-6-6l2.3-2.3L6.8 9.5 3 13.3l3.8 3.8L8.3 15.6 6 13.3zm12 0l-2.3 2.3 1.5 1.5 3.8-3.8-3.8-3.8-1.5 1.5 2.3 2.3zm-6-2.3l2.3 2.3-2.3 2.3-2.3-2.3 2.3-2.3z" />
            </svg>
        </div>
    ),
    'Bybit': (
        <div className="w-5 h-5 rounded-[4px] bg-[#121214] flex items-center justify-center shadow-sm border border-[#27272A]/50 overflow-hidden relative">
            <span className="text-[4.5px] font-black text-white leading-none tracking-tight absolute inset-0 flex items-center justify-center left-[0.5px]">BYB<span className="text-[#F7A600]">I</span>T</span>
        </div>
    ),
    'BingX': (
        <div className="w-5 h-5 rounded-[4px] bg-[#0055FF] flex items-center justify-center shadow-sm">
            <svg viewBox="0 0 100 100" className="w-[11px] h-[11px] fill-white">
                <path d="M 0 0 L 30 0 L 50 35 L 70 0 L 100 0 L 65 50 L 100 100 L 70 100 L 50 65 L 30 100 L 0 100 L 35 50 Z" />
            </svg>
        </div>
    ),
    'Gate.io': (
        <div className="w-5 h-5 rounded-[4px] bg-[#FFFFFF] flex items-center justify-center shadow-sm border border-[#E4E4E7] dark:border-[#27272A]/50">
            <svg viewBox="0 0 100 100" className="w-4 h-4">
                <path d="M 50 15 A 35 35 0 1 0 85 50 L 65 50 A 15 15 0 1 1 50 35 Z" fill="#0D55FF" />
                <rect x="52" y="15" width="16" height="16" fill="#00D285" />
            </svg>
        </div>
    )
};

export default function CryptoTaxKYC() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [country, setCountry] = useState('India');
    const [profit, setProfit] = useState<number | ''>('');
    const [salesVolume, setSalesVolume] = useState<number | ''>('');
    const [calculationMode, setCalculationMode] = useState<'manual' | 'auto'>('manual');
    const [isConnecting, setIsConnecting] = useState(false);
    const [activeConnectCex, setActiveConnectCex] = useState<string | null>(null);
    const [connectedCexs, setConnectedCexs] = useState<string[]>([]);

    // Lingo.dev will automatically pick up these strings for translation
    const calculateTax = () => {
        const numProfit = Number(profit) || 0;
        const numSales = Number(salesVolume) || 0;
        if (country === 'India') {
            const taxBase = numProfit * 0.30;
            const cess = taxBase * 0.04;
            const tds = numSales * 0.01;
            return taxBase + cess + tds;
        }
        return numProfit * 0.20; // Default Global
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F4F4F5] dark:bg-[#000000] text-[#09090B] dark:text-[#FAFAFA] font-[family-name:var(--font-mono)] transition-colors duration-300 p-4 sm:p-8">
            <div className="w-full max-w-lg">
                <button onClick={() => router.push('/dashboard')} className="flex items-center gap-2 text-[#71717A] dark:text-[#A1A1AA] hover:text-[#A855F7] dark:hover:text-[#D4FF00] transition-colors mb-6 font-bold cursor-pointer outline-none">
                    <ArrowLeft size={16} /> Back to Dashboard
                </button>

                <div className="bg-[#FFFFFF] dark:bg-[#18181B] p-6 sm:p-8 rounded-3xl shadow-xl border border-[#E4E4E7] dark:border-[#27272A] relative overflow-hidden transition-colors">
                    <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-[#A855F7]/10 dark:bg-[#D4FF00]/10 blur-[80px] rounded-full pointer-events-none transition-colors" />

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-[#F4F4F5] dark:bg-[#27272A] flex items-center justify-center text-[#A855F7] dark:text-[#D4FF00] transition-colors">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold font-[family-name:var(--font-space)] tracking-tight">Complete Your KYC</h2>
                                        <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] mt-1 transition-colors">Step 1 of 2: Identity & Region</p>
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-bold text-[#71717A] dark:text-[#A1A1AA] mb-2 uppercase tracking-wider transition-colors">Full Legal Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-[#F4F4F5] dark:bg-[#09090B] border border-[#E4E4E7] dark:border-[#27272A] text-[#09090B] dark:text-[#FAFAFA] placeholder-[#A1A1AA] dark:placeholder-[#71717A] p-3 rounded-xl focus:outline-none focus:border-[#A855F7] dark:focus:border-[#D4FF00] focus:ring-1 focus:ring-[#A855F7] dark:focus:ring-[#D4FF00] transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#71717A] dark:text-[#A1A1AA] mb-2 uppercase tracking-wider transition-colors">Tax Residency</label>
                                        <select
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            className="w-full bg-[#F4F4F5] dark:bg-[#09090B] border border-[#E4E4E7] dark:border-[#27272A] text-[#09090B] dark:text-[#FAFAFA] p-3 rounded-xl focus:outline-none focus:border-[#A855F7] dark:focus:border-[#D4FF00] focus:ring-1 focus:ring-[#A855F7] dark:focus:ring-[#D4FF00] transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="India">India</option>
                                            <option value="USA">USA</option>
                                            <option value="UK">United Kingdom</option>
                                            <option value="Canada">Canada</option>
                                        </select>
                                    </div>
                                    <button
                                        onClick={() => setStep(2)}
                                        className="w-full bg-[#09090B] dark:bg-[#FAFAFA] text-[#FAFAFA] dark:text-[#09090B] py-3.5 rounded-xl font-bold mt-6 hover:bg-[#A855F7] dark:hover:bg-[#D4FF00] transition-colors flex items-center justify-center gap-2 group cursor-pointer outline-none shadow-md"
                                    >
                                        Next: Financial Details
                                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <button onClick={() => setStep(1)} className="w-10 h-10 rounded-full bg-[#F4F4F5] dark:bg-[#27272A] flex items-center justify-center text-[#71717A] dark:text-[#A1A1AA] hover:text-[#A855F7] dark:hover:text-[#D4FF00] cursor-pointer transition-colors outline-none shrink-0">
                                        <ArrowLeft size={16} />
                                    </button>
                                    <div>
                                        <h2 className="text-xl font-bold font-[family-name:var(--font-space)] tracking-tight">Tax Estimation</h2>
                                        <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] mt-1 transition-colors">Step 2 of 2: Crypto Profit Declarations</p>
                                    </div>
                                </div>

                                <div className="flex gap-2 mb-6 p-1 bg-[#F4F4F5] dark:bg-[#09090B] rounded-xl border border-[#E4E4E7] dark:border-[#27272A] w-full items-center">
                                    <button
                                        onClick={() => setCalculationMode('manual')}
                                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors outline-none cursor-pointer ${calculationMode === 'manual' ? 'bg-[#FFFFFF] dark:bg-[#18181B] text-[#09090B] dark:text-[#FAFAFA] shadow-sm' : 'text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-[#FAFAFA]'}`}
                                    >
                                        Manual Entry
                                    </button>
                                    <button
                                        onClick={() => setCalculationMode('auto')}
                                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2 outline-none cursor-pointer ${calculationMode === 'auto' ? 'bg-[#FFFFFF] dark:bg-[#18181B] text-[#A855F7] dark:text-[#D4FF00] shadow-sm' : 'text-[#71717A] dark:text-[#A1A1AA] hover:text-[#A855F7] dark:hover:text-[#D4FF00]'}`}
                                    >
                                        Automatic Sync
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {calculationMode === 'auto' ? (
                                        <div className="p-6 border-2 border-dashed border-[#E4E4E7] dark:border-[#27272A] rounded-2xl bg-[#F4F4F5]/50 dark:bg-[#09090B]/50 text-center flex flex-col items-center transition-colors">
                                            {activeConnectCex && !connectedCexs.includes(activeConnectCex) ? (
                                                <div className="w-full flex flex-col items-center">
                                                    <div className="w-12 h-12 bg-[#FFFFFF] dark:bg-[#18181B] rounded-full flex items-center justify-center mb-3 shadow-md border border-[#E4E4E7] dark:border-[#27272A]">
                                                        {CexLogos[activeConnectCex]}
                                                    </div>
                                                    <h3 className="font-bold mb-1 text-lg">Authorize {activeConnectCex}</h3>
                                                    <p className="text-sm text-[#71717A] dark:text-[#A1A1AA] mb-6">Grant TaxLayer read-only access to analyze your {activeConnectCex} transaction history.</p>

                                                    <button
                                                        onClick={() => {
                                                            const urls: Record<string, string> = {
                                                                'Binance': 'https://accounts.binance.com/en/login',
                                                                'Gate.io': 'https://www.gate.io/login',
                                                                'Bybit': 'https://www.bybit.com/login',
                                                                'BingX': 'https://bingx.com/en-us/login/'
                                                            };
                                                            const authUrl = activeConnectCex ? (urls[activeConnectCex] || 'https://google.com') : 'https://google.com';

                                                            // Calculate center position for the popup
                                                            const width = 600;
                                                            const height = 700;
                                                            const left = (window.innerWidth / 2) - (width / 2);
                                                            const top = (window.innerHeight / 2) - (height / 2);

                                                            const popup = window.open(authUrl, '_blank', `width=${width},height=${height},left=${left},top=${top},toolbar=0,status=0`);

                                                            setIsConnecting(true);

                                                            // Simulate OAuth redirection & processing delay
                                                            setTimeout(() => {
                                                                if (popup && !popup.closed) {
                                                                    try {
                                                                        popup.close();
                                                                    } catch (e) {
                                                                        console.warn("Could not auto-close popup due to cross-origin policies");
                                                                    }
                                                                }
                                                                setProfit((prev) => (Number(prev) || 0) + 14850.55);
                                                                setSalesVolume((prev) => (Number(prev) || 0) + 84200.00);
                                                                setConnectedCexs(prev => [...prev, activeConnectCex!]);
                                                                setActiveConnectCex(null);
                                                                setIsConnecting(false);
                                                            }, 3500);
                                                        }}
                                                        disabled={isConnecting}
                                                        className="w-full py-3 px-4 bg-[#09090B] dark:bg-[#FAFAFA] text-[#FAFAFA] dark:text-[#09090B] rounded-xl text-sm font-bold hover:bg-[#A855F7] dark:hover:bg-[#D4FF00] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm outline-none cursor-pointer"
                                                    >
                                                        {isConnecting ? (
                                                            <>
                                                                <Loader2 size={16} className="animate-spin" />
                                                                Establishing Secure Connection...
                                                            </>
                                                        ) : (
                                                            'Confirm Authorization'
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() => setActiveConnectCex(null)}
                                                        disabled={isConnecting}
                                                        className="mt-4 text-xs font-bold text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-[#FAFAFA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider cursor-pointer outline-none"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    {connectedCexs.length > 0 && (
                                                        <div className="w-full mb-6">
                                                            <div className="flex flex-wrap gap-2 justify-center mb-4">
                                                                {connectedCexs.map(cex => (
                                                                    <div key={cex} className="flex items-center gap-2 bg-[#FFFFFF] dark:bg-[#18181B] px-3 py-1.5 rounded-full border border-[#10B981]/50 shadow-sm relative pr-8">
                                                                        {CexLogos[cex]}
                                                                        <span className="text-xs font-bold">{cex}</span>
                                                                        <div className="absolute top-1/2 -translate-y-1/2 right-2 bg-[#10B981] text-white rounded-full p-0.5">
                                                                            <CheckCircle2 size={10} strokeWidth={3} />
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div className="flex justify-between items-center bg-[#FFFFFF] dark:bg-[#18181B] p-3 rounded-lg border border-[#E4E4E7] dark:border-[#27272A] shadow-sm">
                                                                <span className="text-xs text-[#71717A] dark:text-[#A1A1AA] uppercase font-bold tracking-wider text-left">Aggregated Sync</span>
                                                                <span className="font-mono font-bold text-[#10B981]">+${Number(profit).toLocaleString()}</span>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {connectedCexs.length === 0 && (
                                                        <>
                                                            <div className="w-12 h-12 bg-[#FFFFFF] dark:bg-[#18181B] rounded-full flex items-center justify-center mb-3 shadow-sm border border-[#E4E4E7] dark:border-[#27272A]">
                                                                <Link2 size={20} className="text-[#A855F7] dark:text-[#D4FF00]" />
                                                            </div>
                                                            <h3 className="font-bold mb-1">Connect CEX Account</h3>
                                                            <p className="text-sm text-[#71717A] dark:text-[#A1A1AA] mb-5">Securely link an exchange to instantly compute tax.</p>
                                                        </>
                                                    )}

                                                    <div className="grid grid-cols-2 gap-3 w-full mb-1">
                                                        {['Binance', 'Bybit', 'BingX', 'Gate.io'].map((cex) => {
                                                            const isConnected = connectedCexs.includes(cex);
                                                            return (
                                                                <button
                                                                    key={cex}
                                                                    onClick={() => {
                                                                        if (!isConnected) {
                                                                            setActiveConnectCex(cex);
                                                                        }
                                                                    }}
                                                                    className={`flex items-center justify-center gap-2 py-3 bg-[#FFFFFF] dark:bg-[#18181B] border transition-colors outline-none cursor-pointer rounded-xl 
                                                                        ${isConnected ? 'border-[#10B981] opacity-70 cursor-default' : 'border-[#E4E4E7] dark:border-[#27272A] hover:border-[#A855F7] dark:hover:border-[#D4FF00] shadow-sm hover:shadow-md'}`}
                                                                >
                                                                    {CexLogos[cex]} <span className="font-bold text-sm tracking-tight">{cex}</span>
                                                                    {isConnected && <CheckCircle2 size={12} className="text-[#10B981] ml-1" />}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>

                                                    {connectedCexs.length > 0 && (
                                                        <button
                                                            onClick={() => {
                                                                setConnectedCexs([]);
                                                                setProfit('');
                                                                setSalesVolume('');
                                                            }}
                                                            className="mt-6 text-xs text-[#EF4444] hover:underline uppercase tracking-wider font-bold outline-none cursor-pointer"
                                                        >
                                                            Disconnect All Integrations
                                                        </button>
                                                    )}

                                                    <div className="mt-8 pt-6 border-t border-[#E4E4E7] dark:border-[#27272A] w-full text-left">
                                                        <h4 className="text-xs font-bold text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-widest mb-4 flex items-center gap-2">
                                                            <Info size={14} /> How it Works
                                                        </h4>
                                                        <div className="space-y-4">
                                                            <div className="flex gap-3 items-start">
                                                                <div className="w-6 h-6 rounded-full bg-[#A855F7]/10 dark:bg-[#D4FF00]/10 text-[#A855F7] dark:text-[#D4FF00] flex items-center justify-center text-xs font-bold font-[family-name:var(--font-mono)] shrink-0 mt-0.5">1</div>
                                                                <p className="text-sm text-[#09090B] dark:text-[#FAFAFA] font-medium leading-relaxed tracking-tight"><span className="font-bold text-[#A855F7] dark:text-[#D4FF00]">Select</span> your primary exchange to connect your account.</p>
                                                            </div>
                                                            <div className="flex gap-3 items-start">
                                                                <div className="w-6 h-6 rounded-full bg-[#A855F7]/10 dark:bg-[#D4FF00]/10 text-[#A855F7] dark:text-[#D4FF00] flex items-center justify-center text-xs font-bold font-[family-name:var(--font-mono)] shrink-0 mt-0.5">2</div>
                                                                <p className="text-sm text-[#09090B] dark:text-[#FAFAFA] font-medium leading-relaxed tracking-tight"><span className="font-bold text-[#A855F7] dark:text-[#D4FF00]">Authorize</span> read-only API access for our secure audit system.</p>
                                                            </div>
                                                            <div className="flex gap-3 items-start">
                                                                <div className="w-6 h-6 rounded-full bg-[#A855F7]/10 dark:bg-[#D4FF00]/10 text-[#A855F7] dark:text-[#D4FF00] flex items-center justify-center text-xs font-bold font-[family-name:var(--font-mono)] shrink-0 mt-0.5">3</div>
                                                                <p className="text-sm text-[#09090B] dark:text-[#FAFAFA] font-medium leading-relaxed tracking-tight"><span className="font-bold text-[#A855F7] dark:text-[#D4FF00]">Auto-Sync</span> extracts & calculates your tax liability instantly.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ) : (
                                        <div>
                                            <label className="block text-xs font-bold text-[#71717A] dark:text-[#A1A1AA] mb-2 uppercase tracking-wider transition-colors">Total Realized Profit (USD)</label>
                                            <div className="relative mb-5">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A] dark:text-[#A1A1AA] select-none font-bold">$</span>
                                                <input
                                                    type="number"
                                                    placeholder="0.00"
                                                    value={profit === '' ? '' : profit}
                                                    onChange={(e) => setProfit(e.target.value === '' ? '' : Number(e.target.value))}
                                                    className="w-full pl-8 pr-4 py-3 bg-[#F4F4F5] dark:bg-[#09090B] border border-[#E4E4E7] dark:border-[#27272A] text-[#09090B] dark:text-[#FAFAFA] placeholder-[#A1A1AA] dark:placeholder-[#71717A] rounded-xl focus:outline-none focus:border-[#A855F7] dark:focus:border-[#D4FF00] focus:ring-1 focus:ring-[#A855F7] dark:focus:ring-[#D4FF00] transition-all font-mono"
                                                />
                                            </div>
                                            {country === 'India' && (
                                                <>
                                                    <label className="block text-xs font-bold text-[#71717A] dark:text-[#A1A1AA] mb-2 uppercase tracking-wider transition-colors">Total Sales Volume (USD) for TDS</label>
                                                    <div className="relative">
                                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A] dark:text-[#A1A1AA] select-none font-bold">$</span>
                                                        <input
                                                            type="number"
                                                            placeholder="0.00"
                                                            value={salesVolume === '' ? '' : salesVolume}
                                                            onChange={(e) => setSalesVolume(e.target.value === '' ? '' : Number(e.target.value))}
                                                            className="w-full pl-8 pr-4 py-3 bg-[#F4F4F5] dark:bg-[#09090B] border border-[#E4E4E7] dark:border-[#27272A] text-[#09090B] dark:text-[#FAFAFA] placeholder-[#A1A1AA] dark:placeholder-[#71717A] rounded-xl focus:outline-none focus:border-[#A855F7] dark:focus:border-[#D4FF00] focus:ring-1 focus:ring-[#A855F7] dark:focus:ring-[#D4FF00] transition-all font-mono"
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    )}

                                    <div className="p-5 bg-gradient-to-r from-[#F4F4F5] to-[#E4E4E7] dark:from-[#27272A]/50 dark:to-[#18181B] rounded-xl border border-[#E4E4E7] dark:border-[#27272A] mt-6 flex flex-col justify-center transition-colors">
                                        <div className="flex items-center justify-between w-full">
                                            <div>
                                                <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] font-bold uppercase tracking-wider transition-colors">Estimated Tax Liability</p>
                                                <p className="text-[#A855F7] dark:text-[#D4FF00] text-sm mt-1 transition-colors">{country === 'India' ? '30% + 4% Cess + 1% TDS' : 'Based on 20% Global rate'}</p>
                                            </div>
                                            <p className="text-3xl font-mono font-bold text-[#09090B] dark:text-[#FAFAFA] transition-colors">${calculateTax().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                        </div>

                                        {country === 'India' && (
                                            <div className="mt-4 pt-4 border-t border-[#E4E4E7]/50 dark:border-[#27272A] flex flex-col gap-1.5 text-xs text-[#71717A] dark:text-[#A1A1AA] font-mono">
                                                <div className="flex justify-between">
                                                    <span>Income Tax (30% of profit)</span>
                                                    <span>${((Number(profit) || 0) * 0.30).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Health & Education Cess (4% of Tax)</span>
                                                    <span>${((Number(profit) || 0) * 0.30 * 0.04).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>1% TDS (on Sales Volume)</span>
                                                    <span>${((Number(salesVolume) || 0) * 0.01).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={async () => {
                                            if (profit === '') {
                                                alert("Please enter a profit or auto-sync your account.");
                                                return;
                                            }

                                            try {
                                                const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
                                                const response = await fetch(`${apiUrl}/api/kyc`, {
                                                    method: "POST",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify({
                                                        name: name || "DeFi Native",
                                                        country: country,
                                                        profit: Number(profit),
                                                        sales_volume: Number(salesVolume) || 0.0,
                                                        tax_liability: calculateTax()
                                                    })
                                                });

                                                if (response.ok) {
                                                    const taxAmount = calculateTax().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                                                    alert(`KYC Submitted securely to backend! Tax liability updated.\nEstimated Tax: $${taxAmount} USD`);
                                                    router.push('/dashboard');
                                                } else {
                                                    alert("API Error: Make sure Python backend is running.");
                                                }
                                            } catch (e) {
                                                console.error(e);
                                                alert("Connection Error. Ensure FastAPI backend is running on port 8000.");
                                            }
                                        }}
                                        className="w-full bg-[#10B981] text-white py-3.5 rounded-xl font-bold mt-6 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:bg-[#059669] transition-all cursor-pointer outline-none"
                                    >
                                        Submit KYC & Acknowledge Tax
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div >
            </div >
        </div >
    );
}
