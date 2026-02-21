"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, Fingerprint, Lock, Shield } from 'lucide-react';

export default function NexusLogin() {
    const router = useRouter();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-[#010202] text-white overflow-hidden font-[family-name:var(--font-space)]">
            {/* Background Image / Starfield layer */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen"
                style={{
                    backgroundImage: `url('file:///C:/Users/Rohit%20Jana/.gemini/antigravity/brain/8f495889-5fbe-44a2-8dc9-66fe0ef3e2df/web3_gaming_bg_1771656439986.png')`
                }}
            />

            {/* Dark gradient overlay to ensure text readability */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#010202]/80 via-[#010202]/40 to-[#010202]/90"></div>

            {/* Glowing orbs behind the card */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#689F35]/20 blur-[120px] rounded-full z-0 pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.4, 0.2],
                    x: [0, 50, 0],
                    y: [0, -50, 0]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#265231]/30 blur-[100px] rounded-full z-0 pointer-events-none"
            />

            {/* Main Login Container */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md p-8 sm:p-10 rounded-3xl"
                style={{
                    background: 'linear-gradient(145deg, rgba(20,20,22,0.6) 0%, rgba(10,10,12,0.8) 100%)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(104, 159, 53, 0.2)',
                    boxShadow: '0 0 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(104, 159, 53, 0.05)'
                }}
            >
                {/* Micro tech accents on the border */}
                <div className="absolute top-0 left-8 w-16 h-[2px] bg-[#689F35] shadow-[0_0_10px_#689F35]"></div>
                <div className="absolute bottom-8 right-0 w-[2px] h-16 bg-[#689F35] shadow-[0_0_10px_#689F35]"></div>

                <div className="text-center mb-10">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#010202] border border-[#265231] mb-6 shadow-[0_0_30px_rgba(38,82,49,0.5)]"
                    >
                        <Shield className="text-[#689F35]" size={32} />
                    </motion.div>
                    <h1 className="text-3xl font-black tracking-[0.2em] text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">ACCESS THE NEXUS</h1>
                    <p className="text-[#689F35] text-xs font-bold tracking-[0.3em] uppercase mt-3 opacity-80">Secure Terminal Auth</p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-4">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Fingerprint className="text-[#265231] group-focus-within:text-[#689F35] transition-colors" size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="OPERATIVE ID"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                className="w-full bg-[#010202]/60 border border-[#265231]/50 text-white placeholder-[#265231] text-sm tracking-wider py-4 pl-12 pr-4 rounded-xl focus:outline-none focus:border-[#689F35] focus:ring-1 focus:ring-[#689F35] transition-all"
                            />
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="text-[#265231] group-focus-within:text-[#689F35] transition-colors" size={20} />
                            </div>
                            <input
                                type="password"
                                placeholder="PASSCODE"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#010202]/60 border border-[#265231]/50 text-white placeholder-[#265231] text-sm tracking-wider py-4 pl-12 pr-4 rounded-xl focus:outline-none focus:border-[#689F35] focus:ring-1 focus:ring-[#689F35] transition-all font-mono"
                            />
                        </div>
                    </div>

                    <div className="pt-2 flex flex-col gap-4">
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="relative w-full overflow-hidden bg-[#689F35] text-[#010202] py-4 rounded-xl font-black text-sm tracking-[0.1em] uppercase hover:bg-[#7bc03f] transition-all shadow-[0_0_20px_rgba(104,159,53,0.4)] hover:shadow-[0_0_30px_rgba(104,159,53,0.6)] group"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Connect Wallet <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                            {/* Scanning micro-interaction line */}
                            <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[scan_1.5s_ease-in-out_infinite]" />
                        </button>

                        <button className="w-full bg-transparent border border-[#265231] text-[#689F35] py-4 rounded-xl font-bold text-xs tracking-wider uppercase hover:bg-[#265231]/20 transition-colors">
                            Login with ID
                        </button>
                    </div>
                </div>

                <div className="mt-8 text-center border-t border-[#265231]/30 pt-6">
                    <p className="text-[10px] text-[#265231] font-mono tracking-widest uppercase">System Status: Online | Latency: 12ms</p>
                </div>
            </motion.div>

            {/* Global style for the scan animation */}
            <style jsx global>{`
                @keyframes scan {
                    0% { left: -100%; opacity: 0; }
                    50% { opacity: 1; }
                    100% { left: 100%; opacity: 0; }
                }
            `}</style>
        </div>
    );
}
