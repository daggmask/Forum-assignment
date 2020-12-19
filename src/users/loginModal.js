import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from "reactstrap";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessageShown, setErrorMessageShown] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const doLogin = async () => {
    // const credentials = {email: email, password: password}
    console.log(
      JSON.stringify({
        email: "yaooo@gmail.com",
        password: "12345",
      })
    );
    let res = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
      url: "http://localhost:4000",
      body: JSON.stringify({
        email: "yaooo@gmail.com",
        password: "12345",
      }),
    });
    try{
      res = await res.json()
      console.log(res);
    }
    catch{
    }
  }

  useEffect(() => {
    console.log(email + " " + password);
  },[email && password])

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
              <Label
             for="password"
              className="forum-dark-grey font-weight-bold col-12 custom-password-label"
            >
              Lösenord
            </Label>
             <Input
                required
                className="light-light-grey-background forum-input col-10 noBorder"
                type="password"
                placeholder="Lösenord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              <Button className="forum-button col-xs-8 col-sm-12 col-md-12 col-lg-12 font-weight-bold" onClick={() => doLogin()}>
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
