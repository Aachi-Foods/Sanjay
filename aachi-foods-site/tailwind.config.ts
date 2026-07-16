import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        chili: "#B3131B",
        turmeric: "#F2A900",
        cream: "#FFF8ED",
        charcoal: "#241A0F",
        leaf: "#2E6B34",
      },
      fontFamily: {
        display: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "chili-gradient": "linear-gradient(135deg, #B3131B 0%, #7A0D12 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
