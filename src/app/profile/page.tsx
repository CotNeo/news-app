'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Yükleniyor...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Profil</CardTitle>
          <CardDescription>Hesap bilgileriniz</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium">Kullanıcı Adı</h3>
            <p className="text-lg">{session.user.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium">E-posta</h3>
            <p className="text-lg">{session.user.email}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="destructive" 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full"
          >
            Çıkış Yap
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 