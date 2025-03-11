
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { getBlogPostBySlug } from '../data/blogPosts';

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug || '');

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800">Post not found</h1>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {post.bannerImage && (
          <div className="w-full h-64 md:h-96 mb-8 overflow-hidden rounded-lg">
            <img 
              src={post.bannerImage} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold text-primary mb-4">{post.title}</h1>
        <div className="text-sm text-gray-500 mb-8">
          {new Date(post.date).toLocaleDateString()} • {post.readTime} min read
        </div>
        <div className="prose max-w-none">
          {post.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4 text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BlogDetail;
