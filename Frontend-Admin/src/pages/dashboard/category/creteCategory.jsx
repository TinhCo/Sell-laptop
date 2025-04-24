import React, { useState } from 'react';
import axios from 'axios';

const CreateCategory = ({ onCategoryCreated, onClose }) => {
  const [categoryData, setCategoryData] = useState({
    name: '',
    slug: '',
    parentId: 0,
    sortOrder: 1, 
    image: '',
    description: '',
    status: '',
    createdBy: 1 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token không tồn tại.');
        return;
      }

      const response = await axios.post(
        'http://localhost:8081/categories',
        categoryData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (onCategoryCreated) {
        onCategoryCreated(response.data);
      }

      setCategoryData({
        name: '',
        slug: '',
        parentId: 0,
        sortOrder: 1,
        image: '',
        description: '',
        status: '',
        createdBy: 1 // Reset lại createdBy
      }); // Reset the form
    } catch (error) {
      console.error('Lỗi khi tạo danh mục:', error);
      setError('Lỗi khi tạo danh mục. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose} 
    >
      <form
        onClick={(e) => e.stopPropagation()} 
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg relative w-1/2"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center">Tạo danh mục mới</h2>
        <div className="mb-4">
          <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">Tên danh mục</label>
          <input
            id="categoryName"
            name="name"
            type="text"
            value={categoryData.name}
            onChange={handleChange}
            placeholder="Tên danh mục"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="categorySlug" className="block text-sm font-medium text-gray-700">Slug</label>
          <input
            id="categorySlug"
            name="slug"
            type="text"
            value={categoryData.slug}
            onChange={handleChange}
            placeholder="Slug"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="categoryImage" className="block text-sm font-medium text-gray-700">Hình ảnh</label>
          <input
            id="categoryImage"
            name="image"
            type="text"
            value={categoryData.image}
            onChange={handleChange}
            placeholder="Hình ảnh"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="categoryDescription" className="block text-sm font-medium text-gray-700">Mô tả</label>
          <textarea
            id="categoryDescription"
            name="description"
            value={categoryData.description}
            onChange={handleChange}
            placeholder="Mô tả"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="categoryStatus" className="block text-sm font-medium text-gray-700">Trạng thái</label>
          <input
            id="categoryStatus"
            name="status"
            type="text"
            value={categoryData.status}
            onChange={handleChange}
            placeholder="Trạng thái"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-500 text-white px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          >
            {isLoading ? 'Đang tạo...' : 'Tạo'}
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default CreateCategory;
