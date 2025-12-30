"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Scissors, ArrowLeft } from "lucide-react";

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Fond dégradé */}
      <div className="absolute inset-0 bg-gradient-to-br from-ateliya-pale via-teal-50 to-white"></div>

      {/* Formes décoratives */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-ateliya-ice/30 rounded-full transform translate-x-32 -translate-y-32 blur-3xl"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-ateliya-soft/40 rounded-full blur-2xl"></div>

      {/* Barre turquoise foncée en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-r from-teal-900 via-teal-800 to-teal-950"></div>

      {/* Carte */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/80 p-8 sm:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 flex items-center justify-center shadow-lg shadow-teal-800/30">
              <Scissors className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Titre */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-teal-800">
              Réinitialiser le mot de passe
            </h2>
            <p className="text-sm text-teal-600 mt-1">
              {isSubmitted
                ? "Vérifiez votre boîte mail"
                : "Entrez votre email pour recevoir un lien"}
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-teal-700">
                Un email a été envoyé avec les instructions pour réinitialiser
                votre mot de passe.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-ateliya-primary hover:text-ateliya-dark font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour à la connexion
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl text-white font-medium bg-teal-700 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed"
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
                    Envoi...
                  </span>
                ) : (
                  "Envoyer le lien"
                )}
              </button>

              <div className="text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-sm font-medium text-ateliya-primary hover:text-ateliya-dark transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Retour à la connexion
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
