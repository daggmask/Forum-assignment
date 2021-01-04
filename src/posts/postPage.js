import React, { useEffect, useState, useContext } from 'react'
import { Card, Button, CardTitle, CardText, Form, Input, FormGroup, Label } from 'reactstrap';
import {PostContext} from '../context/postContext'
import {UserContext} from "../context/userContext"
import {getDatePosted} from '../helpers/helpers'

const PostPage = () => {

const {selectedPost} = useContext(PostContext)
const {user} = useContext(UserContext)

const [commentPost, setCommentPost] = useState("")
const [comments, setComments] = useState([])

const getPostsComments = async () => {
  await fetch("/api/comments/" + selectedPost.id)
    .then((res) => res.json())
    .then((data) => setComments(data))
    .catch((error) => console.error(error))
}

const postComment = async () => {
  let commentCredentials = {post: selectedPost.id, user: user.email, userId: user.id, content: commentPost, timePosted: new Date().getTime()}
  console.log(commentCredentials);
  await fetch("/api/comments",{
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentCredentials),
  })
  .then((res) => res.json() & getPostsComments())
  .catch((error) => console.error(error))
}

useEffect(() => {
  getPostsComments()
  return () => {
    setCommentPost("")
    setComments([])
  }
}, [])

useEffect(() => {
  console.log(comments);
},[comments])

console.log(selectedPost);

  return(
    <div>
        <Card body className="orange-background">
          <CardTitle className="mx-auto"><h4>{selectedPost.title}</h4></CardTitle>
          <CardTitle className="mx-auto"><h6>Posted: {getDatePosted(selectedPost.timePosted)}</h6></CardTitle>
    <CardText className="mx-auto">{selectedPost.content}</CardText>
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
        {comments.map(comment => {
          return(
            <div className="mt-2">
           <Card className="col-6 mx-auto">
          <CardTitle className="forum-dark-grey mx-auto"><h6>Posted by: {comment.user}</h6></CardTitle>
           <CardTitle className="forum-dark-grey mx-auto"><h6>Commented: {getDatePosted(comment.timePosted)}</h6></CardTitle>
           <CardText className="forum-dark-grey mx-auto">{comment.content}</CardText>
           </Card>
              {/* <h6 className="forum-dark-grey">{comment.content} {getDatePosted(comment.timePosted)}</h6> */}
            </div>
          )
        })}
    </div>
  )
} 
export default PostPage