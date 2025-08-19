export const pagesData = [
  {
    id: '1',
    name: 'Home Page',
    slug: '/',
    lastModified: '2023-10-26 10:00 AM',
    status: 'Published',
    lastUpdatedBy: 'Admin User',
    content: '<h1>Welcome to our Home Page!</h1><p>This is the main content of the home page.</p>',
  },
  {
    id: '2',
    name: 'About Us',
    slug: '/about-us',
    lastModified: '2023-10-25 03:30 PM',
    status: 'Draft',
    lastUpdatedBy: 'Editor User',
    content: '<h1>About Our Company</h1><p>Learn more about our mission and values.</p>',
  },
  {
    id: '3',
    name: 'Contact Us',
    slug: '/contact-us',
    lastModified: '2023-10-24 11:00 AM',
    status: 'Published',
    lastUpdatedBy: 'Admin User',
    content: '<h1>Get in Touch</h1><p>Contact us for any inquiries.</p>',
  },
];

export const seoData = {
  title: 'Gateway Super Admin - CMS',
  description: 'Manage your website content, SEO, sections, and blog posts.',
  keywords: 'CMS, content management, SEO, blog, sections',
  ogTitle: 'Gateway Super Admin',
  ogDescription: 'Powerful admin panel for content management.',
  ogImageUrl: 'https://example.com/og-image.jpg',
  canonicalUrl: 'https://example.com/cms',
  structuredData: '{\n  "@context": "https://schema.org",\n  "@type": "WebPage",\n  "name": "CMS Page",\n  "description": "Content Management System for Gateway Super Admin"\n}',
  robotsTxt: 'User-agent: *\nAllow: /\nDisallow: /admin',
};

export const sectionsData = [
  {
    id: 's1',
    name: 'Hero Section',
    visibility: true,
    order: 1,
    customLabel: 'Main Banner',
    scheduleStart: null,
    scheduleEnd: null,
  },
  {
    id: 's2',
    name: 'About Us Section',
    visibility: false,
    order: 2,
    customLabel: 'Company Info',
    scheduleStart: null,
    scheduleEnd: null,
  },
  {
    id: 's3',
    name: 'Services Section',
    visibility: true,
    order: 3,
    customLabel: 'Our Offerings',
    scheduleStart: '2023-11-01T09:00',
    scheduleEnd: '2023-12-31T17:00',
  },
];

export const blogPostsData = [
  {
    id: 'b1',
    title: 'My First Blog Post',
    slug: 'my-first-blog-post',
    category: ['Technology', 'Updates'],
    author: 'John Doe',
    status: 'Published',
    publishedDate: '2023-10-20',
    featuredImage: 'https://example.com/blog-image-1.jpg',
    content: '<h2>Getting Started with Our Platform</h2><p>This is an exciting first post about our new features.</p>',
    tags: ['new features', 'platform', 'guide'],
    comments: [
      { id: 'c1', author: 'Jane Smith', comment: 'Great post!', approved: true },
      { id: 'c2', author: 'Bot User', comment: 'Spam comment.', approved: false },
    ],
  },
  {
    id: 'b2',
    title: 'Tips for Effective Content Marketing',
    slug: 'tips-content-marketing',
    category: ['Marketing'],
    author: 'Emily White',
    status: 'Draft',
    publishedDate: '2023-10-15',
    featuredImage: 'https://example.com/blog-image-2.jpg',
    content: '<h2>Boost Your Online Presence</h2><p>Learn how to create compelling content.</p>',
    tags: ['marketing', 'content', 'SEO'],
    comments: [],
  },
];