import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrashIcon } from "@heroicons/react/24/outline";
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

export function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const cartItemsPerPage = 4;
  const pagesVisited = pageNumber * cartItemsPerPage;

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.get('http://localhost:8081/cart-items', config);
      setCartItems(Array.isArray(response.data) ? response.data : []);
      console.log(response.data);
    } catch (error) {
      console.error("Có lỗi khi lấy dữ liệu mục trong giỏ hàng", error);
      toast.error('Có lỗi khi lấy dữ liệu mục trong giỏ hàng.');
    }
  };

  const deleteCartItem = async (cartItemId) => {
    try {
      const token = localStorage.getItem('token'); 
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.delete(`http://localhost:8081/cart-items/${cartItemId}`, config);
      if (response.status === 204) {
        setCartItems(cartItems.filter(cartItem => cartItem.id !== cartItemId));
        toast.success('Mục trong giỏ hàng đã được xóa thành công.');
      } else {
        toast.error('Không thể xóa mục trong giỏ hàng.');
      }
    } catch (error) {
      console.error('Có lỗi khi xóa mục trong giỏ hàng:', error.response?.data || error.message);
      toast.error('Có lỗi khi xóa mục trong giỏ hàng.');
    }
  };

  const pageCount = Math.ceil(cartItems.length / cartItemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className='text-3xl mt-4 mb-8'>Quản lý Giỏ Hàng</h1>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Id người dùng</th>
            <th className="px-4 py-2">Id Sản phẩm</th>
            <th className="px-4 py-2">Số lượng</th>
            <th className="px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody> 
          {Array.isArray(cartItems) && cartItems.slice(pagesVisited, pagesVisited + cartItemsPerPage).map((cartItem) => (
            <tr key={cartItem.id}>
              <td className="border px-4 py-2">{cartItem.id}</td>
              <td className="border px-4 py-2">{cartItem.userId}</td>
              <td className="border px-4 py-2">{cartItem.productId}</td>
              <td className="border px-4 py-2">{cartItem.quantity}</td>
              <td className="border px-4 py-2 flex items-center">
                <button className="bg-red-300 hover:bg-black text-white font-bold py-2 px-4 rounded flex items-center" onClick={() => deleteCartItem(cartItem.id)}>
                  <TrashIcon className="w-5 h-5 mr-2" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="flex justify-center mt-4">
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
      </div>
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

export default Cart;
