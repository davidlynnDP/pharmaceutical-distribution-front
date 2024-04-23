import { Link } from "react-router-dom";
import { useCheckInformation } from "../../../hooks";
import { PharmaceuticalLayout } from "../../layout"

import './ProductsPage.css';

export const ProductsPage = () => {

  const { products } = useCheckInformation();
  
  return (
    <PharmaceuticalLayout>
        <div>
          <div>
            <div>
              <Link to="/products/new">
                Create New Product
              </Link>
            </div>
            <div>
              {
                products.map(({ id, name, description, stocks, price, images }) => (
                <div key={ id }>
                  {
                    images.length > 0 && (
                      <img src={ images[0].url } alt={ `Image of ${ name }` } />
                    )
                  }
                  <h3>{ name }</h3>
                  <p>Description: { description }</p>
                  <p>Stocks: { stocks }</p>
                  <p>Price: { price }</p>
                  <Link to={`/products/${ id }`}>
                    Edit Product
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
    </PharmaceuticalLayout>
  )
}
