"use client";

import PricingSection from "@/components/abonnement/PricingSection";
import type {
  ModuleBackend,
  PaysOption,
} from "@/lib/services/abonnementService";

export function PricingPlans({
  pays,
  paysChoisiId,
  modules,
}: {
  pays: PaysOption[];
  paysChoisiId?: number;
  modules: ModuleBackend[];
}) {
  return (
    <div className="pricing-ateliya">
      <PricingSection
        initialPays={pays}
        initialPaysChoisiId={paysChoisiId}
        initialModules={modules}
      />
    </div>
  );
}
