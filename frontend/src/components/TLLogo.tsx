import React from "react";

export const TLLogo = ({
    className = "w-12 h-12",
    textClass = "text-xl",
    hideBackground = false
}: {
    className?: string;
    textClass?: string;
    hideBackground?: boolean;
}) => {
    return (
        <div className={`relative flex items-center justify-center ${className} group cursor-pointer`}>
            {/* Glowing backdrop */}
            {!hideBackground && (
                <div className="absolute inset-0 bg-gradient-to-tr from-[#9333EA] to-[#A855F7] dark:from-[#D4FF00] dark:to-[#A855F7] rounded-xl blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-300 pointer-events-none"></div>
            )}

            {/* Main Logo Container */}
            <div className={`relative w-full h-full bg-[#FAFAFA] dark:bg-[#09090B] rounded-xl border border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-center overflow-hidden shadow-sm`}>
                {/* Inner modern styling lines */}
                <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gradient-to-bl from-[#A855F7]/30 dark:from-[#D4FF00]/30 to-transparent rounded-bl-full pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-gradient-to-tr from-[#9333EA]/30 dark:from-[#A855F7]/30 to-transparent rounded-tr-full pointer-events-none"></div>

                {/* The typography */}
                <span className={`relative z-10 font-[family-name:var(--font-space)] font-black tracking-tighter text-[#09090B] dark:text-[#FAFAFA] flex items-baseline leading-none ${textClass}`}>
                    T<span className="text-[#A855F7] dark:text-[#D4FF00] -ml-[3%]">L</span>
                </span>
            </div>
        </div>
    );
};
