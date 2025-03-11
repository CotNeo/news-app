"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

export default function SearchBar({ onSearch, initialQuery = "" }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus on mobile when component mounts
    const isMobile = window.innerWidth < 768;
    if (!isMobile && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (initialQuery) {
      onSearch("");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="relative w-full max-w-2xl mx-auto mb-8"
    >
      <motion.div 
        className={`relative flex items-center overflow-hidden rounded-full border ${
          isFocused ? "border-primary shadow-sm ring-1 ring-primary/20" : "border-input"
        } transition-all duration-200`}
        animate={{ 
          scale: isFocused ? 1.01 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <Search className={`absolute left-3 h-4 w-4 ${isFocused ? "text-primary" : "text-muted-foreground"}`} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search for news..."
          className="w-full bg-background py-3 pl-10 pr-16 text-sm focus-visible:outline-none"
        />
        <AnimatePresence>
          {query && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute right-16"
            >
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7" 
                onClick={handleClear}
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute right-1.5">
          <Button 
            type="submit" 
            size="sm" 
            className={`h-8 px-3 rounded-full ${!query.trim() ? "opacity-70 cursor-not-allowed" : ""}`}
            disabled={!query.trim()}
          >
            Search
          </Button>
        </div>
      </motion.div>
      {initialQuery && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-muted-foreground mt-2 ml-2"
        >
          Showing results for: <span className="font-medium text-foreground">&quot;{initialQuery}&quot;</span>
        </motion.p>
      )}
    </form>
  );
} 