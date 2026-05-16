/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],

  darkMode: "class",

  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "Inter", "sans-serif"],
        serif: ["Fraunces", "serif"],
      },
      colors: {
        ateliya: {
          // Couleurs principales
          primary: "#2FAFA4",
          secondary: "#257F78",
          accent: "#9A7B4F",
          light: "#CFECE8",
          dark: "#123F3B",

          // Backgrounds
          background: "#FFFEFB",
          "bg-light": "#F7F5EF",
          "bg-dark": "#111918",

          // Text
          text: "#26312F",
          "text-light": "#68706E",
          "text-dark": "#F5F2EA",

          // Borders
          border: "#E8E2D8",
          "border-dark": "#263A36",
        },

        // Couleurs africaines
        africa: {
          gold: "#B99752",
          terra: "#9E5A40",
          ochre: "#C8A474",
          clay: "#766247",
          sand: "#D8CCB8",
          sage: "#6F8068",
          burgundy: "#7A3E3C",
          ebony: "#242522",
        },
      },

      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #2FAFA4 0%, #257F78 100%)",
        "gradient-accent": "linear-gradient(135deg, #9A7B4F 0%, #257F78 100%)",
        "gradient-africa": "linear-gradient(135deg, #9E5A40 0%, #B99752 100%)",
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
        "glow-primary": "0 12px 32px rgba(37, 127, 120, 0.14)",
        "glow-primary-lg": "0 18px 44px rgba(37, 127, 120, 0.2)",
        "glow-africa": "0 12px 32px rgba(154, 123, 79, 0.14)",
        "glow-africa-lg": "0 18px 44px rgba(154, 123, 79, 0.2)",
        soft: "0 10px 30px rgba(18, 63, 59, 0.08)",
        medium: "0 20px 40px rgba(18, 63, 59, 0.12)",
        hard: "0 30px 60px rgba(18, 63, 59, 0.16)",
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
          background: "linear-gradient(135deg, #257F78 0%, #2FAFA4 100%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
        },
        ".text-gradient-africa": {
          background: "linear-gradient(135deg, #9E5A40 0%, #B99752 100%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
        },
        ".text-gradient-earth": {
          background: "linear-gradient(135deg, #766247 0%, #C8A474 100%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
        },
      });
    },
  ],
};
