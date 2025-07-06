import React from "react";

interface BackgroundPatternProps {
  className?: string;
  opacity?: number;
  size?: string;
  color?: string;
}

const BackgroundPattern: React.FC<BackgroundPatternProps> = ({
  className = "",
  opacity = 0.9,
  size = "16px 16px",
  color = "currentColor",
}) => {
  return (
    <div
      className={`absolute inset-0 -z-10 text-neutral-300 dark:text-neutral-800 ${className}`}
      style={{
        backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
        backgroundSize: size,
        opacity,
      }}
    />
  );
};

export default BackgroundPattern;
