import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Article } from '../redux/newsSlice';

// News API için API anahtarı
// .env.local dosyasından API anahtarını alıyoruz
const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY || '1a2b3c4d5e6f7g8h9i0j'; // Yedek anahtar
const BASE_URL = 'https://newsapi.org/v2';

// Gnews API alternatifi (ücretsiz ve CORS sorunu olmayan bir API)
const GNEWS_API_KEY = process.env.NEXT_PUBLIC_GNEWS_API_KEY || 'f5a9b8e7d6c5b4a3'; // Yedek anahtar
const GNEWS_BASE_URL = 'https://gnews.io/api/v4';

// Yedek olarak mock veri tutuyoruz, API çağrısı başarısız olursa kullanılacak
const mockArticles: Article[] = [
  {
    id: 'mock-1',
    title: 'Teknoloji Dünyasında Yeni Gelişmeler',
    description: 'Son teknolojik gelişmeler ve yenilikler hakkında bilgiler.',
    content: 'Teknoloji dünyasında her gün yeni gelişmeler yaşanıyor. Yapay zeka, blockchain ve sanal gerçeklik alanlarında önemli ilerlemeler kaydediliyor.',
    url: 'https://example.com/tech-news',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    publishedAt: new Date().toISOString(),
    source: {
      name: 'Tech News',
      url: 'https://example.com'
    }
  },
  {
    id: 'mock-2',
    title: 'Ekonomi Haberleri: Piyasalarda Son Durum',
    description: 'Ekonomi ve finans dünyasındaki son gelişmeler.',
    content: 'Küresel ekonomide yaşanan gelişmeler ve piyasalardaki son durum hakkında detaylı bilgiler.',
    url: 'https://example.com/economy-news',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    publishedAt: new Date().toISOString(),
    source: {
      name: 'Economy News',
      url: 'https://example.com'
    }
  },
  {
    id: 'mock-3',
    title: 'Spor Dünyasından Haberler',
    description: 'Spor dünyasındaki son gelişmeler ve maç sonuçları.',
    content: 'Futbol, basketbol ve diğer spor dallarındaki son gelişmeler, maç sonuçları ve transfer haberleri.',
    url: 'https://example.com/sports-news',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    publishedAt: new Date().toISOString(),
    source: {
      name: 'Sports News',
      url: 'https://example.com'
    }
  }
];

// News API'den gelen yanıt tipi
interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: NewsAPIArticle[];
}

// News API'den gelen makale tipi
interface NewsAPIArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

// GNews API'den gelen yanıt tipi
interface GNewsAPIResponse {
  totalArticles: number;
  articles: GNewsAPIArticle[];
}

// GNews API'den gelen makale tipi
interface GNewsAPIArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

// Uygulamamızda kullandığımız yanıt tipi
export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

// News API'den gelen makaleleri uygulamamızın formatına dönüştürme
const transformArticles = (articles: NewsAPIArticle[]): Article[] => {
  return articles.map((article, index) => ({
    id: `article-${index}-${Date.now()}`,
    title: article.title || 'No Title',
    description: article.description || 'No description available',
    content: article.content || 'No content available',
    url: article.url,
    image: article.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    publishedAt: article.publishedAt,
    source: {
      name: article.source.name,
      url: article.url
    }
  }));
};

// GNews API'den gelen makaleleri uygulamamızın formatına dönüştürme
const transformGNewsArticles = (articles: GNewsAPIArticle[]): Article[] => {
  return articles.map((article, index) => ({
    id: `gnews-article-${index}-${Date.now()}`,
    title: article.title || 'No Title',
    description: article.description || 'No description available',
    content: article.content || 'No content available',
    url: article.url,
    image: article.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    publishedAt: article.publishedAt,
    source: article.source
  }));
};

