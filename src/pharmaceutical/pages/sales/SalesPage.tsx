import { Link } from 'react-router-dom';
import { useCheckInformation } from '../../../hooks';
import { PharmaceuticalLayout } from '../../layout'
import { useEffect, useState } from 'react';
import { Sale, SaleDetail } from '../../../domain/models';




export const SalesPage = () => {

  const { sales } = useCheckInformation();

  const [ totalSales, setTotalSales ] = useState<number>(0);

  useEffect(() => {
    const total = calculateTotal( sales );
    setTotalSales( total );
  }, [ sales ]);

  const calculateTotal = (salesData: Sale[]): number => {
    let total = 0;
    salesData.forEach((sale) => {
      sale.saleDetails.forEach((detail) => {
        total += detail.total;
      });
    });
    return total;
  };

  const calculateTotalSingleSale = (saleDetails: SaleDetail[]): number => {
    let total = 0;
    saleDetails.forEach((detail) => {
      total += detail.total;
    });
    return total;
  };

  
  return (
    <PharmaceuticalLayout>
        <div>
          <div>
            <div>
              <h3>Total Sales Value: ${ totalSales }</h3>
            </div>
            <div>
              <Link to="/sales/new" className="create-sale-button">
                Create New Sale
              </Link>
            </div>
            <div>
              {
                sales.map(({ id, saleDate, client, saleDetails }) => (
                <div key={ id }>
                  <h3>Sale ID: { id }</h3>
                  <p>Sale Date: { saleDate }</p>
                  <p>Client: { client.name }</p>
                  <p>Total: { calculateTotalSingleSale( saleDetails ) }</p>
                  <Link to={`/sales/${ id }`} >
                    View Sale Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
    </PharmaceuticalLayout>
  )
}

