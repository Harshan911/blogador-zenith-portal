
import { getBlogPosts, getBlogPostBySlug as getPostBySlug } from '../utils/netlifyContent';

export interface BlogPost {
  id?: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  slug: string;
  readTime: number;
  bannerImage?: string;
  keywords?: string[];
  authorName?: string;
  metaTitle?: string;
  metaDescription?: string;
  isPublished?: boolean;
  lastModified?: string;
}

// Function to get all blog posts
export const getAllBlogPosts = (): BlogPost[] => {
  return getBlogPosts();
};

// Function to get a blog post by slug
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return getPostBySlug(slug);
};

// Function to add a new blog post - This would now be handled by Netlify CMS
export const addBlogPost = (post: BlogPost): void => {
  console.log("Adding blog posts is now handled through Netlify CMS");
  // In a real Netlify CMS setup, posts are added through the CMS interface
};

// Function to update an existing blog post - This would now be handled by Netlify CMS
export const updateBlogPost = (updatedPost: BlogPost): boolean => {
  console.log("Updating blog posts is now handled through Netlify CMS");
  // In a real Netlify CMS setup, posts are updated through the CMS interface
  return true;
};

// Function to delete a blog post - This would now be handled by Netlify CMS
export const deleteBlogPost = (slug: string): boolean => {
  console.log("Deleting blog posts is now handled through Netlify CMS");
  // In a real Netlify CMS setup, posts are deleted through the CMS interface
  return true;
};

// Function to search blog posts
export const searchBlogPosts = (query: string): BlogPost[] => {
  const posts = getAllBlogPosts();
  const lowerCaseQuery = query.toLowerCase();
  return posts.filter(post => 
    post.title.toLowerCase().includes(lowerCaseQuery) || 
    post.content.toLowerCase().includes(lowerCaseQuery) ||
    post.excerpt.toLowerCase().includes(lowerCaseQuery) ||
    post.keywords?.some(keyword => keyword.toLowerCase().includes(lowerCaseQuery))
  );
};
