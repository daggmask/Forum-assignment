import React, { useEffect, useState, useContext } from 'react'
import { Card, Button, CardTitle, CardText, Form, Input, FormGroup, Label } from 'reactstrap';
import {PostContext} from '../context/postContext'
import {UserContext} from "../context/userContext"
import {getDatePosted} from '../helpers/helpers'

const PostPage = () => {

const {selectedPost} = useContext(PostContext)
const {user} = useContext(UserContext)

const [comment, setComment] = useState("")

const getPostsComments = () => {
  
}

const postComment = async () => {
  let commentCredentials = {post: selectedPost.id, user: user.id, content: comment, timePosted: new Date().getTime()}
  console.log(commentCredentials);
  await fetch("/api/comments",{
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentCredentials),
  })
  .then((res) => res.json()
  .catch((error) => console.error(error))
  )
}

useEffect(() => {
  return () => {
    setComment("")
  }
}, [])

console.log(selectedPost);

  return(
    <div>
        <Card body>
          <CardTitle className="forum-dark-grey mx-auto"><h6>{selectedPost.title}</h6></CardTitle>
          <CardTitle className="forum-dark-grey mx-auto"><h6>Posted: {getDatePosted(selectedPost.timePosted)}</h6></CardTitle>
    <CardText className="forum-dark-grey mx-auto">{selectedPost.content}</CardText>
        </Card>
        <div className="container">
        {user ? 
          <Form>
          <FormGroup className="col-6 mx-auto">
            <Label for="postContent">Comment</Label>
            <Input type="textarea" placeholder="Enter comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
            <Button className="col-12 mt-2" onClick={() => postComment()}>Comment</Button>
            </FormGroup>
          </Form>
            :<h6 className="forum-dark-grey text-center m-4">Login to comment</h6> }
        </div> 

    </div>
  )
} 
export default PostPage