import React, { createContext, useEffect, useState } from "react";

export const PostContext = createContext();

const PostContextProvider = (props) => {
  const [render, setRender] = useState(false);

  useEffect(() => {
    console.log(render);
  }, [render]);

  const values = {
    render,
    setRender,
  };

  return (
    <PostContext.Provider value={values}>{props.children}</PostContext.Provider>
  );
};
export default PostContextProvider;
