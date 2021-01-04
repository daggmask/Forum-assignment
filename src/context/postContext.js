import React, { createContext, useState } from "react";

export const PostContext = createContext();

const PostContextProvider = (props) => {
  const [render, setRender] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null)

  const values = {
    render,
    setRender,
    selectedPost, 
    setSelectedPost
  };

  return (
    <PostContext.Provider value={values}>{props.children}</PostContext.Provider>
  );
};
export default PostContextProvider;
