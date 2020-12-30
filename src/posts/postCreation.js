import React, { useEffect, useState, useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from "reactstrap";
import {UserContext} from "../context/userContext"
import {PostContext} from '../context/postContext'

const PostCreation = () => {
  const {render,setRender} = useContext(PostContext)
  const {user} = useContext(UserContext)
  const [postContent, setPostContent] = useState("")
  const [postSubject, setPostSubject] = useState("General")

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal)
    if(!modal){
      setPostContent("")
      setPostSubject("General")
    }
  };

  const createPost = async () => {
    let post = {creatorId: user.id, content: postContent, subject: postSubject}
    console.log(post);

    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
    .then((res) => res.json())
    .then(() => setModal(false))
    .catch((error) => console.error(error));

    //Trigger render on posts
    setRender(!render)
  }



  return (
    <div> 
         <div>
      {user ? 
      <Button className="forum-button" onClick={toggle}>
        Create post
      </Button>
      : null}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="text-center mx-auto">Create a post</ModalHeader>
        <ModalBody>
          <Form onSubmit={() => console.log("hello")}>
            <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12 mt-2">
            <Label for="postContent">Content</Label>
            <Input type="textarea" placeholder="Enter content..." onChange={((e) => setPostContent(e.target.value))} id="postContent" />
            </FormGroup>
            <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12 mt-2">
              <Label
             for="Subject" className="forum-dark-grey font-weight-bold col-12 custom-password-label">
              Subject
             <Input type="select" onChange={((e) => setPostSubject(e.target.value))}>
               <option>General</option>
               <option>Gaming</option>
               <option>Not Gaming</option>
               <option>Memes</option>
             </Input>
            </Label>
            </FormGroup>
            <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12 mt-2">
              <Button className="forum-button col-xs-8 col-sm-12 col-md-12 col-lg-12 font-weight-bold" onClick={() => createPost()}>
                Post
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button className="forum-button" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
    </div>
  )
}

export default PostCreation