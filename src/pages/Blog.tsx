
import React from 'react';
import Header from '../components/Header';
import BlogCard from '../components/BlogCard';
import { getAllBlogPosts } from '../data/blogPosts';

const Blog = () => {
  const allPosts = getAllBlogPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h1 className="text-4xl font-bold text-primary mb-6">Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Explore our latest articles on web development, programming, and technology.
          </p>
        </section>
        
        <section>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allPosts.map((post) => (
              <BlogCard 
                key={post.slug} 
                title={post.title} 
                excerpt={post.excerpt} 
                date={post.date} 
                slug={post.slug} 
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blog;
