import React, { useState, useEffect } from "react";
import axios from "axios";
import UserModal from "./UserModal";
import { Card, Button, Row, Col } from "react-bootstrap";
import "./UserList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      });
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setShowModal(true);
  };

  return (
    <div>
      <Button className="mb-4 add-user-btn btn-primary" onClick={handleAddUser}>
        Add User
      </Button>
      <UserModal
        show={showModal}
        onHide={() => setShowModal(false)}
        editingUser={editingUser}
        setUsers={setUsers}
        users={users}
      />
      <Row>
        {users.map((user) => (
          <Col key={user.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="card ">
              <Card.Body className="d-flex flex-column card-color">
                <Card.Title className="text-black">{user.name}</Card.Title>
                <Card.Subtitle className="mb-2 ">{user.email}</Card.Subtitle>
                <Card.Text className="text-black">{user.phone}</Card.Text>
                <div className="mt-auto ">
                  <Button
                    className="mr-2  mb-2 btn btn-success"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="mb-2 ml-2 btn btn-danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default UserList;
