import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Sale, SaleDetail } from "../../../domain/models";
import { PharmaceuticalLayout } from "../../layout"
import { useCheckInformation } from "../../../hooks";

import './SaleDetailsPage.css';

const SaleNotFound = () => {
  return <div>Sale not found!</div>;
};


export const SaleDetailsPage = () => {

  const { saleId } = useParams<{ saleId: string }>();
  const { sales } = useCheckInformation();
  const [ sale, setSale ] = useState<Sale | undefined>(undefined);

  useEffect(() => {
    const fetchedSale = sales.find( sale => sale.id === saleId );
    if ( fetchedSale ) {
      setSale( fetchedSale );
    }
  }, [ saleId, sales ]);

  const calculateTotalSingleSale = (saleDetails: SaleDetail[]): number => {
    let total = 0;
    saleDetails.forEach((detail) => {
      total += detail.total;
    });
    return total;
  };

  if ( !sale ) {
    return <SaleNotFound />;
  }

  return (
    <PharmaceuticalLayout>
      <div>
        <h2>Sale Details</h2>
        <div>
          <strong>Sale ID:</strong> { sale.id }
        </div>
        <div>
          <strong>Sale Date:</strong> { sale.saleDate }
        </div>
        <div>
          <strong>Client:</strong> { sale.client.name } ({ sale.client.email })
        </div>
        <h3>Products:</h3>
        {
          sale.saleDetails.map((detail) => (
            <div key={ detail.id }>
              <div>
                <strong>Product ID:</strong> { detail.product.id }
              </div>
              <div>
                <strong>Product Name:</strong> { detail.product.name }
              </div>
              <div>
                <strong>Description:</strong> { detail.product.description }
              </div>
              <div>
                <strong>Stocks:</strong> { detail.product.stocks }
              </div>
              <div>
                <strong>Price:</strong> ${ detail.product.price }
              </div>
              <div>
                <strong>Quantity:</strong> { detail.quantity }
              </div>
              <div>
                <strong>Total:</strong> ${ detail.total }
              </div>
            </div>
          ))
        }
        <div>
          <h3>Total Sale Amount:</h3>
          <div>
            <strong>Total:</strong> ${ calculateTotalSingleSale( sale.saleDetails ) }
          </div>
        </div>
        <Link to="/sales">
          Back to Sales
        </Link>
      </div>
    </PharmaceuticalLayout>
  )
}

