/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  
  darkMode: 'class', // Activer dark mode avec classe

  theme: {
    extend: {
      // ===== COULEURS =====
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
        
        // Couleurs futuristes
        cyber: {
          neon: "#00FFFF",
          electric: "#00FF41",
          plasma: "#FF0080",
          void: "#0A0A0A",
          steel: "#2D3748",
          chrome: "#E2E8F0",
          hologram: "#9F7AEA",
        },
        
        // Couleurs néon
        neon: {
          blue: "#00D4FF",
          green: "#39FF14",
          pink: "#FF10F0",
          purple: "#BF00FF",
          orange: "#FF6600",
          yellow: "#FFFF00",
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

      // ===== GRADIENTS =====
      backgroundImage: {
        // Gradients Ateliya
        "gradient-primary": "linear-gradient(135deg, #34C7B8 0%, #2BA39F 100%)",
        "gradient-primary-dark": "linear-gradient(135deg, #34C7B8 0%, #1EB5A0 100%)",
        "gradient-accent": "linear-gradient(135deg, #2BA39F 0%, #0D6B5F 100%)",
        "gradient-glow": "radial-gradient(circle, rgba(52, 199, 184, 0.15) 0%, transparent 70%)",
        
        // Gradients Africa
        "gradient-africa": "linear-gradient(135deg, #B85C38 0%, #D4AF37 100%)",
        "gradient-africa-earth": "linear-gradient(135deg, #8B6F47 0%, #D4A574 100%)",
        "gradient-blend": "linear-gradient(135deg, #34C7B8 0%, #8B6F47 50%, #D4AF37 100%)",
        
        // Gradients futuristes
        "gradient-cyber": "linear-gradient(135deg, #00FFFF 0%, #00FF41 100%)",
        "gradient-neon": "linear-gradient(135deg, #FF10F0 0%, #00D4FF 100%)",
        "gradient-hologram": "linear-gradient(45deg, #9F7AEA 0%, #00FFFF 25%, #FF10F0 50%, #39FF14 75%, #00D4FF 100%)",
        "gradient-matrix": "linear-gradient(180deg, #0A0A0A 0%, #001100 50%, #003300 100%)",
        "gradient-plasma": "radial-gradient(ellipse at center, #FF0080 0%, #00FFFF 50%, #9F7AEA 100%)",
        "gradient-void": "radial-gradient(circle at center, transparent 0%, #0A0A0A 70%)",
      },

      // ===== ANIMATIONS =====
      animation: {
        // Entrées
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-down": "slideDown 0.6s ease-out",
        "scale-in": "scaleIn 0.5s ease-out",
        
        // Mouvements continus
        "float": "float 3s ease-in-out infinite",
        "sway": "sway 4s ease-in-out infinite",
        "bounce-slow": "bounceSlow 3s ease-in-out infinite",
        
        // Effets
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
        
        // Animations futuristes
        "neon-pulse": "neonPulse 2s ease-in-out infinite",
        "cyber-glitch": "cyberGlitch 3s ease-in-out infinite",
        "hologram-shift": "hologramShift 4s linear infinite",
        "matrix-rain": "matrixRain 20s linear infinite",
        "energy-flow": "energyFlow 3s ease-in-out infinite",
        "scan-line": "scanLine 2s linear infinite",
        "data-stream": "dataStream 5s linear infinite",
        "quantum-flicker": "quantumFlicker 1.5s ease-in-out infinite",
      },

      // ===== KEYFRAMES =====
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
        
        // Keyframes futuristes
        neonPulse: {
          "0%, 100%": { 
            boxShadow: "0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor",
            opacity: "1"
          },
          "50%": { 
            boxShadow: "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor",
            opacity: "0.8"
          },
        },
        cyberGlitch: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%": { transform: "translateX(-2px)" },
          "20%": { transform: "translateX(2px)" },
          "30%": { transform: "translateX(-1px)" },
          "40%": { transform: "translateX(1px)" },
          "50%": { transform: "translateX(0)" },
        },
        hologramShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        matrixRain: {
          "0%": { transform: "translateY(-100vh)" },
          "100%": { transform: "translateY(100vh)" },
        },
        energyFlow: {
          "0%, 100%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(100%)" },
        },
        scanLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        dataStream: {
          "0%": { transform: "translateX(-100%) skewX(-15deg)" },
          "100%": { transform: "translateX(100vw) skewX(-15deg)" },
        },
        quantumFlicker: {
          "0%, 100%": { opacity: "1" },
          "25%": { opacity: "0.3" },
          "50%": { opacity: "0.8" },
          "75%": { opacity: "0.1" },
        },
      },

      // ===== SHADOWS =====
      boxShadow: {
        "glow-primary": "0 0 30px rgba(52, 199, 184, 0.3)",
        "glow-primary-lg": "0 0 50px rgba(52, 199, 184, 0.4)",
        "glow-africa": "0 0 30px rgba(212, 175, 116, 0.3)",
        "glow-africa-lg": "0 0 50px rgba(212, 175, 116, 0.4)",
        "soft": "0 10px 30px rgba(0, 0, 0, 0.1)",
        "medium": "0 20px 40px rgba(0, 0, 0, 0.15)",
        "hard": "0 30px 60px rgba(0, 0, 0, 0.2)",
        
        // Shadows futuristes
        "neon-cyan": "0 0 20px #00FFFF, 0 0 40px #00FFFF, 0 0 60px #00FFFF",
        "neon-green": "0 0 20px #39FF14, 0 0 40px #39FF14, 0 0 60px #39FF14",
        "neon-pink": "0 0 20px #FF10F0, 0 0 40px #FF10F0, 0 0 60px #FF10F0",
        "neon-purple": "0 0 20px #BF00FF, 0 0 40px #BF00FF, 0 0 60px #BF00FF",
        "cyber-glow": "0 0 30px rgba(0, 255, 255, 0.5), inset 0 0 30px rgba(0, 255, 255, 0.1)",
        "hologram": "0 0 40px rgba(159, 122, 234, 0.6), 0 0 80px rgba(159, 122, 234, 0.3)",
        "energy": "0 0 25px rgba(57, 255, 20, 0.8), 0 0 50px rgba(57, 255, 20, 0.4)",
      },

      // ===== SPACING =====
      spacing: {
        4.5: "1.125rem",
        5.5: "1.375rem",
        6.5: "1.625rem",
      },

      // ===== BORDER RADIUS =====
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
      },

      // ===== BACKDROP BLUR =====
      backdropBlur: {
        xs: "2px",
      },

      // ===== TRANSITIONS =====
      transitionDuration: {
        250: "250ms",
        350: "350ms",
      },
    },
  },

  // ===== PLUGINS =====
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