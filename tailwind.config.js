/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],

  darkMode: "class",

  theme: {
    extend: {
      colors: {
        ateliya: {
          // Couleurs principales
          primary: "#34C7B8",
          secondary: "#2BA39F",
          accent: "#1EB5A0",
          light: "#4FD9CC",
          dark: "#0D6B5F",

          // Backgrounds
          background: "#FFFFFF",
          "bg-light": "#F8FAFB",
          "bg-dark": "#0F172A",

          // Text
          text: "#1F2937",
          "text-light": "#6B7280",
          "text-dark": "#F3F4F6",

          // Borders
          border: "#E5E7EB",
          "border-dark": "#1E293B",
        },

        // Couleurs africaines
        africa: {
          gold: "#D4AF37",
          terra: "#B85C38",
          ochre: "#D4A574",
          clay: "#8B6F47",
          sand: "#C9B59A",
          sage: "#6B8E5C",
          burgundy: "#8B3A3A",
          ebony: "#2C2C2C",
        },
      },

      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #34C7B8 0%, #2BA39F 100%)",
        "gradient-accent": "linear-gradient(135deg, #2BA39F 0%, #0D6B5F 100%)",
        "gradient-africa": "linear-gradient(135deg, #B85C38 0%, #D4AF37 100%)",
      },

      animation: {
        // Entrées
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-down": "slideDown 0.6s ease-out",
        "scale-in": "scaleIn 0.5s ease-out",

        // Mouvements continus
        float: "float 3s ease-in-out infinite",
        sway: "sway 4s ease-in-out infinite",
        "bounce-slow": "bounceSlow 3s ease-in-out infinite",

        // Effets
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        bounceSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-1deg)" },
          "50%": { transform: "rotate(1deg)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "1" },
        },
      },

      boxShadow: {
        "glow-primary": "0 0 30px rgba(52, 199, 184, 0.3)",
        "glow-primary-lg": "0 0 50px rgba(52, 199, 184, 0.4)",
        "glow-africa": "0 0 30px rgba(212, 175, 116, 0.3)",
        "glow-africa-lg": "0 0 50px rgba(212, 175, 116, 0.4)",
        soft: "0 10px 30px rgba(0, 0, 0, 0.1)",
        medium: "0 20px 40px rgba(0, 0, 0, 0.15)",
        hard: "0 30px 60px rgba(0, 0, 0, 0.2)",
      },

      spacing: {
        4.5: "1.125rem",
        5.5: "1.375rem",
        6.5: "1.625rem",
      },

      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
      },

      backdropBlur: {
        xs: "2px",
      },

      transitionDuration: {
        250: "250ms",
        350: "350ms",
      },
    },
  },

  plugins: [
    // Text gradients
    function ({ addUtilities }) {
      addUtilities({
        ".text-gradient-primary": {
          background: "linear-gradient(135deg, #34C7B8 0%, #4FD9CC 100%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
        },
        ".text-gradient-africa": {
          background: "linear-gradient(135deg, #B85C38 0%, #D4AF37 100%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
        },
        ".text-gradient-earth": {
          background: "linear-gradient(135deg, #8B6F47 0%, #D4A574 100%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
        },
      });
    },
  ],
};
