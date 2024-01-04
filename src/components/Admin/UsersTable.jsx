// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getUsersPaginated } from "../../utils/firebase.js";
import { removeSpecialCharacters } from "../../utils/removeSpecialCharacters.js";
import Pagination from "../UI/Pagination";
import Spinner from "../UI/Spinner";

function UsersTable({ filters }) {
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
                const documents = await getUsersPaginated({
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

            if (field === "name" && filterValue) {
                if (itemValue !== filterValue) {
                    return false;
                }
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
                                <th scope="col">Nombre</th>
                                <th scope="col">Correo Electrónico</th>
                                <th scope="col">Rol</th>
                                <th scope="col" colSpan="2" className="text-center">
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
                                        <td>{item.name || "N/A"}</td>
                                        <td>{item.email || "N/A"}</td>
                                        <td>{item.role || "N/A"}</td>
                                        <td>
                                            <Link to={`/update-activity-status/${item.id}`}>Editar</Link>
                                        </td>
                                        <td>
                                            <Link to={`/upload-activity-log/${item.id}`}>Eliminar</Link>
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

UsersTable.propTypes = {
    filters: PropTypes.object,
};

export default UsersTable;
