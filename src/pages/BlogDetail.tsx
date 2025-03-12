
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { getBlogPostBySlug } from '../data/blogPosts';

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug || '');

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-loansavail-navy">Post not found</h1>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Banner Image */}
        {post.bannerImage && (
          <div className="w-full h-64 md:h-96 overflow-hidden">
            <img 
              src={post.bannerImage} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-loansavail-navy mb-4">{post.title}</h1>
          <div className="text-sm text-gray-500 mb-8 flex items-center">
            <div className="bg-loansavail-navy text-white px-3 py-1 rounded text-xs mr-4">
              {new Date(post.date).toLocaleDateString()}
            </div>
            <span>{post.readTime} min read</span>
          </div>
          <div className="prose max-w-none">
            {post.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-loansavail-darknavy text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <a href="/" className="text-3xl font-cursive font-bold text-white">LoansAvail</a>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="hover:text-gray-300 transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Business Loan</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Home Loan</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Education Loan</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Personal Loan</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="mb-2">Loansavail@gmail.com</p>
              <div className="mt-4">
                <h4 className="text-md font-medium mb-2">Legal</h4>
                <ul className="space-y-1">
                  <li><a href="#" className="hover:text-gray-300 transition-colors">Terms And Conditions</a></li>
                  <li><a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogDetail;
