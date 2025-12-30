"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  variant?: "default" | "gradient" | "light";
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

const sizeClasses = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-[95vw] h-[90vh]",
};

const headerVariants = {
  default: "bg-white border-b border-ateliya-soft",
  gradient: "bg-gradient-to-r from-teal-700 to-teal-800 text-white",
  light: "bg-ateliya-pale border-b border-ateliya-soft",
};

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  variant = "default",
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
}: ModalProps) {
  // Fermer avec Escape
  useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose, closeOnEscape]);

  // Bloquer le scroll du body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-teal-900/40 backdrop-blur-sm animate-fade-in"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      {/* Modal */}
      <div
        className={cn(
          "relative bg-white rounded-2xl shadow-2xl w-full mx-4 animate-scale-in flex flex-col",
          sizeClasses[size],
          size === "full" ? "overflow-hidden" : "max-h-[90vh]"
        )}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div
            className={cn(
              "flex items-center justify-between px-6 py-4 rounded-t-2xl flex-shrink-0",
              headerVariants[variant]
            )}
          >
            <div>
              {title && (
                <h2
                  className={cn(
                    "text-lg font-semibold",
                    variant === "gradient" ? "text-white" : "text-teal-800"
                  )}
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  className={cn(
                    "text-sm mt-0.5",
                    variant === "gradient" ? "text-teal-100" : "text-teal-600"
                  )}
                >
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  variant === "gradient"
                    ? "hover:bg-white/20 text-white"
                    : "hover:bg-ateliya-ice text-teal-600"
                )}
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-4 overflow-y-auto flex-1 scrollbar-ateliya">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-ateliya-soft bg-ateliya-pale/50 rounded-b-2xl flex-shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// Composant pour les boutons du footer
interface ModalFooterButtonsProps {
  onCancel?: () => void;
  onConfirm?: () => void;
  cancelText?: string;
  confirmText?: string;
  confirmVariant?: "default" | "destructive";
  isLoading?: boolean;
  disabled?: boolean;
}

export function ModalFooterButtons({
  onCancel,
  onConfirm,
  cancelText = "Annuler",
  confirmText = "Confirmer",
  confirmVariant = "default",
  isLoading = false,
  disabled = false,
}: ModalFooterButtonsProps) {
  return (
    <div className="flex items-center justify-end gap-3">
      {onCancel && (
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="border-ateliya-soft text-teal-700 hover:bg-ateliya-ice"
        >
          {cancelText}
        </Button>
      )}
      {onConfirm && (
        <Button
          type="button"
          onClick={onConfirm}
          disabled={disabled || isLoading}
          className={cn(
            confirmVariant === "destructive"
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-teal-700 hover:bg-teal-600 text-white"
          )}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
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
              Chargement...
            </span>
          ) : (
            confirmText
          )}
        </Button>
      )}
    </div>
  );
}
