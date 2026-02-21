"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(true);

    // Initialize theme to be dark by default
    useEffect(() => {
        if (typeof document !== 'undefined') {
            const isDarkMode = document.documentElement.classList.contains('dark') || true;
            setIsDark(isDarkMode);
            if (isDarkMode && !document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.add('dark');
            }
        }
    }, []);

    const toggleTheme = () => {
        setIsDark(!isDark);
        if (!isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <button
            onClick={toggleTheme}
            aria-label={isDark ? "switch_to_light_mode" : "switch_to_dark_mode"}
            className="relative flex items-center justify-between w-16 h-8 rounded-full bg-black/10 dark:bg-[#18181B]/50 border border-black/10 dark:border-white/10 p-1 cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7] dark:focus-visible:ring-[#D4FF00]"
        >
            <motion.div
                className="absolute left-1 top-1 bottom-1 w-6 h-6 rounded-full flex items-center justify-center shadow-luminous z-10"
                initial={false}
                animate={{
                    x: isDark ? 32 : 0,
                    backgroundColor: isDark ? '#000000' : '#FFFFFF',
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
                <motion.div
                    initial={false}
                    animate={{
                        rotate: isDark ? 0 : 90,
                        scale: isDark ? 1 : 0,
                        opacity: isDark ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute"
                >
                    <Moon size={14} className="text-[#D4FF00]" />
                </motion.div>

                <motion.div
                    initial={false}
                    animate={{
                        rotate: isDark ? -90 : 0,
                        scale: isDark ? 0 : 1,
                        opacity: isDark ? 0 : 1
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute"
                >
                    <Sun size={14} className="text-[#A855F7]" />
                </motion.div>
            </motion.div>

            {/* Background Icons */}
            <Sun size={14} className="text-black/20 dark:text-white/20 ml-1.5 transition-colors" />
            <Moon size={14} className="text-black/20 dark:text-white/20 mr-1.5 transition-colors" />
        </button>
    );
}
