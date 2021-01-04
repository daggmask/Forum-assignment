import React, { useEffect, useState, useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from "reactstrap";

const UserCreation = ({doLogin}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessageShown, setErrorMessageShown] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const registerUser = async () => {
    const credentials = {email: email, password: password, userRole: "basicUser"}
    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
      .then((res) => res.json()
        & setModal(false)
        & setErrorMessageShown(false)
        & doLogin())
      .catch((error) => console.error(error));
  }

  return(
    <div>
      <div className="text-center m-4" onClick={toggle}>
        <p className="font-italic mb-0">Don't have an account?</p>
        <p className="font-italic">
          {" "}
          Register{" "}
          <span className="text-primary click-text inline">
            <span>here</span>
          </span>
        </p>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="text-center mx-auto">Register</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12 m-0">
              <Label
                for="emailAddress"
                className="forum-dark-grey font-weight-bold col-12"
              >
                Email
              </Label>
              <Input
                required
                className="light-light-grey-background forum-input"
                type="email"
                placeholder="Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12 mt-2">
              <Label
             for="password"
              className="forum-dark-grey font-weight-bold col-12"
            >
              Lösenord
            </Label>
             <Input
                required
                className="light-light-grey-background forum-input col-10 noBorder"
                type="password"
                placeholder="Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12 mt-2">
              {errorMessageShown ? (
                <div className="error-text mb-2 text-center font-weight-bold">
                  Invalid username or password{" "}
                </div>
              ) : (
                ""
              )}
              <Button className="forum-button col-xs-8 col-sm-12 col-md-12 col-lg-12 font-weight-bold" onClick={() => registerUser()}>
                Register
              </Button>
            </FormGroup>
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
  )

}

export default UserCreation