import React, { useState } from 'react';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import Section from './Section';
import Modal from './Modal';

const BlogPreview = () => {
  const { blogs, isLoading } = usePortfolio();
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showAllBlogs, setShowAllBlogs] = useState(false);

  const publishedBlogs = blogs.filter(blog => blog.published);
  const featuredBlogs = publishedBlogs.slice(0, 3);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const BlogCard = ({ blog, onClick }) => (
    <article className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover-lift transition-all duration-300 shadow-sm hover:shadow-md">
      <div className="h-48 relative overflow-hidden">
        {blog.cover_image ? (
          <img
            src={blog.cover_image}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-50 to-blue-100 flex items-center justify-center">
            <div className="text-4xl font-bold text-gray-300">Blog</div>
          </div>
        )}
        
        {blog.tags && blog.tags.length > 0 && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
              {blog.tags[0]}
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{formatDate(blog.published_at || blog.created_at)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{getReadTime(blog.content)}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer" onClick={() => onClick(blog)}>
          {blog.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {blog.excerpt || blog.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-sm text-gray-600">{blog.author}</span>
          </div>
          <button 
            onClick={() => onClick(blog)}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
          >
            Read More
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </article>
  );

  if (isLoading && blogs.length === 0) {
    return (
      <Section id="blog" title="Latest Articles" subtitle="Thoughts, tutorials, and insights from my journey">
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-200 animate-pulse">
              <div className="h-48 bg-gray-200" />
              <div className="p-6 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </Section>
    );
  }

  return (
    <>
      <Section id="blog" title="Latest Articles" subtitle="Thoughts, tutorials, and insights from my journey">
        {featuredBlogs.length > 0 ? (
          <>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} onClick={setSelectedBlog} />
              ))}
            </div>

            {publishedBlogs.length > 3 && (
              <div className="text-center mt-12">
                <button 
                  onClick={() => setShowAllBlogs(true)}
                  className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all font-medium"
                >
                  View All {publishedBlogs.length} Articles
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Blog Posts Available</h3>
            <p className="text-gray-600">Articles will be displayed here once published.</p>
          </div>
        )}
      </Section>

      {/* Blog Details Modal */}
      {selectedBlog && (
        <Modal
          isOpen={!!selectedBlog}
          onClose={() => setSelectedBlog(null)}
          title={selectedBlog.title}
          size="lg"
        >
          <div className="space-y-6">
            {selectedBlog.cover_image && (
              <img
                src={selectedBlog.cover_image}
                alt={selectedBlog.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            )}

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  <span>{selectedBlog.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{formatDate(selectedBlog.published_at || selectedBlog.created_at)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{getReadTime(selectedBlog.content)}</span>
                </div>
              </div>
            </div>

            {selectedBlog.tags && selectedBlog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedBlog.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: selectedBlog.content }} />
            </div>
          </div>
        </Modal>
      )}

      {/* All Blogs Modal */}
      <Modal
        isOpen={showAllBlogs}
        onClose={() => setShowAllBlogs(false)}
        title={`All Articles (${publishedBlogs.length})`}
        size="xl"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {publishedBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} onClick={setSelectedBlog} />
          ))}
        </div>
      </Modal>
    </>
  );
};

export default BlogPreview;