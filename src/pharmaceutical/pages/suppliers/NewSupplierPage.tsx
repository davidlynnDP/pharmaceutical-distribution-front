import { useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate, Link } from "react-router-dom";

import { useCheckInformation } from "../../../hooks";
import { PharmaceuticalLayout } from "../../layout"

import styles from './NewSupplierPage.module.css';


interface Values {
  phone: string;
  email: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}



export const NewSupplierPage = () => {

  const { handleCreateSupplier, isLoading } = useCheckInformation();
  const navigate = useNavigate();

  const { handleSubmit, errors, touched, getFieldProps, resetForm } = useFormik({
    initialValues: {
      phone: '',
      email: '',
      address: '',
      city: '',
      country: '',
      postalCode: '',
    },
    onSubmit: async( values: Values ) => {
      await handleCreateSupplier({
        phone: values.phone,
        email: values.email,
        address: values.address,
        city: values.city,
        country: values.country,
        postalCode: values.postalCode,
      });
      navigate('/suppliers');
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .required('Phone is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      address: Yup.string()
        .required('Address is required'),
      city: Yup.string()
        .required('City is required'),
      country: Yup.string()
        .required('Country is required'),
      postalCode: Yup.string()
        .required('Postal Code is required'),
    })
  });
  
  return (
    <PharmaceuticalLayout>
      <div className={ styles.new__supplier__page }>
        <h2 className={ styles.title__page }>New Supplier</h2>
        <form onSubmit={ handleSubmit }>
          <div className={ styles.container__input }>
            <label htmlFor="phone" className={ styles.input__name }>Phone:</label>
            <input
              type="text"
              id="phone" 
              className={ styles.input__text }
              {...getFieldProps("phone")}
            />
            {
              touched.phone && errors.phone && (
                <div className={ styles.input__error }>{ errors.phone }</div>
              )
            }
          </div>
          <div className={ styles.container__input }>
            <label htmlFor="email" className={ styles.input__name }>Email:</label>
            <input
              type="email"
              id="email" 
              className={ styles.input__text }
              {...getFieldProps("email")}
            />
            {
              touched.email && errors.email && (
                <div className={ styles.input__error }>{ errors.email }</div>
              )
            }
          </div>
          <div className={ styles.container__input }>
            <label htmlFor="address" className={ styles.input__name }>Address:</label>
            <input
              type="text"
              id="address" 
              className={ styles.input__text }
              {...getFieldProps("address")}
            />
            {
              touched.address && errors.address && (
                <div className={ styles.input__error }>{ errors.address }</div>
              )
            }
          </div>
          <div className={ styles.container__input }>
            <label htmlFor="city" className={ styles.input__name }>City:</label>
            <input
              type="text"
              id="city"
              className={ styles.input__text }
              {...getFieldProps("city")}
            />
            {
              touched.city && errors.city && (
                <div className={ styles.input__error }>{ errors.email }</div>
              )
            }
          </div>
          <div className={ styles.container__input }>
            <label htmlFor="country" className={ styles.input__name }>Country:</label>
            <input
              type="text"
              id="country" 
              className={ styles.input__text }
              {...getFieldProps("country")}
            />
            {
              touched.country && errors.country && (
                <div className={ styles.input__error }>{ errors.country }</div>
              )
            }
          </div>
          <div className={ styles.container__input }>
            <label htmlFor="postalCode" className={ styles.input__name }>Postal Code:</label>
            <input
              type="text"
              id="postalCode" className={ styles.input__text }
              {...getFieldProps("postalCode")}
            />
            {
              touched.postalCode && errors.postalCode && (
                <div className={ styles.input__error }>{ errors.postalCode }</div>
              )
            }
          </div>
          <div className={ styles.btn__container }>
            <button
              type="submit"
              className={ styles.btn }
              disabled={ isLoading }
            >
              Create Supplier
            </button>
            <button
              type="button"
              className={ styles.btn }
              onClick={() => resetForm()}
              disabled={ isLoading }
            >
              Reset
            </button>
          </div>
        </form>
        <Link to="/suppliers" className={ styles.back__suppliers }>
          Back to Suppliers
        </Link>
      </div>
    </PharmaceuticalLayout>
  )
}

