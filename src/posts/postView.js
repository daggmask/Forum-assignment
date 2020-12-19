import React from 'react'
import { Toast, ToastBody, ToastHeader } from "reactstrap";

const PostView = ({post}) => {

  return (
    <div className="p-3 bg-dark text-dark my-2 rounded">
      <Toast>
        <ToastHeader>{post.subject}</ToastHeader>
        <ToastBody>
          {post.content}
        </ToastBody>
      </Toast>
    </div>
  );
}

export default PostView