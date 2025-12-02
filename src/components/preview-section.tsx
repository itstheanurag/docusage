"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Presentation as PresentationChart,
  FileSpreadsheet,
  FileImage,
  Clock,
  Star,
} from "lucide-react";

const templates = [
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
    icon: PresentationChart,
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

export function PreviewSection() {
  return (
    <section id="templates" className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 text-sm font-medium">
            Preview
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-4">
            Choose from Premium Templates
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Start with professionally designed templates and customize them to
            match your brand and needs.
          </p>
        </motion.div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <Card className="h-full border-border/50 bg-card hover:shadow-lg transition-all duration-300 overflow-hidden">
                <CardContent className="p-6">
                  {/* Template Icon & Category */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-br ${template.color}`}
                    >
                      <template.icon className="h-6 w-6 text-foreground" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {template.category}
                    </Badge>
                  </div>

                  {/* Template Info */}
                  <h3 className="font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                    {template.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {template.description}
                  </p>

                  {/* Template Stats */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-accent text-accent" />
                      <span>{template.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{template.uses} uses</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Card className="bg-background border-border/50 overflow-hidden shadow-2xl">
            {/* Mock Window Header */}
            <div className="bg-muted/50 border-b border-border p-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
              </div>
              <div className="ml-4 flex gap-2">
                <div className="h-2 w-20 bg-muted-foreground/20 rounded-full" />
                <div className="h-2 w-12 bg-muted-foreground/10 rounded-full" />
                <div className="h-2 w-12 bg-muted-foreground/10 rounded-full" />
              </div>
            </div>

            {/* Mock Editor Interface */}
            <div className="flex h-[400px] sm:h-[500px] bg-background">
              {/* Sidebar */}
              <div className="w-16 border-r border-border bg-muted/10 flex flex-col items-center py-4 gap-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-md bg-muted-foreground/10"
                  />
                ))}
              </div>

              {/* Main Canvas */}
              <div className="flex-1 bg-muted/20 p-8 flex justify-center overflow-hidden relative">
                <div className="w-full max-w-2xl bg-background shadow-sm border border-border/40 rounded-sm p-8 space-y-4">
                  {/* Mock Document Content */}
                  <div className="h-8 w-3/4 bg-primary/10 rounded-md mb-8" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-muted-foreground/10 rounded" />
                    <div className="h-4 w-full bg-muted-foreground/10 rounded" />
                    <div className="h-4 w-5/6 bg-muted-foreground/10 rounded" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 my-8">
                    <div className="h-32 bg-accent/10 rounded-md border border-accent/20" />
                    <div className="h-32 bg-blue-500/10 rounded-md border border-blue-500/20" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-muted-foreground/10 rounded" />
                    <div className="h-4 w-11/12 bg-muted-foreground/10 rounded" />
                    <div className="h-4 w-4/5 bg-muted-foreground/10 rounded" />
                  </div>
                </div>

                {/* Floating Cursor Animation */}
                <motion.div
                  className="absolute top-1/2 left-1/2 pointer-events-none"
                  animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-primary drop-shadow-lg"
                  >
                    <path
                      d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
                      fill="currentColor"
                    />
                  </svg>
                </motion.div>
              </div>

              {/* Properties Panel */}
              <div className="w-64 border-l border-border bg-background hidden lg:block p-4 space-y-6">
                <div className="space-y-2">
                  <div className="h-3 w-20 bg-muted-foreground/20 rounded-full" />
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-8 bg-muted-foreground/5 rounded" />
                    <div className="h-8 bg-muted-foreground/5 rounded" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-16 bg-muted-foreground/20 rounded-full" />
                  <div className="h-24 bg-muted-foreground/5 rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-24 bg-muted-foreground/20 rounded-full" />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="h-2 w-8 bg-muted-foreground/10 rounded" />
                      <div className="h-2 w-8 bg-muted-foreground/10 rounded" />
                    </div>
                    <div className="h-1 bg-muted-foreground/10 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-primary/50" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
