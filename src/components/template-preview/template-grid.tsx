"use client";

import { motion } from "framer-motion";
import TemplateCard from "./template-card";
import {
  FileText,
  Presentation,
  FileSpreadsheet,
  FileImage,
} from "lucide-react";

export interface Template {
  id: number;
  title: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  category: string;
  rating: number;
  uses: string;
  color: string;
}

const templates: Template[] = [
  {
    id: 1,
    title: "Business Report",
    description: "Professional reports with charts and analytics",
    icon: FileText,
    category: "Business",
    rating: 4.9,
    uses: "2.3k",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 2,
    title: "Presentation Deck",
    description: "Stunning slides for your next presentation",
    icon: Presentation,
    category: "Presentation",
    rating: 4.8,
    uses: "1.8k",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 3,
    title: "Financial Statement",
    description: "Detailed financial reports and statements",
    icon: FileSpreadsheet,
    category: "Finance",
    rating: 4.9,
    uses: "1.2k",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: 4,
    title: "Marketing Proposal",
    description: "Compelling proposals that win clients",
    icon: FileImage,
    category: "Marketing",
    rating: 4.7,
    uses: "956",
    color: "from-orange-500/20 to-red-500/20",
  },
];

export default function TemplateGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-12">
      {templates.map((template, index) => (
        <TemplateCard template={template} />
      ))}
    </div>
  );
}
