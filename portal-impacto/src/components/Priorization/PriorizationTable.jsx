// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { getDocuments } from "../../firebase/firebase";

function PriorizationTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const documents = await getDocuments();
        setData(documents);
      } catch (error) {
        console.error("Error al obtener documentos: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="table-responsive-xxl">
        <table className="table table-hover">
          <thead className="table-secondary">
            <tr>
              <th scope="col">Fecha</th>
              <th scope="col">Semana</th>
              <th scope="col">Vulnerabilidad</th>
              <th scope="col">Unidad Técnica</th>
              <th scope="col">Equipo Sistema</th>
              <th scope="col">Estado Impacto</th>
              <th scope="col">Estado Final</th>
              <th scope="col" colSpan="3" className="text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <th scope="row">{item.data.date}</th>
                <td>{item.data.week}</td>
                <td>{item.data.data.Impacto[1].__EMPTY_4 || "N/A"}</td>
                <td>{item.data.data.Impacto[1].__EMPTY_1 || "N/A"}</td>
                <td>{item.data.data.Impacto[1].__EMPTY || "N/A"}</td>
                <td>*documento*</td>
                <td>*documento*</td>
                <td>
                  <a href="#">Ver Dossier</a>
                </td>
                <td>
                  <a href="#">Estado Impacto</a>
                </td>
                <td>
                  <a href="#">Ingreso de Registro</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PriorizationTable;
