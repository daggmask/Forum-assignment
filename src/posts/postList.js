import React, { useEffect, useState, useContext } from 'react'
import { Row } from "reactstrap";
import PostView from './postView'
import {PostContext} from '../context/postContext'
import PostFilterButton from './postFilterButton'

const PostList = () => {
  const {render} = useContext(PostContext)
  const [postList, setPostList] = useState([])
  const [filterOption, setFilterOption] = useState("Any")

  const fetchPosts = async () => {
    await fetch("/api/posts")
      .then((response) => response.json())
      .then((data) => setPostList(data))
      .catch((err) => console.error(err));
  };

  const renderPosts = () => {
    if(filterOption === "Any"){
      return postList
    }
    else{
      return postList.filter(post => post.subject === filterOption)
    }
  }

  useEffect(() => {
    fetchPosts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[render])

  return(
    <div className="col-12 container">
      <PostFilterButton filterOption={filterOption} setFilterOption={setFilterOption}/>
      <Row>
      {renderPosts().map(post => {
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