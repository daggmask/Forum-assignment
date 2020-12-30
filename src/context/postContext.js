import React, { createContext, useState } from "react";

export const PostContext = createContext();

const PostContextProvider = (props) => {
  const [render, setRender] = useState(false);

  const values = {
    render,
    setRender,
  };

  return (
    <PostContext.Provider value={values}>{props.children}</PostContext.Provider>
  );
};
export default PostContextProvider;
