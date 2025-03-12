import pool from '../utils/dbConfig';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

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

// Sample blog posts data for fallback/development
const sampleBlogPosts: BlogPost[] = [
  {
    title: "Getting Started with React",
    excerpt: "Learn the basics of React and start building modern web applications.",
    content: "React is a JavaScript library for building user interfaces. It's declarative, efficient, and flexible.\n\nCreated by Facebook, React has become one of the most popular front-end libraries in the world. It allows developers to create reusable UI components that update efficiently when data changes.\n\nReact uses a virtual DOM to optimize rendering performance. When the state of your application changes, React first updates a virtual representation of the DOM, compares it with the previous version, and then makes the minimum set of changes required to update the actual DOM.\n\nTo get started with React, you'll need to understand JSX, components, props, and state. JSX is a syntax extension that allows you to write HTML-like code in your JavaScript. Components are the building blocks of React applications. Props allow you to pass data from parent to child components, and state lets you manage data that changes over time.",
    date: "2024-02-20",
    slug: "getting-started-with-react",
    readTime: 5,
    bannerImage: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    keywords: ["react", "javascript", "web development"],
    authorName: "Admin User",
    isPublished: true,
    lastModified: "2024-02-20"
  },
  {
    title: "Understanding TypeScript",
    excerpt: "A comprehensive guide to TypeScript for JavaScript developers.",
    content: "TypeScript is a strongly typed programming language that builds on JavaScript. It adds static types to JavaScript, helping to catch errors early during development.\n\nDeveloped and maintained by Microsoft, TypeScript is designed for developing large applications and transpiles to JavaScript. It's a superset of JavaScript, which means any valid JavaScript code is also valid TypeScript code.\n\nOne of the main benefits of TypeScript is its type system. By defining the types of variables, function parameters, and return values, you can catch type-related errors during development rather than at runtime. This leads to more robust code and a better developer experience.\n\nTypeScript also supports modern JavaScript features, even if they're not supported by all browsers yet. The TypeScript compiler can transpile these features to older versions of JavaScript, ensuring compatibility with a wider range of browsers.\n\nTo get started with TypeScript, you'll need to install it using npm or yarn, and set up a tsconfig.json file to specify compiler options. You can then start writing TypeScript code, which will be transpiled to JavaScript when you build your project.",
    date: "2024-02-19",
    slug: "understanding-typescript",
    readTime: 7,
    bannerImage: "https://images.unsplash.com/photo-1600267204048-88953d381b96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    keywords: ["typescript", "javascript", "programming"],
    authorName: "Admin User",
    isPublished: true,
    lastModified: "2024-02-19"
  }
];

// Function to get all blog posts - NOW RETURNS SYNCHRONOUSLY FOR THE FRONTEND
export const getAllBlogPosts = (): BlogPost[] => {
  try {
    // Instead of trying to use MySQL in the browser, we'll use sample data
    // In a real app, this would be an API call
    return sampleBlogPosts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return sampleBlogPosts;
  }
};

// Function to get a blog post by slug - NOW RETURNS SYNCHRONOUSLY FOR THE FRONTEND
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  try {
    // Instead of trying to use MySQL in the browser, we'll use sample data
    // In a real app, this would be an API call
    return sampleBlogPosts.find(post => post.slug === slug);
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return sampleBlogPosts.find(post => post.slug === slug);
  }
};

// Function to add a new blog post
export const addBlogPost = (post: BlogPost): void => {
  try {
    // Instead of trying to use MySQL in the browser, we'll add to sample data
    // In a real app, this would be an API call
    sampleBlogPosts.unshift(post);
  } catch (error) {
    console.error('Error adding blog post:', error);
    sampleBlogPosts.unshift(post);
  }
};

// Function to update an existing blog post
export const updateBlogPost = (updatedPost: BlogPost): boolean => {
  try {
    // Instead of trying to use MySQL in the browser, we'll update sample data
    // In a real app, this would be an API call
    const index = sampleBlogPosts.findIndex(post => post.slug === updatedPost.slug);
    if (index !== -1) {
      sampleBlogPosts[index] = {
        ...updatedPost,
        lastModified: new Date().toISOString().split('T')[0]
      };
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating blog post:', error);
    const index = sampleBlogPosts.findIndex(post => post.slug === updatedPost.slug);
    if (index !== -1) {
      sampleBlogPosts[index] = {
        ...updatedPost,
        lastModified: new Date().toISOString().split('T')[0]
      };
      return true;
    }
    return false;
  }
};

// Function to delete a blog post
export const deleteBlogPost = (slug: string): boolean => {
  try {
    // Instead of trying to use MySQL in the browser, we'll delete from sample data
    // In a real app, this would be an API call
    const index = sampleBlogPosts.findIndex(post => post.slug === slug);
    if (index !== -1) {
      sampleBlogPosts.splice(index, 1);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    const index = sampleBlogPosts.findIndex(post => post.slug === slug);
    if (index !== -1) {
      sampleBlogPosts.splice(index, 1);
      return true;
    }
    return false;
  }
};

// Function to search blog posts
export const searchBlogPosts = (query: string): BlogPost[] => {
  try {
    // Instead of trying to use MySQL in the browser, we'll search sample data
    // In a real app, this would be an API call
    const lowerCaseQuery = query.toLowerCase();
    return sampleBlogPosts.filter(post => 
      post.title.toLowerCase().includes(lowerCaseQuery) || 
      post.content.toLowerCase().includes(lowerCaseQuery) ||
      post.excerpt.toLowerCase().includes(lowerCaseQuery) ||
      post.keywords?.some(keyword => keyword.toLowerCase().includes(lowerCaseQuery))
    );
  } catch (error) {
    console.error('Error searching blog posts:', error);
    const lowerCaseQuery = query.toLowerCase();
    return sampleBlogPosts.filter(post => 
      post.title.toLowerCase().includes(lowerCaseQuery) || 
      post.content.toLowerCase().includes(lowerCaseQuery) ||
      post.excerpt.toLowerCase().includes(lowerCaseQuery) ||
      post.keywords?.some(keyword => keyword.toLowerCase().includes(lowerCaseQuery))
    );
  }
};

// For server-side use only - these functions should be used in API routes
// Here we'll just keep the commented logic as reference for server-side implementation
/*
export const getAllBlogPostsAsync = async (): Promise<BlogPost[]> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM blog_posts ORDER BY date DESC'
    );
    
    return rows.map(row => ({
      ...row,
      keywords: row.keywords ? JSON.parse(row.keywords) : []
    })) as BlogPost[];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return sampleBlogPosts;
  }
};

export const getBlogPostBySlugAsync = async (slug: string): Promise<BlogPost | undefined> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM blog_posts WHERE slug = ?',
      [slug]
    );
    
    if (rows.length === 0) {
      return undefined;
    }
    
    const post = rows[0] as any;
    return {
      ...post,
      keywords: post.keywords ? JSON.parse(post.keywords) : []
    } as BlogPost;
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return sampleBlogPosts.find(post => post.slug === slug);
  }
};
*/
