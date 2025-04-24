import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrashIcon } from "@heroicons/react/24/outline";
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function OrderDetail({ orderId, productId }) {
  const [orderDetails, setOrderDetails] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const orderDetailsPerPage = 5;
  const pagesVisited = pageNumber * orderDetailsPerPage;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/orderdetails`, {
          params: {
            orderId,
            productId
          }
        });
        setOrderDetails(response.data);
      } catch (error) {
        console.error("There was an error retrieving the order detail data", error);
        toast.error('Failed to fetch order details!');
      }
    };
    fetchOrderDetails();
  }, [orderId, productId]);

  const deleteOrderDetail = async (orderDetailId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.delete(`http://localhost:8081/orderdetails/${orderDetailId}`, config);
      if (response.status === 204) {
        setOrderDetails(orderDetails.filter(detail => detail.id !== orderDetailId));
        toast.success('Chi tiết đơn hàng đã được xóa thành công!');
      }
    } catch (error) {
      console.error('Đã xảy ra lỗi khi xóa chi tiết đơn hàng:', error.response.data);
      toast.error('Không thể xóa chi tiết đơn hàng!');
    }
  };

  const pageCount = Math.ceil(orderDetails.length / orderDetailsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className='text-3xl mt-4 mb-8'>Quản lý Chi Tiết Đơn Hàng</h1>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">ID Đơn Hàng</th>
            <th className="px-4 py-2">ID Sản Phẩm</th>
            <th className="px-4 py-2">Giá</th>
            <th className="px-4 py-2">Số Lượng</th>
            <th className="px-4 py-2">Thành Tiền</th>
            <th className="px-4 py-2">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.slice(pagesVisited, pagesVisited + orderDetailsPerPage).map((detail) => (
            <tr key={detail.id}>
              <td className="border px-4 py-2">{detail.id}</td>
              <td className="border px-4 py-2">{detail.orderId}</td>
              <td className="border px-4 py-2">{detail.productId}</td>
              <td className="border px-4 py-2">{detail.price} đ</td>
              <td className="border px-4 py-2">{detail.qty}</td>
              <td className="border px-4 py-2 ">{detail.amount} đ</td>
              <td className="border px-4 py-2 flex justify-center">
                <button className="bg-red-300 hover:bg-black text-white font-bold py-2 px-4 rounded flex items-center justify-center" onClick={() => deleteOrderDetail(detail.id)}>
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
    </div>
  );
}

export default OrderDetail;
