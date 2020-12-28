import React, { useEffect, useState, useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from "reactstrap";
import {UserContext} from "../context/userContext"

const PostCreation = () => {
  const {user} = useContext(UserContext)

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div> 
         <div>
      {user ? 
      <Button className="forum-button" onClick={toggle}>
        Create post
      </Button>
      : null}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="text-center mx-auto">Create a post</ModalHeader>
        <ModalBody>
          <Form onSubmit={() => console.log("hello")}>
            <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12 mt-2">
              <Label
             for="password"
              className="forum-dark-grey font-weight-bold col-12 custom-password-label"
            >
              #InputLabel?
            </Label>
             #Input?
            </FormGroup>
            <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12 mt-2">
              <Label
             for="password"
              className="forum-dark-grey font-weight-bold col-12 custom-password-label"
            >
              #InputLabel?
            </Label>
             #Input?
            </FormGroup>
            <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12 mt-2">
              <Button className="forum-button col-xs-8 col-sm-12 col-md-12 col-lg-12 font-weight-bold" onClick={() => console.log("Post")}>
                Post
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button className="forum-button" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
    </div>
  )
}

export default PostCreation