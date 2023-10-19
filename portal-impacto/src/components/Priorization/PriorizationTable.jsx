// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { getDocuments } from "../../firebase/firebase";

function PriorizationTable() {
  const [data, setData] = useState([]);
  const [impactoTotal, setImpactoTotal] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const documents = await getDocuments();
        const impactoData = [];
        documents.forEach(document => {
          document.data.data.Impacto.shift()
          document.data.data.Impacto.map(thisRow => {
            thisRow.week = document.data.week.slice(-2)
          })
          impactoData.push(...document.data.data.Impacto)
        })
        const impactoAcidoData = []
        documents.forEach(document => {
          document.data.data["Impacto ácido"].shift()
          document.data.data["Impacto ácido"].map(thisRow => {
            thisRow.week = document.data.week.slice(-2)
          })
          impactoAcidoData.push(...document.data.data["Impacto ácido"])
        })
        const impactoTotalData = []
        impactoTotalData.push(...impactoData)
        impactoTotalData.push(...impactoAcidoData)
        setImpactoTotal(impactoTotalData.length);

        const sortedData = [...impactoData, ...impactoAcidoData].sort((a, b) => b.week - a.week);

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
              <th scope="col">Estado Impacto</th>
              <th scope="col">Estado Final</th>
              <th scope="col" colSpan="3" className="text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.week}</td>
                  <td>{item.__EMPTY_4 || "N/A"}</td>
                  <td>{item.__EMPTY_1 || "N/A"}</td>
                  <td>{item.__EMPTY || "N/A"}</td>
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

export default PriorizationTable;
