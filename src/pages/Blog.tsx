
import React from 'react';
import Header from '../components/Header';
import BlogCard from '../components/BlogCard';
import { getAllBlogPosts } from '../data/blogPosts';

const Blog = () => {
  const allPosts = getAllBlogPosts();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Page Header */}
        <section className="loansavail-gradient text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Our Blogs</h1>
            <p className="text-xl max-w-2xl">
              Explore our latest articles on finance, loans, banking, and much more.
            </p>
          </div>
        </section>
        
        {/* Blog List */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {allPosts.map((post) => (
                <BlogCard 
                  key={post.slug} 
                  title={post.title} 
                  excerpt={post.excerpt} 
                  date={post.date} 
                  slug={post.slug}
                  bannerImage={post.bannerImage}
                />
              ))}
            </div>
          </div>
        </section>
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

export default Blog;
