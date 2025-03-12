
import React from 'react';
import Header from '../components/Header';
import BlogCard from '../components/BlogCard';
import { getAllBlogPosts } from '../data/blogPosts';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const Index = () => {
  const featuredPosts = getAllBlogPosts();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="loansavail-gradient text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">One Loan Application For All Banks in India</h1>
                <div className="space-y-3">
                  <div className="feature-item">
                    <span className="checked-icon">✓</span>
                    <span>Save Time, Stay Home</span>
                  </div>
                  <div className="feature-item">
                    <span className="checked-icon">✓</span>
                    <span>Hassle-free loan processing</span>
                  </div>
                  <div className="feature-item">
                    <span className="checked-icon">✓</span>
                    <span>Trusted by Banking Partners Around India</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="text-[200px] font-bold opacity-20">₹</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-loansavail-navy">Services We Offer</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="border-2 border-loansavail-navy text-loansavail-navy rounded-lg p-6 text-center hover:bg-loansavail-navy hover:text-white transition-all cursor-pointer">
                <h3 className="text-2xl font-bold">Business Loan</h3>
              </div>
              <div className="border-2 border-loansavail-navy text-loansavail-navy rounded-lg p-6 text-center hover:bg-loansavail-navy hover:text-white transition-all cursor-pointer">
                <h3 className="text-2xl font-bold">Home Loan</h3>
              </div>
              <div className="border-2 border-loansavail-navy text-loansavail-navy rounded-lg p-6 text-center hover:bg-loansavail-navy hover:text-white transition-all cursor-pointer">
                <h3 className="text-2xl font-bold">Personal Loan</h3>
              </div>
              <div className="border-2 border-loansavail-navy text-loansavail-navy rounded-lg p-6 text-center hover:bg-loansavail-navy hover:text-white transition-all cursor-pointer">
                <h3 className="text-2xl font-bold">Education Loan</h3>
              </div>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us */}
        <section className="py-16 loansavail-gradient text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="feature-item">
                <span className="checked-icon">✓</span>
                <span>100% Transparency</span>
              </div>
              <div className="feature-item">
                <span className="checked-icon">✓</span>
                <span>Hassle-free loan processing</span>
              </div>
              <div className="feature-item">
                <span className="checked-icon">✓</span>
                <span>Keeps You Updated With Process</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Blog Posts */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-loansavail-navy">Our Blogs</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.slice(0, 6).map((post) => (
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
            <div className="mt-10 text-center">
              <Link to="/blog" className="inline-block bg-loansavail-navy text-white font-bold px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors">
                View All Blogs
              </Link>
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section className="py-16 loansavail-gradient text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg leading-relaxed">
                Loansavail is a dynamic platform designed to simplify and streamline access to a wide range of loan services. We connect individuals and businesses with the most suitable financial products tailored to their unique needs. Whether you're looking for a personal loan, home loan, business loan, or other financial services, Loansavail offers expert guidance and a seamless experience. Our mission is to empower you with the right financial tools, ensuring swift and transparent processes from start to finish. At Loansavail, we prioritize your financial goals and work diligently to make borrowing hassle-free.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-loansavail-darknavy text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Link to="/" className="text-3xl font-cursive font-bold text-white">LoansAvail</Link>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-gray-300 transition-colors">Home</Link></li>
                <li><Link to="/blog" className="hover:text-gray-300 transition-colors">Business Loan</Link></li>
                <li><Link to="/blog" className="hover:text-gray-300 transition-colors">Home Loan</Link></li>
                <li><Link to="/blog" className="hover:text-gray-300 transition-colors">Education Loan</Link></li>
                <li><Link to="/blog" className="hover:text-gray-300 transition-colors">Personal Loan</Link></li>
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

export default Index;
