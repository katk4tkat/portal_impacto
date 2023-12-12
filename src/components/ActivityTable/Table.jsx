// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getActivitiesPaginated } from "../../utils/firebase.js";
import { removeSpecialCharacters } from "../../utils/removeSpecialCharacters.js";
import Pagination from "../UI/Pagination";
import Spinner from "../UI/Spinner";

function Table({ filters }) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 20;
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    if (Object.values(filters).some((value) => value !== "")) {
      setCurrentPage(1);
    }
  }, [filters]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsToSkip = (currentPage - 1) * itemsPerPage;
        const documents = await getActivitiesPaginated({
          limit: itemsPerPage,
          offset: itemsToSkip,
        });
        const documentContent = documents.map((document) => ({
          id: document.id,
          ...document.data,
        }));

        setData(documentContent);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener documentos: ", error);
      }
    };
    fetchData();
  }, [currentPage, itemsPerPage, filters]);

  const filteredData = data.filter((item) => {
    return Object.keys(filters).every((field) => {
      const filterValue = removeSpecialCharacters(filters[field]).toLowerCase();
      const itemValue = removeSpecialCharacters(item[field]).toLowerCase();

      if (field === "week_name" && filterValue) {
        if (itemValue.slice(-2) !== filterValue) {
          return false;
        }
      } else if (field === "description" && filterValue) {
        const combinedDescription =
          (removeSpecialCharacters(item.descripcion_del_trabajo) || "N/A") +
          (removeSpecialCharacters(item.descripcion_del_aviso) || "N/A");

        if (!combinedDescription.toLowerCase().includes(filterValue)) {
          return false;
        }
      } else if (filterValue && itemValue && !itemValue.includes(filterValue)) {
        return false;
      }
      return true;
    });
  });
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="table-responsive-xxl">
          <table className="table table-hover">
            <thead className="table-secondary">
              <tr className="align-middle">
                <th scope="col">N°</th>
                <th scope="col">Sem</th>
                <th scope="col">Vulnerabilidad</th>
                <th scope="col">Unidad Técnica</th>
                <th scope="col">Equipo Sistema</th>
                <th scope="col">Descripción del trabajo</th>
                <th scope="col">Descripción del aviso</th>
                <th scope="col">Estado Impacto</th>
                <th scope="col">Estado Final</th>
                <th scope="col" colSpan="4" className="text-center">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => {
                const itemNumber = (currentPage - 1) * itemsPerPage + index + 1;
                return (
                  <tr key={index}>
                    <td>{itemNumber}</td>
                    <td>{item.week_name.slice(-2) || "N/A"}</td>
                    <td>{item.vulnerabilidad_1 || "N/A"}</td>
                    <td>{item.u_tecnica || "N/A"}</td>
                    <td>{item.equipo_o_sistema || "N/A"}</td>
                    <td>{item.descripcion_del_trabajo || "N/A"}</td>
                    <td>{item.descripcion_del_aviso || "N/A"}</td>
                    <td>{item.current_status}</td>
                    <td>documento</td>
                    <td>
                      <Link to={`/update-activity-status/${item.id}`}>E.I</Link>
                    </td>
                    <td>
                      <Link to={`/upload-activity-log/${item.id}`}>I.R.</Link>
                    </td>
                    <td>
                      <Link to={`/activity-planning/${item.id}`}>P.A.</Link>
                    </td>
                    <td>
                      <Link to={`/view-activity-info/${item.id}`}>V.D.</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </>
  );
}

Table.propTypes = {
  filters: PropTypes.object,
};

export default Table;
