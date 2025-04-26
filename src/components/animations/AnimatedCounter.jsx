import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const AnimatedCounter = ({ value, duration = 2, className = "", prefix = "", suffix = "", decimals = 0 }) => {
   const countRef = useRef(null);
   const [isInView, setIsInView] = useState(false);
   const [displayValue, setDisplayValue] = useState(0);

   // Transform the value to a formatted string
   const formattedValue = () => {
      if (decimals > 0) {
         return prefix + displayValue.toFixed(decimals) + suffix;
      }
      return prefix + Math.round(displayValue).toLocaleString() + suffix;
   };

   // Animate the counter when in view
   useEffect(() => {
      if (!isInView) return;

      let startTime;
      let requestId;

      const startValue = 0;
      const endValue = value;

      const updateCounter = (timestamp) => {
         if (!startTime) startTime = timestamp;

         const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
         const currentValue = startValue + progress * (endValue - startValue);

         setDisplayValue(currentValue);

         if (progress < 1) {
            requestId = requestAnimationFrame(updateCounter);
         }
      };

      requestId = requestAnimationFrame(updateCounter);

      return () => {
         cancelAnimationFrame(requestId);
      };
   }, [isInView, value, duration]);

   // Check if element is in view
   useEffect(() => {
      if (!countRef.current) return;

      const observer = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting) {
               setIsInView(true);
               observer.disconnect();
            }
         },
         { threshold: 0.1 },
      );

      observer.observe(countRef.current);

      return () => {
         if (countRef.current) {
            observer.unobserve(countRef.current);
         }
      };
   }, []);

   return (
      <span ref={countRef} className={className}>
         {formattedValue()}
      </span>
   );
};

export default AnimatedCounter;
