import { Link } from "react-router-dom";
import { useCheckInformation } from "../../../hooks";
import { PharmaceuticalLayout } from "../../layout"

import './SuppliersPage.css';

export const SuppliersPage = () => {
  
  const { suppliers } = useCheckInformation();

  return (
    <PharmaceuticalLayout>
      <div>
        <div>
          <div>
            <Link to="/suppliers/new">
              Create New Supplier
            </Link>
          </div>
          <div>
            {
              suppliers.map(({ id, phone, email, address, city, country, postalCode }) => (
                <div key={ id }>
                  <h3>{ id }</h3>
                  <p>Phone: { phone }</p>
                  <p>Email: { email }</p>
                  <p>Address: { address }</p>
                  <p>City: { city }</p>
                  <p>Country: { country }</p>
                  <p>Postal Code: { postalCode }</p>
                  <Link to={`/suppliers/${ id }`}>
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

