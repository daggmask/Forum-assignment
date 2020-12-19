import React, { useEffect, useState } from 'react'
import PostView from './postView'

const PostList = () => {
  const [postList, setPostList] = useState([])

  const fetchPosts = async () => {
    let res = await fetch("/api/posts")
      .then((response) => response.json())
      .then((data) => setPostList(data))
      .catch((err) => console.error(err));
      console.log(postList);
  };

  useEffect(() => {
    fetchPosts()
  },[])

  return(
    <div className="col-12 container">
      {postList.map(post => {
        return(
          <div className="col-4">
          <PostView post={post}/>
          </div>
        )
      })}
    </div>
  )
}
export default PostList