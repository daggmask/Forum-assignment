import React, {useState, useEffect, useContext} from 'react'
import { Toast, ToastBody, ToastHeader, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import {UserContext} from "../context/userContext"
import {PostContext} from '../context/postContext'

const PostView = ({post}) => {
  const {render,setRender} = useContext(PostContext)
  const {user} = useContext(UserContext)
  const [modal, setModal] = useState(false);
  const [editPressed, setEditPressed] = useState(false)
  const [postTitle, setPostTitle] = useState(post.title)
  const [postContent, setPostContent] = useState(post.content)

  let condition = user ? post.creatorId === user.id : false

  const toggle = () => setModal(!modal);

  const saveChanges = async () => {
    let updatedPost = Object.assign({},post)
    updatedPost.title = postTitle
    updatedPost.content = postContent

    await fetch("/api/posts/" + post.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPost),
    })
    .then((res) => res.json())
    .then(() => setModal(false) & setEditPressed(false))
    .catch((error) => console.error(error));
    //Trigger render on posts
    setRender(!render)
  }

  const getDatePosted = (time) => {
    let date =  `
    ${new Date(time).getFullYear()}-${new Date(time).getMonth() < 10 ? "0" + new Date(time).getMonth() : new Date(time).getMonth()}-${new Date(time).getDay()}`
    return date
  }

  useEffect(() => {
    if(!editPressed){
      setPostTitle(post.title)
      setPostContent(post.content)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[editPressed])

  return (
    <div className="p-3 bg-dark text-dark my-2 rounded">
      <Toast onClick={toggle}>
        <ToastHeader>{post.title}</ToastHeader>
        <ToastBody>
          <h6>Posted: {getDatePosted(post.timePosted)}</h6>
         <h6>{post.subject}</h6>
          <p>
          {post.content}
          </p>
        </ToastBody>
      </Toast>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>{editPressed ? 
        <Input value={postTitle} onChange={(e) => setPostTitle(e.target.value)}></Input>
        : postTitle}</ModalHeader>
        <ModalBody>
          <h6>{post.subject}</h6>
          {editPressed ?
          <Input type="textarea" value={postContent} onChange={(e) => setPostContent(e.target.value)}></Input>
          : postContent}
        </ModalBody>
        <ModalFooter>
          {editPressed ? <Button className="forum-button" onClick={() => saveChanges()}>
            Save
          </Button> : null}
        {condition ?
        <Button className="forum-button" onClick={() => setEditPressed(!editPressed)}>
            Edit
          </Button>
           : null}
        <Button className="forum-button" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default PostView