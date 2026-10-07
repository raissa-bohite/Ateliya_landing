import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-primary-dark px-5 py-6 text-sm text-white/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-white/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Ateliya. Tous droits réservés.</p>
        <nav aria-label="Liens de pied de page" className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/fonctionnalites" className="transition-colors hover:text-white">Fonctionnalités</Link>
          <Link href="/tarifs" className="transition-colors hover:text-white">Tarifs</Link>
          <Link href="/contact" className="transition-colors hover:text-white">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
