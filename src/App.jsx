//Imports
import "./App.css";
import MiApi from "./components/MiApi";
import Buscador from "./components/Buscador";

//Boostrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

//React useState y useEffect import
import React, { useState, useEffect } from "react";

const App = () => {
  //Estado para buscar feriado
  const [search, setSearch] = useState("");

  //Estado para los feriados
  const [holidays, setHolidays] = useState([]);
  const [error, setError] = useState(null); //Estado para manejar los errores

  //Hook useEffect para obtener datos de la API
  useEffect(() => {

    const getData = async () => {
      
      try {
        //Sentencia Try
        const response = await fetch(
          "https://api.victorsanmartin.com/feriados/en.json"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        //Método sort: Ordena los feriados por fecha
        const sortedHolidays = json.data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setHolidays(sortedHolidays); //Actualización del estado con los datos de la API ordenados

      } catch (error) {
        //Sentencia Catch
        console.error("Error fetching data: ", error);
        setError(error.message); //Actualización del estado de error
      }
    };

    getData();
  }, []); //Array vacío asegura que este efecto se ejecute sólo una vez después de la renderización

  //Filtra titulo basado en término de búsqueda 'search'
  const filteredHoliday = search
    ? holidays.filter((holiday) =>
        holiday.title.toLowerCase().includes(search.toLowerCase())
      )
    : holidays;

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
            <MiApi holidays={filteredHoliday} />
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default App;
