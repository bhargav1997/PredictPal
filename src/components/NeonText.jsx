import React from "react";
import { motion } from "framer-motion";

const NeonText = ({
   children,
   color = "text-neon-blue",
   shadow = "shadow-neon-blue",
   className = "",
   element = "span",
   animate = false,
   delay = 0,
   pulseDuration = 2,
   pulseIntensity = "medium",
}) => {
   const Component = motion[element];

   // Base text shadow for different intensities
   const shadowIntensities = {
      low: "0 0 2px currentColor, 0 0 5px currentColor",
      medium: "0 0 5px currentColor, 0 0 10px currentColor",
      high: "0 0 7px currentColor, 0 0 15px currentColor, 0 0 20px currentColor",
   };

   // Get the base shadow based on intensity
   const baseShadow = shadowIntensities[pulseIntensity] || shadowIntensities.medium;

   // Animation variants
   const variants = {
      initial: {
         opacity: 0.7,
         textShadow: shadowIntensities.low,
      },
      animate: {
         opacity: 1,
         textShadow: shadowIntensities.high,
      },
      static: {
         opacity: 1,
         textShadow: baseShadow,
      },
   };

   return (
      <Component
         className={`${color} ${shadow} ${className}`}
         initial={animate ? "initial" : "static"}
         animate={animate ? "animate" : "static"}
         variants={variants}
         transition={
            animate
               ? {
                    opacity: {
                       duration: pulseDuration / 2,
                       repeat: Infinity,
                       repeatType: "reverse",
                       ease: "easeInOut",
                       delay,
                    },
                    textShadow: {
                       duration: pulseDuration / 2,
                       repeat: Infinity,
                       repeatType: "reverse",
                       ease: "easeInOut",
                       delay,
                    },
                 }
               : {}
         }
         style={{
            textShadow: animate ? undefined : baseShadow,
         }}>
         {children}
      </Component>
   );
};

export default NeonText;
