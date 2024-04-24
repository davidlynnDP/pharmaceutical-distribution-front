import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';

import { useCheckInformation } from "../../../hooks";
import { PharmaceuticalLayout } from "../../layout"
import { Client } from "../../../domain/models";

import styles from './ClientDetailsPage.module.css';

interface Values {
  name: string;
  phone: string;
  email: string;
}

const ClientNotFound = () => {
  return <div className={ styles.client__not__found }>Client not found!</div>;
};


export const ClientDetailsPage = () => {

  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();
  const { handleUpdateClient, handleDeleteClient, clients, isLoading } = useCheckInformation();
  const [ client, setClient ] = useState<Client | undefined>(undefined);

  useEffect(() => {
    const fetchedClient = clients.find( client => client.id === clientId );
    if ( fetchedClient ) {
      setClient( fetchedClient );
    }
  }, [ clientId, clients ]);

  const onSubmit = async(values: Values) => {

    if ( !client ) return;
    try {
      await handleUpdateClient( client.id, {
        name: values.name,
        phone: values.phone,
        email: values.email
      });
      navigate('/clients');
    } catch (error) {
      console.log( error );
    }
  };

  const onDelete = async() => {

    if ( !client ) return;
    try {
      await handleDeleteClient( client.id );
      navigate('/clients');
    } catch (error) {
      console.log( error );
    }
  }

  const { handleSubmit, errors, touched, getFieldProps } = useFormik({
    initialValues: {
      name: client?.name ?? '',
      phone: client?.phone ??'',
      email: client?.email ??'',
    },
    onSubmit: onSubmit,
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

  if (!client) {
    return <ClientNotFound />;
  }

  return (
    <PharmaceuticalLayout>
      <div className={ styles.client__container }>
        <h2 className={ styles.title__page }>Edit Client</h2>
        <div className={ styles.info__client__container }>
          <p className={ styles.id__client }>ID: { client.id }</p>
          <p className={ styles.name__client }>Name: { client.name }</p>
          <p className={ styles.phone__client }>Phone: { client.phone }</p>
          <p className={ styles.email__client }>Email: { client.email }</p>
        </div>
        <form onSubmit={ handleSubmit } className={ styles.form }>
          <div className={ styles.container__input }>
            <label htmlFor="name" className={ styles.input__text }>Name:</label>
            <input
              type="text"
              id="name" className={ styles.input }
              {...getFieldProps("name")}
            />
            {
              touched.name && errors.name && (
                <div className={ styles.input__errors }>{ errors.name }</div>
              )
            }
          </div>
          <div className={ styles.container__input }>
            <label htmlFor="phone" className={ styles.input__text }>Phone:</label>
            <input
              type="text"
              id="phone" className={ styles.input }
              {...getFieldProps("phone")}
            />
            {
              touched.phone && errors.phone && (
                <div className={ styles.input__errors }>{ errors.phone }</div>
              )
            }
          </div>
          <div className={ styles.container__input }>
            <label htmlFor="email" className={ styles.input__text }>Email:</label>
            <input
              type="email"
              id="email" className={ styles.input }
              {...getFieldProps("email")}
            />
            {
              touched.email && errors.email && (
                <div className={ styles.input__errors }>{ errors.email }</div>
              )
            }
          </div>
          <div className={ styles.btn__container }>
            <button 
              type="submit" className={ styles.btn }
              disabled={ isLoading }>
                Update Client
            </button>
            <button 
              type="button"  className={ styles.btn }
              onClick={ onDelete }
              disabled={ isLoading }>
                Delete Client
            </button>
          </div>
        </form>
        <Link to="/clients" className={ styles.back__to__clients }>
          Back to Clients
        </Link>
      </div>
    </PharmaceuticalLayout>
  )
}

