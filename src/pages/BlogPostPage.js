import React from 'react';
import { useParams } from 'react-router-dom';
import BlogPost from '../components/BlogPost/BlogPost';

const BlogPostPage = () => {
  const { slug } = useParams();
  
  return <BlogPost slug={slug} />;
};

export default BlogPostPage;