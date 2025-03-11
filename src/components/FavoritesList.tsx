"use client";

import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { RootState } from "@/redux/store";
import { Article } from "@/redux/newsSlice";
import NewsCard from "./NewsCard";
import { useState, useEffect } from "react";

export default function FavoritesList() {
  const favorites = useSelector((state: RootState) => state.news.favorites);
  const [isMounted, setIsMounted] = useState(false);

  // Component mount olduktan sonra animasyonları etkinleştiriyoruz
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (favorites.length === 0) {
    // Eğer component henüz mount olmadıysa, animasyonsuz render ediyoruz
    if (!isMounted) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">No Favorites Yet</h2>
          <p className="text-muted-foreground mb-6">
            Start adding articles to your favorites by clicking the heart icon on any news article.
          </p>
        </div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <h2 className="text-2xl font-bold mb-4">No Favorites Yet</h2>
        <p className="text-muted-foreground mb-6">
          Start adding articles to your favorites by clicking the heart icon on any news article.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {favorites.map((article: Article, index: number) => (
        <NewsCard key={article.id} article={article} index={index} />
      ))}
    </div>
  );
} 