"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import React from "react";
import { useProfileStore } from "@/store/profileStore";

const StatsCard = () => {
  const { stats } = useProfileStore();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Stats</CardTitle>
        <CardDescription>Your activity overview</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex justify-between items-center"
          >
            <span className="text-sm text-muted-foreground">{stat.label}</span>
            <span className="font-semibold">{stat.value}</span>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

export default React.memo(StatsCard);
