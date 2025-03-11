import mongoose, { Schema, Document } from 'mongoose';
import { Article } from '../redux/newsSlice';

// Define the ArticleDocument interface
export interface ArticleDocument extends Document {
  articleId: string; // Using articleId instead of id to avoid conflict with Document's id
  title: string;
  description?: string;
  content?: string;
  url: string;
  image?: string;
  publishedAt: string;
  source: {
    name: string;
    url?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Create a schema for the Article model
const ArticleSchema = new Schema<ArticleDocument>(
  {
    articleId: { type: String, required: true, unique: true }, // Using articleId instead of id
    title: { type: String, required: true },
    description: { type: String },
    content: { type: String },
    url: { type: String, required: true },
    image: { type: String },
    publishedAt: { type: String, required: true },
    source: {
      name: { type: String, required: true },
      url: { type: String },
    },
  },
  { timestamps: true }
);

// Create and export the Article model
export const NewsModel = mongoose.models.Article || mongoose.model<ArticleDocument>('Article', ArticleSchema);

// Helper function to convert between Article and ArticleDocument
export const convertToArticleDocument = (article: Article): Omit<ArticleDocument, keyof Document> => {
  return {
    articleId: article.id,
    title: article.title,
    description: article.description,
    content: article.content,
    url: article.url,
    image: article.image,
    publishedAt: article.publishedAt,
    source: article.source,
  };
};

// Helper function to convert from ArticleDocument to Article
export const convertToArticle = (doc: ArticleDocument): Article => {
  return {
    id: doc.articleId,
    title: doc.title,
    description: doc.description || '',
    content: doc.content || '',
    url: doc.url,
    image: doc.image || '',
    publishedAt: doc.publishedAt,
    source: {
      name: doc.source.name,
      url: doc.source.url || '',
    },
  };
}; 