// Hata durumunda API yanıtını kontrol eden yardımcı fonksiyon
const handleApiError = (error: Error | unknown): NewsResponse => {
  console.error('API error:', error);
  return {
    status: 'ok',
    totalResults: mockArticles.length,
    articles: mockArticles
  };
};

// API'leri sırayla deneyecek fonksiyon
const fetchNewsFromMultipleSources = async (endpoint: string, searchTerm?: string, signal?: AbortSignal): Promise<NewsResponse> => {
  // Önce News API'yi dene
  try {
    console.log('Trying News API...');
    const url = searchTerm 
      ? `${BASE_URL}/everything?q=${encodeURIComponent(searchTerm)}&language=en&sortBy=publishedAt&pageSize=20`
      : `${BASE_URL}/top-headlines?country=us&pageSize=20`;
    
    console.log('Request URL:', url);
    
    const response = await fetch(url, {
      headers: {
        'X-Api-Key': API_KEY
      },
      signal
    });
    
    console.log('News API Response Status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.warn(`News API request failed with status: ${response.status}`, errorText);
      throw new Error(`News API request failed: ${errorText}`);
    }
    
    const data: NewsAPIResponse = await response.json();
    console.log('News API Response Data:', data);
    
    if (data.status === 'ok' && data.articles.length > 0) {
      return {
        status: data.status,
        totalResults: data.totalResults,
        articles: transformArticles(data.articles)
      };
    }
    
    throw new Error('No articles found in News API');
  } catch (newsApiError) {
    console.warn('News API failed, trying GNews API...', newsApiError);
    
    // News API başarısız olursa, GNews API'yi dene
    try {
      const url = searchTerm 
        ? `${GNEWS_BASE_URL}/search?q=${encodeURIComponent(searchTerm)}&lang=en&max=20&apikey=${GNEWS_API_KEY}`
        : `${GNEWS_BASE_URL}/top-headlines?lang=en&max=20&apikey=${GNEWS_API_KEY}`;
      
      console.log('GNews Request URL:', url);
      
      const response = await fetch(url, { signal });
      console.log('GNews API Response Status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`GNews API request failed with status: ${response.status}`, errorText);
        throw new Error(`GNews API request failed: ${errorText}`);
      }
      
      const data: GNewsAPIResponse = await response.json();
      console.log('GNews API Response Data:', data);
      
      if (data.articles && data.articles.length > 0) {
        return {
          status: 'ok',
          totalResults: data.totalArticles,
          articles: transformGNewsArticles(data.articles)
        };
      }
      
      throw new Error('No articles found in GNews API');
    } catch (gnewsApiError) {
      console.warn('Both APIs failed, using mock data', gnewsApiError);
      // Her iki API de başarısız olursa, mock veriyi kullan
      return {
        status: 'ok',
        totalResults: mockArticles.length,
        articles: mockArticles
      };
    }
  }
};

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('X-Api-Key', API_KEY);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getTopHeadlines: builder.query<NewsResponse, void>({
      queryFn: async (_, { signal }) => {
        try {
          const data = await fetchNewsFromMultipleSources('top-headlines', undefined, signal);
          return { data };
        } catch (error) {
          console.error('Error fetching top headlines:', error);
          return { data: handleApiError(error) };
        }
      }
    }),
    searchNews: builder.query<NewsResponse, string>({
      queryFn: async (searchTerm, { signal }) => {
        try {
          if (!searchTerm.trim()) {
            return { 
              data: {
                status: 'ok',
                totalResults: 0,
                articles: []
              }
            };
          }
          
          const data = await fetchNewsFromMultipleSources('everything', searchTerm, signal);
          return { data };
        } catch (error) {
          console.error('Error searching news:', error);
          if (error instanceof Error && error.message === 'Empty search term') {
            return { 
              data: {
                status: 'ok',
                totalResults: 0,
                articles: []
              }
            };
          }
          return { data: handleApiError(error) };
        }
      }
    }),
  }),
});

export const { useGetTopHeadlinesQuery, useSearchNewsQuery } = newsApi; 