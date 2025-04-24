import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPostDetail();
  }, []);

  const fetchPostDetail = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8081/api/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPost(response.data);
    } catch (error) {
      console.error(`Error fetching post with ID ${id}:`, error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  const { title, detail, image } = post;

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-8">
          <h2>{title}</h2>
          <img src={image} className="img-fluid mb-4" alt={title} />
          <div dangerouslySetInnerHTML={{ __html: detail }}></div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
