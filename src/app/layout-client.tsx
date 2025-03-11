"use client";

import { ReduxProvider } from "@/redux/provider";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  // Client tarafında yıl bilgisini state olarak tutuyoruz
  const [year, setYear] = useState("2025");
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Component mount olduktan sonra yıl bilgisini güncelliyoruz
  useEffect(() => {
    setYear(new Date().getFullYear().toString());
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <ReduxProvider>
      <ThemeProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 w-full max-w-full px-0 py-0">
            {children}
          </main>
          <footer className="border-t py-8 bg-background/80 backdrop-blur-sm">
            <div className="container max-w-full px-4 md:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center">
                    HubX News
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your trusted source for the latest news, updates, and stories from around the world.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/news" className="text-muted-foreground hover:text-primary transition-colors">
                        News
                      </Link>
                    </li>
                    <li>
                      <Link href="/favorites" className="text-muted-foreground hover:text-primary transition-colors">
                        Favorites
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4">About</h3>
                  <p className="text-sm text-muted-foreground">
                    This is a demo project for HubX Frontend Developer Case Study.
                  </p>
                </div>
              </div>
              <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm text-muted-foreground text-center md:text-left">
                  © {year} HubX News App. All rights reserved.
                </p>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>
          </footer>
          
          <AnimatePresence>
            {showScrollTop && (
              <motion.div
                className="fixed bottom-6 right-6 z-50"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  size="icon"
                  className="rounded-full shadow-md"
                  onClick={scrollToTop}
                  aria-label="Scroll to top"
                >
                  <ArrowUp className="h-5 w-5" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ThemeProvider>
    </ReduxProvider>
  );
} 