// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { getDocuments } from "../../firebase/firebase";

function PriorizationTable() {
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const documents = await getDocuments();
        const impactoData = [];
        documents.forEach(document => {
          document.data.data.Impacto.shift()
          document.data.data.Impacto.map(thisRow => {
            thisRow.week = document.data.week
          })
          impactoData.push(...document.data.data.Impacto)
        })
        const impactoAcidoData = []
        documents.forEach(document => {
          document.data.data["Impacto ácido"].shift()
          document.data.data["Impacto ácido"].map(thisRow => {
            thisRow.week = document.data.week
          })
          impactoAcidoData.push(...document.data.data["Impacto ácido"])
        })

        setData([...impactoData, ...impactoAcidoData]);
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
            {data.map((item, index) => {
              return <tr key={index}>
                <td>{item.week}</td>
                <td>{item.__EMPTY_4 || "N/A"}</td>
                <td>{item.__EMPTY_1 || "N/A"}</td>
                <td>{item.__EMPTY || "N/A"}</td>
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
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PriorizationTable;
