import { ArrowRightIcon } from "@/components/icons/icons";
import React from "react";

const GridItem = ({ 
    title, 
    description, 
    icon, 
    onClick, 
    active 
}: { 
    title: string; 
    description: string; 
    icon?: React.ReactNode; 
    onClick?: () => void;
    active?: boolean;
}) => (
    <div 
        onClick={onClick}
        className={`
            group relative p-8 md:p-12 border-b border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900
            transition-all duration-300 ease-out
            ${onClick ? 'cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800' : ''}
            ${active ? 'bg-neutral-50 dark:bg-neutral-800' : ''}
        `}
    >
        {icon && (
            <div className="mb-6 md:mb-8 text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-200 transition-colors duration-300">
                {React.isValidElement(icon) 
                    ? React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "w-8 h-8" })
                    : icon
                }
            </div>
        )}
        <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-3 md:mb-4 tracking-tight transition-colors duration-300">{title}</h3>
        <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed text-sm md:text-base font-medium transition-colors duration-300">{description}</p>
        
        {onClick && (
            <div className="mt-8 flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-neutral-100 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                Launch Builder <ArrowRightIcon className="w-4 h-4" />
            </div>
        )}
    </div>
);

export default GridItem;