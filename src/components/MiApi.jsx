import React from "react";
import Table from "react-bootstrap/Table";

const MiApi = ({ holidays }) => {
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
        {holidays.map((holiday, index) => (
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
