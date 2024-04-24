import { Link } from "react-router-dom";
import { useCheckInformation } from "../../../hooks";
import { PharmaceuticalLayout } from "../../layout"

import styles from './ProductsPage.module.css';

export const ProductsPage = () => {

  const { products } = useCheckInformation();
  
  return (
    <PharmaceuticalLayout>
        <div className={ styles.products__container }>
          <h2 className={ styles.title__page }>Products Page</h2>
          <div className={ styles.cards__container }>
            <div className={ styles.container__link }>
              <Link to="/products/new" className={ styles.btn__new }>
                Create New Product
              </Link>
            </div>
            <div className={ styles.cards__product }>
              {
                products.map(({ id, name, description, stocks, price, images }) => (
                  <div key={ id } className={ styles.card }>
                    {
                      images.length > 0 && (
                        <img src={ images[0].url } alt={ `Image of ${ name }` } className={ styles.image__product } />
                      )
                    }
                    <h3 className={ styles.name__product }>{ name }</h3>
                    <p className={ styles.desc__product }>Description: { description }</p>
                    <p className={ styles.stock__product }>Stocks: { stocks }</p>
                    <p className={ styles.price__product }>Price: { price }</p>
                    <Link to={`/products/${ id }`} className={ styles.btn__edit }>
                      Edit Product
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
