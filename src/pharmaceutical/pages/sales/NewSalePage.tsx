import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";

import { PharmaceuticalLayout } from "../../layout"
import { useCheckInformation } from "../../../hooks";

import styles from './NewSalePage.module.css';


interface Item {
  productId: string;
  quantity: number;
}

interface Values {
  items: Item[];
  clientId: string;
}


export const NewSalePage = () => {

  const { handleCreateSale, isLoading, products, clients } = useCheckInformation();
  const navigate = useNavigate();

  const onSubmit = async(values: Values) => {

    try {
      await handleCreateSale({
        items: values.items
      }, { client: values.clientId });
      navigate('/sales');
    } catch (error) {
      console.log( error );
    }
  };

  const { handleSubmit, errors, touched, getFieldProps, resetForm, setFieldValue, values } = useFormik({
    initialValues: {
      items: [{ productId: '', quantity: 1 }],
      clientId: '',
    },
    onSubmit: onSubmit,
    validationSchema: Yup.object({
      items: Yup.array().of(
        Yup.object({
          productId: Yup.string().required('Product is required'),
          quantity: Yup.number()
            .required('Quantity is required')
            .positive('Quantity must be a positive number')
            .integer('Quantity must be an integer'),
          })
        ),
      clientId: Yup.string().required('Client is required'),
    })
  });

  const addNewItem = () => {
    setFieldValue('items', [
      ...values.items,
      { productId: '', quantity: 1 },
    ]);
  };

  const removeItem = (index: number) => {
    const updatedItems = values.items.filter((_, i) => i !== index);
    setFieldValue('items', updatedItems);
  };

  return (
    <PharmaceuticalLayout>
      <div className={ styles.new__sale__container }>
        <h2 className={ styles.title__page }>New Sale</h2>
        <form onSubmit={ handleSubmit } className={ styles.form }>
          { values.items.map((_, index) => (
            <div key={ index } className={ styles.form__product }>
              <label htmlFor={`items[${ index }].productId`} className={ styles.product_t }>Product:</label>
              <select
                id={`items[${ index }].productId`} 
                className={ styles.input__select }
                {...getFieldProps(`items[${ index }].productId`)}
              >
                <option value="" className={ styles.select__opt }>Select Product</option>
                {
                  products.map(product => (
                    <option key={ product.id } value={ product.id } className={ styles.select__opt }>
                      { product.name }
                    </option>
                ))}
              </select>
              {/* {
                touched.items?.[index]?.productId && errors.items?.[index]?.productId && (
                  <div>{ errors.items[index].productId }</div>
              )} */}

              <label htmlFor={`items[${ index }].quantity`} className={ styles.quantity__t }>Quantity:</label>
              <input
                type="text"
                id={`items[${ index }].quantity`} 
                className={ styles.input }
                {...getFieldProps(`items[${ index }].quantity`)}
              />
              {/* { 
                touched.items?.[index]?.quantity && errors.items?.[index]?.quantity && (
                  <div>{ errors.items[index].quantity }</div>
                )
              } */}

              {
                index > 0 && ( 
                <button type="button" className={ styles.btn__remove } onClick={() => removeItem(index)}>
                  Remove
                </button>
              )}
            </div>
          
          ))}

          <button type="button" onClick={ addNewItem } className={ styles.btn__add }>
            Add Product
          </button>

          <div className={ styles.client__cont }>
            <label htmlFor="clientId" className={ styles.client__title }>Client:</label>
            <select
              id="clientId" 
              className={ styles.input__select }
              {...getFieldProps("clientId")}
            >
              <option value="select__opt" className={ styles.select__opt }>Select Client</option>
              {
                clients.map( client => (
                  <option className={ styles.select__opt } key={ client.id } value={ client.id }>
                    { client.name }
                  </option>
                ))
              }
            </select>
            { 
              touched.clientId &&  errors.clientId && (
                <div className={ styles.input__errors }>{ errors.clientId }</div>
              )
            }
          </div>

          <div className={ styles.btn__cont }>
            <button type="submit" disabled={isLoading} className={ styles.btn__sale }>
              Create Sale
            </button>
            <button className={ styles.btn__sale } type="button" onClick={() => resetForm()} disabled={ isLoading }>
              Reset
            </button>
          </div>
        </form>
        <Link to="/sales" className={ styles.btn__back__sales }>
          Back to Sales
        </Link>
      </div>
    </PharmaceuticalLayout>
  )
}

