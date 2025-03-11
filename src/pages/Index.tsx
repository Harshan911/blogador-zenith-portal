
import React from 'react';
import Header from '../components/Header';
import BlogCard from '../components/BlogCard';

const Index = () => {
  // Temporary mock data
  const featuredPosts = [
    {
      title: "Getting Started with React",
      excerpt: "Learn the basics of React and start building modern web applications.",
      date: "2024-02-20",
      slug: "getting-started-with-react"
    },
    {
      title: "Understanding TypeScript",
      excerpt: "A comprehensive guide to TypeScript for JavaScript developers.",
      date: "2024-02-19",
      slug: "understanding-typescript"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h1 className="text-4xl font-bold text-primary mb-6">Welcome to BlogApp</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Discover insightful articles about web development, programming, and technology.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Featured Posts</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
