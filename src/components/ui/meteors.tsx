"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteors = new Array(number || 10).fill(true);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {meteors.map((el, idx) => {
        const meteorCount = number || 10;
        // Calculate random position for meteor effect
        const leftPosition = Math.random() * 50; // Random horizontal position
        const topPosition = Math.random() * 75; // Random vertical position

        return (
          <span
            key={"meteor" + idx}
            className={cn(
              "animate-meteor-effect absolute h-0.5 w-0.5 rounded-[9999px] bg-blue-400 shadow-[0_0_0_1px_#ffffff10]",
              "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-[#3b82f6] before:to-transparent before:content-['']",
              className,
            )}
              style={{
                top: topPosition + "%",
                left: leftPosition + "%",
                animationDelay: Math.random() * 5 + "s", // Random delay between 0-5s
                animationDuration: "5s", // Fixed 5s duration to match your animation
              }}
          ></span>
        );
      })}
    </div>
  );
};
