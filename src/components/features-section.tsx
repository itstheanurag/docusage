"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Users,
  Shield,
  Palette,
  Download,
  Cloud,
  Search,
  BarChart3,
} from "lucide-react";
import { BorderBeam } from "@/components/backgrounds/border-beam";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Create documents in seconds with our AI-powered templates and smart suggestions.",
    badge: "Popular",
  },
  {
    icon: Palette,
    title: "Beautiful Templates",
    description:
      "Choose from hundreds of professionally designed templates for any document type.",
    badge: "New",
  },
  {
    icon: Users,
    title: "Real-time Collaboration",
    description:
      "Work together with your team in real-time with comments and suggestions.",
    badge: null,
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-level security with end-to-end encryption and compliance certifications.",
    badge: null,
  },
  {
    icon: Cloud,
    title: "Cloud Sync",
    description:
      "Access your documents anywhere with automatic cloud synchronization.",
    badge: null,
  },
  {
    icon: Download,
    title: "Export Anywhere",
    description:
      "Export to PDF, Word, PowerPoint, and more with perfect formatting.",
    badge: null,
  },
  {
    icon: Search,
    title: "Smart Search",
    description:
      "Find any document instantly with our powerful AI-powered search engine.",
    badge: null,
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Track document performance and engagement with detailed analytics.",
    badge: "Pro",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative py-20 sm:py-32 bg-background overflow-hidden"
    >

      <motion.div
        className="absolute top-16 right-32 w-20 h-20 bg-primary/5 rounded-full blur-xl"
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-16 h-16 bg-accent/5 rounded-full blur-lg"
        animate={{
          y: [0, 10, 0],
          x: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative pb-20">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-4 text-sm font-medium">
              Features
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-4">
              Everything you need to create amazing documents
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              DocuSage combines powerful features with intuitive design to help
              you create professional documents effortlessly.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              <Card className="h-full bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl relative overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <motion.div
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <feature.icon className="h-5 w-5 text-primary" />
                    </motion.div>
                    {feature.badge && (
                      <Badge
                        variant={
                          feature.badge === "Popular" ? "default" : "secondary"
                        }
                        className="text-xs"
                      >
                        {feature.badge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                <BorderBeam
                  size={100}
                  duration={12}
                  delay={9}
                  borderWidth={1.5}
                  colorFrom="var(--color-primary)"
                  colorTo="var(--color-accent)"
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
