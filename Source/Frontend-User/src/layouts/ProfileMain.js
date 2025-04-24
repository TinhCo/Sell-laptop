import React from "react";
import Content from "../pages/profile-main/Content";
import Contentpage from "../pages/profile-main/Contentpage";

function ProfileMain(props) {
  return (
    <div class="container">
      <Contentpage />
      <Content />
    </div>
  );
}
export default ProfileMain;
