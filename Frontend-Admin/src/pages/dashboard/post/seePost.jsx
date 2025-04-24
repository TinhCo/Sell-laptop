import React from 'react';

const SeePost = ({ post, onClose }) => {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 overflow-y-auto z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl shadow-lg p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Xem bài đăng</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <strong>ID:</strong> {post.id}
            </div>
            <div>
              <strong>Tiêu đề:</strong> {truncateText(post.title, 50)}
            </div>
            <div>
              <strong>Slug:</strong> {truncateText(post.slug, 50)}
            </div>
            <div>
              <strong>Loại:</strong> {truncateText(post.type, 50)}
            </div>
          </div>
          <div>
            <strong>Chi tiết:</strong>
            <p>{truncateText(post.detail, 200)}</p>
          </div>
          <div>
            <strong>Từ khóa meta:</strong> {truncateText(post.metakey, 100)}
          </div>
          <div>
            <strong>Mô tả meta:</strong>
            <p>{truncateText(post.metadesc, 200)}</p>
          </div>
          <div>
            <strong>Hình ảnh:</strong>
            <img src={post.image} alt={post.title} className="mt-4 rounded-md shadow-md" />
          </div>
        </div>
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 focus:outline-none"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeePost;
