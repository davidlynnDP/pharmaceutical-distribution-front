import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";

import { PharmaceuticalLayout } from "../../layout"
import { useCheckInformation } from "../../../hooks";

import styles from './NewClientPage.module.css';

export const NewClientPage = () => {

  const { handleCreateClient, isLoading } = useCheckInformation();
  const navigate = useNavigate();

  const { handleSubmit, errors, touched, getFieldProps, resetForm } = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
    },
    onSubmit: async( values ) => {
      await handleCreateClient({
        name: values.name,
        phone: values.phone,
        email: values.email
      });
      navigate('/clients');
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Name is required'),
      phone: Yup.string()
        .required('Phone number is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    })
  });
  
  return (
    <PharmaceuticalLayout>
      <div className={ styles.new__client__container }>
        <h1 className={ styles.title__newclient__page }>Create New Client</h1>
        <form onSubmit={ handleSubmit } className={ styles.form }>
          <div className={ styles.container__input }>
            <label htmlFor="name" className={ styles.input__text }>Name:</label>
            <input
              id="name"
              type="text" 
              className={ styles.input }
              {...getFieldProps("name")} 
            />
            { 
              touched.name && errors.name ? (
                <div  className={ styles.input__errors }>{ errors.name }</div>
              ) : null
            }
          </div>

          <div className={ styles.container__input }>
            <label htmlFor="phone" className={ styles.input__text }>Phone:</label>
            <input
              id="phone"
              type="text" 
              className={ styles.input }
              {...getFieldProps("phone")} 
            />
            { 
              touched.phone &&  errors.phone ? (
                <div className={ styles.input__errors }>{ errors.phone }</div>
              ) : null
            }
          </div>

          <div className={ styles.container__input }>
            <label htmlFor="email" className={ styles.input__text }>Email:</label>
            <input
              id="email"
              type="email" 
              className={ styles.input }
              {...getFieldProps("email")} 
            />
            { 
              touched.email &&  errors.email ? (
                <div className={ styles.input__errors }>{ errors.email }</div>
              ) : null
            }
          </div>

          <button 
            type="submit" 
            className={ styles.btn }
            disabled={ isLoading }>
            { 
              isLoading ? 'Creating...' : 'Create Client'
            }
          </button>
          <button 
            type="button" 
            className={ styles.btn }
            onClick={() => resetForm()}
            disabled={ isLoading }>
            Reset
          </button>
        </form>
        <Link to="/clients" className={ styles.btn__back__clients }>
          Back to Clients
        </Link>
      </div>
    </PharmaceuticalLayout>
  )
}

