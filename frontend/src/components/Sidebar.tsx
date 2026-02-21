"use client";

import { BoxSelect, LayoutGrid, Layers, FileSignature, LogOut, CheckCircle2, HelpCircle } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { TLLogo } from '@/components/TLLogo';

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        document.cookie = "mock_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push('/');
    };

    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed bottom-0 left-0 w-full h-20 bg-[#FFFFFF] dark:bg-[#000000] border-t border-[#E4E4E7] dark:border-[#27272A] flex flex-row items-center justify-around z-50 transition-colors duration-300 md:relative md:w-24 md:h-auto md:border-t-0 md:border-r md:flex-col md:py-8 md:min-h-screen md:sticky md:top-0"
        >
            <div onClick={() => router.push('/dashboard')} className="hidden md:flex mb-12 cursor-pointer">
                <TLLogo className="w-12 h-12" textClass="text-xl" />
            </div>

            <div className="flex flex-row md:flex-col items-center justify-around md:justify-start gap-2 md:gap-8 text-[#A0EC0] flex-1 w-full px-2 md:px-4">
                <button
                    onClick={() => router.push('/dashboard')}
                    className={`flex flex-col items-center gap-1.5 p-2 sm:p-3 rounded-xl transition-all cursor-pointer ${pathname === '/dashboard' ? 'bg-[#F4F4F5] dark:bg-[#18181B] text-[#A855F7] dark:text-[#D4FF00]' : 'hover:bg-[#F4F4F5] dark:hover:bg-[#18181B] text-[#71717A] dark:text-[#A1A1AA] hover:text-[#A855F7] dark:hover:text-[#D4FF00]'}`}
                >
                    <LayoutGrid size={24} strokeWidth={1.5} />
                </button>
                <button className="flex flex-col items-center gap-1.5 p-2 sm:p-3 rounded-xl transition-all hover:bg-[#F4F4F5] dark:hover:bg-[#18181B] cursor-pointer text-[#71717A] dark:text-[#A1A1AA] hover:text-[#A855F7] dark:hover:text-[#D4FF00]">
                    <BoxSelect size={24} strokeWidth={1.5} />
                </button>



                {/* Help Form Button */}
                <button
                    onClick={() => router.push('/help')}
                    className={`flex md:mt-auto flex-col items-center gap-1.5 p-2 sm:p-3 rounded-xl transition-all cursor-pointer ${pathname === '/help' ? 'bg-[#F4F4F5] dark:bg-[#18181B] text-[#A855F7] dark:text-[#D4FF00]' : 'hover:bg-[#F4F4F5] dark:hover:bg-[#18181B] text-[#71717A] dark:text-[#A1A1AA] hover:text-[#A855F7] dark:hover:text-[#D4FF00]'}`}
                    title="Help & Roadmap"
                >
                    <HelpCircle size={24} strokeWidth={1.5} />
                </button>
            </div>

            <button
                onClick={handleLogout}
                className="hidden md:flex mb-4 flex-col items-center gap-1.5 p-3 rounded-xl hover:text-[#EF4444] hover:bg-[#EF4444]/10 text-[#71717A] dark:text-[#A1A1AA] transition-colors cursor-pointer"
                title="Logout"
            >
                <LogOut size={24} strokeWidth={1.5} />
            </button>
        </motion.div>
    );
}
