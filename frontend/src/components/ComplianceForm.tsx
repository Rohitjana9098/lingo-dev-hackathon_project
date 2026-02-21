"use client";

import React, { useState } from "react";

const getGovernmentIdLabel = (country: string) => {
    switch (country) {
        case "India":
            return "Aadhaar";
        case "USA":
            return "SSN";
        case "France":
            return "NIR";
        case "Spain":
            return "DNI";
        default:
            return "Government ID";
    }
};

export default function ComplianceForm() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        country: "Select Country",
        government_id: "",
    });

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const countries = ["Select Country", "India", "USA", "France", "Spain", "Other"];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");

        if (formData.country === "Select Country") {
            setStatus("error");
            setErrorMsg("Please select a valid country.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/api/compliance", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit data");
            }

            setStatus("success");
            setFormData({
                name: "",
                phone: "",
                address: "",
                country: "Select Country",
                government_id: "",
            });
        } catch (err: any) {
            setStatus("error");
            setErrorMsg(err.message || "An unexpected error occurred");
        }
    };

    return (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20 w-full max-w-md mx-auto transform transition-all hover:scale-[1.01]">
            <h2 className="text-2xl font-bold mb-6 text-white text-center tracking-tight">Compliance Tracker</h2>

            {status === "success" && (
                <div className="mb-6 bg-green-500/20 border border-green-500 text-green-100 px-4 py-3 rounded-xl flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Submission Successful
                </div>
            )}

            {status === "error" && (
                <div className="mb-6 bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded-xl flex items-center gap-3">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    {errorMsg}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-blue-100 mb-1">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-white/30 transition-all outline-none"
                        placeholder="John Doe"
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-blue-100 mb-1">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-white/30 transition-all outline-none"
                        placeholder="+1 (555) 000-0000"
                    />
                </div>

                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-blue-100 mb-1">Address</label>
                    <textarea
                        id="address"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        rows={2}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-white/30 transition-all outline-none resize-none"
                        placeholder="123 Crypto Ave..."
                    />
                </div>

                <div>
                    <label htmlFor="country" className="block text-sm font-medium text-blue-100 mb-1">Country</label>
                    <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white transition-all outline-none appearance-none"
                    >
                        {countries.map((c) => (
                            <option key={c} value={c} className="text-gray-900 bg-white">{c}</option>
                        ))}
                    </select>
                </div>

                <div className="transition-all duration-300">
                    <label htmlFor="government_id" className="block text-sm font-medium text-blue-100 mb-1">
                        {getGovernmentIdLabel(formData.country)}
                    </label>
                    <input
                        type="text"
                        id="government_id"
                        name="government_id"
                        required
                        value={formData.government_id}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-white/30 transition-all outline-none"
                        placeholder={`Enter your ${getGovernmentIdLabel(formData.country)}`}
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg transform transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {status === "loading" ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing
                        </span>
                    ) : "Submit Compliance"}
                </button>
            </form>
        </div>
    );
}
