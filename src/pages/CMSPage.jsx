import React, { useState } from 'react';
import { pagesData, seoData, sectionsData, blogPostsData } from '../data/cmsData';

const CMSPage = () => {

  const [activeTab, setActiveTab] = useState('contentManagement');

    const renderTabContent = () => {
    switch (activeTab) {
      case 'contentManagement':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Content Management</h3>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by page name or slug..."
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-800">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Page Name</th>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Slug</th>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Last Modified</th>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pagesData.map((page) => (
                    <tr key={page.id}>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{page.name}</td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{page.slug}</td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{page.lastModified}</td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{page.status}</td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                        <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                        <button className="text-red-600 hover:text-red-800">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Edit Page Content</h4>
              {/* Placeholder for Rich Text Editor */}
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md h-48"
                placeholder="Rich Text Editor (WYSIWYG) with image upload, video, links, and HTML blocks..."
              ></textarea>
              <div className="mt-4 flex space-x-2">
                <button className="!bg-blue-500 text-white px-4 py-2 rounded-md !hover:bg-blue-600">Preview Changes</button>
                <button className="!bg-green-500 text-white px-4 py-2 rounded-md !hover:bg-green-600">Publish/Draft Toggle</button>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Bulk Actions</h4>
              <div className="flex space-x-2">
                <button className="!bg-purple-500 text-white px-4 py-2 rounded-md !hover:bg-purple-600">Publish Selected</button>
                <button className="!bg-yellow-500 text-white px-4 py-2 rounded-md !hover:bg-yellow-600">Unpublish Selected</button>
                <button className="!bg-red-500 text-white px-4 py-2 rounded-md !hover:bg-red-600">Delete Selected</button>
               </div>
             </div>
          </div>
        );
      case 'seoSettings':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">SEO Settings</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium mb-2">Meta Tags</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                    <input type="text" id="metaTitle" className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Page Title" value={seoData?.metaTags?.title} />
                  </div>
                  <div>
                    <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                    <textarea id="metaDescription" rows="3" className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Page Description" value={seoData?.metaTags?.description}></textarea>
                  </div>
                  <div>
                    <label htmlFor="metaKeywords" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Keywords</label>
                    <input type="text" id="metaKeywords" className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="keyword1, keyword2" value={seoData?.metaTags?.keywords} />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-2">Open Graph (OG) Tags</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="ogTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                    <input type="text" id="ogTitle" className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="OG Title" value={seoData?.ogTags?.title} />
                  </div>
                  <div>
                    <label htmlFor="ogDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                    <textarea id="ogDescription" rows="3" className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="OG Description" value={seoData?.ogTags?.description}></textarea>
                  </div>
                  <div>
                    <label htmlFor="ogImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
                    <input type="text" id="ogImage" className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="https://example.com/image.jpg" value={seoData?.ogTags?.image} />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-2">Canonical URL</h4>
                <div>
                  <label htmlFor="canonicalUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">URL</label>
                  <input type="text" id="canonicalUrl" className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="https://example.com/canonical-page" value={seoData.canonicalUrl} />
                  </div>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-2">Structured Data (JSON-LD)</h4>
                <div>
                  <label htmlFor="jsonLd" className="block text-sm font-medium text-gray-700 dark:text-gray-300">JSON-LD Schema</label>
                  <textarea id="jsonLd" rows="8" className="mt-1 block w-full p-2 border border-gray-300 rounded-md font-mono text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={"context"} value={seoData?.jsonLd}></textarea>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-2">Sitemap Control</h4>
                <button className="!bg-blue-500 !hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Generate Sitemap</button>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-2">Robots.txt Editor</h4>
                <div>
                  <label htmlFor="robotsTxt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">robots.txt Content</label>
                  <textarea id="robotsTxt" rows="10" className="mt-1 block w-full p-2 border border-gray-300 rounded-md font-mono text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="User-agent: *Disallow: /admin/" value={seoData.robotsTxt}></textarea>
                </div>
              </div>
          </div>
          </div>
          
        );
      case 'sectionControl':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Section Control</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-800">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Section Name</th>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Visibility</th>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Order</th>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sectionsData.map((section) => (
                    <tr key={section.id}>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{section.name}</td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                        <input type="checkbox" checked={section.isVisible} readOnly />
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{section.order}</td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                        <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                        <button className="text-red-600 hover:text-red-800">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <h4 className="text-lg font-semibold mb-2">Drag-and-Drop Ordering</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Implement drag-and-drop functionality here.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Custom Label</h4>
                <input type="text" placeholder="Enter custom label for section" className="p-2 border border-gray-300 rounded-md w-full" />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Schedule Visibility</h4>
                <input type="datetime-local" className="p-2 border border-gray-300 rounded-md mr-2" />
                <input type="datetime-local" className="p-2 border border-gray-300 rounded-md" />
              </div>
            </div>
          </div>
        );
      case 'blogPostControl': {
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Blog Post Control</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white dark:bg-gray-800">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Title</th>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Category</th>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Author</th>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Published Date</th>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogPostsData.map((post) => (
                    <tr key={post.id}>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{post?.title}</td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{post.category}</td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{post.author}</td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{post.status}</td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{post.publishedDate}</td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                        <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                        <button className="text-red-600 hover:text-red-800">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2">Create/Edit Blog Post</h4>
              {/* Placeholder for blog post form */}
              <div className="space-y-4">
                <input type="text" placeholder="Title" className="p-2 border border-gray-300 rounded-md w-full" />
                <input type="text" placeholder="Slug" className="p-2 border border-gray-300 rounded-md w-full" />
                <select className="p-2 border border-gray-300 rounded-md w-full">
                  <option>Category 1</option>
                  <option>Category 2</option>
                </select>
                <input type="file" className="p-2 border border-gray-300 rounded-md w-full" />
                <textarea placeholder="Content Editor (WYSIWYG)" className="p-2 border border-gray-300 rounded-md w-full h-32"></textarea>
                <input type="text" placeholder="Tags (comma-separated)" className="p-2 border border-gray-300 rounded-md w-full" />
                <input type="datetime-local" className="p-2 border border-gray-300 rounded-md w-full" />
                <button className="!bg-blue-500 text-white px-4 py-2 rounded-md !hover:bg-blue-600">Save Post</button>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Comment Moderation</h4>
              {/* Placeholder for comment moderation */}
              <p className="text-sm text-gray-600 dark:text-gray-400">View, approve, reject, or delete comments.</p>
            </div>
          </div>
        );
    }
    default: {
        return null;
      }
  };
  
}

return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-purple-800 dark:text-white mb-6">Content Management System</h2>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('contentManagement')}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'contentManagement' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'}`}
            >
              Content Management
            </button>
            <button
              onClick={() => setActiveTab('seoSettings')}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'seoSettings' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'}`}
            >
              SEO Settings
            </button>
            <button
              onClick={() => setActiveTab('sectionControl')}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'sectionControl' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'}`}
            >
              Section Control
            </button>
            <button
              onClick={() => setActiveTab('blogPostControl')}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'blogPostControl' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'}`}
            >
              Blog Post Control
            </button>
          </nav>
        </div>
        <div className="py-4">
        </div>
        {renderTabContent()}
      </div>
    </div>
  );

}

export default CMSPage;