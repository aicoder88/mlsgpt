import type { Metadata } from "next";

import { GeneratorForm } from "@/components/generator-form";

export const metadata: Metadata = {
  title: "Listing Command Center",
  description: "Turn one property into a launch strategy, copy studio, open-house kit, and seller-ready campaign plan.",
  alternates: {
    canonical: "/generate"
  }
};

export default function GeneratePage() {
  return <GeneratorForm />;
}
