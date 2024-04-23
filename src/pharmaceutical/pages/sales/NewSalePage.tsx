import { useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

import { PharmaceuticalLayout } from "../../layout"
import { useCheckInformation } from "../../../hooks";



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
      //navigate
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
      <div>
        <h2>New Sale</h2>
        <form onSubmit={ handleSubmit }>
          { values.items.map((item, index) => (
            <div key={ index }>
              <label htmlFor={`items[${ index }].productId`}>Product:</label>
              <select
                id={`items[${ index }].productId`}
                {...getFieldProps(`items[${ index }].productId`)}
              >
                <option value="">Select Product</option>
                {
                  products.map(product => (
                    <option key={ product.id } value={ product.id }>
                      { product.name }
                    </option>
                ))}
              </select>
              {/* {
                touched.items?.[index]?.productId && errors.items?.[index]?.productId && (
                  <div>{ errors.items[index].productId }</div>
              )} */}

              <label htmlFor={`items[${ index }].quantity`}>Quantity:</label>
              <input
                type="text"
                id={`items[${ index }].quantity`}
                {...getFieldProps(`items[${ index }].quantity`)}
              />
              {/* { 
                touched.items?.[index]?.quantity && errors.items?.[index]?.quantity && (
                  <div>{ errors.items[index].quantity }</div>
                )
              } */}

              {
                index > 0 && ( 
                <button type="button" onClick={() => removeItem(index)}>
                  Remove
                </button>
              )}
            </div>
          
          ))}

          <button type="button" onClick={ addNewItem }>
            Add Product
          </button>

          <div>
            <label htmlFor="clientId">Client:</label>
            <select
              id="clientId"
              {...getFieldProps("clientId")}
            >
              <option value="">Select Client</option>
              {
                clients.map( client => (
                  <option key={ client.id } value={ client.id }>
                    { client.name }
                  </option>
                ))
              }
            </select>
            { 
              touched.clientId &&  errors.clientId && (
                <div>{ errors.clientId }</div>
              )
            }
          </div>

          <div>
            <button type="submit" disabled={isLoading}>
              Create Sale
            </button>
            <button type="button" onClick={() => resetForm()} disabled={ isLoading }>
              Reset
            </button>
          </div>
        </form>
      </div>
    </PharmaceuticalLayout>
  )
}

