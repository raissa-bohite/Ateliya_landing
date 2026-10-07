import { Scissors } from "lucide-react";
import { cn } from "@/lib/utils";

// Ligne de piqûre (surpiqûre couture) : des tirets réguliers évoquant une
// couture à la machine. Le dégradé répété dessine les points de façon nette.
const STITCH: React.CSSProperties = {
  backgroundImage:
    "repeating-linear-gradient(to right, var(--color-gold) 0 9px, transparent 9px 16px)",
};

interface StitchDividerProps {
  /** Affiche une paire de ciseaux (motif « trait de découpe »). */
  withScissors?: boolean;
  /** « center » : deux brins autour du centre. « left » : un brin aligné à gauche. */
  align?: "center" | "left";
  className?: string;
  /** Largeur max d'un brin de couture. */
  lineClassName?: string;
}

export function StitchDivider({
  withScissors = false,
  align = "center",
  className,
  lineClassName = "max-w-[120px]",
}: StitchDividerProps) {
  if (align === "left") {
    return (
      <div
        className={cn("flex items-center gap-3", className)}
        aria-hidden="true"
      >
        <span className={cn("h-px w-16", lineClassName)} style={STITCH} />
        {withScissors && (
          <Scissors
            size={16}
            strokeWidth={1.75}
            className="shrink-0 text-gold"
          />
        )}
      </div>
    );
  }

  return (
    <div
      className={cn("flex items-center justify-center gap-3", className)}
      aria-hidden="true"
    >
      <span className={cn("h-px flex-1", lineClassName)} style={STITCH} />
      {withScissors && (
        <Scissors
          size={16}
          strokeWidth={1.75}
          className="shrink-0 -rotate-90 text-gold"
        />
      )}
      <span className={cn("h-px flex-1", lineClassName)} style={STITCH} />
    </div>
  );
}
