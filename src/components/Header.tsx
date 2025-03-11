"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "@/redux/newsSlice";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun, Newspaper, Heart, Menu, X, Home, BookOpen, User, LogOut } from "lucide-react";
import { RootState } from "@/redux/store";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.news.darkMode);
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
    dispatch(toggleDarkMode());
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