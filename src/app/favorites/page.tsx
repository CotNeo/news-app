"use client";

import { motion } from "framer-motion";
import FavoritesList from "@/components/FavoritesList";
import { Heart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FavoritesPage() {
  return (
    <div className="space-y-0 w-full">
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 w-full py-8">
        <div className="container max-w-full px-4 md:px-8 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Heart className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Your Favorite Articles</h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground mt-2 max-w-2xl"
          >
            View and manage your saved articles. Click the heart icon to remove an article from your favorites.
          </motion.p>
        </div>
      </div>

      <div className="container max-w-full px-4 md:px-8 mx-auto py-8">
        <FavoritesList />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Button asChild variant="outline" className="gap-2">
            <Link href="/news">
              <BookOpen className="h-4 w-4" />
              Discover More News
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
} 