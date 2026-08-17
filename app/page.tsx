import scaleShot from "@/assets/screenshots/dark-final.png";
import automationShot from "@/assets/screenshots/wf-table.png";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Demo } from "@/components/sections/demo";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
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
      <main id="main">
        <Hero />
        <StatStrip />

        <SplitFeature
          id="platform"
          eyebrow="Automate operations"
          heading="Handle the day-to-day automatically"
          body="The work that fills a front desk — charging, booking, onboarding — runs off the tenant record instead of a person's memory."
          points={automationPoints}
          image={automationShot}
          imageAlt="CWMS agreements module listing tenant agreements with pending signature and review counts"
        />

        <SplitFeature
          imageFirst
          className="bg-surface-2"
          eyebrow="Built to scale"
          heading="One system across every location"
          body="Add a site without adding a system. Each tenant keeps its own rules while your team works from a single login."
          points={scalePoints}
          image={scaleShot}
          imageAlt="CWMS multi-tenant dashboard in dark mode showing occupancy and bookings across sites"
        />

        <ModuleGrid />
        <WhyCwms />
        <Security />
        <MobileApp />
        <Faq />
        <Demo />
      </main>
      <SiteFooter />
    </>
  );
}
