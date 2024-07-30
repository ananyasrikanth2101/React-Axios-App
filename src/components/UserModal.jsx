import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import "./UserModal.css";

const UserModal = ({ show, onHide, editingUser, setUsers, users }) => {
  const [user, setUser] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    if (editingUser) {
      setUser(editingUser);
    } else {
      setUser({ name: "", email: "", phone: "" });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      axios
        .put(`https://jsonplaceholder.typicode.com/users/${user.id}`, user)
        .then((response) => {
          setUsers(users.map((u) => (u.id === user.id ? response.data : u)));
          onHide();
        });
    } else {
      axios
        .post("https://jsonplaceholder.typicode.com/users", user)
        .then((response) => {
          setUsers([...users, response.data]);
          onHide();
        });
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{editingUser ? "Edit User" : "Add User"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter name"
              value={user.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Enter email"
              value={user.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              placeholder="Enter phone number"
              value={user.phone}
              onChange={handleChange}
            />
          </Form.Group>
          <Button className="btn btn-danger mt-4" onClick={onHide}>
            Close
          </Button>
          <Button className="btn btn-primary mt-4 ml-2" type="submit">
            {editingUser ? "Save Changes" : "Add User"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UserModal;
