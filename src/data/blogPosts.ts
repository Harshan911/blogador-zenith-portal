
export interface BlogPost {
  title: string;
  excerpt: string;
  content: string;
  date: string;
  slug: string;
  readTime: number;
  bannerImage?: string;
}

// Sample blog posts data
export const blogPosts: BlogPost[] = [
  {
    title: "Getting Started with React",
    excerpt: "Learn the basics of React and start building modern web applications.",
    content: "React is a JavaScript library for building user interfaces. It's declarative, efficient, and flexible.\n\nCreated by Facebook, React has become one of the most popular front-end libraries in the world. It allows developers to create reusable UI components that update efficiently when data changes.\n\nReact uses a virtual DOM to optimize rendering performance. When the state of your application changes, React first updates a virtual representation of the DOM, compares it with the previous version, and then makes the minimum set of changes required to update the actual DOM.\n\nTo get started with React, you'll need to understand JSX, components, props, and state. JSX is a syntax extension that allows you to write HTML-like code in your JavaScript. Components are the building blocks of React applications. Props allow you to pass data from parent to child components, and state lets you manage data that changes over time.",
    date: "2024-02-20",
    slug: "getting-started-with-react",
    readTime: 5,
    bannerImage: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    title: "Understanding TypeScript",
    excerpt: "A comprehensive guide to TypeScript for JavaScript developers.",
    content: "TypeScript is a strongly typed programming language that builds on JavaScript. It adds static types to JavaScript, helping to catch errors early during development.\n\nDeveloped and maintained by Microsoft, TypeScript is designed for developing large applications and transpiles to JavaScript. It's a superset of JavaScript, which means any valid JavaScript code is also valid TypeScript code.\n\nOne of the main benefits of TypeScript is its type system. By defining the types of variables, function parameters, and return values, you can catch type-related errors during development rather than at runtime. This leads to more robust code and a better developer experience.\n\nTypeScript also supports modern JavaScript features, even if they're not supported by all browsers yet. The TypeScript compiler can transpile these features to older versions of JavaScript, ensuring compatibility with a wider range of browsers.\n\nTo get started with TypeScript, you'll need to install it using npm or yarn, and set up a tsconfig.json file to specify compiler options. You can then start writing TypeScript code, which will be transpiled to JavaScript when you build your project.",
    date: "2024-02-19",
    slug: "understanding-typescript",
    readTime: 7,
    bannerImage: "https://images.unsplash.com/photo-1600267204048-88953d381b96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  }
];

// Function to get all blog posts
export const getAllBlogPosts = (): BlogPost[] => {
  return blogPosts;
};

// Function to get a blog post by slug
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};
