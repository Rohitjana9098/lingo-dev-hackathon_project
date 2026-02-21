"use client";

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2, ShieldCheck, Database, FileText, ChevronRight } from 'lucide-react';

const steps = [
    {
        id: '01',
        title: 'Connect & Sync Data',
        description: 'Securely link your centralized exchanges (Binance, Gate.io, Bybit, BingX) or upload your raw transaction files. We establish a secure read-only API connection to pull your latest data.',
        icon: Database,
        color: 'from-[#A855F7] to-[#9333EA]',
        darkColor: 'dark:from-[#D4FF00] dark:to-[#84CC16]'
    },
    {
        id: '02',
        title: 'Automated Tax Analysis',
        description: 'Our proprietary engine categorizes your trades—spot, futures, options, wash sales, etc.—and computes your precise realized and unrealized P&L across assets.',
        icon: ShieldCheck,
        color: 'from-[#EC4899] to-[#E11D48]',
        darkColor: 'dark:from-[#10B981] dark:to-[#059669]'
    },
    {
        id: '03',
        title: 'Review Options Matrix',
        description: 'Check out the interactive dashboard matrix. It breaks down your specific strategies (e.g., Covered Calls, Iron Condors) marking what is taxable versus what is currently deferred.',
        icon: CheckCircle2,
        color: 'from-[#3B82F6] to-[#2563EB]',
        darkColor: 'dark:from-[#F59E0B] dark:to-[#D97706]'
    },
    {
        id: '04',
        title: 'Export Audit-Ready Reports',
        description: 'Generate localized, compliance-ready CSV forms optimized for your regions tax laws (e.g. India 30% framework). Download instantly and hand off to your CPAs.',
        icon: FileText,
        color: 'from-[#10B981] to-[#059669]',
        darkColor: 'dark:from-[#A855F7] dark:to-[#9333EA]'
    }
];

export default function HelpCenterPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col min-h-screen bg-[#F4F4F5] dark:bg-[#000000] text-[#09090B] dark:text-[#FAFAFA] font-[family-name:var(--font-mono)] transition-colors duration-300 py-12 px-6 sm:px-12 relative overflow-hidden">
            {/* Background Decor */}
            <div className="fixed top-[-100px] left-[-100px] w-[500px] h-[500px] bg-[#A855F7]/10 dark:bg-[#D4FF00]/5 blur-[120px] rounded-full pointer-events-none transition-colors" />
            <div className="fixed bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-[#3B82F6]/10 dark:bg-[#A855F7]/5 blur-[150px] rounded-full pointer-events-none transition-colors" />

            <div className="max-w-4xl mx-auto w-full relative z-10">
                <button
                    onClick={() => router.push('/dashboard')}
                    className="flex items-center gap-2 text-[#71717A] dark:text-[#A1A1AA] hover:text-[#A855F7] dark:hover:text-[#D4FF00] transition-colors mb-12 font-bold cursor-pointer outline-none w-fit"
                >
                    <ArrowLeft size={16} /> Back to Dashboard
                </button>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <p className="inline-flex items-center gap-2 text-[#A855F7] dark:text-[#D4FF00] uppercase text-xs tracking-[0.3em] font-bold mb-4 shadow-sm py-1 px-4 rounded-full border border-[#A855F7]/30 dark:border-[#D4FF00]/30 bg-[#A855F7]/10 dark:bg-[#D4FF00]/10">Help Center / Roadmap</p>
                    <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space)] tracking-tighter mb-4 text-[#09090B] dark:text-[#FAFAFA]">How TaxLayer Works.</h1>
                    <p className="text-[#71717A] dark:text-[#A1A1AA] max-w-xl mx-auto text-sm leading-relaxed">Follow this step-by-step roadmap to aggregate your trades, compute your liability, and instantly generate audit-ready documentation.</p>
                </motion.div>

                <div className="relative">
                    {/* The glowing roadmap connecting line behind items */}
                    <div className="absolute left-[24px] md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#A855F7] via-[#A855F7]/20 to-transparent dark:from-[#D4FF00] dark:via-[#D4FF00]/20 rounded-full" />

                    <div className="space-y-12">
                        {steps.map((step, index) => {
                            const isEven = index % 2 === 0;
                            const Icon = step.icon;

                            return (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className={`flex flex-col md:flex-row items-start md:items-center relative ${isEven ? 'md:flex-row-reverse' : ''}`}
                                >

                                    {/* Center Node on the roadmap line */}
                                    <div className="absolute left-[12px] md:left-1/2 top-4 md:top-1/2 transform -translate-x-[50%] md:-translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[#FFFFFF] dark:bg-[#09090B] border-4 border-[#A855F7] dark:border-[#D4FF00] flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)] dark:shadow-[0_0_15px_rgba(212,255,0,0.3)]">
                                        <div className="w-2 h-2 rounded-full bg-[#A855F7] dark:bg-[#D4FF00] animate-pulse" />
                                    </div>

                                    {/* Text Content Block */}
                                    <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-12 text-left md:text-right' : 'md:pl-12 text-left'}`}>
                                        <div className={`inline-block p-6 rounded-3xl bg-[#FFFFFF] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] shadow-xl relative overflow-hidden group hover:border-[#A855F7] dark:hover:border-[#D4FF00]/50 transition-all duration-300 ease-in-out`}>
                                            <div className={`absolute top-0 opacity-20 ${isEven ? 'right-0 rounded-bl-full' : 'left-0 rounded-br-full'} w-32 h-32 bg-gradient-to-br ${step.color} ${step.darkColor} pointer-events-none transition-colors duration-500`} />

                                            <div className={`flex items-center gap-4 mb-4 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white dark:text-[#000000] bg-gradient-to-tr ${step.color} ${step.darkColor} shadow-md`}>
                                                    <Icon size={20} />
                                                </div>
                                                <span className="text-3xl font-[family-name:var(--font-space)] font-black text-[#E4E4E7] dark:text-[#27272A] track-wider opacity-60">Step {step.id}</span>
                                            </div>

                                            <h3 className="text-xl font-bold font-[family-name:var(--font-space)] text-[#09090B] dark:text-[#FAFAFA] mb-3">{step.title}</h3>
                                            <p className="text-sm text-[#71717A] dark:text-[#A1A1AA] leading-relaxed">{step.description}</p>
                                        </div>
                                    </div>

                                    {/* Empty spacing for the other side */}
                                    <div className="hidden md:block w-1/2"></div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-20 flex justify-center pb-12">
                    <button
                        onClick={() => router.push('/kyc')}
                        className="py-4 px-8 bg-[#A855F7] dark:bg-[#D4FF00] text-white dark:text-[#000000] rounded-xl font-bold shadow-[0_4px_20px_rgba(168,85,247,0.3)] dark:shadow-[0_4px_20px_rgba(212,255,0,0.3)] hover:shadow-[0_6px_30px_rgba(168,85,247,0.5)] dark:hover:shadow-[0_6px_30px_rgba(212,255,0,0.5)] transition-all flex items-center gap-2 group cursor-pointer outline-none hover:-translate-y-1"
                    >
                        Start Synchronization
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}
