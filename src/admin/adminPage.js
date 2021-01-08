import React, { useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import UserList from './usersList'

const AdminPage = () => {
  const [searchData, setSearchData] = useState("")
  const [userList, setUserList] = useState([])

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const getUserList = async () => {
    await fetch("/api/users/" + searchData)
      .then((res) => res.json())
      .then((data) => setUserList(data))
      .catch((error) => console.error(error))
  }

  return(
    <div>
      <Button color="danger" onClick={toggle}>Open Admin Panel</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="mx-auto">Admin Panel</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label className="mx-auto" for="searchUsers">
                Search Users
              </Label>
              <Input type="text" placeholder="Search user" className="col-12" name="searchUsers" onChange={(e) => setSearchData(e.target.value)}/>
              <Button className="mt-2 forum-button" onClick={() => getUserList()} >Search</Button>
            </FormGroup>
          </Form>
          <UserList userList={userList} getUserList={getUserList}/>
        </ModalBody>
        <ModalFooter>
          <Button className="forum-button" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
export default AdminPage