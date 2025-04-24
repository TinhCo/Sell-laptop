import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = ({ onClose, onUserCreated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/api/v1/auth/register', {
        name,
        email,
        password,
      });
      if (response.data) {
        onUserCreated(response.data);
        onClose(); // Đóng form sau khi thêm thành công
      }
    } catch (error) {
      console.error('Error when creating user:', error);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 overflow-y-auto">
      <div className="mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Tạo người dùng mới</h3>
          <div className="mt-2 px-7 py-3">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-500"
              />
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none"
                  onClick={onClose}
                >
                  Hũy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
