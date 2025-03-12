
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  bannerImage?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, excerpt, date, slug, bannerImage }) => {
  return (
    <Card className="bg-loansavail-navy text-white border-0 rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
      {bannerImage && (
        <div className="relative w-full pt-[56.25%] overflow-hidden">
          <img 
            src={bannerImage} 
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-white">
          <Link to={`/blog/${slug}`} className="hover:text-gray-200 transition-colors">{title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow pb-2">
        <p className="text-gray-300">{excerpt}</p>
      </CardContent>
      <CardFooter className="text-sm text-gray-400 pt-0">
        <div className="bg-white/20 text-white px-2 py-1 rounded text-xs">
          {new Date(date).toLocaleDateString()}
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
