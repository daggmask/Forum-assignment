import React, { useEffect, useState } from 'react'
import { Row } from "reactstrap";
import PostView from './postView'

const PostList = () => {
  const [postList, setPostList] = useState([])

  const fetchPosts = async () => {
    await fetch("/api/posts")
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
      <Row>
      {postList.map(post => {
        return(
          <div className="col-4">
          <PostView post={post}/>
          </div>
        )
      })}
      </Row>
    </div>
  )
}
export default PostList