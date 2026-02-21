"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, MessageSquare } from "lucide-react";
import { TLLogo } from "@/components/TLLogo";

export const FloatingLogo = () => (
    <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
        {/* Intense background glow sphere pulsing */}
        <motion.div
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-[#A855F7] dark:bg-[#D4FF00] blur-[70px] rounded-full pointer-events-none"
        />

        {/* The Levitating Central Logo Block */}
        <motion.div
            animate={{ y: [-15, 10, -15] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 p-7 bg-[#FFFFFF]/30 dark:bg-[#FFFFFF]/5 backdrop-blur-xl border border-[#FFFFFF]/50 dark:border-[#FFFFFF]/10 rounded-[32px] shadow-[0_20px_60px_rgba(168,85,247,0.3)] dark:shadow-[0_20px_60px_rgba(212,255,0,0.15)] transform-gpu flex items-center justify-center aspect-square"
        >
            <TLLogo className="w-24 h-24" textClass="text-5xl" hideBackground={true} />

            {/* Specular highlight simulating the light reflection on the emblem */}
            <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-[32px] mix-blend-overlay pointer-events-none"></div>
        </motion.div>

        {/* Floating hand context aura representing the reference glow below */}
        <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, delay: 1, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-12 w-32 h-20 bg-gradient-to-t from-[#EC4899] to-transparent dark:from-[#3B82F6] blur-[40px] rounded-full pointer-events-none"
        />
    </div>
);

export const SocialCluster = () => (
    <div className="flex items-center gap-6 justify-center mt-12 mb-6 relative z-20">
        <a href="https://www.linkedin.com/in/rohit9098?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#FFFFFF]/80 dark:bg-[#18181B]/80 backdrop-blur-sm border border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-center text-[#71717A] dark:text-[#A1A1AA] hover:text-[#A855F7] dark:hover:text-[#D4FF00] hover:border-[#A855F7] dark:hover:border-[#D4FF00] hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] dark:hover:shadow-[0_0_15px_rgba(212,255,0,0.3)] transition-all outline-none cursor-pointer group">
            <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
        </a>
        <a href="https://github.com/Rohitjana9098" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#FFFFFF]/80 dark:bg-[#18181B]/80 backdrop-blur-sm border border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-center text-[#71717A] dark:text-[#A1A1AA] hover:text-[#A855F7] dark:hover:text-[#D4FF00] hover:border-[#A855F7] dark:hover:border-[#D4FF00] hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] dark:hover:shadow-[0_0_15px_rgba(212,255,0,0.3)] transition-all outline-none cursor-pointer group">
            <Github size={20} className="group-hover:scale-110 transition-transform" />
        </a>
        <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#FFFFFF]/80 dark:bg-[#18181B]/80 backdrop-blur-sm border border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-center text-[#71717A] dark:text-[#A1A1AA] hover:text-[#A855F7] dark:hover:text-[#D4FF00] hover:border-[#A855F7] dark:hover:border-[#D4FF00] hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] dark:hover:shadow-[0_0_15px_rgba(212,255,0,0.3)] transition-all outline-none cursor-pointer group">
            <MessageSquare size={20} className="group-hover:scale-110 transition-transform" />
        </a>
    </div>
);
