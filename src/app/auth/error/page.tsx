"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

// SearchParams'ı kullanan bileşen
function ErrorContent() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    setError(errorParam);
  }, [searchParams]);

  const getErrorMessage = () => {
    switch (error) {
      case "CredentialsSignin":
        return "Kullanıcı adı veya şifre hatalı.";
      case "SessionRequired":
        return "Bu sayfaya erişmek için giriş yapmalısınız.";
      case "Configuration":
        return "Sunucu yapılandırmasında bir sorun var. Lütfen daha sonra tekrar deneyin.";
      case "AccessDenied":
        return "Bu sayfaya erişim izniniz yok.";
      default:
        return "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.";
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex items-center justify-center mb-6 text-red-500">
        <AlertCircle size={48} />
      </div>
      <h1 className="text-2xl font-bold text-center mb-4">Oturum Hatası</h1>
      <p className="text-center mb-6 text-gray-600 dark:text-gray-300">
        {getErrorMessage()}
      </p>
      <div className="flex justify-center">
        <Link href="/auth/signin">
          <div className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
            Giriş Sayfasına Dön
          </div>
        </Link>
      </div>
    </div>
  );
}

// Yükleme durumu için fallback bileşeni
function ErrorLoadingFallback() {
  return (
    <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex items-center justify-center mb-6">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
      <h1 className="text-2xl font-bold text-center mb-4">Yükleniyor...</h1>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <Suspense fallback={<ErrorLoadingFallback />}>
        <ErrorContent />
      </Suspense>
    </div>
  );
} 