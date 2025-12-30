"use client";

import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  showInfo?: boolean;
  className?: string;
}

export function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  showInfo = true,
  className,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Générer les numéros de page à afficher
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      // Afficher toutes les pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Toujours afficher la première page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Pages autour de la page courante
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Toujours afficher la dernière page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-ateliya-soft",
        className
      )}
    >
      {/* Info */}
      {showInfo && (
        <p className="text-sm text-teal-600">
          Affichage de{" "}
          <span className="font-semibold text-teal-800">{startItem}</span> à{" "}
          <span className="font-semibold text-teal-800">{endItem}</span> sur{" "}
          <span className="font-semibold text-teal-800">{totalItems}</span>{" "}
          résultats
        </p>
      )}

      {/* Boutons */}
      <div className="flex items-center gap-1">
        {/* Première page */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="h-8 w-8 text-teal-600 hover:bg-ateliya-ice hover:text-teal-800 disabled:opacity-50"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        {/* Page précédente */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8 text-teal-600 hover:bg-ateliya-ice hover:text-teal-800 disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Numéros de page */}
        <div className="flex items-center gap-1 mx-1">
          {getPageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {page === "..." ? (
                <span className="px-2 text-teal-400">...</span>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onPageChange(page as number)}
                  className={cn(
                    "h-8 w-8 text-sm font-medium transition-all",
                    currentPage === page
                      ? "bg-teal-700 text-white hover:bg-teal-600"
                      : "text-teal-600 hover:bg-ateliya-ice hover:text-teal-800"
                  )}
                >
                  {page}
                </Button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Page suivante */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 text-teal-600 hover:bg-ateliya-ice hover:text-teal-800 disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Dernière page */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 text-teal-600 hover:bg-ateliya-ice hover:text-teal-800 disabled:opacity-50"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
