import React, { useEffect, useState } from "react";
import { Button, Card, Container, Table } from "react-bootstrap";
import { toast } from "react-toastify";

function ManagedCustomer(props) {
  const [access, setAccess] = useState(true);
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  const [deleteState, setDeleteState] = useState(false);

  const handleAdd = () => {
    if (create) {
      toast.success("Added success");
    } else {
      toast.warning("You don't have any permission to access");
    }
  };

  const handleUpdate = () => {
    if (update) {
      toast.success("Update success");
    } else {
      toast.warning("You don't have any permission to do this action");
    }
  };

  const handleDelete = () => {
    if (deleteState) {
      toast.success("Delete success");
    } else {
      toast.warning("You don't have any permission to do this action");
    }
  };

  const getPermission = () => {
    let user =
      sessionStorage.getItem("user") != null
        ? JSON.parse(sessionStorage.getItem("user"))
        : "";
    let role = user ? user.role : "";

    fetch("http://localhost:3000/permissions?role=" + role + "&page=customer")
      .then((res) => {
        if (!res.ok) {
          toast.warning("You don't have any permission to access");
          return false;
        }
        return res.json();
      })
      .then((resp) => {
        if (resp.length > 0) {
          let permission = resp[0];
          setAccess(permission.access);
          setCreate(permission.create);
          setUpdate(permission.update);
          setDeleteState(permission.delete);
        } else {
          setAccess("false");
          toast.warning("You don't have any permission to access");
        }
      })
      .catch((err) => {
        setAccess("false");
        toast.error("Failed: ", err.message);
      });
  };

  useEffect(() => {
    getPermission();
  }, []);

  return (
    <Container>
      <Card>
        <Card.Header>Customer Listing</Card.Header>
        <Card.Body>
          <Button variant="primary" onClick={() => handleAdd()}>
            Add New
          </Button>{" "}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>
                  <Button variant="primary" onClick={() => handleUpdate()}>
                    Update
                  </Button>{" "}
                  <Button variant="secondary" onClick={() => handleDelete()}>
                    Delete
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ManagedCustomer;
