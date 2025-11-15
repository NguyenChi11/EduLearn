import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      lg: "1025px",
      sm: "640px",
      xlg: {
        max: "1024px",
      },
      xsm: {
        max: "639px",
      },
      tablet: {
        min: "640px",
        max: "1024px",
      },
    },
    extend: {
      fontFamily: {
        cocogoose: ["var(--font-nvn-cocogoose)", "sans-serif"],
        gtEesti: ["var(--font-gt-eesti)", "sans-serif"],
        geist: ["var(--font-geist-sans)", "sans-serif"],
        philosopher: ["var(--font-philosopher)"],
        bricolage: ["var(--font-bricolage-grotesque)"],
      },
    },
  },
};
export default config;
