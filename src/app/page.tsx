import Link from "next/link";
import { ArrowRight, Zap, Heart, Moon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="py-12 md:py-20 text-center relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 -z-10"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] -z-10"></div>
        
        <div className="container max-w-full px-4 md:px-8 mx-auto">
          <div className="inline-block animate-bounce bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-6">
            HubX News App
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
            Stay Informed with <span className="text-primary">HubX News</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Your trusted source for the latest news, updates, and stories from around the world.
            Discover, read, and save your favorite articles all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-2 group">
              <Link href="/news">
                Browse News
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/favorites">
                <Heart className="h-4 w-4" />
                View Favorites
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 w-full">
        <div className="container max-w-full px-4 md:px-8 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="mb-4 bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Real-time Updates</h3>
              <p className="text-muted-foreground">
                Get the latest news as it happens with our real-time updates and notifications.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="mb-4 bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Save Favorites</h3>
              <p className="text-muted-foreground">
                Bookmark your favorite articles to read later or keep track of important stories.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="mb-4 bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full">
                <Moon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Dark Mode</h3>
              <p className="text-muted-foreground">
                Enjoy reading in any lighting condition with our customizable dark mode feature.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary/5 w-full">
        <div className="container max-w-full px-4 md:px-8 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to explore?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Dive into our comprehensive collection of news articles from various sources and categories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-2 group">
              <Link href="/news">
                <Search className="h-4 w-4" />
                Search News
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/news">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
