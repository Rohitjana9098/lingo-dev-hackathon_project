"use client";

import { motion } from 'framer-motion';

export default function ChainNodesBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" className="text-[#A855F7] dark:text-[#D4FF00] transition-colors" stopColor="currentColor" />
                        <stop offset="50%" className="text-[#9333EA] dark:text-[#A855F7] transition-colors" stopColor="currentColor" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>

                {/* Animated Connected Nodes representing "Chain" */}
                <motion.path
                    d="M -100 100 Q 200 400 500 200 T 1200 500"
                    stroke="url(#lineGrad)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="10, 20"
                    initial={{ strokeDashoffset: 1000 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />

                <motion.path
                    d="M -50 600 Q 300 200 800 600 T 1500 300"
                    stroke="url(#lineGrad)"
                    strokeWidth="1.5"
                    fill="none"
                    strokeDasharray="5, 15"
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: -1000 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />

                {/* Nodes */}
                <circle cx="500" cy="200" r="4" className="fill-[#A855F7] dark:fill-[#D4FF00] transition-colors animate-ping" />
                <circle cx="500" cy="200" r="2" className="fill-[#09090B] dark:fill-[#FAFAFA] transition-colors" />

                <circle cx="800" cy="600" r="6" className="fill-[#9333EA] dark:fill-[#A855F7] transition-colors opacity-50" />
                <circle cx="800" cy="600" r="3" className="fill-[#09090B] dark:fill-[#FAFAFA] transition-colors" />
            </svg>
        </div>
    );
}
