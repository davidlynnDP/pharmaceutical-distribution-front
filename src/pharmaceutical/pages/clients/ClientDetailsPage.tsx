import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';

import { useCheckInformation } from "../../../hooks";
import { PharmaceuticalLayout } from "../../layout"
import { Client } from "../../../domain/models";

import './ClientDetailsPage.css';

interface Values {
  name: string;
  phone: string;
  email: string;
}

const ClientNotFound = () => {
  return <div>Client not found!</div>;
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
      <div>
        <h2>Edit Client</h2>
        <div>
          <p>ID: { client.id }</p>
          <p>Name: { client.name }</p>
          <p>Phone: { client.phone }</p>
          <p>Email: { client.email }</p>
        </div>
        <form onSubmit={ handleSubmit }>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              {...getFieldProps("name")}
            />
            {
              touched.name && errors.name && (
                <div>{ errors.name }</div>
              )
            }
          </div>
          <div>
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              {...getFieldProps("phone")}
            />
            {
              touched.phone && errors.phone && (
                <div>{ errors.phone }</div>
              )
            }
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              {...getFieldProps("email")}
            />
            {
              touched.email && errors.email && (
                <div>{ errors.email }</div>
              )
            }
          </div>
          <div>
            <button 
              type="submit"
              disabled={ isLoading }>
                Update Client
            </button>
            <button 
              type="button" 
              onClick={ onDelete }
              disabled={ isLoading }>
                Delete Client
            </button>
          </div>
        </form>
        <Link to="/clients">
          Back to Clients
        </Link>
      </div>
    </PharmaceuticalLayout>
  )
}

