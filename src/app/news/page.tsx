"use client";

import { useState } from "react";
import { useSearchNewsQuery, useGetTopHeadlinesQuery } from "@/services/api";
import NewsCard from "@/components/NewsCard";
import NewsCardSkeleton from "@/components/NewsCardSkeleton";
import SearchBar from "@/components/SearchBar";
import { motion } from "framer-motion";
import { AlertCircle, Newspaper, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Use the search query if there's a search term, otherwise use top headlines
  const { data: searchData, isLoading: isSearchLoading, error: searchError } = 
    useSearchNewsQuery(searchTerm, { skip: !searchTerm });
  
  const { data: headlinesData, isLoading: isHeadlinesLoading, error: headlinesError } = 
    useGetTopHeadlinesQuery(undefined, { skip: !!searchTerm });

  const isLoading = searchTerm ? isSearchLoading : isHeadlinesLoading;
  const error = searchTerm ? searchError : headlinesError;
  const data = searchTerm ? searchData : headlinesData;

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="space-y-0 w-full">
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 w-full py-8">
        <div className="container max-w-full px-4 md:px-8 mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Newspaper className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">
              {searchTerm ? `Search Results` : "Latest News"}
            </h1>
          </div>
          <SearchBar onSearch={handleSearch} initialQuery={searchTerm} />
        </div>
      </div>

      <div className="container max-w-full px-4 md:px-8 mx-auto py-8">
        {isLoading && (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {Array.from({ length: 8 }).map((_, index) => (
              <NewsCardSkeleton key={index} />
            ))}
          </motion.div>
        )}

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 bg-red-50 dark:bg-red-900/10 rounded-lg"
          >
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading News</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              {error instanceof Error ? error.message : "An unknown error occurred. Please try again later."}
            </p>
            <Button 
              onClick={() => window.location.reload()}
              variant="outline"
              className="mx-auto"
            >
              Try Again
            </Button>
          </motion.div>
        )}

        {!isLoading && !error && data?.articles?.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 bg-muted/50 rounded-lg"
          >
            <h2 className="text-2xl font-bold mb-4">No Results Found</h2>
            <p className="text-muted-foreground mb-6">
              No articles found for &quot;{searchTerm}&quot;. Try a different search term.
            </p>
            <Button 
              onClick={() => setSearchTerm("")}
              variant="outline"
            >
              View All News
            </Button>
          </motion.div>
        )}

        {!isLoading && !error && data && data.articles && data.articles.length > 0 && (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium">{data.articles.length}</span> articles
              </p>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {data.articles.map((article, index) => (
                <NewsCard key={article.id} article={article} index={index} />
              ))}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
} 