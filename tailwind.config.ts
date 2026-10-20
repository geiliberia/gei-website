import type { Config } from "tailwindcss";

// Brand colours sampled from the GEI logo:
//  forest = dark leaf/figure green, leaf = arc green, sun = orange ring.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: "#0B4A2A", deep: "#07331D" },
        leaf: "#0AA050",
        sun: { DEFAULT: "#F07C1E", soft: "#FFA04D" },
        mist: "#EDF3EE",
        paper: "#FAFBF9",
        ink: "#13231A",
      },
      fontFamily: {
        display: ['"Zilla Slab"', "Rockwell", "Georgia", "serif"],
        sans: ['"Public Sans Variable"', "system-ui", "Segoe UI", "Arial", "sans-serif"],
      },
      maxWidth: { prose: "62ch" },
    },
  },
  plugins: [],
};
export default config;
