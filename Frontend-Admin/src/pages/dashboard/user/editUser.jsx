// EditUser.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditUser = ({ user, onUserUpdated, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password);
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token không tồn tại.');
        return;
      }

      const response = await axios.put(
        `http://localhost:5246/api/User/${user.id}`,
        { id: user.id, name, email, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 204) {
        onUserUpdated({ ...user, name, email, password });
        onClose();
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin người dùng: ', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-black bg-opacity-50 absolute inset-0" onClick={onClose}></div>
      <div className="bg-white p-6 rounded shadow-lg z-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Chỉnh sửa thông tin người dùng</h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Tên</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Email</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Mật khẩu</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg"
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-end">
            <button
              type="button"
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="ml-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
