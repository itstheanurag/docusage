import { ArrowRightIcon } from "@/components/icons/icons";
import React from "react";

const GridItem = ({
    title,
    description,
    icon,
    onClick,
    active,
    index,
}: {
    index: number;
    title: string;
    description: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    active?: boolean;
}) => {

    return (
        <div
            onClick={onClick}
            className={`
                group relative p-8 md:p-12 
                transition-all duration-300 ease-out
                cursor-pointer 
                bg-background hover:bg-muted/5
                ${active ? "bg-muted/10" : ""}
            `}
        >
            {icon && (
                <div className="mb-6 md:mb-8 text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {React.isValidElement(icon)
                        ? React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
                              className: "w-8 h-8",
                          })
                        : icon}
                </div>
            )}

            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4 tracking-tight transition-colors duration-300">
                {title}
            </h3>

            <p className="text-muted-foreground leading-relaxed text-sm md:text-base font-medium transition-colors duration-300">
                {description}
            </p>

            {onClick && (
                <div className="mt-8 flex items-center gap-2 text-sm font-bold text-foreground opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Launch Builder <ArrowRightIcon className="w-4 h-4" />
                </div>
            )}
        </div>
    );
};

export default GridItem;
