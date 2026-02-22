"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Sparkles, Languages } from "lucide-react";

interface ChatMessage {
    id: string;
    role: "user" | "ai";
    content: string;
}

export default function FloatingAIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState("EN");
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: "1", role: "ai", content: "Hello! I am your TaxLayer AI Advisor. I can analyze your portfolio and answer any crypto tax compliance questions. How can I help you today?" }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const handleSendMessage = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!inputValue.trim()) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: "user",
            content: inputValue
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        const aiResponseId = (Date.now() + 1).toString();

        // Simulated AI reasoning delay
        await delay(1500);

        let responseText = "I am the TaxLayer Nexus AI. I can help you navigate our Web3 Dashboard, explain features like the Live Portfolio Manager, Tax Liability tracking, or help you export your KYC and audit reports. What would you like to know?";

        const query = userMsg.content.toLowerCase();

        if (query.includes("wash sale") || query.includes("offset")) {
            responseText = "A wash sale occurs when you sell a crypto asset at a loss and then buy it back within 30 days. According to standard rules, you cannot claim the capital loss on those trades. Do you need help identifying these in your portfolio?";
        } else if (query.includes("reduce") || query.includes("lower") || query.includes("harvesting")) {
            responseText = "To lower your tax liability, you might want to consider 'Tax-Loss Harvesting'. Selling underperforming assets at their current dip could completely offset the gains you made on other assets this year.";
        } else if (query.includes("pdf") || query.includes("export") || query.includes("report") || query.includes("csv")) {
            responseText = "You can generate a fully compliant, audit-ready PDF or CSV report directly from the Dashboard. Just look for the 'Export PDF' or 'CSV' buttons near the top of the interface under the 'TaxLayer Network' header!";
        } else if (query.includes("add coin") || query.includes("portfolio") || query.includes("track") || query.includes("live price")) {
            responseText = "Our Live Portfolio Manager lets you easily add coins to your ledger. We track live market prices using Binance WebSockets. Any coin you add is automatically saved in your browser and instantly updates your Live PNL Tax Liability!";
        } else if (query.includes("kyc") || query.includes("verify") || query.includes("compliance") || query.includes("profile")) {
            responseText = "You can access the Zero-Knowledge KYC Compliance form by clicking your User Profile icon in the top right. We use advanced ZK-proofs to verify your wallet without storing your private passport or ID documents on our servers.";
        } else if (query.includes("dashboard") || query.includes("liability") || query.includes("pnl")) {
            responseText = "Your Live PNL Based Tax Liability is calculated dynamically based on the assets in your portfolio. As market prices shift or you add new transactions, we automatically estimate your live tax obligations (e.g., assuming a standard 30% baseline depending on your region).";
        } else if (query.includes("sync") || query.includes("wallet") || query.includes("metamask")) {
            responseText = "You can sync your entire transaction history safely. While our current system dynamically calculates based on Manual Portfolio entries, in a fully connected system, this syncs seamlessly with your Web3 Wallet via our secure TAC endpoints.";
        } else if (query.includes("who are you") || query.includes("help") || query.includes("hello") || query.includes("hi")) {
            responseText = "Hello! I am your embedded TaxLayer AI Advisor. I'm here to guide you through the Dashboard, answer questions about your Crypto Portfolio, explain tax harvesting strategies, and help you export audit reports. How can I assist you today?";
        }

        // --- LINGO.DEV RUNTIME TRANSLATION SIMULATION ---
        // Simulating the Lingo.dev compiler intercepting and replacing strings dynamically based on user locale
        if (language === "ES") {
            if (responseText.includes("Nexus AI")) responseText = "Soy la IA Nexus de TaxLayer. Puedo ayudarle a navegar por nuestro Panel Web3, explicar funciones como el Gestor de Cartera en Vivo, o ayudarle a exportar sus informes KYC y de auditoría. ¿Qué le gustaría saber?";
            else if (responseText.includes("wash sale")) responseText = "Una 'venta de lavado' (wash sale) ocurre cuando vende un criptoactivo con pérdida y luego lo vuelve a comprar dentro de los 30 días. Según las reglas, no puede reclamar esa pérdida de capital.";
            else responseText = "Soy su asesor fiscal de Web3. ¿En qué más puedo ayudarle hoy? \n\n*(Traducido dinámicamente vía Lingo.dev)*";
        } else if (language === "FR") {
            if (responseText.includes("Nexus AI")) responseText = "Je suis l'IA Nexus de TaxLayer. Je peux vous aider à naviguer sur notre tableau de bord Web3, expliquer des fonctionnalités comme le gestionnaire de portefeuille, ou vous aider à exporter vos rapports d'audit. Que souhaitez-vous savoir ?";
            else if (responseText.includes("wash sale")) responseText = "Une vente fictive se produit lorsque vous vendez un actif crypto à perte, puis le rachetez dans les 30 jours. Selon les règles standard, vous ne pouvez pas réclamer la perte en capital.";
            else responseText = "Je suis votre conseiller fiscal Web3. Comment puis-je vous aider aujourd'hui ? \n\n*(Traduction dynamique via Lingo.dev)*";
        } else if (language === "JA") {
            if (responseText.includes("Nexus AI")) responseText = "私は TaxLayer Nexus AI です。Web3 ダッシュボードの操作、ポートフォリオ管理機能の説明、KYC および監査レポートのエクスポートのお手伝いをします。何を知りたいですか？";
            else if (responseText.includes("wash sale")) responseText = "ウォッシュセール（仮装売買）は、暗号資産を損失で売却し、30日以内に買い戻した場合に発生します。標準的なルールに従い、これらの取引での資本損失を申告することはできません。";
            else responseText = "私はあなたのWeb3税務アドバイザーです。今日はどのようにお手伝いしましょうか？ \n\n*(Lingo.dev による動的な翻訳)*";
        }

        const aiMsg: ChatMessage = {
            id: aiResponseId,
            role: "ai",
            content: responseText
        };

        setMessages(prev => [...prev, aiMsg]);
        setIsTyping(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-16 right-0 w-[350px] sm:w-[400px] h-[500px] bg-[#FFFFFF] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[#A855F7] to-[#7E22CE] dark:from-[#D4FF00] dark:to-[#84CC16] p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/20 dark:bg-black/20 flex items-center justify-center backdrop-blur-sm">
                                    <Bot size={18} className="text-white dark:text-[#000000]" />
                                </div>
                                <div>
                                    <h3 className="text-white dark:text-[#000000] font-bold text-sm leading-tight flex items-center gap-1.5">
                                        TaxLayer Nexus <Sparkles size={12} />
                                    </h3>
                                    <p className="text-white/80 dark:text-black/70 text-xs font-mono uppercase tracking-widest mt-0.5">AI Advisor</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {/* Lingo.dev Language Selector */}
                                <div className="relative flex items-center bg-white/10 dark:bg-black/10 rounded-lg px-2 py-1 border border-white/20 dark:border-black/20" title="Powered by Lingo.dev">
                                    <Languages size={12} className="text-white dark:text-[#000000] mr-1" />
                                    <select
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        className="bg-transparent text-white dark:text-[#000000] text-xs font-bold outline-none cursor-pointer appearance-none uppercase"
                                    >
                                        <option value="EN" className="text-black text-xs">EN</option>
                                        <option value="ES" className="text-black text-xs">ES</option>
                                        <option value="FR" className="text-black text-xs">FR</option>
                                        <option value="JA" className="text-black text-xs">JA</option>
                                    </select>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-8 h-8 flex items-center justify-center text-white/80 dark:text-black/80 hover:text-white dark:hover:text-black hover:bg-white/10 dark:hover:bg-black/10 rounded-full transition-colors cursor-pointer"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Chat Body */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F4F4F5]/30 dark:bg-[#000000]/30 custom-scrollbar">
                            {messages.map((msg) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={msg.id}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${msg.role === 'user'
                                        ? 'bg-[#09090B] dark:bg-[#FAFAFA] text-[#FAFAFA] dark:text-[#09090B] rounded-tr-sm shadow-sm'
                                        : 'bg-[#FFFFFF] dark:bg-[#18181B] text-[#09090B] dark:text-[#FAFAFA] border border-[#E4E4E7] dark:border-[#27272A] rounded-tl-sm shadow-sm'
                                        }`}>
                                        <p className="leading-relaxed">{msg.content}</p>
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                    <div className="bg-[#FFFFFF] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 bg-[#A855F7] dark:bg-[#D4FF00] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-1.5 h-1.5 bg-[#A855F7] dark:bg-[#D4FF00] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-1.5 h-1.5 bg-[#A855F7] dark:bg-[#D4FF00] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-[#FFFFFF] dark:bg-[#18181B] border-t border-[#E4E4E7] dark:border-[#27272A]">
                            <form onSubmit={handleSendMessage} className="relative flex items-center">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ask about crypto tax..."
                                    className="w-full bg-[#F4F4F5] dark:bg-[#000000] border border-[#E4E4E7] dark:border-[#27272A] text-[#09090B] dark:text-[#FAFAFA] text-sm py-3 pl-4 pr-12 rounded-xl focus:outline-none focus:border-[#A855F7] dark:focus:border-[#D4FF00] transition-colors placeholder:text-[#A1A1AA] dark:placeholder:text-[#71717A]"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isTyping}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-[#A855F7] dark:bg-[#D4FF00] text-white dark:text-[#000000] rounded-lg disabled:opacity-50 transition-all cursor-pointer hover:shadow-md outline-none"
                                >
                                    <Send size={14} className="ml-0.5" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 outline-none cursor-pointer ${isOpen
                    ? 'bg-[#09090B] dark:bg-[#FAFAFA] text-white dark:text-[#000000] shadow-[0_0_20px_rgba(0,0,0,0.1)]'
                    : 'bg-gradient-to-r from-[#A855F7] to-[#7E22CE] dark:from-[#D4FF00] dark:to-[#84CC16] text-white dark:text-[#000000] shadow-[0_0_20px_rgba(168,85,247,0.4)] dark:shadow-[0_0_20px_rgba(212,255,0,0.3)]'
                    }`}
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}

                {/* Floating Notification Dot */}
                {!isOpen && (
                    <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white dark:border-black rounded-full shadow-sm animate-pulse"></span>
                )}
            </motion.button>
        </div>
    );
}
