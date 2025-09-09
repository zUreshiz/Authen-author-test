import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";

function Header(props) {
  const [isLogoutSuccess, setIsLogoutSuccess] = useState(false);

  const handleLogout = () => {
    sessionStorage.clear();
    setTimeout(() => {
      setIsLogoutSuccess(true);
    }, 1000);
  };
  if (isLogoutSuccess) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return (
    <Navbar expand="lg" bg="success" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <Nav.Link href="#link">New</Nav.Link>
            <Nav.Link href="#link">Contact</Nav.Link>
          </Nav>
          {(null != sessionStorage.getItem("username")) &
          ("" !== sessionStorage.getItem("username")) ? (
            <Nav>
              <Navbar.Text>
                Hi:{" "}
                <a href="#" style={{ textDecoration: "none" }}>
                  {sessionStorage.getItem("username")}
                </a>
              </Navbar.Text>
              <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
