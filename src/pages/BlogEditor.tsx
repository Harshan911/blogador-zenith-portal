import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Save, ArrowLeft, Eye, EyeOff, Link as LinkIcon, Image, Info, Upload } from 'lucide-react';
import { BlogPost, getBlogPostBySlug, addBlogPost, updateBlogPost } from '../data/blogPosts';
import RichTextEditor from '../components/RichTextEditor';
import KeywordsInput from '../components/KeywordsInput';

const BlogEditor = () => {
  const { slug } = useParams();
  const isEditing = Boolean(slug);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [readTime, setReadTime] = useState(5);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [authorName, setAuthorName] = useState('Admin User');
  const [isPublished, setIsPublished] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/admin');
      return;
    }

    if (isEditing && slug) {
      const post = getBlogPostBySlug(slug);
      if (post) {
        setTitle(post.title);
        setMetaTitle(post.metaTitle || post.title);
        setExcerpt(post.excerpt);
        setMetaDescription(post.metaDescription || post.excerpt);
        setContent(post.content);
        setBannerImage(post.bannerImage || '');
        setReadTime(post.readTime);
        setKeywords(post.keywords || []);
        setAuthorName(post.authorName || 'Admin User');
        setIsPublished(post.isPublished !== undefined ? post.isPublished : true);
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

  const handleImageUpload = useCallback(async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert image to data URL'));
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }, []);

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await handleImageUpload(file);
        setBannerImage(imageUrl);
      } catch (error) {
        console.error('Failed to upload banner image:', error);
        toast({
          title: "Upload Failed",
          description: "Could not upload the banner image. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const blogPost: BlogPost = {
        title,
        metaTitle: metaTitle || title,
        excerpt,
        metaDescription: metaDescription || excerpt,
        content,
        bannerImage: bannerImage || undefined,
        readTime,
        keywords,
        authorName,
        isPublished,
        date: isEditing ? getBlogPostBySlug(slug!)?.date || new Date().toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0],
        slug: isEditing ? slug! : title.toLowerCase().replace(/\s+/g, '-')
      };

      if (isEditing) {
        updateBlogPost(blogPost);
      } else {
        addBlogPost(blogPost);
      }

      toast({
        title: isEditing ? "Post updated" : "Post created",
        description: isEditing 
          ? "Your blog post has been successfully updated." 
          : "Your blog post has been successfully published.",
      });

      setIsSubmitting(false);
      navigate('/admin/dashboard');
    }, 1000);
  };

  const calculateSeoScore = useCallback(() => {
    let score = 0;
    let issues: string[] = [];
    
    if (title.length >= 40 && title.length <= 60) {
      score += 20;
    } else if (title.length > 0) {
      score += 10;
      issues.push(`Title length (${title.length} chars) - ideal is 40-60 characters`);
    } else {
      issues.push("Title is missing");
    }
    
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    if (wordCount >= 800) {
      score += 30;
    } else if (wordCount >= 300) {
      score += 20;
      issues.push(`Content length (${wordCount} words) - aim for 800+ words for better SEO`);
    } else if (wordCount > 0) {
      score += 10;
      issues.push(`Content is too short (${wordCount} words) - aim for at least 300 words`);
    } else {
      issues.push("Content is missing");
    }
    
    if (metaDescription.length >= 120 && metaDescription.length <= 160) {
      score += 15;
    } else if (metaDescription.length > 0) {
      score += 5;
      issues.push(`Meta description length (${metaDescription.length} chars) - ideal is 120-160 characters`);
    } else {
      issues.push("Meta description is missing");
    }
    
    if (bannerImage) {
      score += 10;
    } else {
      issues.push("Banner image is missing");
    }
    
    if (keywords.length >= 3 && keywords.length <= 8) {
      score += 15;
    } else if (keywords.length > 0) {
      score += 5;
      issues.push(`Keyword count (${keywords.length}) - ideal is 3-8 focused keywords`);
    } else {
      issues.push("Keywords are missing");
    }
    
    if (keywords.length > 0) {
      const primaryKeyword = keywords[0];
      let titleContainsKeyword = false;
      let contentContainsKeyword = false;
      
      if (title.toLowerCase().includes(primaryKeyword.toLowerCase())) {
        titleContainsKeyword = true;
        score += 5;
      }
      
      if (content.toLowerCase().includes(primaryKeyword.toLowerCase())) {
        contentContainsKeyword = true;
        score += 5;
      }
      
      if (!titleContainsKeyword) {
        issues.push(`Primary keyword "${primaryKeyword}" is not in the title`);
      }
      
      if (!contentContainsKeyword) {
        issues.push(`Primary keyword "${primaryKeyword}" is not in the content`);
      }
    }
    
    return { score: Math.min(score, 100), issues };
  }, [title, content, metaDescription, bannerImage, keywords]);

  const { score: seoScore, issues: seoIssues } = calculateSeoScore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
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
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-1"
            >
              {showPreview ? (
                <>
                  <EyeOff size={16} />
                  <span>Hide Preview</span>
                </>
              ) : (
                <>
                  <Eye size={16} />
                  <span>Show Preview</span>
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setIsPublished(!isPublished)}
              className={`flex items-center gap-1 ${isPublished ? 'text-green-600 border-green-600' : 'text-amber-600 border-amber-600'}`}
            >
              {isPublished ? 'Published' : 'Draft'}
            </Button>
          </div>
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
              <label htmlFor="metaTitle" className="text-sm font-medium">SEO Title (optional)</label>
              <Input
                id="metaTitle"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="SEO optimized title (defaults to post title)"
              />
              <p className="text-xs text-gray-500">
                {60 - metaTitle.length} characters remaining
                {metaTitle.length > 60 && " (Too long for search results)"}
              </p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="excerpt" className="text-sm font-medium">Excerpt</label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief summary of your post (displayed in cards)"
                required
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="metaDescription" className="text-sm font-medium">Meta Description (optional)</label>
              <Textarea
                id="metaDescription"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="SEO optimized description (defaults to excerpt)"
                rows={3}
              />
              <p className="text-xs text-gray-500">
                {160 - metaDescription.length} characters remaining
                {metaDescription.length > 150 && metaDescription.length <= 160 && " (Ideal length)"}
                {metaDescription.length > 160 && " (Too long for search results)"}
              </p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="bannerImage" className="text-sm font-medium">Banner Image</label>
              <div className="flex gap-2 items-center">
                <div className="relative flex-1">
                  <Input
                    id="bannerImage"
                    value={bannerImage}
                    onChange={(e) => setBannerImage(e.target.value)}
                    placeholder="https://example.com/image.jpg or upload an image"
                    className="pr-10"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-400">
                    <LinkIcon size={14} />
                  </div>
                </div>
                <div className="relative">
                  <Button 
                    type="button" 
                    variant="outline"
                    className="flex items-center gap-1"
                    onClick={() => document.getElementById('banner-upload')?.click()}
                  >
                    <Upload size={16} />
                    <span>Upload</span>
                  </Button>
                  <input
                    id="banner-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleBannerUpload}
                  />
                </div>
              </div>
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
              <label htmlFor="keywords" className="text-sm font-medium">Keywords</label>
              <KeywordsInput 
                keywords={keywords} 
                onChange={setKeywords} 
              />
              <p className="text-xs text-gray-500">Add 3-8 relevant keywords, with most important ones first</p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">Content</label>
              <div className="border border-input rounded-md overflow-hidden">
                <RichTextEditor 
                  value={content} 
                  onChange={setContent} 
                  height={500}
                  onImageUpload={handleImageUpload}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
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
              
              <div className="space-y-2">
                <label htmlFor="authorName" className="text-sm font-medium">Author Name</label>
                <Input
                  id="authorName"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Author name"
                />
              </div>
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
                    <span 
                      className={`text-sm font-medium ${
                        seoScore >= 80 ? 'text-green-600' : 
                        seoScore >= 50 ? 'text-amber-600' : 'text-red-600'
                      }`}
                    >
                      {seoScore}/100 ({
                        seoScore >= 80 ? 'Good' : 
                        seoScore >= 50 ? 'Needs Improvement' : 'Poor'
                      })
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        seoScore >= 80 ? 'bg-green-600' : 
                        seoScore >= 50 ? 'bg-amber-600' : 
                        'bg-red-600'
                      }`} 
                      style={{ width: `${seoScore}%` }}
                    ></div>
                  </div>
                </div>
                
                {seoIssues.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">Issues to address:</h3>
                    <ul className="space-y-2 text-sm">
                      {seoIssues.map((issue, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Info size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-medium mb-2">SEO Checklist:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className={`inline-block w-5 h-5 ${title.length >= 40 && title.length <= 60 ? 'text-green-500' : 'text-gray-400'}`}>✓</span>
                      <span>Title length ({title.length} chars): {title.length >= 40 && title.length <= 60 ? 'Good' : 'Needs improvement'}</span>
                    </li>
                    <li className="flex items-start">
                      <span className={`inline-block w-5 h-5 ${metaDescription.length >= 120 && metaDescription.length <= 160 ? 'text-green-500' : 'text-gray-400'}`}>✓</span>
                      <span>Meta description: {metaDescription.length >= 120 && metaDescription.length <= 160 ? 'Good' : 'Needs improvement'}</span>
                    </li>
                    <li className="flex items-start">
                      <span className={`inline-block w-5 h-5 ${bannerImage ? 'text-green-500' : 'text-gray-400'}`}>✓</span>
                      <span>Banner image: {bannerImage ? 'Present' : 'Missing'}</span>
                    </li>
                    <li className="flex items-start">
                      <span className={`inline-block w-5 h-5 ${content.split(/\s+/).filter(Boolean).length >= 300 ? 'text-green-500' : 'text-gray-400'}`}>✓</span>
                      <span>Word count ({content.split(/\s+/).filter(Boolean).length}): {content.split(/\s+/).filter(Boolean).length >= 300 ? 'Good' : 'Needs more content'}</span>
                    </li>
                    <li className="flex items-start">
                      <span className={`inline-block w-5 h-5 ${keywords.length >= 3 && keywords.length <= 8 ? 'text-green-500' : 'text-gray-400'}`}>✓</span>
                      <span>Keywords: {keywords.length >= 3 && keywords.length <= 8 ? 'Good' : 'Need 3-8 keywords'}</span>
                    </li>
                    {keywords.length > 0 && (
                      <li className="flex items-start">
                        <span className={`inline-block w-5 h-5 ${content.toLowerCase().includes(keywords[0].toLowerCase()) ? 'text-green-500' : 'text-gray-400'}`}>✓</span>
                        <span>Primary keyword in content: {content.toLowerCase().includes(keywords[0].toLowerCase()) ? 'Yes' : 'No'}</span>
                      </li>
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            {showPreview && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Content Preview</h2>
                  
                  {title ? (
                    <div className="prose max-w-none">
                      <h1 className="text-xl font-bold">{title}</h1>
                      
                      <div className="flex items-center text-sm text-gray-600 mt-2 mb-4">
                        <span>{authorName}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date().toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <span>{readTime} min read</span>
                      </div>
                      
                      {bannerImage && (
                        <div className="my-4 rounded-md overflow-hidden">
                          <img 
                            src={bannerImage} 
                            alt={title} 
                            className="w-full h-auto object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://placehold.co/600x400?text=Invalid+Image+URL';
                            }}
                          />
                        </div>
                      )}
                      
                      {excerpt && (
                        <div className="my-4 text-gray-700 font-italic border-l-4 border-primary/20 pl-4 py-2 bg-primary/5 rounded">
                          {excerpt}
                        </div>
                      )}
                      
                      <div className="mt-4" dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                  ) : (
                    <p className="text-gray-500">Fill in the details to see a preview</p>
                  )}
                </CardContent>
              </Card>
            )}
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-2">Search Preview</h2>
                <div className="border border-gray-200 rounded p-4 bg-white">
                  <div className="text-blue-600 text-lg font-medium truncate">{metaTitle || title || "Page Title"}</div>
                  <div className="text-green-700 text-sm truncate">{window.location.origin}/blog/{title ? title.toLowerCase().replace(/\s+/g, '-') : 'post-slug'}</div>
                  <div className="text-gray-600 text-sm mt-1">{metaDescription || excerpt || "Add a meta description to see how this post will appear in search results."}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogEditor;
