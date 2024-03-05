//Imports
import "./App.css";
import MiApi from "./components/MiApi";
import Buscador from "./components/Buscador";

//Boostrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

//React useState import
import React, { useState } from "react";

const App = () => {
  //Estado para buscar feriado
  const [search, setSearch] = useState("");

  return (
    <>
      {/*Navbar*/}
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Prueba React</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">Alejandra Tobar</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/*Card*/}
      <Card style={{ width: "50rem" }}>
        <Card.Body>
          <Card.Title>DÍAS FERIADOS EN CHILE 2024</Card.Title>
          <Buscador setSearch={setSearch} />
          <Card.Text>
            <MiApi search={search} />
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default App;
