import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilIcon, TrashIcon, PlusIcon, EyeIcon } from '@heroicons/react/24/outline';
import CreatePost from '@/pages/dashboard/post/createPost';
import EditPost from '@/pages/dashboard/post/editPost';
import SeePost from '@/pages/dashboard/post/seePost';
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Post() {
  const [posts, setPosts] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [viewingPost, setViewingPost] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const postsPerPage = 5;
  const pagesVisited = pageNumber * postsPerPage;

  const displayPosts = posts
    .slice(pagesVisited, pagesVisited + postsPerPage)
    .map((post) => (
      <tr key={post.id} className="bg-white border-b hover:bg-gray-100">
        <td className="py-4 px-6">{post.id}</td>
        <td className="py-4 px-6">{post.title}</td>
        <td className="py-4 px-6">
        <img src={post.image} alt={post.name} className="w-12 h-12 rounded-full" />
      </td>
        <td className="py-4 px-6">{post.metadesc}</td>
        <td className="py-4 px-6">{post.slug}</td>
        <td className="py-4 px-6">{post.type}</td>
        <td className="py-2 px-3 flex gap-3 items-center">
          <button className="flex items-center text-blue-500 hover:text-blue-700" onClick={() => handleEditPost(post)}>
            <PencilIcon className="h-6 w-6 mr-1" />
          </button>
          <button className="flex items-center text-green-500 hover:text-green-700" onClick={() => handleViewPost(post)}>
            <EyeIcon className="h-6 w-6 mr-1" />
          </button>
          <button className="flex items-center text-red-500 hover:text-red-700" onClick={() => deletePost(post.id)}>
            <TrashIcon className="h-6 w-6 mr-1" />
          </button>
        </td>
      </tr>
    ));

  const pageCount = Math.ceil(posts.length / postsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8081/api/posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, []);

  const addPostToList = (newPost) => {
    setPosts([...posts, newPost]);
    setShowCreateForm(false);
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
  };

  const handleViewPost = (post) => {
    setViewingPost(post);
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts(posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
    setEditingPost(null);
  };

  const deletePost = async (postId) => {
    try {
      const token = localStorage.getItem('token'); 
      await axios.delete(`http://localhost:8081/api/posts${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setPosts(posts.filter((post) => post.id !== postId));
      toast.success('Bài đăng đã được xóa thành công.');
    } catch (error) {
      console.error('Error deleting post: ', error);
      toast.error('Không thể xóa bài đăng: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div>
      <div className="mt-12 mb-8 flex flex-col gap-12 relative">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Quản lí bài đăng</h1>
        <button
          className="absolute top-4 right-4 flex items-center p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
          onClick={() => setShowCreateForm(true)}
        >
          <PlusIcon className="h-6 w-6" />
          <span className="sr-only">Create</span>
        </button>
        {showCreateForm && (
          <CreatePost
            onPostCreated={addPostToList}
            onClose={() => setShowCreateForm(false)}
          />
        )}

        {editingPost && (
          <EditPost
            postToEdit={editingPost}
            onPostUpdated={handlePostUpdated}
            onClose={() => setEditingPost(null)}
          />
        )}

        {viewingPost && (
          <SeePost
            post={viewingPost}
            onClose={() => setViewingPost(null)}
          />
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="py-3 px-6">ID</th>
                <th scope="col" className="py-3 px-6">Title</th>
                <th scope="col" className="py-3 px-6">Image</th>
                <th scope="col" className="py-3 px-6">Metadesc</th>
                <th scope="col" className="py-3 px-6">Slug</th>
                <th scope="col" className="py-3 px-6">Type</th>
                <th scope="col" className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayPosts}
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

export default Post;
