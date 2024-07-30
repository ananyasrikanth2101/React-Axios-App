import React from "react";
import UserList from "./components/UserList";
import { Container } from "react-bootstrap";
import "./App.css";

const App = () => {
  return (
    <Container>
      <h1 className="text-center my-4">React Axios Task</h1>
      <UserList />
    </Container>
  );
};

export default App;
