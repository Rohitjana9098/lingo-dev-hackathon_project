"use client";

import Sidebar from "@/components/Sidebar";
import TaxTickerHero from "@/components/TaxTickerHero";
import PortfolioManager from "@/components/PortfolioManager";
import TaxLiabilityChart from "@/components/TaxLiabilityChart";
import ChainNodesBackground from "@/components/ChainNodesBackground";
import { FloatingLogo, SocialCluster } from "@/components/FloatingLogo";
import FloatingAIAssistant from "@/components/FloatingAIAssistant";
import ThemeToggle from "@/components/ThemeToggle";
import { motion } from "framer-motion";
import { FileDown, FileText, RefreshCw, User, CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Dashboard() {
    const router = useRouter();
    const [userData, setUserData] = useState<any>(null);
    const [isExportingPDF, setIsExportingPDF] = useState(false);
    const [liveLiability, setLiveLiability] = useState(0);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/user/status");
                if (res.ok) {
                    const data = await res.json();
                    if (data.status === "verified" && data.data) {
                        setUserData(data.data);
                    }
                }
            } catch (e) {
                console.error("Failed to quickly fetch user status", e);
            }
        };
        fetchStatus();
    }, []);

    const handleExportCSV = () => {
        const csvContent = "Asset,Strategy,Strike,Premium,Tax Calc,Status\n"
            + "BTC,Covered Call,$65000,+$2400,+$840,Taxable\n"
            + "ETH,Iron Condor,$3500-$3800,+$550,Deferred,Pending\n"
            + "SOL,Cash Secured Put,$120,+$180,+$63,Taxable\n"
            + "XAU,Strangle,$2500,+$45,+$15,Taxable\n";

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'taxlayer_audit_report.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleExportPDF = async () => {
        const captureElement = document.getElementById("pdf-capture");
        if (!captureElement) return;

        setIsExportingPDF(true);
        try {
            // Apply temporary styles for better PDF capture
            captureElement.style.backgroundColor = document.documentElement.classList.contains("dark") ? "#000000" : "#F4F4F5";
            captureElement.style.padding = "20px";

            const canvas = await html2canvas(captureElement, {
                scale: 2,
                useCORS: true,
                logging: false,
                windowWidth: captureElement.scrollWidth,
                windowHeight: captureElement.scrollHeight
            });

            // Restore styles
            captureElement.style.backgroundColor = "";
            captureElement.style.padding = "";

            const imgData = canvas.toDataURL("image/png");

            // Calculate PDF dimensions based on A4
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("TaxLayer_Official_Audit_Report.pdf");
        } catch (error) {
            console.error("PDF Export failed:", error);
        } finally {
            setIsExportingPDF(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-[#F4F4F5] dark:bg-[#000000] font-[family-name:var(--font-mono)] text-[#09090B] dark:text-[#FAFAFA] selection:bg-[#A855F7]/30 dark:selection:bg-[#D4FF00]/30 w-full overflow-hidden relative transition-colors duration-300">

            {/* Visual Chain Background */}
            <ChainNodesBackground />

            {/* Sidebar - Minimalist & Dark */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 w-full px-4 sm:px-8 py-6 sm:py-8 overflow-y-auto relative z-10 scrollbar-hide pb-[100px] md:pb-8">
                <div id="pdf-capture" className="max-w-7xl mx-auto space-y-8 sm:space-y-12">

                    <motion.header
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-between items-end border-b border-[#E4E4E7] dark:border-[#27272A] pb-6 transition-colors duration-300"
                    >
                        <div>
                            <p className="text-[#A855F7] dark:text-[#A855F7] uppercase text-xs tracking-[0.3em] font-bold drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">TaxLayer Network</p>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#09090B] dark:text-white tracking-tighter mt-2 font-[family-name:var(--font-space)] transition-colors duration-300">Audit Console</h1>
                        </div>
                        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4 mt-4 sm:mt-0">
                            {/* Lingo.dev compliant Toggle */}
                            <ThemeToggle />

                            {/* User Profile */}
                            <div onClick={() => router.push('/kyc')} className="flex items-center gap-3 ml-2 cursor-pointer group relative">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#9333EA] to-[#A855F7] dark:from-[#D4FF00] dark:to-[#A855F7] flex items-center justify-center border-2 border-transparent group-hover:border-[#A855F7] dark:group-hover:border-[#D4FF00] transition-all overflow-hidden shadow-md dark:shadow-[0_0_15px_rgba(212,255,0,0.2)]">
                                    <User size={20} className="text-white dark:text-[#000000]" />
                                </div>
                                {userData && (
                                    <div className="absolute -bottom-1 -left-1 bg-[#10B981] text-white rounded-full p-0.5 shadow-md border-2 border-[#FFFFFF] dark:border-[#18181B] z-20">
                                        <CheckCircle2 size={12} strokeWidth={3} />
                                    </div>
                                )}
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-bold text-[#09090B] dark:text-[#FAFAFA] group-hover:text-[#A855F7] dark:group-hover:text-[#D4FF00] transition-colors leading-tight">
                                        {userData ? userData.name : "Anonymous"}
                                    </p>
                                    {userData ? (
                                        <p className="text-[#10B981] text-xs font-[family-name:var(--font-space)] uppercase tracking-wider mt-0.5 font-bold flex items-center gap-1">Verified</p>
                                    ) : (
                                        <p className="text-xs text-[#71717A] dark:text-[#A1A1AA] font-[family-name:var(--font-space)] uppercase tracking-wider mt-0.5 transition-colors">Pending KYC</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.header>

                    <section>
                        {/* The Massive Live Ticker Hero */}
                        <TaxTickerHero liability={liveLiability} />
                    </section>



                    <section>
                        {/* The Live Portfolio Ledger */}
                        <PortfolioManager onLiabilityChange={setLiveLiability} />
                    </section>

                    <section>
                        {/* Dynamic Web3 Tax Curve Chart */}
                        <TaxLiabilityChart />
                    </section>

                    {/* Quick Stats Grid to fill remaining space */}
                    <motion.section
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {[
                            { title: 'Total Realized P&L', value: '+$5250.30' },
                            { title: 'Wash Sales Offset', value: '+$1180.45' },
                            { title: 'Avg Margin Impact', value: '14.2%' }
                        ].map((stat, i) => (
                            <div key={i} className="bg-[#FFFFFF] dark:bg-[#18181B] rounded-3xl p-6 border border-[#E4E4E7] dark:border-[#27272A] shadow-md dark:shadow-none group hover:border-[#A855F7] dark:hover:border-[#D4FF00]/40 transition-colors duration-300">
                                <h4 className="text-[#71717A] dark:text-[#A1A1AA] text-xs uppercase tracking-wider mb-2 font-[family-name:var(--font-space)] transition-colors duration-300">{stat.title}</h4>
                                <div className="flex justify-between items-baseline">
                                    <span className="text-2xl font-bold text-[#09090B] dark:text-[#FAFAFA] font-[family-name:var(--font-mono)] group-hover:text-[#A855F7] dark:group-hover:text-[#D4FF00] transition-colors dark:drop-shadow-[0_0_8px_rgba(212,255,0,0)] dark:group-hover:drop-shadow-[0_0_8px_rgba(212,255,0,0.4)]">
                                        {stat.value}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </motion.section>

                    <section className="mt-16 flex flex-col items-center justify-center">
                        <FloatingLogo />
                        <SocialCluster />

                        <p className="mt-8 text-xs text-[#71717A] dark:text-[#A1A1AA] text-center font-mono opacity-60">
                            TAX LAYER NETWORK © 2026. ALL RIGHTS RESERVED.
                        </p>
                    </section>

                </div>
            </main>

            {/* The Floating AI Tax Advisor */}
            <FloatingAIAssistant />
        </div>
    );
}
