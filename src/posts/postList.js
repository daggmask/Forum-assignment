import React, { useEffect, useState, useContext } from 'react'
import { Row } from "reactstrap";
import PostView from './postView'
import {PostContext} from '../context/postContext'
import PostFilterButton from './postFilterButton'
import {DebounceHelper} from '../helpers/helpers'

const PostList = () => {
  const {render} = useContext(PostContext)
  const [postList, setPostList] = useState([])
  
  const [filterOption, setFilterOption] = useState("Any")

  let postDebounce = new DebounceHelper()

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
    postDebounce.debounceHelper(fetchPosts)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[render])

  return(
    <div className="col-12 container">
      <PostFilterButton filterOption={filterOption} setFilterOption={setFilterOption}/>
      <Row>
      {renderPosts().map((post,i) => {
        return(
          <div className="col-4" key={post.id + i}>
          <PostView post={post}/>
          </div>
        )
      }).sort((a,b) => a.timePosted > b.timePosted ? 1 : -1)}
      </Row>
    </div>
  )
}
export default PostList