import React from "react";
import { useParams } from "react-router-dom";
import PostDetail from "../pages/DichVu/PostDetail";

const Pages = () => {
  let { id } = useParams();
  return (
    <div class="container">
      <PostDetail postId={id} />
    </div>
  );
};

export default Pages;
