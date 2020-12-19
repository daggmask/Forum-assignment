import React, { useEffect, useState } from 'react'
import PostView from './postView'

const PostList = () => {
  const [postList, setPostList] = useState([])

  const fetchPosts = async () => {
    let list = await fetch("http://localhost:4000/api/posts");
    list = await list.json()
    console.log(list);
    setPostList(list)
  }

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