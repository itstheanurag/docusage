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
    <section className="py-20 sm:py-32 bg-muted/30">
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

        {/* Preview Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Card className="bg-gradient-to-br from-card to-muted/50 border-border/50 overflow-hidden">
            <CardContent className="p-8 sm:p-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-card-foreground mb-2">
                  See DocuCraft in Action
                </h3>
                <p className="text-muted-foreground">
                  Watch how easy it is to create professional documents
                </p>
              </div>

              {/* Mock Preview */}
              <div className="relative mx-auto max-w-4xl">
                <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-border/50 flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-muted-foreground">
                      Interactive Demo Coming Soon
                    </p>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
