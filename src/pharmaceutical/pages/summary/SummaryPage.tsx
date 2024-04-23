import { useEffect, useState } from "react";
import { useCheckInformation } from "../../../hooks";
import { PharmaceuticalLayout } from "../../layout"

import './SummaryPage.css';

export const SummaryPage = () => {

  const { sales, clients, suppliers, products } = useCheckInformation();
  const [totalSales, setTotalSales] = useState<number>(0);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [totalClients, setTotalClients] = useState<number>(0);
  const [totalSuppliers, setTotalSuppliers] = useState<number>(0);

  useEffect(() => {
    const totalSalesCount = sales.length;
    const totalProductsCount = products.length;
    const totalClientsCount = clients.length;
    const totalSuppliersCount = suppliers.length;

    setTotalSales(totalSalesCount);
    setTotalProducts(totalProductsCount);
    setTotalClients(totalClientsCount);
    setTotalSuppliers(totalSuppliersCount);
  }, [ sales, clients, suppliers, products ]);

  return (
    <PharmaceuticalLayout>
<div className="summary-container">
        <h2>Summary Page</h2>
        <div className="summary-stats">
          <div className="stat-card">
            <h3>Total Sales</h3>
            <p>{ totalSales }</p>
          </div>
          <div className="stat-card">
            <h3>Total Products</h3>
            <p>{ totalProducts }</p>
          </div>
          <div className="stat-card">
            <h3>Total Clients</h3>
            <p>{ totalClients }</p>
          </div>
          <div className="stat-card">
            <h3>Total Suppliers</h3>
            <p>{ totalSuppliers }</p>
          </div>
          <div className="stat-card">
            <h3>Products Out of Stock</h3>
            <p>{ products.filter((product) => product.stocks === 0).length }</p>
          </div>
          <div className="stat-card">
            <h3>Average Price</h3>
            <p>
              ${" "}
              {
                products.length > 0
                  ? (
                      products.reduce((acc, product) => acc + product.price, 0) /
                      products.length
                    ).toFixed(2)
                  : "0.00"
              }
            </p>
          </div>
          <div className="stat-card">
            <h3>New Clients This Month</h3>
            <p>
              {
                clients.filter(
                  (client) =>
                    new Date(client.registrationDate).getMonth() ===
                      new Date().getMonth() &&
                    new Date(client.registrationDate).getFullYear() ===
                      new Date().getFullYear()
                ).length
              }
            </p>
          </div>
          <div className="stat-card">
            <h3>Top Selling Products</h3>
            <ul>
              {
                sales.length > 0 ? (
                  Object.entries(
                    sales
                      .flatMap((sale) => sale.saleDetails)
                      .reduce((acc, detail) => {
                        if (!acc[detail.product.id]) {
                          acc[detail.product.id] = 0;
                        }
                        acc[detail.product.id] += detail.quantity;
                        return acc;
                      }, {} as { [productId: string]: number })
                  )
                    .sort(([, qty1], [, qty2]) => qty2 - qty1)
                    .slice(0, 5)
                    .map(([productId, quantity], index) => {
                      const product = products.find((p) => p.id === productId);
                      const productName = product ? product.name : "Unknown Product";
                      return (
                        <li key={index}>
                          <strong>Product Name:</strong> {productName} | <strong>Quantity:</strong> {quantity}
                        </li>
                      );
                    })
                ) : (
                  <li>N/A</li>
                )
              }
            </ul>
          </div>
        </div>
      </div>
    </PharmaceuticalLayout>
  )
}

