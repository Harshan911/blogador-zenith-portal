
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
    <Card className="hover:shadow-lg transition-shadow flex flex-col h-full">
      {bannerImage && (
        <div className="relative w-full pt-[56.25%] overflow-hidden">
          <img 
            src={bannerImage} 
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary">
          <Link to={`/blog/${slug}`}>{title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600">{excerpt}</p>
      </CardContent>
      <CardFooter className="text-sm text-gray-500">
        {new Date(date).toLocaleDateString()}
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
