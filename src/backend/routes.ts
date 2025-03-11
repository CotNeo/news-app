import express, { Request, Response } from 'express';
import { Article } from '../redux/newsSlice';
import { NewsModel, convertToArticleDocument, convertToArticle } from './models';

const router = express.Router();

// Get all saved articles
router.get('/favorites', async (req: Request, res: Response) => {
  try {
    const favorites = await NewsModel.find().sort({ createdAt: -1 });
    const articles = favorites.map((doc) => convertToArticle(doc));
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites', error });
  }
});

// Save an article to favorites
router.post('/favorites', async (req: Request, res: Response) => {
  try {
    const article: Article = req.body;
    const existingArticle = await NewsModel.findOne({ articleId: article.id });
    
    if (existingArticle) {
      return res.status(400).json({ message: 'Article already in favorites' });
    }
    
    const articleDoc = convertToArticleDocument(article);
    const newArticle = new NewsModel(articleDoc);
    await newArticle.save();
    
    res.status(201).json(convertToArticle(newArticle));
  } catch (error) {
    res.status(500).json({ message: 'Error saving article', error });
  }
});

// Remove an article from favorites
router.delete('/favorites/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedArticle = await NewsModel.findOneAndDelete({ articleId: id });
    
    if (!deletedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    res.status(200).json({ message: 'Article removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing article', error });
  }
});

export const newsRoutes = router; 