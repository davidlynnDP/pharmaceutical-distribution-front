import { useEffect, useState } from "react";
import { useCheckInformation } from "../../../hooks";
import { PharmaceuticalLayout } from "../../layout"

import styles from './SummaryPage.module.css';


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
      <div className={ styles.summary__container }>
        <h2 className={ styles.title__page }>Summary Page</h2>
        <div className={ styles.stats__container }>
          <div className={ styles.stat__div }>
            <h3 className={ styles.stat__title }>Total Sales</h3>
            <p className={ styles.stat__value }>{ totalSales }</p>
          </div>
          <div className={ styles.stat__div }>
            <h3 className={ styles.stat__title }>Total Products</h3>
            <p className={ styles.stat__value }>{ totalProducts }</p>
          </div>
          <div className={ styles.stat__div }>
            <h3 className={ styles.stat__title }>Total Clients</h3>
            <p className={ styles.stat__value }>{ totalClients }</p>
          </div>
          <div className={ styles.stat__div }>
            <h3 className={ styles.stat__title }>Total Suppliers</h3>
            <p className={ styles.stat__value }>{ totalSuppliers }</p>
          </div>
          <div className={ styles.stat__div }>
            <h3 className={ styles.stat__title }>Products Out of Stock</h3>
            <p className={ styles.stat__value }>{ products.filter((product) => product.stocks === 0).length }</p>
          </div>
          <div className={ styles.stat__div }>
            <h3 className={ styles.stat__title }>Average Price</h3>
            <p className={ styles.stat__value }>
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
          <div className={ styles.stat__div }>
            <h3 className={ styles.stat__title }>Top Selling Products</h3>
            <ul className={ styles.stat__list }>
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
                        <li key={ index } className={ styles.stat__list__item }>
                          <div className={ styles.product__name }>{ productName }</div>
                          <div className={ styles.product__quantity }>Quantity: { quantity }</div>
                        </li>
                      );
                    })
                ) : (
                  <li className={ styles.NA }>N/A</li>
                )
              }
            </ul>
          </div>
        </div>
      </div>
    </PharmaceuticalLayout>
  )
}

