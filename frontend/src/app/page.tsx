"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import ChainNodesBackground from "@/components/ChainNodesBackground";
import { TLLogo } from "@/components/TLLogo";



export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"credentials" | "recover">("credentials");
  const [isLoading, setIsLoading] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [showGoogleOptions, setShowGoogleOptions] = useState(false);

  const handleCredentialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setConnectedWallet("Email");

    // Simulate network request for auth token
    setTimeout(() => {
      document.cookie = "mock_auth=true; path=/";
      router.push("/dashboard");
    }, 800);
  };

  const handleWalletConnect = (walletName: string) => {
    if (walletName === "Google") {
      setShowGoogleOptions(true);
      return;
    }

    setIsLoading(true);
    setConnectedWallet(walletName);

    // Simulate Web3 wallet ping and signature request
    setTimeout(() => {
      document.cookie = "mock_auth=true; path=/";
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F5] dark:bg-[#000000] flex flex-col items-center justify-center p-6 selection:bg-[#A855F7]/30 dark:selection:bg-[#D4FF00]/30 font-[family-name:var(--font-mono)] transition-colors duration-300 relative overflow-hidden">

      {/* Visual Chain Background imported directly from the Dashboard schema */}
      <ChainNodesBackground />

      {/* Floating Theme Toggle corresponding to Dashboard implementation */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-[420px] bg-[#FFFFFF] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] p-10 rounded-3xl shadow-2xl relative z-10 transition-colors duration-300 overflow-hidden">

        <AnimatePresence mode="wait">
          {step === "credentials" && (
            <motion.div
              key="credentials"
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, x: 20, transition: { duration: 0.3 } }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.1 }
                }
              }}
            >
              <motion.div className="text-center mb-10" variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.15 } }
              }}>
                <motion.div variants={{
                  hidden: { scale: 0.5, opacity: 0, rotate: -45 },
                  show: { scale: 1, opacity: 1, rotate: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
                }}>
                  <TLLogo className="w-20 h-20 mx-auto mb-6" textClass="text-4xl" />
                </motion.div>
                <motion.h1
                  variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } } }}
                  className="text-3xl font-bold text-[#09090B] dark:text-[#FAFAFA] mb-2 tracking-tight transition-colors font-[family-name:var(--font-space)]"
                >
                  Welcome Back
                </motion.h1>
                <motion.p
                  variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } } }}
                  className="text-[#71717A] dark:text-[#A1A1AA] text-sm font-bold transition-colors uppercase tracking-wider"
                >
                  Secure Audit Console
                </motion.p>
              </motion.div>

              <form onSubmit={handleCredentialSubmit} className="space-y-6">
                <motion.div variants={{ hidden: { x: -30, opacity: 0 }, show: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } } }}>
                  <label className="block text-xs font-bold text-[#71717A] dark:text-[#A1A1AA] mb-2 ml-1 uppercase tracking-wider transition-colors">Operative Address</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#71717A] dark:text-[#A1A1AA] group-focus-within:text-[#A855F7] dark:group-focus-within:text-[#D4FF00] transition-colors">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-[#F4F4F5] dark:bg-[#09090B] border border-[#E4E4E7] dark:border-[#27272A] rounded-xl focus:ring-1 focus:ring-[#A855F7] dark:focus:ring-[#D4FF00] focus:border-[#A855F7] dark:focus:border-[#D4FF00] text-[#09090B] dark:text-[#FAFAFA] placeholder-[#A1A1AA] dark:placeholder-[#71717A] transition-all outline-none"
                      placeholder="operative@taxlayer.net"
                    />
                  </div>
                </motion.div>

                <motion.div variants={{ hidden: { x: 30, opacity: 0 }, show: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } } }}>
                  <label className="block text-xs font-bold text-[#71717A] dark:text-[#A1A1AA] mb-2 ml-1 uppercase tracking-wider transition-colors">Access Passcode</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#71717A] dark:text-[#A1A1AA] group-focus-within:text-[#A855F7] dark:group-focus-within:text-[#D4FF00] transition-colors">
                      <Lock size={18} />
                    </div>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-[#F4F4F5] dark:bg-[#09090B] border border-[#E4E4E7] dark:border-[#27272A] rounded-xl focus:ring-1 focus:ring-[#A855F7] dark:focus:ring-[#D4FF00] focus:border-[#A855F7] dark:focus:border-[#D4FF00] text-[#09090B] dark:text-[#FAFAFA] placeholder-[#A1A1AA] dark:placeholder-[#71717A] transition-all outline-none font-mono tracking-widest"
                      placeholder="••••••••"
                    />
                  </div>
                </motion.div>

                <motion.button
                  variants={{ hidden: { y: 30, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } } }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#A855F7] dark:bg-[#D4FF00] text-white dark:text-[#000000] font-bold py-4 rounded-xl shadow-[0_4px_15px_rgba(168,85,247,0.3)] dark:shadow-[0_4px_15px_rgba(212,255,0,0.2)] hover:shadow-[0_6px_25px_rgba(168,85,247,0.5)] dark:hover:shadow-[0_6px_25px_rgba(212,255,0,0.4)] transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center items-center gap-2 group cursor-pointer outline-none"
                >
                  {isLoading && connectedWallet === "Email" ? (
                    <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <>
                      Access Dashboard
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>

                <motion.div variants={{ hidden: { y: 40, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } } }} className="pt-2">
                  <div className="relative flex items-center justify-center py-4">
                    <div className="absolute border-t border-[#E4E4E7] dark:border-[#27272A] w-full"></div>
                    <span className="bg-[#FFFFFF] dark:bg-[#18181B] px-3 font-bold text-xs text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-wider relative z-10 font-[family-name:var(--font-mono)]">OR CONNECT VIA</span>
                  </div>

                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); handleWalletConnect("Google"); }}
                      className="w-full flex items-center justify-center gap-2 p-3 bg-[#F4F4F5] dark:bg-[#09090B] border border-[#E4E4E7] dark:border-[#27272A] rounded-xl hover:border-[#A855F7] dark:hover:border-[#D4FF00] hover:shadow-[0_4px_15px_rgba(168,85,247,0.15)] dark:hover:shadow-[0_4px_15px_rgba(212,255,0,0.1)] transition-all outline-none cursor-pointer disabled:opacity-50"
                      disabled={isLoading}
                    >
                      {isLoading && connectedWallet === "Google_Auth" ? (
                        <svg className="animate-spin h-5 w-5 text-[#A855F7] dark:text-[#D4FF00]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" className="w-5 h-5"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                      )}
                      <span className="font-bold text-sm text-[#09090B] dark:text-[#FAFAFA]">{isLoading && connectedWallet === "Google_Auth" ? "Connecting..." : "Continue with Google"}</span>
                    </button>
                  </div>
                </motion.div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {showGoogleOptions && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#F4F4F5]/90 dark:bg-[#000000]/90 backdrop-blur-md transition-all sm:p-6 lg:p-8 font-sans">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-[900px] bg-[#FFFFFF] dark:bg-[#202124] rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col border border-[#E4E4E7] dark:border-[#3C4043]"
          >
            {/* Header */}
            <div className="flex items-center px-8 py-5 border-b border-[#E4E4E7] dark:border-[#3C4043]">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] mr-3"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
              <span className="text-[#3C4043] dark:text-[#E8EAED] font-medium text-[15px]">Sign in with Google</span>
            </div>

            <div className="flex flex-col md:flex-row p-8 lg:p-12 gap-12 lg:gap-20">
              {/* Left Column */}
              <div className="flex-1 md:max-w-[340px]">
                <div className="mb-8">
                  {/* Developer Profile Link representation */}
                  <div className="w-14 h-14 rounded-full bg-[#FAFAFA] dark:bg-[#303134] border border-[#E4E4E7] dark:border-[#5F6368] flex items-center justify-center p-2 shadow-sm">
                    <TLLogo className="w-8 h-8" textClass="text-sm" hideBackground={true} />
                  </div>
                </div>
                <h1 className="text-[32px] md:text-[36px] font-[family-name:var(--font-space)] tracking-tight text-[#202124] dark:text-[#E8EAED] mb-3 leading-tight">Choose an account</h1>
                <p className="text-[#202124] dark:text-[#E8EAED] text-[16px]">to continue to <a href="https://www.linkedin.com/in/rohit9098" target="_blank" rel="noreferrer" className="text-[#1A73E8] dark:text-[#8AB4F8] font-medium hover:underline focus:outline-none">TaxLayer</a></p>
              </div>

              {/* Right Column */}
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex flex-col w-full">
                  {[
                    { name: "Rohit Jana", email: "rohitjana9098@gmail.com", img: "RJ" },
                    { name: "Rohit Jana", email: "rohitbusiness426@gmail.com", img: "RJ" },
                    { name: "Rohit Jana", email: "rohitjana9064@gmail.com", img: "RJ" }
                  ].map((acc, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.preventDefault(); setShowGoogleOptions(false); handleWalletConnect("Google_Auth"); }}
                      className="w-full flex items-center gap-4 py-4 border-b border-[#E4E4E7] dark:border-[#3C4043] hover:bg-[#F8F9FA] hover:dark:bg-[#303134] transition-colors text-left outline-none cursor-pointer group"
                    >
                      <div className="w-[36px] h-[36px] rounded-full overflow-hidden shrink-0 border border-transparent group-hover:border-[#E4E4E7] dark:group-hover:border-[#5F6368] transition-colors">
                        <div className="w-full h-full bg-gradient-to-tr from-[#6366F1] to-[#EC4899] dark:from-[#3B82F6] dark:to-[#8B5CF6] flex items-center justify-center text-white text-[15px] font-medium">{acc.img}</div>
                      </div>
                      <div className="flex-1 overflow-hidden pointer-events-none">
                        <div className="font-medium text-[15px] text-[#3C4043] dark:text-[#E8EAED] truncate">{acc.name}</div>
                        <div className="text-[14px] text-[#5F6368] dark:text-[#9AA0A6] truncate">{acc.email}</div>
                      </div>
                    </button>
                  ))}

                  <button
                    onClick={(e) => { e.preventDefault(); setShowGoogleOptions(false); }}
                    className="w-full flex items-center gap-4 py-4 border-b border-[#E4E4E7] dark:border-[#3C4043] hover:bg-[#F8F9FA] hover:dark:bg-[#303134] transition-colors text-left outline-none cursor-pointer group"
                  >
                    <div className="w-[36px] h-[36px] rounded-full border border-[#DADCE0] dark:border-[#5F6368] flex items-center justify-center text-[#5F6368] dark:text-[#9AA0A6] bg-white dark:bg-transparent">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" /></svg>
                    </div>
                    <span className="font-medium text-[15px] text-[#3C4043] dark:text-[#E8EAED]">Use another account</span>
                  </button>
                </div>

                <div className="mt-12 text-[13px] text-[#5F6368] dark:text-[#9AA0A6] leading-relaxed">
                  To continue, Google will share your name, email address, language preference, and profile picture with TaxLayer. Before using this app, you can review TaxLayer's <a href="https://www.linkedin.com/in/rohit9098" target="_blank" rel="noreferrer" className="text-[#1A73E8] dark:text-[#8AB4F8] hover:underline focus:outline-none">privacy policy</a> and <a href="https://www.linkedin.com/in/rohit9098" target="_blank" rel="noreferrer" className="text-[#1A73E8] dark:text-[#8AB4F8] hover:underline focus:outline-none">Terms of Service</a>.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
