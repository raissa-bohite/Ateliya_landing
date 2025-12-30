"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Scissors } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation d'authentification
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Fond dégradé */}
      <div className="absolute inset-0 bg-gradient-to-br from-ateliya-pale via-teal-50 to-white"></div>

      {/* Formes décoratives */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-ateliya-ice/30 rounded-full transform translate-x-32 -translate-y-32 blur-3xl"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-ateliya-soft/40 rounded-full blur-2xl"></div>
      <div className="absolute bottom-40 left-10 w-64 h-64 bg-ateliya-light/20 rounded-full blur-2xl"></div>

      {/* Motif Kente subtil */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(
          45deg,
          #53B0B7 0px,
          #53B0B7 2px,
          transparent 2px,
          transparent 20px
        )`,
        }}
      ></div>

      {/* Barre turquoise foncée en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-r from-teal-900 via-teal-800 to-teal-950">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent 0px,
            transparent 40px,
            rgba(255,255,255,0.1) 40px,
            rgba(255,255,255,0.1) 42px
          )`,
          }}
        ></div>
      </div>

      {/* Carte de connexion */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/80 p-8 sm:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 flex items-center justify-center shadow-lg shadow-teal-800/30">
                <Scissors className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-teal-800">Ateliya</h1>
                <p className="text-xs text-teal-600">Gestion d'atelier</p>
              </div>
            </div>
          </div>

          {/* Titre */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-teal-800">Bienvenue</h2>
            <p className="text-sm text-teal-600 mt-1">
              Connectez-vous à votre espace
            </p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-teal-700 mb-2"
              >
                Adresse email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="votre@email.com"
                className="w-full px-4 py-3 rounded-xl border border-ateliya-soft/60 bg-white/60 backdrop-blur-sm placeholder-teal-400 text-teal-800 focus:outline-none focus:ring-2 focus:ring-ateliya-primary/50 focus:border-ateliya-primary focus:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-md hover:border-ateliya-light"
              />
            </div>

            {/* Mot de passe */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-teal-700 mb-2"
              >
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-ateliya-soft/60 bg-white/60 backdrop-blur-sm placeholder-teal-400 text-teal-800 focus:outline-none focus:ring-2 focus:ring-ateliya-primary/50 focus:border-ateliya-primary focus:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-md hover:border-ateliya-light"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-teal-500 hover:text-teal-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-5 h-5 border-2 border-ateliya-soft rounded-md peer-checked:bg-gradient-to-br peer-checked:from-teal-600 peer-checked:to-teal-700 peer-checked:border-teal-600 transition-all duration-200 group-hover:border-teal-400"></div>
                  <svg
                    className="absolute top-0.5 left-0.5 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="ml-2 text-sm text-teal-700 group-hover:text-teal-800">
                  Se souvenir de moi
                </span>
              </label>
              <Link
                href="/reset-password"
                className="text-sm font-medium text-ateliya-primary hover:text-ateliya-dark transition-colors"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Bouton connexion */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl text-white font-medium bg-teal-700 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Connexion...
                </span>
              ) : (
                "Se connecter"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-teal-600">
              Pas encore de compte ?{" "}
              <Link
                href="/register"
                className="font-medium text-ateliya-primary hover:text-ateliya-dark transition-colors"
              >
                Créer un atelier
              </Link>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-xs text-teal-600 mt-6">
          © 2025 Ateliya. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}
