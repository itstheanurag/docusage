"use client";

import SectionHeader from "../section-header";
import TemplateGrid from "../template-preview/template-grid";

export default function PreviewSection() {
  return (
    <section id="templates" className="relative py-20 sm:py-32 bg-muted/30">

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-size-[10px_10px] mask-[radial-gradient(circle_at_center,white,transparent)] -webkit-mask-image:radial-gradient(circle_at_center,white,transparent)"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader title="Choose from Premium Templates" subtitle="Start with professionally designed templates and customize them to match
        your brand." />
        <TemplateGrid />
      </div>
    </section>
  );
}
