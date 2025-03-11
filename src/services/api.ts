import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Article } from '../redux/newsSlice';

// News API için API anahtarı
// .env.local dosyasından API anahtarını alıyoruz
const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY || '1a2b3c4d5e6f7g8h9i0j'; // Yedek anahtar
const BASE_URL = 'https://newsapi.org/v2';

// Yedek olarak mock veri tutuyoruz, API çağrısı başarısız olursa kullanılacak

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
          // API'den veri çekmeyi dene
          const response = await fetch(`${BASE_URL}/top-headlines?country=us&pageSize=20`, {
            headers: {
              'X-Api-Key': API_KEY
            },
            signal
          });
          
          if (!response.ok) {
            throw new Error('API request failed');
          }
          
          const data: NewsAPIResponse = await response.json();
          
          if (data.status === 'ok' && data.articles.length > 0) {
            return { 
              data: {
                status: data.status,
                totalResults: data.totalResults,
                articles: transformArticles(data.articles)
              }
            };
          } else {
            throw new Error('No articles found');
          }
        } catch (error) {
          console.error('Error fetching top headlines:', error);
          // Hata durumunda mock veriyi kullan
          return { 
            data: {
              status: 'ok',
              totalResults: mockArticles.length,
              articles: mockArticles
            }
          };
        }
      }
    }),
    searchNews: builder.query<NewsResponse, string>({
      queryFn: async (searchTerm, { signal }) => {
        try {
          if (!searchTerm.trim()) {
            throw new Error('Empty search term');
          }
          
          // API'den veri çekmeyi dene
          const response = await fetch(`${BASE_URL}/everything?q=${encodeURIComponent(searchTerm)}&language=en&sortBy=publishedAt&pageSize=20`, {
            headers: {
              'X-Api-Key': API_KEY
            },
            signal
          });
          
          if (!response.ok) {
            throw new Error('API request failed');
          }
          
          const data: NewsAPIResponse = await response.json();
          
          if (data.status === 'ok' && data.articles.length > 0) {
            return { 
              data: {
                status: data.status,
                totalResults: data.totalResults,
                articles: transformArticles(data.articles)
              }
            };
          } else {
            // Arama sonucu bulunamazsa boş dizi döndür
            return { 
              data: {
                status: 'ok',
                totalResults: 0,
                articles: []
              }
            };
          }
        } catch (error) {
          console.error('Error searching news:', error);
          // Hata durumunda boş dizi döndür
          return { 
            data: {
              status: 'ok',
              totalResults: 0,
              articles: []
            }
          };
        }
      }
    }),
  }),
});

export const { useGetTopHeadlinesQuery, useSearchNewsQuery } = newsApi; 