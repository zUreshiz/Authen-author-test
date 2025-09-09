import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (isValidate()) {
      fetch(`http://localhost:3000/users?username=${username}`)
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          console.log(resp);
          if (resp.length === 0) {
            toast.error("Username not found");
          } else {
            let user = resp[0];
            if (user.password === password) {
              toast.success("Login success");
              sessionStorage.setItem("username", username);
              setTimeout(() => {
                setIsLoginSuccess(true);
              }, 1000);
              setUsername("");
              setPassword("");
            } else {
              toast.error("Please enter valid password");
            }
          }
        })
        .catch((err) => {
          toast.error("Login Failed due to: " + err.message);
        });
    }
  };

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
    return isValid;
  };

  if (isLoginSuccess) {
    return <Navigate to="/" replace={true}></Navigate>;
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Card style={{ width: "35rem", marginTop: "35px" }}>
            <Card.Header as={"h5"} style={{ paddingTop: "20px", paddingBottom: "20px" }}>
              LOGIN NOW
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

                <Button variant="primary" type="submit" onClick={(e) => handleLogin(e)}>
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
