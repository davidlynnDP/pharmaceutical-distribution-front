import { Link } from "react-router-dom";
import { useCheckInformation } from "../../../hooks";
import { PharmaceuticalLayout } from "../../layout"

import styles from './SuppliersPage.module.css';


export const SuppliersPage = () => {
  
  const { suppliers } = useCheckInformation();

  return (
    <PharmaceuticalLayout>
      <div className={ styles.suppliers__container }>
        <h2 className={ styles.title__page }>Suppliers Page</h2>
        <div className={ styles.cards__container }>
          <div className={ styles.container__link }>
            <Link to="/suppliers/new" className={ styles.btn__new }>
              Create New Supplier
            </Link>
          </div>
          <div className={ styles.cards__supplier }>
            {
              suppliers.map(({ id, phone, email, address, city, country, postalCode }) => (
                <div key={ id } className={ styles.card }>
                  <h3 className={ styles.id__supplier }>{ id }</h3>
                  <p className={ styles.phone__supplier }>Phone: { phone }</p>
                  <p className={ styles.email__supplier }>Email: { email }</p>
                  <p className={ styles.address__supplier }>Address: { address }</p>
                  <p className={ styles.city__supplier }>City: { city }</p>
                  <p className={ styles.country__supplier }>Country: { country }</p>
                  <p className={ styles.postalCode__supplier }>Postal Code: { postalCode }</p>
                  <Link to={`/suppliers/${ id }`} className={ styles.edit__btn }>
                    Edit Supplier
                  </Link>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </PharmaceuticalLayout>
  )
}

