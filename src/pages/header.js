import React, { useState, useContext } from "react";
import { withRouter, useHistory } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  Nav,
  Button,
} from "reactstrap";
import LoginModal from '../users/loginModal'
import PostCreation from '../posts/postCreation'

const ForumHeader = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [chatModalisOpen, setChatModalIsOpen] = useState(false);
  let history = useHistory();

  const goToHomePage = () => {
    history.push("/");
  };
  const goToMyPage = () => {
    history.push("/mypage");
  };
  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <div>
      <Navbar className="light-grey-background mb-3" expand="lg">
        <NavbarBrand className="text-light pointer" onClick={goToHomePage}>
          <h3 className="my-auto ml-1 p-2">
            Forum
            <span className="orange-background forum-white borderRadius ml-1">
              Hub
            </span>
          </h3>
        </NavbarBrand>

          <Nav navbar>
            <NavItem>
              <NavLink className="forum-grey text-light pointer" onClick={goToHomePage}>
                <Button className="forum-button">Home</Button>
              </NavLink>
            </NavItem>
            <>
              <NavItem className="forum-grey" onClick={() => toggleModal}>
                <NavLink className="forum-grey pointer">
                  <LoginModal/>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <PostCreation/>
                </NavLink>
              </NavItem>
            </>
          </Nav>
      </Navbar>
    </div>
  );
};

export default withRouter(ForumHeader);
