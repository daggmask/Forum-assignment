import React from 'react'
import { ListGroup} from 'reactstrap';
import UserDetail from './userDetail'

const UsersList = ({userList, getUserList}) => {

  return(
    <ListGroup>
      {userList.map((user,i) => {
        return(<UserDetail user={user} getUserList={getUserList} key={user.id + i}/>)
      })}
    </ListGroup>
  )
}
export default UsersList