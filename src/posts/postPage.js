import React, { useEffect, useState, useContext } from 'react'
import { Card, Button, CardTitle, CardText, Form, Input, FormGroup, Label } from 'reactstrap';
import {PostContext} from '../context/postContext'
import {UserContext} from "../context/userContext"
import {getDatePosted} from '../helpers/helpers'
import {useHistory } from "react-router-dom";
import Comments from './comments'

const PostPage = () => {

const {selectedPost} = useContext(PostContext)
const {user} = useContext(UserContext)

const [commentPost, setCommentPost] = useState("")
const [comments, setComments] = useState([])
const [editPressed, setEditPressed] = useState(false)
const [postTitle, setPostTitle] = useState(selectedPost.title)
const [postContent, setPostContent] = useState(selectedPost.content)
const [moderatorSubjects, setModeratorSubjects] = useState([])

let condition = user ? selectedPost.creatorId === user.id : false
let history = useHistory();

const checkModeratorRole = (userToCheck) => {
  let subject = moderatorSubjects.find(subject => subject.subjectId === selectedPost.subjectId) || null
  if(subject === null){
    return false
  }
  return true
}

const getMods = async () => {
await fetch("/api/usersXsubjects")
.then((res) => res.json())
.then((data) => setModeratorSubjects(data)
& console.log(data))
.catch((error) => console.error(error))
}
const [removeButtonCondition] = useState(condition || checkModeratorRole(user))


const saveChanges = async () => {
  let updatedPost = Object.assign({},selectedPost)
  updatedPost.title = postTitle
  updatedPost.content = postContent

  await fetch("/api/posts/" + selectedPost.id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedPost),
  })
  .then((res) => res.json())
  .then(() => setEditPressed(false))
  .catch((error) => console.error(error));
  //Trigger render on posts
}

const getPostsComments = async () => {
  await fetch("/api/comments/" + selectedPost.id)
    .then((res) => res.json())
    .then((data) => setComments(data) & setCommentPost(""))
    .catch((error) => console.error(error))
}

const postComment = async () => {
  let commentCredentials = {post: selectedPost.id, user: user.username, userId: user.id, content: commentPost, timePosted: new Date().getTime()}
  console.log(commentCredentials);
  await fetch("/api/comments",{
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentCredentials),
  })
  .then((res) => res.json() & getPostsComments())
  .catch((error) => console.error(error))
}

const deletePost = async () => {
  await fetch("/api/posts/" + selectedPost.id, {
    method: "DELETE"
  })
    .then(() => history.push("/"))
    .catch((error) => console.error(error))
    //Remove comments too
}

useEffect(() => {
  getPostsComments()
  getMods()
  return () => {
    setCommentPost("")
    setComments([])
  }
}, [])

  return(
    <div>
        <Card body className="orange-background">
          <CardTitle className="mx-auto"><h4>
            {editPressed ? 
        <Input value={postTitle} onChange={(e) => setPostTitle(e.target.value)}></Input>
        : postTitle}</h4>
        </CardTitle>
          <CardTitle className="mx-auto"><h6>Posted: {getDatePosted(selectedPost.timePosted)}</h6></CardTitle>
        <CardText className="mx-auto"> 
        {editPressed ?
          <Input type="textarea" value={postContent} onChange={(e) => setPostContent(e.target.value)}></Input>
          : postContent}
          </CardText>
        {editPressed ? <Button className="forum-button-dark m-2 col-4 mx-auto" onClick={() => saveChanges()}>
            Save
          </Button> : null}
        {condition ?
        <Button className=" m-2 col-4 mx-auto" onClick={() => setEditPressed(!editPressed)}>
            Edit
          </Button>
           : null}
        {removeButtonCondition ? <Button className="forum-button-dark m-2 col-4 mx-auto" onClick={() => deletePost()}>Remove</Button> : null}
        </Card>
        <div className="container">
        {user ? 
          <Form>
          <FormGroup className="col-6 mx-auto">
            <Label for="postContent">Comment</Label>
            <Input type="textarea" placeholder="Enter comment..." value={commentPost} onChange={(e) => setCommentPost(e.target.value)} />
            <Button className="forum-button col-12 mt-2 mb-4" onClick={() => postComment()}>Comment</Button>
            </FormGroup>
          </Form>
            :<h6 className="forum-dark-grey text-center m-4">Login to comment</h6> }
        </div> 
        <Comments comments={comments} checkModeratorRole={checkModeratorRole} moderatorSubjects={moderatorSubjects}/>
    </div>
  )
} 
export default PostPage