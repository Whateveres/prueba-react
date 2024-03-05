import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";


const MiApi = ({ search = "" }) => {
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
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Fecha</th>
          <th>Título</th>
          <th>Tipo</th>
          <th>Detalles</th>
        </tr>
      </thead>
      <tbody>
        {/*Itera sobre arreglo de monedas para generar fila por cada uno*/}
        {filteredHoliday.map((holiday, index) => (
          <tr key={holiday}>
            <td>{index + 1}</td>
            <td>{holiday.date}</td>
            <td>{holiday.title}</td>
            <td>{holiday.type}</td>
            <td>{holiday.extra}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default MiApi;
