import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

  const isValidate = () => {
    let isValid = true;

    if (username === null || username === "") {
      isValid = false;
      toast.error("Please enter username");
    }
    if (password === null || password === "") {
      isValid = false;
      toast.error("Please enter password");
    }
    if (email === null || email === "") {
      isValid = false;
      toast.error("Please enter email");
    } else if (/^[a-zA-z0-9]+@[a-zA-z0-9]+\.[A-Za-z]+$/.test(email) === false) {
      isValid === false;
      toast.error("Please enter valid email");
    }
    return isValid;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (isValidate()) {
      let user = {
        username: username,
        password: password,
        email: email,
      };
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((res) => {
          toast.success("Register successful");
          setUsername("");
          setEmail("");
          setPassword("");
          setTimeout(() => {
            setIsRegisterSuccess(true);
          }, 1000);
        })
        .catch((err) => {
          toast.error("Failed: " + err.message);
        });
    }
  };

  if (isRegisterSuccess) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Card style={{ width: "35rem", marginTop: "35px" }}>
              <Card.Header
                as={"h5"}
                style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                REGISTER NOW
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => handleRegister(e)}>
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Register;
