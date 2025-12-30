"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingBag,
  Wallet,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shirt,
  Calendar,
  Scissors,
  Box,
  Truck,
  CreditCard,
  Receipt,
  UserCog,
  Palette,
} from "lucide-react";

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { title: string; path: string }[];
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isCollapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

export default function Sidebar({
  isOpen,
  onToggle,
  isCollapsed,
  onCollapsedChange,
}: SidebarProps) {
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: "/dashboard",
    },
    {
      title: "Commandes",
      icon: <ShoppingBag className="w-5 h-5" />,
      subItems: [
        { title: "Toutes les commandes", path: "/commandes" },
        { title: "Nouvelle commande", path: "/commandes/nouvelle" },
        { title: "En cours", path: "/commandes/en-cours" },
        { title: "Terminées", path: "/commandes/terminees" },
      ],
    },
    {
      title: "Clients",
      icon: <Users className="w-5 h-5" />,
      subItems: [
        { title: "Liste clients", path: "/clients" },
        { title: "Mesures", path: "/clients/mesures" },
      ],
    },
    {
      title: "Catalogue",
      icon: <Shirt className="w-5 h-5" />,
      subItems: [
        { title: "Modèles", path: "/catalogue" },
        { title: "Catégories", path: "/catalogue/categories" },
      ],
    },
    {
      title: "Stocks",
      icon: <Package className="w-5 h-5" />,
      subItems: [
        { title: "Tissus", path: "/stocks/tissus" },
        { title: "Fournitures", path: "/stocks/fournitures" },
        { title: "Fournisseurs", path: "/stocks/fournisseurs" },
      ],
    },
    {
      title: "Planning",
      icon: <Calendar className="w-5 h-5" />,
      path: "/planning",
    },
    {
      title: "Finances",
      icon: <Wallet className="w-5 h-5" />,
      subItems: [
        { title: "Paiements", path: "/finances/paiements" },
        { title: "Dépenses", path: "/finances/depenses" },
        { title: "Factures", path: "/finances/factures" },
      ],
    },
    {
      title: "Équipe",
      icon: <UserCog className="w-5 h-5" />,
      path: "/equipe",
    },
    {
      title: "Rapports",
      icon: <BarChart3 className="w-5 h-5" />,
      path: "/rapports",
    },
    {
      title: "Paramètres",
      icon: <Settings className="w-5 h-5" />,
      subItems: [
        { title: "Général", path: "/parametres" },
        { title: "Types de vêtements", path: "/parametres/types-vetements" },
        { title: "Étapes production", path: "/parametres/etapes" },
        { title: "Tarification", path: "/parametres/tarification" },
      ],
    },
  ];

  // Ouvrir automatiquement le menu parent si un sous-item est actif
  useEffect(() => {
    const shouldOpenMenus: string[] = [];
    menuItems.forEach((item) => {
      if (
        item.subItems &&
        item.subItems.some((subItem) => pathname === subItem.path)
      ) {
        shouldOpenMenus.push(item.title);
      }
    });
    if (shouldOpenMenus.length > 0) {
      setOpenMenus(shouldOpenMenus);
    }
  }, [pathname]);

  const toggleMenu = (title: string) => {
    if (isCollapsed) {
      onCollapsedChange(false);
      setTimeout(() => {
        setOpenMenus([title]);
      }, 150);
    } else {
      setOpenMenus((prev) =>
        prev.includes(title)
          ? prev.filter((item) => item !== title)
          : [...prev, title]
      );
    }
  };

  const toggleCollapse = () => {
    onCollapsedChange(!isCollapsed);
    if (!isCollapsed) {
      setOpenMenus([]);
    }
  };

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + "/");
  };

  const isParentActive = (item: MenuItem) => {
    if (item.path) {
      return isActive(item.path);
    }
    if (item.subItems) {
      return item.subItems.some((subItem) => pathname === subItem.path);
    }
    return false;
  };

  const isSubItemActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-teal-900/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-full bg-gradient-to-b from-ateliya-pale via-white to-ateliya-pale/30 shadow-2xl shadow-teal-900/10 z-50 transition-all duration-300 ease-in-out border-r border-ateliya-soft
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${isCollapsed ? "w-20" : "w-64"}
      `}
      >
        {/* Logo Section */}
        <div className="p-4 border-b border-ateliya-soft bg-gradient-to-r from-white via-ateliya-pale to-white backdrop-blur-sm">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 flex items-center justify-center shadow-lg shadow-teal-800/30">
                  <Scissors className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-teal-800">Ateliya</h1>
                  <p className="text-xs text-teal-600">Gestion d'atelier</p>
                </div>
              </div>
            )}
            {isCollapsed && (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 flex items-center justify-center shadow-lg shadow-teal-800/30 mx-auto">
                <Scissors className="w-6 h-6 text-white" />
              </div>
            )}
            {/* Close button for mobile */}
            <button
              onClick={onToggle}
              className="lg:hidden p-2 rounded-lg hover:bg-ateliya-ice transition-colors"
            >
              <svg
                className="w-5 h-5 text-teal-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Collapse Toggle Button - Desktop only */}
        <div className="hidden lg:block absolute -right-3 top-20 z-10">
          <button
            onClick={toggleCollapse}
            className="bg-white hover:bg-ateliya-pale text-teal-600 hover:text-teal-800 p-1.5 rounded-full shadow-lg shadow-teal-800/20 border-2 border-ateliya-soft transition-all duration-200 hover:scale-110 hover:border-teal-600"
            title={isCollapsed ? "Étendre le menu" : "Réduire le menu"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav
          className={`p-3 space-y-1 overflow-y-auto h-[calc(100vh-180px)] scrollbar-ateliya ${
            isCollapsed ? "overflow-x-hidden" : ""
          }`}
        >
          {menuItems.map((item) => (
            <div key={item.title}>
              {item.path ? (
                <Link
                  href={item.path}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      onToggle();
                    }
                  }}
                  className={`
                    flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative
                    ${
                      isActive(item.path)
                        ? "bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg shadow-teal-600/30"
                        : "text-teal-800 hover:bg-ateliya-ice hover:text-teal-700"
                    }
                    ${isCollapsed ? "justify-center" : ""}
                  `}
                  title={isCollapsed ? item.title : ""}
                >
                  <div
                    className={`${
                      isActive(item.path)
                        ? "text-white"
                        : "text-teal-600 group-hover:text-teal-700"
                    } flex-shrink-0`}
                  >
                    {item.icon}
                  </div>
                  {!isCollapsed && (
                    <>
                      <span className="font-medium text-sm">{item.title}</span>
                      {isActive(item.path) && (
                        <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full shadow-lg"></div>
                      )}
                    </>
                  )}
                  {isCollapsed && isActive(item.path) && (
                    <div className="absolute right-1 w-1 h-6 bg-teal-600 rounded-full shadow-lg"></div>
                  )}
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => toggleMenu(item.title)}
                    className={`
                      w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group relative
                      ${
                        isParentActive(item)
                          ? "bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-teal-600/30"
                          : openMenus.includes(item.title)
                          ? "bg-ateliya-ice text-teal-800"
                          : "text-teal-800 hover:bg-ateliya-ice hover:text-teal-700"
                      }
                      ${isCollapsed ? "justify-center" : ""}
                    `}
                    title={isCollapsed ? item.title : ""}
                  >
                    <div
                      className={`flex items-center space-x-3 ${
                        isCollapsed ? "" : "flex-1"
                      }`}
                    >
                      <div
                        className={`${
                          isParentActive(item)
                            ? "text-white"
                            : openMenus.includes(item.title)
                            ? "text-teal-700"
                            : "text-teal-600 group-hover:text-teal-700"
                        } flex-shrink-0`}
                      >
                        {item.icon}
                      </div>
                      {!isCollapsed && (
                        <span className="font-medium text-sm">
                          {item.title}
                        </span>
                      )}
                    </div>
                    {!isCollapsed && (
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ${
                          openMenus.includes(item.title) ? "rotate-180" : ""
                        } ${
                          isParentActive(item) ? "text-white" : "text-teal-500"
                        }`}
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
                    )}
                    {isCollapsed && isParentActive(item) && (
                      <div className="absolute right-1 w-1 h-6 bg-teal-600 rounded-full shadow-lg"></div>
                    )}
                  </button>
                  {!isCollapsed &&
                    openMenus.includes(item.title) &&
                    item.subItems && (
                      <div className="mt-1 ml-3 pl-3 border-l-2 border-ateliya-light space-y-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.path}
                            href={subItem.path}
                            onClick={() => {
                              if (window.innerWidth < 1024) {
                                onToggle();
                              }
                            }}
                            className={`
                            block px-3 py-2 text-sm rounded-lg transition-all duration-200
                            ${
                              isSubItemActive(subItem.path)
                                ? "bg-gradient-to-r from-ateliya-light to-ateliya-soft text-teal-800 font-semibold shadow-sm"
                                : "text-teal-700 hover:bg-ateliya-pale hover:text-teal-800"
                            }
                          `}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                </>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom Section - User */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-ateliya-soft bg-gradient-to-r from-white via-ateliya-pale to-white backdrop-blur-sm">
          {!isCollapsed ? (
            <div className="flex items-center space-x-3 p-2.5 bg-gradient-to-r from-ateliya-ice to-ateliya-pale rounded-xl border border-ateliya-soft hover:shadow-md hover:border-teal-400 transition-all duration-200 cursor-pointer">
              <div className="w-9 h-9 bg-gradient-to-br from-teal-600 to-teal-800 rounded-full flex items-center justify-center shadow-lg shadow-teal-800/30 flex-shrink-0">
                <span className="text-white text-sm font-semibold">AT</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-teal-800 truncate">
                  Mon Atelier
                </p>
                <p className="text-xs text-teal-600 truncate">Administrateur</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-9 h-9 bg-gradient-to-br from-teal-600 to-teal-800 rounded-full flex items-center justify-center shadow-lg shadow-teal-800/30 cursor-pointer hover:scale-110 transition-transform">
                <span className="text-white text-sm font-semibold">AT</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
