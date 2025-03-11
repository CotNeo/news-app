import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Article } from '../redux/newsSlice';

// Mock veri - production ortamında kullanılacak
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
  },
  {
    id: 'mock-4',
    title: 'Sağlık ve Yaşam: Sağlıklı Yaşam İpuçları',
    description: 'Sağlıklı yaşam için öneriler ve ipuçları.',
    content: 'Sağlıklı beslenme, egzersiz ve yaşam tarzı değişiklikleri hakkında uzman önerileri.',
    url: 'https://example.com/health-news',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    publishedAt: new Date().toISOString(),
    source: {
      name: 'Health News',
      url: 'https://example.com'
    }
  },
  {
    id: 'mock-5',
    title: 'Bilim ve Teknoloji: Uzay Araştırmalarında Yeni Keşifler',
    description: 'Uzay araştırmalarında son gelişmeler ve yeni keşifler.',
    content: 'NASA ve diğer uzay ajanslarının son keşifleri ve uzay teknolojisindeki gelişmeler.',
    url: 'https://example.com/science-news',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80',
    publishedAt: new Date().toISOString(),
    source: {
      name: 'Science News',
      url: 'https://example.com'
    }
  },
  {
    id: 'mock-6',
    title: 'Kültür ve Sanat: Yeni Film ve Dizi Önerileri',
    description: 'Vizyona giren filmler ve yeni diziler hakkında bilgiler.',
    content: 'Sinema ve televizyon dünyasındaki son gelişmeler, film ve dizi önerileri.',
    url: 'https://example.com/culture-news',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1159&q=80',
    publishedAt: new Date().toISOString(),
    source: {
      name: 'Culture News',
      url: 'https://example.com'
    }
  }
];

// Uygulamamızda kullandığımız yanıt tipi
export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

// Production ortamında mı yoksa development ortamında mı olduğumuzu kontrol et
const isProduction = process.env.NODE_ENV === 'production';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://newsapi.org/v2',
  }),
  endpoints: (builder) => ({
    getTopHeadlines: builder.query<NewsResponse, void>({
      queryFn: async () => {
        // Production ortamında veya Vercel'de ise mock veri kullan
        if (isProduction || typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) {
          console.log('Using mock data for top headlines in production');
          return { 
            data: {
              status: 'ok',
              totalResults: mockArticles.length,
              articles: mockArticles
            }
          };
        }
        
        // Development ortamında gerçek API'yi kullanmayı dene
        try {
          const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
          console.log('Fetching news with API key in development');
          
          const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=20`, {
            headers: {
              'X-Api-Key': API_KEY || ''
            }
          });
          
          if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
          }
          
          const data = await response.json();
          
          return { 
            data: {
              status: data.status,
              totalResults: data.totalResults,
              articles: data.articles.map((article: any, index: number) => ({
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
              }))
            }
          };
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
      queryFn: async (searchTerm) => {
        // Boş arama terimi kontrolü
        if (!searchTerm.trim()) {
          return { 
            data: {
              status: 'ok',
              totalResults: 0,
              articles: []
            }
          };
        }
        
        // Production ortamında veya Vercel'de ise filtrelenmiş mock veri kullan
        if (isProduction || typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) {
          console.log('Using mock data for search in production');
          const filteredArticles = mockArticles.filter(article => 
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            article.description.toLowerCase().includes(searchTerm.toLowerCase())
          );
          
          return { 
            data: {
              status: 'ok',
              totalResults: filteredArticles.length,
              articles: filteredArticles
            }
          };
        }
        
        // Development ortamında gerçek API'yi kullanmayı dene
        try {
          const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
          console.log('Searching news with API key in development');
          
          const response = await fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(searchTerm)}&language=en&sortBy=publishedAt&pageSize=20`, {
            headers: {
              'X-Api-Key': API_KEY || ''
            }
          });
          
          if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
          }
          
          const data = await response.json();
          
          return { 
            data: {
              status: data.status,
              totalResults: data.totalResults,
              articles: data.articles.map((article: any, index: number) => ({
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
              }))
            }
          };
        } catch (error) {
          console.error('Error searching news:', error);
          // Hata durumunda filtrelenmiş mock veriyi kullan
          const filteredArticles = mockArticles.filter(article => 
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            article.description.toLowerCase().includes(searchTerm.toLowerCase())
          );
          
          return { 
            data: {
              status: 'ok',
              totalResults: filteredArticles.length,
              articles: filteredArticles
            }
          };
        }
      }
    }),
  }),
});

export const { useGetTopHeadlinesQuery, useSearchNewsQuery } = newsApi; 