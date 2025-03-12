"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Calendar, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Article } from "@/redux/newsSlice";
import { formatDate } from "@/lib/utils";
import { useFavorites } from "@/hooks/useFavorites";

interface NewsCardProps {
  article: Article;
  index: number;
}

export default function NewsCard({ article, index }: NewsCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { addToFavorites, isFavorite } = useFavorites();
  const isArticleFavorite = isFavorite(article.id);

  // Component mount olduktan sonra animasyonları etkinleştiriyoruz
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleToggleFavorite = () => {
    addToFavorites(article);
  };

  // Format the date
  const formattedDate = formatDate(article.publishedAt);

  // Default image if none is provided
  const imageUrl = article.image || "/placeholder-news.jpg";

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: index * 0.1,
        duration: 0.5
      }
    }
  };

  // Eğer component henüz mount olmadıysa, animasyonsuz render ediyoruz
  if (!isMounted) {
    return (
      <div className="h-full">
        <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow border-none shadow-md">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={imageUrl}
              alt={article.title}
              fill
              className="object-cover transition-transform hover:scale-105 duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 4}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 z-10"
              onClick={handleToggleFavorite}
              aria-label={isArticleFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={`h-5 w-5 ${isArticleFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <div className="absolute bottom-2 left-2 flex items-center gap-1 text-xs text-white bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
              <Calendar className="h-3 w-3" />
              <span>{formattedDate}</span>
            </div>
          </div>
          <CardHeader className="p-4 pb-0">
            <div className="flex justify-between items-start">
              <CardTitle className="line-clamp-2 text-lg font-bold">{article.title}</CardTitle>
            </div>
            <CardDescription className="text-xs mt-1 flex items-center gap-1">
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
                {article.source.name}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-2 flex-grow">
            <p className={`text-sm text-muted-foreground ${isExpanded ? "" : "line-clamp-3"}`}>
              {article.description}
            </p>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs hover:bg-primary/10 hover:text-primary"
            >
              {isExpanded ? "Show Less" : "Read More"}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => window.open(article.url, "_blank")}
              className="text-xs flex items-center gap-1 hover:bg-primary/10 hover:text-primary hover:border-primary"
            >
              <ExternalLink className="h-3 w-3" />
              Visit Source
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow border-none shadow-md">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform hover:scale-105 duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 4}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 z-10"
            onClick={handleToggleFavorite}
            aria-label={isArticleFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`h-5 w-5 ${isArticleFavorite ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
          <div className="absolute bottom-2 left-2 flex items-center gap-1 text-xs text-white bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
            <Calendar className="h-3 w-3" />
            <span>{formattedDate}</span>
          </div>
        </div>
        <CardHeader className="p-4 pb-0">
          <div className="flex justify-between items-start">
            <CardTitle className="line-clamp-2 text-lg font-bold">{article.title}</CardTitle>
          </div>
          <CardDescription className="text-xs mt-1 flex items-center gap-1">
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
              {article.source.name}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-2 flex-grow">
          <p className={`text-sm text-muted-foreground ${isExpanded ? "" : "line-clamp-3"}`}>
            {article.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs hover:bg-primary/10 hover:text-primary"
          >
            {isExpanded ? "Show Less" : "Read More"}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.open(article.url, "_blank")}
            className="text-xs flex items-center gap-1 hover:bg-primary/10 hover:text-primary hover:border-primary"
          >
            <ExternalLink className="h-3 w-3" />
            Visit Source
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
} 