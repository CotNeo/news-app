"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "@/redux/newsSlice";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun, Newspaper, Heart, Menu, X, Home, BookOpen, Search } from "lucide-react";
import { RootState } from "@/redux/store";

export default function Header() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.news.darkMode);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200 ${
      isScrolled ? "bg-background/95 shadow-sm" : "bg-background/80"
    }`}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Newspaper className="h-6 w-6 text-primary" />
          <Link href="/" className="text-primary hover:text-primary/90 transition-colors">
            HubX <span className="text-foreground">News</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="flex gap-6">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${
                pathname === "/" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link 
              href="/news" 
              className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${
                pathname === "/news" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              News
            </Link>
            <Link 
              href="/favorites" 
              className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${
                pathname === "/favorites" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Heart className="h-4 w-4" />
              Favorites
            </Link>
          </div>

          <div className="flex items-center gap-4 border-l pl-4">
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4 text-yellow-500" />
              <Switch 
                checked={isDarkMode} 
                onCheckedChange={handleToggleDarkMode} 
                aria-label="Toggle dark mode"
              />
              <Moon className="h-4 w-4 text-blue-500" />
            </div>

            <Link href="/news">
              <Button variant="outline" size="sm" className="gap-1 hidden lg:flex">
                <Search className="h-4 w-4" />
                Search News
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Navigation Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleToggleDarkMode}
            className="text-muted-foreground"
          >
            {isDarkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-blue-500" />}
          </Button>
          
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 flex flex-col gap-4">
            <Link 
              href="/" 
              className={`flex items-center gap-2 p-2 rounded-md ${
                pathname === "/" ? "bg-primary/10 text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="h-5 w-5" />
              Home
            </Link>
            <Link 
              href="/news" 
              className={`flex items-center gap-2 p-2 rounded-md ${
                pathname === "/news" ? "bg-primary/10 text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <BookOpen className="h-5 w-5" />
              News
            </Link>
            <Link 
              href="/favorites" 
              className={`flex items-center gap-2 p-2 rounded-md ${
                pathname === "/favorites" ? "bg-primary/10 text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Heart className="h-5 w-5" />
              Favorites
            </Link>
            <Link 
              href="/news" 
              className="flex items-center gap-2 p-2 rounded-md text-muted-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Search className="h-5 w-5" />
              Search News
            </Link>
          </div>
        </div>
      )}
    </header>
  );
} 