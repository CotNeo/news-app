"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun, Newspaper, Heart, Menu, X, Home, BookOpen, User, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useDarkMode } from "@/hooks/useDarkMode";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// usePathname hook'unu kullanan bileşen
function HeaderContent() {
  const pathname = usePathname();
  const { isDarkMode, toggleTheme } = useDarkMode();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleDarkMode = () => {
    toggleTheme();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Render navigation links
  const renderNavLinks = () => {
    return (
      <>
        <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
          <Home className="w-4 h-4 mr-1" />
          <span>Home</span>
        </Link>
        <Link href="/news" className={`nav-link ${pathname === "/news" ? "active" : ""}`}>
          <Newspaper className="w-4 h-4 mr-1" />
          <span>News</span>
        </Link>
        <Link href="/favorites" className={`nav-link ${pathname === "/favorites" ? "active" : ""}`}>
          <Heart className="w-4 h-4 mr-1" />
          <span>Favorites</span>
        </Link>
      </>
    );
  };

  // Render user menu
  const renderUserMenu = () => {
    if (session) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <Link href="/auth/signin">
        <Button variant="outline" size="sm">
          Sign In
        </Button>
      </Link>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md"
          : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">HubX News</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {renderNavLinks()}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Dark Mode Toggle */}
            <div className="flex items-center space-x-2 mr-2">
              <Sun className="h-4 w-4" />
              <Switch checked={isDarkMode} onCheckedChange={handleToggleDarkMode} />
              <Moon className="h-4 w-4" />
            </div>

            {/* User Menu */}
            {renderUserMenu()}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <nav className="flex flex-col py-4 px-4 space-y-4">
            {renderNavLinks()}
          </nav>
        </div>
      )}
    </header>
  );
}

// Yükleme durumu için fallback bileşeni
function HeaderLoadingFallback() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
            <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Header() {
  return (
    <Suspense fallback={<HeaderLoadingFallback />}>
      <HeaderContent />
    </Suspense>
  );
} 