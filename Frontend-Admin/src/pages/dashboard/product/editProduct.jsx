import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProduct = ({ productToEdit, onClose, onProductUpdated }) => {
  const [product, setProduct] = useState({ ...productToEdit });
  const [token] = useState(localStorage.getItem('token'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile); 
    setProduct({ ...product, image: imageFile, imageUrl });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const { image, imageUrl, ...productData } = product;
      formData.append('productDto', JSON.stringify(productData));
      formData.append('file', product.image);

      const response = await axios.put(
        `http://localhost:8081/product/update-product/${product.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onProductUpdated(response.data);
      onClose();
      toast.success('Sản phẩm đã được cập nhật thành công!');
    } catch (error) {
      console.error('Lỗi khi cập nhật sản phẩm:', error);
      toast.error('Đã xảy ra lỗi khi cập nhật sản phẩm!');
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-2xl shadow-lg mx-4">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Chỉnh sửa sản phẩm</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Tên sản phẩm"
                required
                className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none"
              />
              <input
                type="text"
                name="slug"
                value={product.slug}
                onChange={handleChange}
                placeholder="Slug"
                required
                className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none"
              />
              <input
                type="text"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Giá sản phẩm"
                required
                className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none"
              />
              <input
                type="text"
                name="presale"
                value={product.presale}
                onChange={handleChange}
                placeholder="Giá bán trước khi giảm (nếu có)"
                className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none"
              />
              <input
                type="number"
                name="qty"
                value={product.qty}
                onChange={handleChange}
                placeholder="Số lượng"
                required
                className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none"
              />
              <input
                type="number"
                name="categoryId"
                value={product.categoryId}
                onChange={handleChange}
                placeholder="ID danh mục"
                required
                className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>
            <textarea
              name="detail"
              value={product.detail}
              onChange={handleChange}
              placeholder="Chi tiết sản phẩm"
              rows="4"
              className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none"
            ></textarea>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Mô tả sản phẩm"
              rows="4"
              className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none"
            ></textarea>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none"
            />
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt="Preview"
                className="w-full mt-2 rounded-md shadow-md"
                style={{ maxHeight: '200px' }}
              />
            )}
            <div className="flex justify-end space-x-2 mt-4">
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
                Cập nhật sản phẩm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
