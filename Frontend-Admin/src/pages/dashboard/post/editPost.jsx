import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPost = ({ postId, onClose, onPostUpdated }) => {
  const [post, setPost] = useState({
    topicId: 1,
    title: '',
    slug: '',
    detail: '',
    image: null,
    type: '',
    metakey: '',
    metadesc: '',
    createdBy: 1,
    updatedBy: 1,
    status: 1,
    imageUrl: '',
  });

  const [token] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.put(`http://localhost:8081/api/posts/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPost(response.data);
      } catch (error) {
        console.error('Lỗi khi tải bài đăng:', error);
        toast.error('Đã xảy ra lỗi khi tải bài đăng!');
      }
    };

    fetchPost();
  }, [postId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setPost({ ...post, image: imageFile, imageUrl });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const { image, imageUrl, ...postData } = post;
      formData.append('postDto', JSON.stringify(postData));
      if (post.image) formData.append('file', post.image);

      const response = await axios.put(
        `http://localhost:8081/api/posts/${postId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onPostUpdated(response.data);
      onClose();
      toast.success('Bài đăng đã được cập nhật thành công!');
    } catch (error) {
      console.error('Lỗi khi cập nhật bài đăng:', error);
      toast.error('Đã xảy ra lỗi khi cập nhật bài đăng!');
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 overflow-y-auto z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl shadow-lg p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Chỉnh sửa bài đăng</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Tiêu đề</label>
              <input
                type="text"
                id="title"
                name="title"
                value={post.title}
                onChange={handleChange}
                placeholder="Nhập tiêu đề"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug</label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={post.slug}
                onChange={handleChange}
                placeholder="Nhập slug"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="detail" className="block text-sm font-medium text-gray-700">Chi tiết</label>
              <textarea
                id="detail"
                name="detail"
                value={post.detail}
                onChange={handleChange}
                placeholder="Nhập chi tiết"
                rows="4"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Loại</label>
              <input
                type="text"
                id="type"
                name="type"
                value={post.type}
                onChange={handleChange}
                placeholder="Nhập loại"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="metakey" className="block text-sm font-medium text-gray-700">Từ khóa meta</label>
              <input
                type="text"
                id="metakey"
                name="metakey"
                value={post.metakey}
                onChange={handleChange}
                placeholder="Nhập từ khóa meta"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="metadesc" className="block text-sm font-medium text-gray-700">Mô tả meta</label>
              <textarea
                id="metadesc"
                name="metadesc"
                value={post.metadesc}
                onChange={handleChange}
                placeholder="Nhập mô tả meta"
                rows="4"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Hình ảnh</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt="Preview"
                  className="mt-4 rounded-md shadow-md"
                  style={{ maxHeight: '200px', width: '100%' }}
                />
              )}
            </div>
          </div>
          <div className="flex justify-end mt-6 space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 focus:outline-none"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none"
            >
              Cập nhật bài đăng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
