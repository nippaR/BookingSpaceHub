import scaleShot from "@/assets/screenshots/dark-final.png";
import automationShot from "@/assets/screenshots/wf-table.png";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { LogoStrip } from "@/components/sections/logo-strip";
import { MobileApp } from "@/components/sections/mobile-app";
import { ModuleGrid } from "@/components/sections/module-grid";
import { Security } from "@/components/sections/security";
import { SplitFeature } from "@/components/sections/split-feature";
import { StatStrip } from "@/components/sections/stat-strip";
import { WhyCwms } from "@/components/sections/why-cwms";
import { automationPoints, scalePoints } from "@/lib/site-content";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <StatStrip />
        <LogoStrip />

        <SplitFeature
          id="modules"
          className="bg-cream"
          eyebrow="Automate operations"
          heading="Handle the day-to-day automatically"
          points={automationPoints}
          image={automationShot}
          imageAlt="CWMS agreements module listing tenant agreements and their status"
        />

        <SplitFeature
          imageFirst
          darkChrome
          eyebrow="Built to scale"
          heading="One system across every location"
          points={scalePoints}
          image={scaleShot}
          imageAlt="CWMS multi-tenant dashboard in dark mode"
        />

        <ModuleGrid />
        <WhyCwms />
        <Security />
        <MobileApp />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
