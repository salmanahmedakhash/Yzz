
export interface Category {
  id: string;
  name: string;
  slug: string;
  order: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  content: string; // The full text of the book
  category: string; // matches category slug
  coverUrl: string;
  rating: number;
  isHidden: boolean;
  createdAt: any; // Firestore Timestamp
  views: number;
}

export interface SiteStats {
  totalVisits: number;
  lastUpdated: any;
  totalBooks: number;
  totalCategories: number;
}

export enum Page {
  DASHBOARD = 'dashboard',
  BOOKS = 'books',
  CATEGORIES = 'categories',
  ANALYTICS = 'analytics',
  SETTINGS = 'settings',
  ADD_BOOK = 'add-book',
  EDIT_BOOK = 'edit-book',
  ADD_CATEGORY = 'add-category',
  EDIT_CATEGORY = 'edit-category'
}
