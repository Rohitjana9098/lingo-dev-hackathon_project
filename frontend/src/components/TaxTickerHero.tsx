"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function TaxTickerHero({ liability = 14850.55 }: { liability?: number }) {

    const CircularProgress = ({ progress, label, colorClass, delay }: { progress: number, label: string, colorClass: string, delay: number }) => {
        const radius = 40;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (progress / 100) * circumference;

        return (
            <div className="flex flex-col items-center gap-3">
                <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        {/* Background Circle */}
                        <circle cx="48" cy="48" r={radius} stroke="currentColor" className="text-[#E4E4E7] dark:text-[#27272A] transition-colors" strokeWidth="6" fill="none" />
                        {/* Animated Progress Circle */}
                        <motion.circle
                            cx="48" cy="48" r={radius}
                            stroke="currentColor" strokeWidth="6" fill="none"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset: offset }}
                            transition={{ duration: 1.5, delay, ease: "easeOut" }}
                            strokeLinecap="round"
                            className={`drop-shadow-none dark:drop-shadow-[0_0_8px_currentColor] transition-colors ${colorClass}`}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[#09090B] dark:text-[#FAFAFA] font-[family-name:var(--font-mono)] font-bold text-lg transition-colors">{progress}%</span>
                    </div>
                </div>
                <span className="text-xs text-[#71717A] dark:text-[#A1A1AA] tracking-widest uppercase font-[family-name:var(--font-space)] transition-colors">{label}</span>
            </div>
        );
    };

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative w-full bg-[#FFFFFF]/80 dark:bg-[#18181B]/80 backdrop-blur-xl rounded-3xl p-8 border border-[#E4E4E7] dark:border-[#27272A] shadow-lg dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden transition-colors duration-300"
        >
            {/* Background Glows */}
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#A855F7]/10 dark:bg-[#D4FF00]/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-[#A855F7]/10 dark:bg-[#A855F7]/10 blur-[100px] rounded-full pointer-events-none transition-colors" />

            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">

                {/* Main Live Ticker */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#A855F7] dark:bg-[#D4FF00] animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.6)] dark:shadow-[0_0_10px_rgba(212,255,0,0.6)]" />
                        <h2 className="text-sm text-[#71717A] dark:text-[#A1A1AA] tracking-[0.2em] font-[family-name:var(--font-space)] uppercase transition-colors">Live PNL Based Tax Liability</h2>
                    </div>
                    <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-[#A855F7] dark:text-[#D4FF00] text-3xl font-[family-name:var(--font-mono)]">$</span>
                        <motion.h1
                            key={liability}
                            initial={{ opacity: 0.8, y: -2 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-bold text-[#09090B] dark:text-[#FAFAFA] font-[family-name:var(--font-mono)] tracking-tight drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-colors"
                        >
                            {liability.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </motion.h1>
                    </div>
                    <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] mt-2 font-[family-name:var(--font-mono)] transition-colors">Last updated: Just now • Blockchain Synced</p>
                </div>

                {/* Circular Progress Bars */}
                <div className="flex items-center gap-8 md:gap-14 bg-[#F4F4F5] dark:bg-[#09090B] p-6 rounded-2xl border border-[#E4E4E7] dark:border-[#27272A] transition-colors duration-300">
                    <CircularProgress progress={65} label="Short-Term" colorClass="text-[#A855F7] dark:text-[#D4FF00]" delay={0.4} />
                    <CircularProgress progress={35} label="Long-Term" colorClass="text-[#9333EA] dark:text-[#A855F7]" delay={0.6} />
                </div>

            </div>
        </motion.div>
    );
}
