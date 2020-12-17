import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from "reactstrap";
import PasswordInputField from './passwordInputField'

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessageShown, setErrorMessageShown] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button className="forum-button" onClick={toggle}>
        Login
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="text-center mx-auto">Login</ModalHeader>
        <ModalBody>
          <Form onSubmit={() => console.log("hello")}>
            <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12 m-0">
              <Label
                for="emailAddress"
                className="forum-dark-grey font-weight-bold"
              >
                Email
              </Label>
              <Input
                required
                className="light-light-grey-background forum-input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12 mt-2">
              <PasswordInputField
                setPassword={setPassword}
                password={password}
              />
            </FormGroup>
            <FormGroup className="col-xs-8 col-sm-12 col-md-12 col-lg-12 mt-2">
              {errorMessageShown ? (
                <div className="error-text mb-2 text-center font-weight-bold">
                  Felaktigt användarnamn eller lösenord{" "}
                </div>
              ) : (
                ""
              )}
              <Button className="forum-button col-xs-8 col-sm-12 col-md-12 col-lg-12 font-weight-bold">
                Logga in
              </Button>
            </FormGroup>
          </Form>
          <div className="text-center m-4">
            <p className="font-italic mb-0">Har du inte ett konto?</p>
            <p className="font-italic">
              {" "}
              Skapa konto{" "}
              <span className="text-primary click-text inline">
                <span>här</span>
              </span>
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button className="forum-button" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default LoginModal;
