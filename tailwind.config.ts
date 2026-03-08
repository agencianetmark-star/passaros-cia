import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        border: "hsl(var(--border))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        accent: "hsl(var(--accent))"
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        soft: "0 8px 30px rgba(16, 24, 40, 0.08)",
        card: "0 2px 10px rgba(16, 24, 40, 0.06)"
      },
      backgroundImage: {
        "gold-glow": "radial-gradient(circle at 20% 0%, rgba(205, 162, 81, 0.16), transparent 50%)",
        "blue-wave":
          "radial-gradient(circle at 90% 10%, rgba(43, 88, 168, 0.12), transparent 42%), linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)"
      }
    }
  },
  plugins: []
};

export default config;
