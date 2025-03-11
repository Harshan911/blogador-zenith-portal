
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Save, ArrowLeft } from 'lucide-react';
import { BlogPost, getBlogPostBySlug } from '../data/blogPosts';

const BlogEditor = () => {
  const { slug } = useParams();
  const isEditing = Boolean(slug);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [readTime, setReadTime] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/admin');
      return;
    }

    // If editing, load post data
    if (isEditing && slug) {
      const post = getBlogPostBySlug(slug);
      if (post) {
        setTitle(post.title);
        setExcerpt(post.excerpt);
        setContent(post.content);
        setBannerImage(post.bannerImage || '');
        setReadTime(post.readTime);
      } else {
        toast({
          title: "Post not found",
          description: "The post you're trying to edit doesn't exist.",
          variant: "destructive",
        });
        navigate('/admin/dashboard');
      }
    }
  }, [isEditing, slug, navigate, toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // In a real app, this would be an API call to save the post
    setTimeout(() => {
      // Create a new blog post object
      const blogPost: Partial<BlogPost> = {
        title,
        excerpt,
        content,
        bannerImage: bannerImage || undefined,
        readTime,
        date: new Date().toISOString().split('T')[0],
        slug: isEditing ? slug : title.toLowerCase().replace(/\s+/g, '-')
      };

      toast({
        title: isEditing ? "Post updated" : "Post created",
        description: isEditing 
          ? "Your blog post has been successfully updated." 
          : "Your blog post has been successfully published.",
      });

      // In a real app, we would update the blog posts in the database
      setIsSubmitting(false);
      navigate('/admin/dashboard');
    }, 1000);
  };

  // Calculate SEO score based on content
  const calculateSeoScore = () => {
    let score = 0;
    
    // Title length check (best between 50-60 characters)
    if (title.length > 30 && title.length < 70) score += 20;
    
    // Content length check (at least 300 words)
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    if (wordCount > 300) score += 20;
    if (wordCount > 800) score += 10;
    
    // Has meta description (excerpt)
    if (excerpt.length > 120 && excerpt.length < 160) score += 20;
    
    // Has image
    if (bannerImage) score += 15;
    
    // Keywords in title (simplified)
    const keywords = ['react', 'javascript', 'typescript', 'web', 'development', 'programming'];
    const titleLower = title.toLowerCase();
    if (keywords.some(keyword => titleLower.includes(keyword))) score += 15;
    
    return Math.min(score, 100);
  };

  const seoScore = calculateSeoScore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate('/admin/dashboard')} 
            className="h-9 w-9"
          >
            <ArrowLeft size={18} />
          </Button>
          <h1 className="text-3xl font-bold text-primary">
            {isEditing ? 'Edit Post' : 'Create New Post'}
          </h1>
        </div>
        
        <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="excerpt" className="text-sm font-medium">Excerpt/Meta Description</label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief summary of your post (displayed in cards and search results)"
                required
                rows={3}
              />
              <p className="text-xs text-gray-500">
                {150 - excerpt.length} characters remaining
                {excerpt.length > 150 && excerpt.length < 160 && " (Ideal length)"}
                {excerpt.length > 160 && " (Too long for SEO)"}
              </p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="bannerImage" className="text-sm font-medium">Banner Image URL</label>
              <Input
                id="bannerImage"
                value={bannerImage}
                onChange={(e) => setBannerImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              {bannerImage && (
                <div className="mt-2 rounded-md overflow-hidden h-40">
                  <img 
                    src={bannerImage} 
                    alt="Banner preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/600x400?text=Invalid+Image+URL';
                    }}
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">Content</label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your blog post content here..."
                required
                className="min-h-[300px]"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="readTime" className="text-sm font-medium">Read Time (minutes)</label>
              <Input
                id="readTime"
                type="number"
                value={readTime}
                onChange={(e) => setReadTime(parseInt(e.target.value) || 1)}
                min={1}
                max={60}
                required
              />
            </div>
            
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  {isEditing ? 'Updating Post...' : 'Publishing Post...'}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save size={18} />
                  {isEditing ? 'Update Post' : 'Publish Post'}
                </span>
              )}
            </Button>
          </form>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">SEO Analysis</h2>
                
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Score</span>
                    <span className="text-sm">{seoScore}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        seoScore >= 70 ? 'bg-green-500' : 
                        seoScore >= 40 ? 'bg-yellow-500' : 
                        'bg-red-500'
                      }`} 
                      style={{ width: `${seoScore}%` }}
                    ></div>
                  </div>
                </div>
                
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className={`inline-block w-5 h-5 ${title.length > 30 && title.length < 70 ? 'text-green-500' : 'text-gray-400'}`}>✓</span>
                    <span>Title length ({title.length} chars): {title.length > 30 && title.length < 70 ? 'Good' : 'Needs improvement'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`inline-block w-5 h-5 ${excerpt.length > 120 && excerpt.length < 160 ? 'text-green-500' : 'text-gray-400'}`}>✓</span>
                    <span>Meta description: {excerpt.length > 120 && excerpt.length < 160 ? 'Good' : 'Needs improvement'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`inline-block w-5 h-5 ${bannerImage ? 'text-green-500' : 'text-gray-400'}`}>✓</span>
                    <span>Banner image: {bannerImage ? 'Present' : 'Missing'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`inline-block w-5 h-5 ${content.split(/\s+/).filter(Boolean).length > 300 ? 'text-green-500' : 'text-gray-400'}`}>✓</span>
                    <span>Word count ({content.split(/\s+/).filter(Boolean).length}): {content.split(/\s+/).filter(Boolean).length > 300 ? 'Good' : 'Needs more content'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`inline-block w-5 h-5 ${content.includes(title) ? 'text-green-500' : 'text-gray-400'}`}>✓</span>
                    <span>Title in content: {content.includes(title) ? 'Present' : 'Missing'}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-2">Preview</h2>
                {title ? (
                  <div className="prose max-w-none">
                    <h1 className="text-xl font-bold">{title}</h1>
                    {excerpt && <p className="text-gray-600 text-sm">{excerpt}</p>}
                    {bannerImage && (
                      <div className="my-2 rounded-md overflow-hidden h-32">
                        <img 
                          src={bannerImage} 
                          alt="Banner preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://placehold.co/600x400?text=Invalid+Image+URL';
                          }}
                        />
                      </div>
                    )}
                    <div className="text-xs text-gray-500">{readTime} min read</div>
                  </div>
                ) : (
                  <p className="text-gray-500">Fill in the details to see a preview</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogEditor;
