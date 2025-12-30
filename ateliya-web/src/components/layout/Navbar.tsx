"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Search,
  Menu,
  Settings,
  User,
  LogOut,
  HelpCircle,
} from "lucide-react";

interface NavbarProps {
  onMenuToggle: () => void;
}

export default function Navbar({ onMenuToggle }: NavbarProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "Commande CMD-2025-001 à livrer demain",
      time: "Il y a 2 heures",
    },
    {
      id: 2,
      title: "Stock tissu Wax Bleu bas (2m restants)",
      time: "Il y a 5 heures",
    },
    { id: 3, title: "Nouveau client inscrit : Mme Koné", time: "Hier" },
  ];

  return (
    <nav className="bg-gradient-to-r from-white via-ateliya-pale to-white border-b border-ateliya-soft shadow-sm backdrop-blur-sm w-full sticky top-0 z-40">
      <div className="px-4 sm:px-6 h-16 flex items-center justify-between w-full">
        {/* Left side - Burger Menu & Search */}
        <div className="flex items-center space-x-3">
          {/* Burger Menu - Mobile */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-xl hover:bg-ateliya-ice transition-all duration-200 hover:shadow-sm"
          >
            <Menu className="w-6 h-6 text-teal-600" />
          </button>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-teal-500" />
              <input
                type="text"
                placeholder="Rechercher commande, client..."
                className="pl-10 pr-4 py-2 w-64 lg:w-80 bg-ateliya-pale border border-ateliya-soft rounded-xl text-sm text-teal-900 placeholder-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 focus:bg-white transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Search Icon - Mobile only */}
          <button className="md:hidden p-2 rounded-xl hover:bg-ateliya-ice transition-all duration-200 hover:shadow-sm">
            <Search className="w-5 h-5 text-teal-600" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-xl hover:bg-ateliya-ice transition-all duration-200 hover:shadow-sm group"
            >
              <Bell className="w-5 h-5 text-teal-600 group-hover:text-teal-700" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-br from-red-400 to-red-600 rounded-full border-2 border-white shadow-lg"></span>
            </button>

            {notificationsOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setNotificationsOpen(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl py-2 z-50 border border-ateliya-soft animate-scale-in">
                  <div className="px-4 py-3 border-b border-ateliya-soft bg-gradient-to-r from-ateliya-pale to-transparent">
                    <h3 className="text-sm font-bold text-teal-800">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="px-4 py-3 hover:bg-ateliya-pale transition-colors cursor-pointer border-l-4 border-transparent hover:border-teal-600"
                      >
                        <p className="text-sm font-medium text-teal-800">
                          {notif.title}
                        </p>
                        <p className="text-xs text-teal-600 mt-1">
                          {notif.time}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-ateliya-soft bg-ateliya-pale">
                    <button className="text-sm text-teal-600 hover:text-teal-700 font-semibold hover:underline transition-colors">
                      Voir toutes les notifications
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center space-x-2 sm:space-x-3 p-2 pr-3 hover:bg-ateliya-ice rounded-xl transition-all duration-200 hover:shadow-sm"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-teal-600 to-teal-800 rounded-full flex items-center justify-center shadow-lg shadow-teal-800/30 flex-shrink-0">
                <span className="text-white text-sm font-semibold">AT</span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-bold text-teal-800">Mon Atelier</p>
                <p className="text-xs text-teal-600">Administrateur</p>
              </div>
              <svg
                className="w-4 h-4 text-teal-500 flex-shrink-0 hidden sm:block"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {profileOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setProfileOpen(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-white rounded-2xl shadow-xl py-2 z-50 border border-ateliya-soft animate-scale-in">
                  <div className="px-4 py-3 border-b border-ateliya-soft bg-gradient-to-r from-ateliya-pale to-transparent">
                    <p className="text-sm font-bold text-teal-800">
                      Mon Atelier
                    </p>
                    <p className="text-sm text-teal-600">
                      contact@monatelier.com
                    </p>
                  </div>
                  <div className="py-2">
                    <Link href="/profil" onClick={() => setProfileOpen(false)}>
                      <div className="flex items-center space-x-3 w-full px-4 py-2.5 text-sm text-teal-800 hover:bg-ateliya-pale transition-colors cursor-pointer group">
                        <div className="w-8 h-8 rounded-lg bg-ateliya-ice group-hover:bg-ateliya-soft flex items-center justify-center transition-colors">
                          <User className="w-4 h-4 text-teal-600" />
                        </div>
                        <span className="font-medium">Mon Profil</span>
                      </div>
                    </Link>
                    <Link
                      href="/parametres"
                      onClick={() => setProfileOpen(false)}
                    >
                      <div className="flex items-center space-x-3 w-full px-4 py-2.5 text-sm text-teal-800 hover:bg-ateliya-pale transition-colors cursor-pointer group">
                        <div className="w-8 h-8 rounded-lg bg-ateliya-ice group-hover:bg-ateliya-soft flex items-center justify-center transition-colors">
                          <Settings className="w-4 h-4 text-teal-600" />
                        </div>
                        <span className="font-medium">Paramètres</span>
                      </div>
                    </Link>
                    <div className="flex items-center space-x-3 w-full px-4 py-2.5 text-sm text-teal-800 hover:bg-ateliya-pale transition-colors cursor-pointer group">
                      <div className="w-8 h-8 rounded-lg bg-ateliya-ice group-hover:bg-ateliya-soft flex items-center justify-center transition-colors">
                        <HelpCircle className="w-4 h-4 text-teal-600" />
                      </div>
                      <span className="font-medium">Aide & Support</span>
                    </div>
                  </div>
                  <div className="py-2 border-t border-ateliya-soft">
                    <div className="flex items-center space-x-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer group">
                      <div className="w-8 h-8 rounded-lg bg-red-50 group-hover:bg-red-100 flex items-center justify-center transition-colors">
                        <LogOut className="w-4 h-4 text-red-600" />
                      </div>
                      <span className="font-medium">Déconnexion</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
