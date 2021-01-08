import React, {useContext} from 'react'
import { Card,  CardTitle, CardText } from 'reactstrap';
import {PostContext} from '../context/postContext'
import {getDatePosted, checkCreator} from '../helpers/helpers'

const Comments = ({comments, postSubject}) => {
  const {selectedPost} = useContext(PostContext)

  return(
    <div>
        {comments.map((comment, i) => {
          return(
            <div className="mt-2" key={comment.id + i}>
            <Card className="col-6 mx-auto">
            <CardTitle className="forum-dark-grey m-2"><h6>{checkCreator(selectedPost,comment.userId) ? <span>Creator {comment.user}</span>  : !!comment.postedByModerator ? <span>Moderator {comment.user}</span> : comment.user} - {getDatePosted(comment.timePosted)}</h6></CardTitle>
            <CardText className="forum-dark-grey m-2">{comment.content}</CardText>
            </Card>
            </div>
          )
        }).sort((a,b) => a.timePosted > b.timePosted ? 1 : -1)}
    </div>
  )
}

export default Comments