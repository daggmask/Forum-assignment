import React, {useEffect} from 'react'
import { Button, Form, Input, FormGroup, Label } from 'reactstrap';

const CommentField = ({commentPost, setCommentPost, postComment, locked, user}) => {


  return(
  <div>
    {locked ? 
      <Form>
      <FormGroup className="col-6 mx-auto">
        <Label for="postContent">Comment</Label>
        <Input disabled type="textarea" placeholder="Post is locked..."/>
        <Button disabled className="forum-button col-12 mt-2 mb-4">Comment</Button>
        </FormGroup>
      </Form>
      : user ? 
      <Form>
      <FormGroup className="col-6 mx-auto">
        <Label for="postContent">Comment</Label>
        <Input type="textarea" placeholder="Enter comment..." value={commentPost} onChange={(e) => setCommentPost(e.target.value)} />
        <Button className="forum-button col-12 mt-2 mb-4" onClick={() => postComment()}>Comment</Button>
        </FormGroup>
      </Form>
      : <h6 className="forum-dark-grey text-center m-4">Login to comment</h6>
    }

  </div>
  )
}

export default CommentField