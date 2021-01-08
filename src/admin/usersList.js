import React from 'react'
import { ListGroup, ListGroupItem, Badge, Button  } from 'reactstrap';
import UserDetail from './userDetail'

const UsersList = ({userList, getUserList}) => {

  return(
    <ListGroup>
      {userList.map((user,i) => {
        return(<UserDetail user={user} getUserList={getUserList}/>)
      })}
    </ListGroup>
  )
}
export default UsersList