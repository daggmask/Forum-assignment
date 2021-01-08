import React, {useState, useContext} from 'react'
import { ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup  } from 'reactstrap';
import {checkIfModerator} from '../helpers/helpers'

const UserDetail = ({user, getUserList}) => {
  const [modal, setModal] = useState(false);
  const [moderatorArea_1, setModeratorArea_1] = useState(user.moderator_area_1 ? true : false)
  const [moderatorArea_2, setModeratorArea_2] = useState(user.moderator_area_2 ? true : false)
  const [moderatorArea_3, setModeratorArea_3] = useState(user.moderator_area_3 ? true : false)
  const [moderatorArea_4, setModeratorArea_4] = useState(user.moderator_area_4 ? true : false)
  let userIsModerator = checkIfModerator(user) ? true : false

  const toggle = () => {
    setModal(!modal)
    console.log(checkIfModerator(user));
  }
  
  const save = async () => {
    let updates = Object.assign({}, user)
    updates.moderator_area_1 = moderatorArea_1 ? "General" : null
    updates.moderator_area_2 = moderatorArea_2 ? "Gaming" : null
    updates.moderator_area_3 = moderatorArea_3 ? "Daily" : null
    updates.moderator_area_4 = moderatorArea_4 ? "Memes" : null
    await fetch("/api/users/" + user.id,{
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    })
      .then(() => getUserList())
      .then(() => toggle())
      .catch((error) => console.error(error))
  }

  return(
    <ListGroupItem>
    <div onClick={toggle}>
      <span>Name: {user.username} </span>
      <span>Role: {user.userRole} </span>
    {userIsModerator ? 
    <Button className="forum-button" >Revoke Moderator Role</Button>
    : user.userRole === "basicUser" ? 
    <Button className="forum-button" >Make Moderator</Button> 
    : null}
    </div>
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader className="mx-auto">{user.username}</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup className="mt-2">
          <Input type="checkbox" checked={moderatorArea_1} onChange={() => setModeratorArea_1(!moderatorArea_1)}></Input>
        <Label>
        <span className="m-2">Moderator - General</span>
        </Label>
          </FormGroup>
          <FormGroup className="mt-2">
          <Input type="checkbox"checked={moderatorArea_2} onChange={() => setModeratorArea_2(!moderatorArea_2)}></Input>
        <Label>
        <span className="m-2">Moderator - Gaming</span>
        </Label>
          </FormGroup>
          <FormGroup className="mt-2">
          <Input type="checkbox" checked={moderatorArea_3} onChange={() => setModeratorArea_3(!moderatorArea_3)}></Input>
        <Label>
        <span className="m-2">Moderator - Daily</span>
        </Label>
          </FormGroup>
          <FormGroup className="mt-2">
          <Input type="checkbox" checked={moderatorArea_4} onChange={() => setModeratorArea_4(!moderatorArea_4)}></Input>
        <Label>
        <span className="m-2">Moderator - Memes</span>
        </Label>
          </FormGroup>
          <Button className="forum-button col-xs-8 col-sm-12 col-md-12 col-lg-12 font-weight-bold mt-4" onClick={() => save()}>Save</Button>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button className="forum-button" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  </ListGroupItem>
  )
}
export default UserDetail