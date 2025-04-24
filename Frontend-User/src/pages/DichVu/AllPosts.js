import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Card, Button } from "react-bootstrap"; // Import các thành phần từ React Bootstrap

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const postsPerPage = 6; // Số lượng bài viết mỗi trang

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8081/api/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const renderPosts = () => {
    const offset = pageNumber * postsPerPage;
    const currentPagePosts = posts.slice(offset, offset + postsPerPage);

    return (
      <div className="row">
        {currentPagePosts.map((post) => (
          <div key={post.id} className="col-md-4 mb-4">
            <Card className="h-100 shadow">
              <Card.Img variant="top" src={post.image} alt={post.title} />
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.metadesc}</Card.Text>
                <Link to={`/pages/${post.id}`}>
                  <Button variant="primary">Xem chi tiết</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    );
  };

  const pageCount = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Tất cả bài viết</h2>
      {renderPosts()}
      <nav className="d-flex justify-content-center mt-4">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
        />
      </nav>
    </div>
  );
};

export default AllPosts;
