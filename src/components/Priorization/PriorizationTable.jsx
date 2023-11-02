// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getDocuments } from "../../utils/firebase.js";
import Spinner from "../UI/Spinner";

function PriorizationTable({ filters }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const documents = await getDocuments();
        const documentContent = documents.map((document) => ({
          id: document.id,
          ...document.data,
        }));

        const sortedData = documentContent.sort((a, b) => {
          const weekA = parseInt(a.weekName.slice(-2)) || 0;
          const weekB = parseInt(b.weekName.slice(-2)) || 0;
          return weekB - weekA;
        });

        setData(sortedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener documentos: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
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
                    if (field === "weekName" && filterValue) {
                      if (item.weekName.slice(-2) !== filterValue) {
                        return false;
                      }
                    } else if (field === "description" && filterValue) {
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
                      <td>{item.impactoStatus}</td>
                      <td>documento</td>
                      <td>
                        <Link to={`/update-status/${item.id}`}>E.I</Link>
                      </td>
                      <td>
                        <a href="#">I.R.</a>
                      </td>
                      <td>
                        <a href="#">V.D.</a>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

PriorizationTable.propTypes = {
  filters: PropTypes.object,
};

export default PriorizationTable;
