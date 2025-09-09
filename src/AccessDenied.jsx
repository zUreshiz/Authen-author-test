import React from "react";

import { Container } from "react-bootstrap";

function AccessDenied(props) {
  return (
    <div>
      <Container>
        <h1>Access Denied</h1>
        <p>You dont have any permission to access</p>
      </Container>
    </div>
  );
}

export default AccessDenied;
