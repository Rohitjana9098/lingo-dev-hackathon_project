"use client";

import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export default function AdminPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F4F4F5] dark:bg-[#000000] text-[#09090B] dark:text-[#FAFAFA] font-[family-name:var(--font-mono)] transition-colors duration-300 p-8">
            <div className="bg-[#FFFFFF] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] rounded-3xl p-12 max-w-lg w-full text-center shadow-xl relative overflow-hidden">
                <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-48 h-48 bg-[#A855F7]/20 dark:bg-[#D4FF00]/10 blur-[80px] rounded-full pointer-events-none" />

                <ShieldAlert size={64} className="mx-auto text-[#A855F7] dark:text-[#D4FF00] mb-6" />
                <h1 className="text-3xl font-bold mb-2 font-[family-name:var(--font-space)]">Admin Support Panel</h1>
                <p className="text-[#71717A] dark:text-[#A1A1AA] mb-8 leading-relaxed">
                    Welcome to the restricted administration control area for the TaxLayer Network. You have secure access.
                </p>

                <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#09090B] dark:bg-[#FAFAFA] text-[#FAFAFA] dark:text-[#09090B] rounded-full font-bold hover:bg-[#A855F7] dark:hover:hover:bg-[#D4FF00] transition-colors shadow-lg">
                    <ArrowLeft size={18} />
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
}
