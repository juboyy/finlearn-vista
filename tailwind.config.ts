import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
          light: "hsl(var(--success-light))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
          light: "hsl(var(--warning-light))",
        },
        "primary-light": "hsl(var(--primary-light))",
        "secondary-light": "hsl(var(--secondary-light))",
        "accent-light": "hsl(var(--accent-light))",
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        indigo: {
          200: "239 60% 90%",
          300: "239 55% 85%",
          600: "239 55% 50%",
          800: "239 65% 30%",
        },
        sky: {
          200: "204 60% 90%",
          300: "204 55% 85%",
          600: "204 55% 50%",
          800: "204 65% 30%",
        },
        purple: {
          300: "270 10% 97%",
          600: "270 10% 96%",
        },
        pink: {
          100: "326 78% 95%",
          200: "326 78% 90%",
          300: "322 50% 85%",
          600: "322 50% 50%",
          800: "326 65% 30%",
        },
        emerald: {
          100: "hsl(152, 76%, 90%)",
          200: "hsl(152, 76%, 85%)",
          300: "hsl(152, 50%, 85%)",
          600: "hsl(160, 84%, 39%)",
          700: "hsl(160, 84%, 35%)",
          800: "hsl(164, 86%, 20%)",
        },
        amber: {
          100: "48 96% 89%",
          200: "48 96% 83%",
          300: "45 93% 83%",
          600: "44 55% 50%",
          800: "43 96% 30%",
        },
        orange: {
          300: "30 50% 85%",
        },
        yellow: {
          500: "48 96% 53%",
        },
        red: {
          50: "0 86% 97%",
          500: "0 72% 51%",
        },
        slate: {
          50: "hsl(220, 16%, 98%)",
          100: "hsl(220, 14%, 96%)",
          400: "hsl(220, 10%, 50%)",
          600: "hsl(220, 9%, 46%)",
          700: "hsl(220, 13%, 28%)",
          800: "hsl(220, 15%, 20%)",
        },
        pastel: {
          blue: "hsl(var(--pastel-blue))",
          blueBtn: "hsl(var(--pastel-blue-btn))",
          blueText: "hsl(var(--pastel-blue-text))",
          indigo: "hsl(var(--pastel-indigo))",
          purple: "hsl(var(--pastel-purple))",
          purpleBtn: "hsl(var(--pastel-purple-btn))",
          purpleText: "hsl(var(--pastel-purple-text))",
          purpleDark: "hsl(var(--pastel-purple-dark))",
          pink: "hsl(var(--pastel-pink))",
          pinkBtn: "hsl(var(--pastel-pink-btn))",
          pinkText: "hsl(var(--pastel-pink-text))",
          rose: "hsl(var(--pastel-rose))",
          green: "hsl(var(--pastel-green))",
          greenBtn: "hsl(var(--pastel-green-btn))",
          greenText: "hsl(var(--pastel-green-text))",
          yellow: "hsl(var(--pastel-yellow))",
          peach: "hsl(var(--pastel-peach))",
          orange: "hsl(var(--pastel-orange))",
          orangeBtn: "hsl(var(--pastel-orange-btn))",
          orangeText: "hsl(var(--pastel-orange-text))",
          "gray-dark": "hsl(var(--pastel-gray-dark))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "scale-in": {
          "0%": {
            transform: "scale(0.95)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        "loading-bar": {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
        "shimmer": {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
        "gradient": {
          "0%, 100%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "scale-in": "scale-in 0.4s ease-out",
        "loading-bar": "loading-bar 1.5s ease-in-out infinite",
        "shimmer": "shimmer 2s ease-in-out infinite",
        "gradient": "gradient 3s ease infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
