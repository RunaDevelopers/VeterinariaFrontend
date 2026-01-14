import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🎨 MARCA - Brand Colors
        primary: "#2F80ED",
        primaryHover: "#1C6ED5",
        primarySoft: "#EAF2FF",

        secondary: "#27AE60",
        secondaryHover: "#1E8E50",
        secondarySoft: "#EAF8F0",

        accent: "#F2994A",

        // ✅ Estados del Sistema - System States
        success: "#27AE60",
        warning: "#F2C94C",
        error: "#EB5757",
        info: "#2D9CDB",

        // 🟡 Fondos y Superficies - Backgrounds & Surfaces
        background: "#F9F6F1",
        surface: "#FFFFFF",

        // 🔤 Tipografía - Typography
        textPrimary: "#2C2C2C",
        textSecondary: "#5C5C5C",
        textMuted: "#8A8A8A",

        // 🧱 Bordes - Borders
        borderColor: "#DADADA",

        // 🔵 Focus Ring - Accessibility
        focusRing: "#2F80ED",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
}

export default config
