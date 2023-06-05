import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ContextAuth } from "../context/AuthContext";
import { Navbar } from "../components/layout/Navbar";
import { Searcher } from "../components/layout/Searcher";
import { Footer } from "../components/layout/Footer";
import { useLocation } from "react-router-dom";


export const DetailsMySales = () => {
  const { state } = useLocation();
  const { year, month } = state;
  const [myProducts, setMyProducts] = useState([]);
  const { token } = useContext(ContextAuth);
  const config = {
    headers: {
      "content-type": "application/json",
      "x-access-token": token,
    },
    params: {
        year: year,
        month: month,
      },
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/salesForUser", config)
      .then((res) => {
        // res.data.result[0].products.length > 0 && setMyProducts(res.data.result[0].products)
        console.log(res.data)
      })
      .catch((err) => console.log(err));
  }, []);



  return (
    <>
      <div className="main-content">
        <Navbar />
        <Searcher />
        <table id="tableSales" className="table">
          <thead>
            <tr>
              <th>Nombre del producto</th>
              <th>Cantidad vendidas</th>
              <th>Total de inversión</th>
              <th>Total de recaudación</th>
              <th>Ganancia</th>
              
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {/* {
              myProducts.map((value, index) => {

                return (
                  <tr key={index}>
                    <td>{value.product}</td>
                    <td>{value.totalQuantity}</td>
                    <td>${value.totalCostPrice}</td>
                    <td>${value.totalSellPrice}</td>
                    <td>${value.difference}</td>
                  </tr>
                );
              })} */}
          </tbody>
        </table>
        <div id="monto">{/* <h4>Monto de ventas: {total}</h4> */}</div>

        <Footer />
      </div>
    </>
  );
};
