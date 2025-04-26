/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            primary: {
               50: "#EEF5FF",
               100: "#D5E5FF",
               200: "#B3D1FF",
               300: "#80B3FF",
               400: "#4D94FF",
               500: "#3B82F6", // Main primary
               600: "#2563EB",
               700: "#1D4ED8",
               800: "#1E40AF",
               900: "#1E3A8A",
               950: "#172554",
            },
            secondary: {
               50: "#ECFDF5",
               100: "#D1FAE5",
               200: "#A7F3D0",
               300: "#6EE7B7",
               400: "#34D399",
               500: "#10B981", // Main secondary
               600: "#059669",
               700: "#047857",
               800: "#065F46",
               900: "#064E3B",
               950: "#022C22",
            },
            accent: {
               50: "#FFF7ED",
               100: "#FFEDD5",
               200: "#FED7AA",
               300: "#FDBA74",
               400: "#FB923C",
               500: "#F59E0B", // Main accent
               600: "#EA580C",
               700: "#C2410C",
               800: "#9A3412",
               900: "#7C2D12",
               950: "#431407",
            },
            neon: {
               pink: "#FF00FF",
               blue: "#00FFFF",
               green: "#39FF14",
               purple: "#9D00FF",
               yellow: "#FFFF00",
            },
            danger: "#EF4444",
            dark: "#0F172A",
            light: "#F8FAFC",
         },
         backgroundImage: {
            "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            "glass-gradient": "linear-gradient(to right bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
         },
         animation: {
            "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            float: "float 3s ease-in-out infinite",
            "spin-slow": "spin 3s linear infinite",
            "bounce-slow": "bounce 3s infinite",
            glow: "glow 2s ease-in-out infinite alternate",
         },
         keyframes: {
            float: {
               "0%, 100%": { transform: "translateY(0)" },
               "50%": { transform: "translateY(-10px)" },
            },
            glow: {
               "0%": { boxShadow: "0 0 5px rgba(59, 130, 246, 0.5)" },
               "100%": { boxShadow: "0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.6)" },
            },
         },
         boxShadow: {
            "neon-blue": "0 0 5px #00FFFF, 0 0 10px #00FFFF",
            "neon-pink": "0 0 5px #FF00FF, 0 0 10px #FF00FF",
            "neon-purple": "0 0 5px #9D00FF, 0 0 10px #9D00FF",
            "neon-green": "0 0 5px #39FF14, 0 0 10px #39FF14",
            glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
         },
         backdropBlur: {
            xs: "2px",
         },
      },
   },
   plugins: [],
};
