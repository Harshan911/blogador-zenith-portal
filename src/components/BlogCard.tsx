
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, excerpt, date, slug }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary">
          <Link to={`/blog/${slug}`}>{title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{excerpt}</p>
      </CardContent>
      <CardFooter className="text-sm text-gray-500">
        {new Date(date).toLocaleDateString()}
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
