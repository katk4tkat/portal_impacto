// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { getDocuments } from "../../firebase/firebase";
import PropTypes from "prop-types";

function PriorizationTable({ filters }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const documentContent = [];
        const documents = await getDocuments();

        documents.forEach((document) => {
          Object.values(document.data).forEach((thisRow) => {
            if (thisRow && thisRow.weekName) {
              documentContent.push(thisRow);
            }
          });
        });

        const sortedData = [...documentContent].sort(
          (a, b) => b.weekName - a.weekName
        );

        setData(sortedData);
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
              <th scope="col">N°</th>
              <th scope="col">Sem</th>
              <th scope="col">Vulnerabilidad</th>
              <th scope="col">Unidad Técnica</th>
              <th scope="col">Equipo Sistema</th>
              <th scope="col">Descripción del trabajo</th>
              <th scope="col">Descripción del aviso</th>
              <th scope="col">Estado Impacto</th>
              <th scope="col">Estado Final</th>
              <th scope="col" colSpan="3" className="text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((item) => {
                return Object.keys(filters).every((field) => {
                  const filterValue = filters[field].toLowerCase();
                  if (field === "description" && filterValue) {
                    const combinedDescription =
                      (item.descripcion_del_trabajo || "N/A").toLowerCase() +
                      (item.descripcion_del_aviso || "N/A").toLowerCase();
                    if (!combinedDescription.includes(filterValue)) {
                      return false;
                    }
                  } else if (
                    filterValue &&
                    item[field] &&
                    !item[field].toLowerCase().includes(filterValue)
                  ) {
                    return false;
                  }
                  return true;
                });
              })
              .map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.weekName.slice(-2) || "N/A"}</td>
                    <td>{item.vulnerabilidad_1 || "N/A"}</td>
                    <td>{item.u_tecnica || "N/A"}</td>
                    <td>{item.equipo_o_sistema || "N/A"}</td>
                    <td>{item.descripcion_del_trabajo || "N/A"}</td>
                    <td>{item.descripcion_del_aviso || "N/A"}</td>
                    <td>*documento*</td>
                    <td>*documento*</td>
                    <td>
                      <a href="#">V.D.</a>
                    </td>
                    <td>
                      <a href="#">E.I.</a>
                    </td>
                    <td>
                      <a href="#">I.R.</a>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

PriorizationTable.propTypes = {
  filters: PropTypes.object,
};

export default PriorizationTable;
