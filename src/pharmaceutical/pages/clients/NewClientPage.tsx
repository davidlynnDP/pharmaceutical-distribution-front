import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";

import { PharmaceuticalLayout } from "../../layout"
import { useCheckInformation } from "../../../hooks";

import './NewClientPage.css';

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
      <div>
        <h1>Create New Client</h1>
        <form onSubmit={ handleSubmit }>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              {...getFieldProps("name")} 
            />
            { 
              touched.name && errors.name ? (
                <div className="error">{ errors.name }</div>
              ) : null
            }
          </div>

          <div className="form-control">
            <label htmlFor="phone">Phone:</label>
            <input
              id="phone"
              type="text"
              {...getFieldProps("phone")} 
            />
            { 
              touched.phone &&  errors.phone ? (
                <div className="error">{ errors.phone }</div>
              ) : null
            }
          </div>

          <div className="form-control">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              {...getFieldProps("email")} 
            />
            { 
              touched.email &&  errors.email ? (
                <div className="error">{ errors.email }</div>
              ) : null
            }
          </div>

          <button 
            type="submit" 
            disabled={ isLoading }>
            { 
              isLoading ? 'Creating...' : 'Create Client'
            }
          </button>
          <button 
            type="button" 
            onClick={() => resetForm()}
            disabled={ isLoading }>
            Reset
          </button>
        </form>
        <Link to="/clients">
          Back to Clients
        </Link>
      </div>
    </PharmaceuticalLayout>
  )
}

