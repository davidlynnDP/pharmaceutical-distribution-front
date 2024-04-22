import { Link } from "react-router-dom";
import { useCheckInformation } from "../../../hooks"
import { PharmaceuticalLayout } from "../../layout"


export const ClientsPage = () => {

  const { clients } = useCheckInformation();

  return (
    <PharmaceuticalLayout>
        <div>
          <div>
            <div>
                <Link to="/clients/new">
                  Create New Client
                </Link>
            </div>
            {
              clients.map(({ id, name, phone, email, registrationDate }) => (
                <div key={ id }>
                  <h3>{ name }</h3>
                  <p>ID: { id }</p>
                  <p>Phone: { phone }</p>
                  <p>Email: { email }</p>
                  <p>Registration Date: { registrationDate }</p>
                  <Link to={`/clients/${ id }`}>
                    Edit Client
                  </Link>
                </div>
              ))
            }
          </div>
      </div>
    </PharmaceuticalLayout>
  )
}

