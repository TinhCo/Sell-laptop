import React from 'react';

const SeeCategory = ({ category, onClose }) => {
  if (!category) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 overflow-y-auto z-50">
      <div className="bg-white rounded-lg shadow-lg p-5 max-w-2xl w-full m-4">
        <div className="flex justify-between items-start p-4 rounded-t border-b">
        <h4 className="text-2xl font-semibold mb-6 text-center">Xem danh mục</h4>
          <button onClick={onClose}>
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
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-4">
            <img src={category.image} alt={category.name} className="w-20 h-20 rounded-full object-cover" />
            <div className="flex-1">
              <p className="text-lg font-medium">{category.name}</p>
              <p className="text-gray-500">{category.description}</p>
            </div>
          </div>
          <p className="text-gray-500">Slug: {category.slug}</p>
          <p className="text-gray-500">Trạng thái: {category.status}</p>
        </div>
        <div className="flex justify-end p-4 border-t">
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

export default SeeCategory;
