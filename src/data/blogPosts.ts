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

// Function to get all blog posts
export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM blog_posts ORDER BY date DESC'
    );
    
    return rows.map(row => ({
      ...row,
      keywords: row.keywords ? JSON.parse(row.keywords) : []
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    // Fallback to sample data when database is not available
    return sampleBlogPosts;
  }
};

// Function to get a blog post by slug
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM blog_posts WHERE slug = ?',
      [slug]
    );
    
    if (rows.length === 0) {
      return undefined;
    }
    
    const post = rows[0];
    return {
      ...post,
      keywords: post.keywords ? JSON.parse(post.keywords) : []
    };
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    // Fallback to sample data when database is not available
    return sampleBlogPosts.find(post => post.slug === slug);
  }
};

// Function to add a new blog post
export const addBlogPost = async (post: BlogPost): Promise<void> => {
  try {
    // Prepare keywords for storage
    const keywordsJson = post.keywords ? JSON.stringify(post.keywords) : null;
    
    await pool.query(
      `INSERT INTO blog_posts 
       (title, excerpt, content, date, slug, readTime, bannerImage, keywords, 
        authorName, metaTitle, metaDescription, isPublished, lastModified) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        post.title,
        post.excerpt,
        post.content,
        post.date,
        post.slug,
        post.readTime,
        post.bannerImage || null,
        keywordsJson,
        post.authorName || 'Admin User',
        post.metaTitle || post.title,
        post.metaDescription || post.excerpt,
        post.isPublished !== undefined ? post.isPublished : true,
        post.lastModified || post.date
      ]
    );
  } catch (error) {
    console.error('Error adding blog post:', error);
    // For fallback behavior, add to sample array if database operation fails
    sampleBlogPosts.unshift(post);
    throw new Error('Failed to add blog post to database');
  }
};

// Function to update an existing blog post
export const updateBlogPost = async (updatedPost: BlogPost): Promise<boolean> => {
  try {
    // Prepare keywords for storage
    const keywordsJson = updatedPost.keywords ? JSON.stringify(updatedPost.keywords) : null;
    
    const [result] = await pool.query<ResultSetHeader>(
      `UPDATE blog_posts 
       SET title = ?, excerpt = ?, content = ?, readTime = ?, bannerImage = ?, 
           keywords = ?, authorName = ?, metaTitle = ?, metaDescription = ?, 
           isPublished = ?, lastModified = ? 
       WHERE slug = ?`,
      [
        updatedPost.title,
        updatedPost.excerpt,
        updatedPost.content,
        updatedPost.readTime,
        updatedPost.bannerImage || null,
        keywordsJson,
        updatedPost.authorName || 'Admin User',
        updatedPost.metaTitle || updatedPost.title,
        updatedPost.metaDescription || updatedPost.excerpt,
        updatedPost.isPublished !== undefined ? updatedPost.isPublished : true,
        new Date().toISOString().split('T')[0],
        updatedPost.slug
      ]
    );
    
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error updating blog post:', error);
    // For fallback behavior, update sample array if database operation fails
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
export const deleteBlogPost = async (slug: string): Promise<boolean> => {
  try {
    const [result] = await pool.query<ResultSetHeader>(
      'DELETE FROM blog_posts WHERE slug = ?',
      [slug]
    );
    
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    // For fallback behavior, delete from sample array if database operation fails
    const index = sampleBlogPosts.findIndex(post => post.slug === slug);
    if (index !== -1) {
      sampleBlogPosts.splice(index, 1);
      return true;
    }
    return false;
  }
};

// Function to search blog posts
export const searchBlogPosts = async (query: string): Promise<BlogPost[]> => {
  try {
    const searchQuery = `%${query}%`;
    
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM blog_posts 
       WHERE title LIKE ? OR content LIKE ? OR excerpt LIKE ? OR keywords LIKE ?
       ORDER BY date DESC`,
      [searchQuery, searchQuery, searchQuery, searchQuery]
    );
    
    return rows.map(row => ({
      ...row,
      keywords: row.keywords ? JSON.parse(row.keywords) : []
    }));
  } catch (error) {
    console.error('Error searching blog posts:', error);
    // Fallback to searching sample data
    const lowerCaseQuery = query.toLowerCase();
    return sampleBlogPosts.filter(post => 
      post.title.toLowerCase().includes(lowerCaseQuery) || 
      post.content.toLowerCase().includes(lowerCaseQuery) ||
      post.excerpt.toLowerCase().includes(lowerCaseQuery) ||
      post.keywords?.some(keyword => keyword.toLowerCase().includes(lowerCaseQuery))
    );
  }
};
