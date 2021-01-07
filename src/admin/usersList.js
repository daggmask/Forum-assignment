import React from 'react'
import { ListGroup, ListGroupItem, Badge  } from 'reactstrap';

const UsersList = ({userList}) => {


  return(
    <ListGroup>
      {userList.map((user, i) => {
        return(
          <div key={user.id + i}>
            {user.userRole === "moderator" ?           
            <ListGroupItem className="mt-2 justify-content-between" color="secondary">
            Name: {user.username} Role: {user.userRole}
          </ListGroupItem>
          : user.userRole === "admin" ? 
          <ListGroupItem className="mt-2 justify-content-between" color="primary">
          Name: {user.username} Role: {user.userRole}
        </ListGroupItem>
        : 
        <ListGroupItem className="mt-2 justify-content-between">
        Name: {user.username} Role: {user.userRole}
      </ListGroupItem>}
          </div>
        )
      })}
    </ListGroup>
  )
}
export default UsersList