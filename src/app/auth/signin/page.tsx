'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

// useRouter hook'unu kullanan bileşen
function SignInForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid username or password');
        setIsLoading(false);
        return;
      }

      router.push('/news');
      router.refresh();
    } catch {
      setError('An error occurred during sign in');
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">HubX News</CardTitle>
        <CardDescription className="text-center">
          Sign in to add news to your favorites
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-center text-gray-500 dark:text-gray-400">
          <p>Demo account: admin / 123456</p>
        </div>
      </CardFooter>
    </Card>
  );
}

// Yükleme durumu için fallback bileşeni
function SignInLoadingFallback() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mx-auto w-1/2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mx-auto w-3/4"></div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse w-1/4"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse w-full"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse w-1/4"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse w-full"></div>
          </div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse w-full"></div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Suspense fallback={<SignInLoadingFallback />}>
        <SignInForm />
      </Suspense>
    </div>
  );
} 