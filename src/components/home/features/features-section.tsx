import SectionHeader from "@/components/section-header";
import {
  BoltIcon,
  CpuChipIcon,
  GlobeIcon,
  LayersIcon,
  ShieldIcon,
  SparklesIcon,
} from "@/components/icons/icons";
import GridItem from "@/components/home/features/feature-grid-item";
import { JSX } from "react";

type FeatureItem = {
  title: string;
  description: string;
  icon: JSX.Element;
};

const defaultFeatures: FeatureItem[] = [
  {
    title: "AI Copilot",
    description:
      "Context-aware generative AI that understands structure. Just ask for what you need.",
    icon: <SparklesIcon />,
  },
  {
    title: "Structured Data",
    description:
      "Everything you build is exported as clean, structured JSON data, ready for your API.",
    icon: <CpuChipIcon />,
  },
  {
    title: "Global Content",
    description:
      "Multi-language support and currency formatting built right into the core.",
    icon: <GlobeIcon />,
  },
  {
    title: "Pixel Perfect",
    description:
      "What you see is exactly what you get. Real-time preview with print-perfect CSS.",
    icon: <LayersIcon />,
  },
  {
    title: "Secure by Default",
    description:
      "Enterprise-grade encryption for all your generated documents and forms.",
    icon: <ShieldIcon />,
  },
  {
    title: "Instant Export",
    description:
      "One-click export to PDF, HTML, or Raw Text. No watermarks.",
    icon: <BoltIcon />,
  },
];

const Features = ({ items }: { items?: FeatureItem[] }) => {
  const features = items && items.length ? items : defaultFeatures;

  return (
    <section
      id="features"
      className="bg-white dark:bg-neutral-950 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <div className="p-8 md:p-12">
          <SectionHeader
            title="Engineered for efficiency."
            subtitle="We've stripped away the clutter to focus on what matters: content, structure, and speed."
          />
        </div>

        {/* Collapsing Border Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {features.map((item, index) => (
            <GridItem
              key={index}
              index={index}
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
