import React, { useContext} from 'react'
import { Toast, ToastBody, ToastHeader } from "reactstrap";
import { useHistory } from "react-router-dom";
import {PostContext} from '../context/postContext'
import {getDatePosted, checkModeratorRole, checkModerator, checkCreator, checkIfPostedByModerator} from '../helpers/helpers'
import {UserContext} from "../context/userContext"

const PostView = ({post}) => {
  const {selectedPost, setSelectedPost} = useContext(PostContext)
  const {user, moderatorSubjects} = useContext(UserContext)
  let history = useHistory();
  let isPostedByMod = () => checkIfPostedByModerator(moderatorSubjects, post) 

  const goToPostPage = () => {
    history.push(`/${post.id}`)
  }


  return (
    <div>
      {!isPostedByMod()
      ?     
      <div className="p-3 bg-dark text-dark my-2 rounded">
      <Toast onClick={() => goToPostPage() & setSelectedPost(post)}>
        <ToastHeader>{post.title}</ToastHeader>
        <ToastBody>
          <h6>Posted: {getDatePosted(post.timePosted)} </h6>
         <h6>{post.subject}</h6>
          <p>
          {post.content}
          </p>
        </ToastBody>
      </Toast>
    </div>
      : 
      <div className="p-3 bg-warning text-dark my-2 rounded">
      <Toast onClick={() => goToPostPage() & setSelectedPost(post)}>
        <ToastHeader>{post.title} - Posted by Moderator</ToastHeader>
        <ToastBody>
          <h6>Posted: {getDatePosted(post.timePosted)}</h6>
         <h6>{post.subject}</h6>
          <p>
          {post.content}
          </p>
        </ToastBody>
      </Toast>
    </div>
      }

    </div>
  );
}

export default PostView