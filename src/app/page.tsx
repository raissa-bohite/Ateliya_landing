import { Header } from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Workflow } from "@/components/sections/workflow";
import { ClosingSections } from "@/components/sections/closing";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <Workflow />
        <ClosingSections />
      </main>
    </>
  );
}
