import React, { useEffect, useState, useContext } from 'react'
import { Row } from "reactstrap";
import PostView from './postView'
import {PostContext} from '../context/postContext'
import PostFilterButton from './postFilterButton'
import {DebounceHelper} from '../helpers/helpers'
import {UserContext} from "../context/userContext"

const PostList = () => {
  const {setSelectedPost} = useContext(PostContext)
  const {user,  setIsMod} = useContext(UserContext)
  const {render} = useContext(PostContext)
  const [postList, setPostList] = useState([])
  
  const [filterOption, setFilterOption] = useState("Any")

  let postDebounce = new DebounceHelper()

  const fetchPosts = async () => {
    await fetch("/api/posts")
      .then((response) => response.json())
      .then((data) => {
        let list = data
        let newList = []
        list.forEach(async (post,i) => {
          let comments = await fetch("/api/comments/" + post.id)
          comments = await comments.json()
          let postWithComments = Object.assign({},post)
          postWithComments.comments = comments
          newList.push(postWithComments)
          if(i === data.length - 1){
            setPostList(newList)
          }
        })
      })
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

  const checkModerator = (post) => {
    if(user !== null && post !== null){
      if(user.userRole === "admin") return true
      let authList = []
      for(let area in user){
        if(area === "id" || area === "username" || area === "userRole"){
          continue
        }
        if(user[area] !== null){
          authList.push(user[area])
        }
      }
      return authList.indexOf(post.subject) > -1
    }
    else{
      return false
    }
}

const doCheckAndSetPost = async (post) => {
  let something = checkModerator(post)
  setIsMod(something)
  setSelectedPost(post)
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
          <div className="col-4" key={post.id + i} onClick={() => doCheckAndSetPost(post)}>
          <PostView post={post}/>
          </div>
        )
      }).sort((a,b) => a.timePosted > b.timePosted ? 1 : -1)}
      </Row>
    </div>
  )
}
export default PostList