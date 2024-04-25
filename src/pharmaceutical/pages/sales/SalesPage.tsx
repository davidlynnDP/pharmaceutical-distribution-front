import { Link } from 'react-router-dom';
import { useCheckInformation } from '../../../hooks';
import { PharmaceuticalLayout } from '../../layout'
import { useEffect, useState } from 'react';
import { Sale, SaleDetail } from '../../../domain/models';

import styles from './SalesPage.module.css';


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
      if (sale.saleDetails) {
        sale.saleDetails.forEach((detail) => {
          total += detail.total;
        });
      }
    });
    return total;
  };

  const calculateTotalSingleSale = (saleDetails: SaleDetail[]): number => {

    if (!saleDetails) {
      return 0; 
    }
    let total = 0;
    saleDetails.forEach((detail) => {
      total += detail.total;
    });
    return total;
  };

  return (
    <PharmaceuticalLayout>
        <div className={ styles.sales__container }>
          <h2 className={ styles.title__page }>Sales Page</h2>
          <div className={ styles.total_cont }>
              <h3 className={ styles.total__sales }>Total Sales Value: ${ totalSales }</h3>
            </div>
          <div className={ styles.cards__container }>
            <div className={ styles.container__link }>
              <Link to="/sales/new" className={ styles.btn__new }>
                Create New Sale
              </Link>
            </div>
            <div className={ styles.cards__sale }>
              {
                sales.map(({ id, saleDate, client, saleDetails }, index) => (
                <div key={`${ id }-${ index }`} className={ styles.card }>
                  <h3 className={ styles.id__sale }>Sale ID: { id }</h3>
                  <p className={ styles.date__sale }>Sale Date: { saleDate }</p>
                  <p className={styles.client__sale}>Client: { client ? client.email : 'Unknown' }</p>
                  <p className={ styles.total__sale }>Total: { calculateTotalSingleSale( saleDetails ) }</p>
                  <Link to={`/sales/${ id }`}  className={ styles.btn__edit }>
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

