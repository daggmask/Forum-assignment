import React, { useContext} from 'react'
import { Toast, ToastBody, ToastHeader } from "reactstrap";
import { useHistory } from "react-router-dom";
import {PostContext} from '../context/postContext'
import {getDatePosted} from '../helpers/helpers'

const PostView = ({post}) => {
  const {setSelectedPost} = useContext(PostContext)
  let history = useHistory();

  const goToPostPage = () => {
    history.push(`/${post.id}`)
  }


  return (
    <div className="p-3 bg-dark text-dark my-2 rounded">
      <Toast onClick={() => goToPostPage() & setSelectedPost(post)}>
        <ToastHeader>{post.title}</ToastHeader>
        <ToastBody>
          <h6>Posted: {getDatePosted(post.timePosted)}</h6>
         <h6>{post.subject}</h6>
          <p>
          {post.content}
          </p>
        </ToastBody>
      </Toast>
    </div>
  );
}

export default PostView