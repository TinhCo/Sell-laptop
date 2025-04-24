import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilIcon, TrashIcon, PlusIcon, EyeIcon } from '@heroicons/react/24/outline';
import CreateUser from '@/pages/dashboard/user/createUser';
import EditUser from '@/pages/dashboard/user/editUser';
import DetailUser from '@/pages/dashboard/user/detailUser';
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function User() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 4;

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get('http://localhost:8081/api/v1/auth', config);
        console.log('Response from API:', response.data); 
        setUsers(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu người dùng:', error);
        toast.error('Lỗi khi tải dữ liệu người dùng.'); 
      }
    }
    fetchData();
  }, []);

  const handleCreateNew = () => {
    setIsCreating(true);
  };

  const handleUserCreated = (newUser) => {
    setUsers([...users, newUser]);
    setIsCreating(false);
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
  };

  const handleViewClick = (user) => {
    setSelectedUser(user);
  };

  const handleUserUpdated = (updatedUser) => {
    setUsers(users.map((user) => (user.userId === updatedUser.userId ? updatedUser : user)));
    setEditingUser(null);
  };

  const handleDeleteClick = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      await axios.delete(`http://localhost:8081/api/v1/auth/${userId}`, config);
      setUsers(users.filter((user) => user.userId !== userId));
    } catch (error) {
      console.error('Lỗi khi xóa người dùng:', error);
      toast.error('Lỗi khi xóa người dùng.'); 
    }
  };

  const displayUsers = Array.isArray(users) && users
    .slice(pageNumber * usersPerPage, (pageNumber + 1) * usersPerPage)
    .map((user) => (
      <tr key={user.userId} className="bg-white border-b hover:bg-gray-100">
        <td className="py-4 px-6">{user.userId}</td>
        <td className="py-4 px-6">{user.email}</td>
        <td className="py-4 px-6">{user.name}</td>
        <td className="py-4 px-6">{user.username}</td>
        <td className="py-4 px-6">{user.role}</td>
        <td className="py-4 px-6 flex justify-start items-center">
          <PencilIcon className="h-5 w-5 text-blue-500 hover:text-gray-900 cursor-pointer" onClick={() => handleEditClick(user)} />
          <TrashIcon className="h-5 w-5 text-red-500 hover:text-gray-900 cursor-pointer ml-4" onClick={() => handleDeleteClick(user.userId)} />
          <EyeIcon className="h-5 w-5 text-green-500 hover:text-gray-900 cursor-pointer ml-4" onClick={() => handleViewClick(user)} />
        </td>
      </tr>
    ));

  const pageCount = Math.ceil(users.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      <div className="mt-12 mb-8 flex flex-col gap-12 relative">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Quản lí người dùng</h1>
        <button
          className="absolute top-4 right-4 flex items-center p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
          onClick={handleCreateNew}
        >
          <PlusIcon className="h-6 w-6" />
          <span className="sr-only">Tạo mới</span>
        </button>
        <div className="overflow-x-auto relative">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="py-3 px-6">ID</th>
                <th scope="col" className="py-3 px-6">Email</th>
                <th scope="col" className="py-3 px-6">Tên</th>
                <th scope="col" className="py-3 px-6">Tên đăng nhập</th>
                <th scope="col" className="py-3 px-6">Vai trò</th>
                <th scope="col" className="py-3 px-6">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {displayUsers}
            </tbody>
          </table>
        </div>
        {isCreating && <CreateUser onClose={() => setIsCreating(false)} onUserCreated={handleUserCreated} />}
        {editingUser && <EditUser user={editingUser} onUserUpdated={handleUserUpdated} onClose={() => setEditingUser(null)} />}
        {selectedUser && <DetailUser user={selectedUser} onClose={() => setSelectedUser(null)} />}
      </div>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"flex list-none pl-0 rounded my-2 justify-center"}
        pageClassName={"page-item hidden md:inline"}
        pageLinkClassName={"page-link mx-1 px-3 py-2 rounded-md bg-white text-gray-700 hover:bg-blue-500 hover:text-white"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link mx-1 px-3 py-2 rounded-md bg-white text-gray-700 hover:bg-blue-500 hover:text-white"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link mx-1 px-3 py-2 rounded-md bg-white text-gray-700 hover:bg-blue-500 hover:text-white"}
        breakLabel={"..."}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link mx-1 px-3 py-2 rounded-md bg-white text-gray-700"}
        activeClassName={"active"}
        activeLinkClassName={"bg-blue-500 text-white"}
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

export default User;
