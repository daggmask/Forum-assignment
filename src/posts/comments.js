import React, {useContext} from 'react'
import { Card,  CardTitle, CardText } from 'reactstrap';
import {PostContext} from '../context/postContext'
import {getDatePosted} from '../helpers/helpers'

const Comments = ({comments}) => {
  const {selectedPost} = useContext(PostContext)

  const checkCreator = (commenter) =>{
    return selectedPost.creatorId === commenter
  }

  return(
    <div>
        {comments.map(comment => {
          return(
            <div className="mt-2">
            <Card className="col-6 mx-auto">
            <CardTitle className="forum-dark-grey m-2"><h6>{checkCreator() ? <div><span class="material-icons">face</span> {comment.user}</div> : comment.user} - {getDatePosted(comment.timePosted)}</h6></CardTitle>
            <CardText className="forum-dark-grey m-2">{comment.content}</CardText>
            </Card>
            </div>
          )
        }).sort((a,b) => a.timePosted > b.timePosted ? 1 : -1)}
    </div>
  )
}

export default Comments