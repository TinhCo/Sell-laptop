import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateProduct = ({ onClose, onProductCreated }) => {
  const [product, setProduct] = useState({
    categoryId: 1,
    brandId: 1,
    name: '',
    slug: '',
    price: '',
    presale: '',
    qty: '',
    detail: '',
    description: '',
    createdBy: 1,
    updatedBy: 1,
    status: 1,
    image: null,
    imageUrl: '',
  });

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

      const response = await axios.post(
        'http://localhost:8081/product/app-product',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onProductCreated(response.data);
      onClose();
      toast.success('Sản phẩm đã được tạo thành công!');
    } catch (error) {
      console.error('Lỗi khi tạo sản phẩm:', error);
      toast.error('Đã xảy ra lỗi khi tạo sản phẩm!');
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 overflow-y-auto">
      <div className="bg-white rounded-md w-full max-w-lg shadow-lg">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Tạo sản phẩm mới</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Tên sản phẩm
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  placeholder="Nhập tên sản phẩm"
                  required
                  className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                  Slug
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={product.slug}
                  onChange={handleChange}
                  placeholder="Nhập slug"
                  required
                  className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Giá sản phẩm
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  placeholder="Nhập giá sản phẩm"
                  required
                  className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="presale" className="block text-sm font-medium text-gray-700">
                  Giá bán trước khi giảm
                </label>
                <input
                  type="text"
                  id="presale"
                  name="presale"
                  value={product.presale}
                  onChange={handleChange}
                  placeholder="Nhập giá bán trước khi giảm (nếu có)"
                  className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="qty" className="block text-sm font-medium text-gray-700">
                  Số lượng
                </label>
                <input
                  type="number"
                  id="qty"
                  name="qty"
                  value={product.qty}
                  onChange={handleChange}
                  placeholder="Nhập số lượng"
                  required
                  className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none"
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="detail" className="block text-sm font-medium text-gray-700">
                  Chi tiết sản phẩm
                </label>
                <textarea
                  id="detail"
                  name="detail"
                  value={product.detail}
                  onChange={handleChange}
                  placeholder="Nhập chi tiết sản phẩm"
                  rows="4"
                  className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none"
                ></textarea>
              </div>
              <div className="col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Mô tả sản phẩm
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  placeholder="Nhập mô tả sản phẩm"
                  rows="4"
                  className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none"
                ></textarea>
              </div>
              <div className="col-span-2">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Hình ảnh sản phẩm
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none"
                />
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt="Preview"
                    className="mt-2 rounded-md shadow-md"
                    style={{ maxHeight: '200px', width: '100%' }}
                  />
                )}
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none"
              >
                Tạo sản phẩm
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 focus:outline-none ml-4"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
