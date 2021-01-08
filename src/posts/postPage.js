import React, { useEffect, useState, useContext } from 'react'
import { Card, Button, CardTitle, CardText, Input} from 'reactstrap';
import {PostContext} from '../context/postContext'
import {UserContext} from "../context/userContext"
import {getDatePosted, DebounceHelper} from '../helpers/helpers'
import {useHistory } from "react-router-dom";
import Comments from './comments'
import CommentField from './commentField'

const PostPage = () => {

const {selectedPost, setSelectedPost} = useContext(PostContext)
const {user, isMod} = useContext(UserContext)

const [commentPost, setCommentPost] = useState("")
const [editPressed, setEditPressed] = useState(false)
const [postTitle, setPostTitle] = useState(selectedPost.title)
const [postContent, setPostContent] = useState(selectedPost.content)
const [lockedStatus, setLockedStatus] = useState(!!selectedPost.isLocked)

let condition = user ? selectedPost.creatorId === user.id : false
let history = useHistory();

const checkAccess = () => {
  if(condition) return true
  if(isMod) return true
  if( user && user.userRole === "admin") return true
  return false
}

// eslint-disable-next-line no-mixed-operators
let moderatorButtonCondition = checkAccess()


const saveChanges = async () => {
  let updatedPost = Object.assign({},selectedPost)
  updatedPost.title = postTitle
  updatedPost.content = postContent
  setSelectedPost(updatedPost)

  await fetch("/api/posts/" + selectedPost.id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedPost),
  })
  .then((res) => res.json())
  .then(() => setEditPressed(false))
  .catch((error) => console.error(error));
}

const postComment = async () => {
  // eslint-disable-next-line no-mixed-operators
  let postedByMod = user && user.userRole === "admin" || user && user.userRole === "moderator" ? 1 : 0
  let commentCredentials = {post: selectedPost.id, user: user.username, userId: user.id, content: commentPost, timePosted: new Date().getTime(), postedByModerator: postedByMod}
  await fetch("/api/comments",{
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentCredentials),
  })
  .then((res) => res.json())
  .then(() => setCommentPost(""))
  .catch((error) => console.error(error))
}

const deletePost = async () => {
  await fetch("/api/posts/" + selectedPost.id, {
    method: "DELETE"
  })
    .then(() => history.push("/"))
    .catch((error) => console.error(error))
}

const lockPost = async () => {
  let updatedPost = Object.assign({},selectedPost)
  updatedPost.isLocked = !lockedStatus
  setLockedStatus(updatedPost.isLocked)
  updatedPost.isLocked = updatedPost.isLocked ? 1 : 0
  setSelectedPost(updatedPost)

  await fetch("/api/posts/" + selectedPost.id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedPost),
  })
  .then((res) => res.json())
  .catch((error) => console.error(error));
}

  return(
    <div>
        <Card body className="orange-background">
          <CardTitle className="mx-auto"><h4>
            {editPressed ? <Input value={postTitle} onChange={(e) => setPostTitle(e.target.value)}></Input>: postTitle}</h4>
        </CardTitle>
          <CardTitle className="mx-auto"><h6>Posted: {getDatePosted(selectedPost.timePosted)} by {selectedPost.creator}</h6></CardTitle>
        <CardText className="mx-auto"> 
        {editPressed ?<Input type="textarea" value={postContent} onChange={(e) => setPostContent(e.target.value)}></Input>: postContent}
          </CardText>
        {editPressed ? <Button className="forum-button-dark m-2 col-4 mx-auto" onClick={() => saveChanges()}>Save</Button> : null}
        {condition ?<Button className=" m-2 col-4 mx-auto" onClick={() => setEditPressed(!editPressed)}>Edit</Button>: null}
        {moderatorButtonCondition ? 
        <div className="mx-auto">
          <div>
          <Button className="forum-button-dark m-2 col-12" onClick={() => deletePost()}>Remove</Button>
          </div>
          {user ? user.userRole === "moderator" || user.userRole === "admin" ? 
          <div>
          <Button className="forum-button-dark m-2 col-12" onClick={() => lockPost()}>{lockedStatus ? "unlock post" : "lock post"}</Button>
          </div> : null : null}
        </div>
         : null}
        </Card>
        <div className="container">
          <CommentField 
          commentPost={commentPost} 
          setCommentPost={setCommentPost} 
          postComment={postComment} 
          locked={lockedStatus} 
          user={user}/>
        </div> 
        <Comments comments={selectedPost.comments}/>
    </div>
  )
} 
export default PostPage