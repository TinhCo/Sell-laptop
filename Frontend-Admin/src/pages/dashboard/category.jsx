import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilIcon, TrashIcon, PlusIcon, EyeIcon } from '@heroicons/react/24/outline';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditCategory from '@/pages/dashboard/category/editCategory';
import SeeCategory from '@/pages/dashboard/category/seeCategory';
import ReactPaginate from 'react-paginate';
import CreateCategory  from '@/pages/dashboard/category/creteCategory';

export function Categories() {
  const [categories, setCategories] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [viewingCategory, setViewingCategory] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const categoriesPerPage = 4;
  const pagesVisited = pageNumber * categoriesPerPage;

  const pageCount = Math.ceil(categories.length / categoriesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories: ', error);
        toast.error('Lỗi khi lấy danh mục.');
      }
    };
    fetchData();
  }, []);

  const handleCreateNewClick = () => {
    setShowCreateForm(!showCreateForm);
  };

  const handleCategoryCreated = (newCategory) => {
    setCategories([...categories, newCategory]);
    setShowCreateForm(false);
    toast.success('Danh mục đã được tạo thành công.');
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
  };

  const handleViewCategory = (category) => {
    setViewingCategory(category);
  };

  const handleCategoryUpdated = (updatedCategory) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );
    setEditingCategory(null);
    toast.success('Danh mục đã được cập nhật thành công.');
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token không tồn tại.');
        toast.error('Token không tồn tại.');
        return;
      }

      await axios.delete(`http://localhost:8081/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== categoryId)
      );
      toast.success('Danh mục đã được xóa thành công.');
    } catch (error) {
      console.error('Lỗi khi xóa danh mục: ', error);
      toast.error('Không thể xóa danh mục: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="relative mt-12 mb-8 flex flex-col gap-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Quản lý danh mục sản phẩm</h1>
      <button
        className="absolute top-0 right-0 flex items-center p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        onClick={handleCreateNewClick}
      >
        <PlusIcon className="h-6 w-6" />
        <span className="sr-only">Thêm mới</span>
      </button>
      {showCreateForm && <CreateCategory onCategoryCreated={handleCategoryCreated} onClose={() => setShowCreateForm(false)} />}
      <div className="overflow-x-auto relative shadow-lg sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="py-3 px-6">ID</th>
              <th scope="col" className="py-3 px-6">Tên</th>
              <th scope="col" className="py-3 px-6">Mô Tả</th>
              <th scope="col" className="py-3 px-6">Hình ảnh</th>
              <th scope="col" className="py-3 px-6">Slug</th>
              <th scope="col" className="py-3 px-6">Trạng thái</th>
              <th scope="col" className="py-3 px-6">Thao tác</th>
            </tr>   
          </thead>
          <tbody className="bg-white">
            {categories.slice(pagesVisited, pagesVisited + categoriesPerPage).map((category) => (
              <tr key={category.id} className="border-b">
                <td className="py-4 px-6">{category.id}</td>
                <td className="py-4 px-6">{category.name}</td>
                <td className="py-4 px-6">{category.description}</td>
                <td className="py-4 px-6">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </td>
                <td className="py-4 px-6">{category.slug}</td>
                <td className="py-4 px-6">{category.status}</td>
                <td className="py-4 px-6 flex space-x-4">
                  <PencilIcon
                    className="h-5 w-5 text-blue-500 hover:text-blue-700 cursor-pointer"
                    onClick={() => handleEditCategory(category)}
                  />
                  <EyeIcon
                    className="h-5 w-5 text-green-500 hover:text-green-700 cursor-pointer"
                    onClick={() => handleViewCategory(category)}
                  />
                  <TrashIcon
                    className="h-5 w-5 text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => handleDeleteCategory(category.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingCategory && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <EditCategory
            category={editingCategory}
            onCategoryUpdated={handleCategoryUpdated}
            onClose={() => setEditingCategory(null)}
          />
        </div>
      )}
      {viewingCategory && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <SeeCategory category={viewingCategory} onClose={() => setViewingCategory(null)} />
        </div>
      )}
      <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      pageCount={pageCount}
      onPageChange={changePage}
      containerClassName={"flex justify-center mt-4"}
      pageClassName={"mx-1"}
      pageLinkClassName={"px-3 py-2 rounded-lg bg-white text-gray-700 hover:bg-blue-500 hover:text-white"}
      previousClassName={"mx-1"}
      previousLinkClassName={"px-3 py-2 rounded-lg bg-white text-gray-700 hover:bg-blue-500 hover:text-white"}
      nextClassName={"mx-1"}
      nextLinkClassName={"px-3 py-2 rounded-lg bg-white text-gray-700 hover:bg-blue-500 hover:text-white"}
      activeClassName={"bg-blue-500 text-white"}
    />
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Categories;
