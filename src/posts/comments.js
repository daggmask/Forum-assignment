import React, {useContext} from 'react'
import { Card,  CardTitle, CardText } from 'reactstrap';
import {PostContext} from '../context/postContext'
import {getDatePosted} from '../helpers/helpers'

const Comments = ({comments, moderatorSubjects}) => {
  const {selectedPost} = useContext(PostContext)

  const checkCreator = (commenter) =>{
    return selectedPost.creatorId === commenter
  }

  const checkModerator = (commenter) => {
    let foundModeratorRole = moderatorSubjects.find(subject => subject.userId === commenter.userId) ||null
    return foundModeratorRole ? true : false
  }

  return(
    <div>
        {comments.map(comment => {
          return(
            <div className="mt-2">
            <Card className="col-6 mx-auto">
            <CardTitle className="forum-dark-grey m-2"><h6>{checkCreator(comment.userId) ? <span>👑{comment.user}</span>  : checkModerator(comment) ? <span>🤖{comment.user}</span> : comment.user} - {getDatePosted(comment.timePosted)}</h6></CardTitle>
            <CardText className="forum-dark-grey m-2">{comment.content}</CardText>
            </Card>
            </div>
          )
        }).sort((a,b) => a.timePosted > b.timePosted ? 1 : -1)}
    </div>
  )
}

export default Comments