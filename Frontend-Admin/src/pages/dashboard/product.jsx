import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilIcon, TrashIcon, PlusIcon, EyeIcon } from '@heroicons/react/24/outline';
import CreateProduct from '@/pages/dashboard/product/createProduct';
import EditProduct from '@/pages/dashboard/product/editProduct';
import SeeProduct from '@/pages/dashboard/product/seeProduct';
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

export function Product() {
  const [products, setProducts] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 5;
  const pagesVisited = pageNumber * productsPerPage;

  const displayProducts = products
    .slice(pagesVisited, pagesVisited + productsPerPage)
    .map((product) => (
      <tr key={product.id} className="bg-white border-b hover:bg-gray-100">
        <td className="py-4 px-6">{product.id}</td>
        <td className="py-4 px-6">{product.name}</td>
        <td className="py-4 px-6">{product.description}</td>
        <td className="py-4 px-6">{product.detail}</td>
        <td className="py-4 px-6">
          <img src={product.image} alt={product.name} className="w-20 h-20 rounded-full" />
        </td>
        <td className="py-4 px-6">{product.presale}</td>
        <td className="py-4 px-6">{product.price}</td>
        <td className="py-4 px-6">{product.qty}</td>
        <td className="py-4 px-6">{product.slug}</td>
        <td className="py-4 px-6">{product.status}</td>
        <td className="py-2 px-3 ">
          <PencilIcon className="h-7 w-6 text-blue-500 hover:text-blue-700 cursor-pointer mr-3" onClick={() => handleEditClick(product)} />
          <EyeIcon className="h-7 w-6 text-green-500 hover:text-green-700 cursor-pointer mr-3" onClick={() => handleViewClick(product)} />
          <TrashIcon className="h-6 w-6 text-red-500 hover:text-red-700 cursor-pointer" onClick={() => deleteProduct(product.id)} />
        </td>
      </tr>
    ));

  const pageCount = Math.ceil(products.length / productsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/product/all');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, []);

  const addProductToList = (newProduct) => {
    setProducts([...products, newProduct]);
    setShowCreateForm(false);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  const handleViewClick = (product) => {
    setViewingProduct(product);
  };

  const handleProductUpdated = (updatedProduct) => {
    setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
    setEditingProduct(null);
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8081/product/delete/${productId}`);
      setProducts(products.filter((product) => product.id !== productId));
      toast.success('Sản phẩm đã được xóa thành công.');
    } catch (error) {
      console.error('Error deleting product: ', error);
      toast.error('Không thể xóa sản phẩm: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div>
      <div className="mt-12 mb-8 flex flex-col gap-12 relative">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Quản lí sản phẩm</h1>
        <button
          className="absolute top-4 right-4 flex items-center p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
          onClick={() => setShowCreateForm(true)}
        >
          <PlusIcon className="h-6 w-6" />
          <span className="sr-only">Create</span>
        </button>
        {showCreateForm && (
          <CreateProduct
            onProductCreated={addProductToList}
            onClose={() => setShowCreateForm(false)}
          />
        )}

        {editingProduct && (
          <EditProduct
            productToEdit={editingProduct}
            onProductUpdated={handleProductUpdated}
            onClose={() => setEditingProduct(null)}
          />
        )}

        {viewingProduct && (
          <SeeProduct
            product={viewingProduct}
            onClose={() => setViewingProduct(null)}
          />
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="py-3 px-6">ID</th>
                <th scope="col" className="py-3 px-6">Name</th>
                <th scope="col" className="py-3 px-6">Description</th>
                <th scope="col" className="py-3 px-6">Detail</th>
                <th scope="col" className="py-3 px-6">Image</th>
                <th scope="col" className="py-3 px-6">Presale</th>
                <th scope="col" className="py-3 px-6">Price</th>
                <th scope="col" className="py-3 px-6">Qty</th>
                <th scope="col" className="py-3 px-6">Slug</th>
                <th scope="col" className="py-3 px-6">Status</th>
                <th scope="col" className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayProducts}
            </tbody>
          </table>
        </div>
      </div>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"flex list-none pl-0 rounded my-2"}
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

export default Product;
