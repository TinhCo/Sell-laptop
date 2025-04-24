import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrashIcon } from "@heroicons/react/24/outline";
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

export function Order() {
  const [orders, setOrders] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const ordersPerPage = 4;
  const pagesVisited = pageNumber * ordersPerPage;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8081/orders');
      setOrders(response.data);
    } catch (error) {
      console.error("There was an error retrieving the order data", error);
      toast.error('There was an error retrieving the order data.');
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token'); 
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.delete(`http://localhost:8081/orders/${orderId}`, config);
      if (response.status === 204) {
        setOrders(orders.filter(order => order.id !== orderId));
        toast.success('Đơn hàng đã được xóa thành công.');
      } else {
        toast.error('Không thể xóa đơn đặt hàng.');
      }
    } catch (error) {
      console.error('Đã xảy ra lỗi khi xóa đơn hàng:', error.response?.data || error.message);
      toast.error('Đã xảy ra lỗi khi xóa đơn đặt hàng.');
    }
  };

  const pageCount = Math.ceil(orders.length / ordersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className='text-3xl mt-4 mb-8'>Quản lý Đơn Hàng</h1>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Tên người đặt hàng</th>
            <th className="px-4 py-2">Số điện thoại</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Địa chỉ</th>
            <th className="px-4 py-2">Ghi chú</th>
            <th className="px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody> 
          {orders.slice(pagesVisited, pagesVisited + ordersPerPage).map((order) => (
            <tr key={order.id}>
              <td className="border px-4 py-2">{order.id}</td>
              <td className="border px-4 py-2">{order.name}</td>
              <td className="border px-4 py-2">{order.phone}</td>
              <td className="border px-4 py-2">{order.email}</td>
              <td className="border px-4 py-2">{order.address}</td>
              <td className="border px-4 py-2">{order.note}</td>
              <td className="border px-4 py-2 flex items-center">
                <button className="bg-red-300 hover:bg-black text-white font-bold py-2 px-4 rounded flex items-center" onClick={() => deleteOrder(order.id)}>
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

export default Order;
