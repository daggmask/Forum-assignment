import React, { useEffect, useState, useContext } from 'react'
import { Row } from "reactstrap";
import PostView from './postView'
import {PostContext} from '../context/postContext'

const PostList = () => {
  const {render,setRender} = useContext(PostContext)
  const [postList, setPostList] = useState([])

  const fetchPosts = async () => {
    await fetch("/api/posts")
      .then((response) => response.json())
      .then((data) => setPostList(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchPosts()
    console.log(postList);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[render])

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