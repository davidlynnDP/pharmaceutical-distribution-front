import { useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate, Link } from "react-router-dom";

import { useCheckInformation } from "../../../hooks";
import { PharmaceuticalLayout } from "../../layout"


import './NewSupplierPage.css';


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
      <div>
        <h2>New Supplier</h2>
        <form onSubmit={ handleSubmit }>
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
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              {...getFieldProps("address")}
            />
            {
              touched.address && errors.address && (
                <div>{ errors.address }</div>
              )
            }
          </div>
          <div>
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              {...getFieldProps("city")}
            />
            {
              touched.city && errors.city && (
                <div>{ errors.email }</div>
              )
            }
          </div>
          <div>
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              {...getFieldProps("country")}
            />
            {
              touched.country && errors.country && (
                <div>{ errors.country }</div>
              )
            }
          </div>
          <div>
            <label htmlFor="postalCode">Postal Code:</label>
            <input
              type="text"
              id="postalCode"
              {...getFieldProps("postalCode")}
            />
            {
              touched.postalCode && errors.postalCode && (
                <div>{ errors.postalCode }</div>
              )
            }
          </div>
          <div>
            <button
              type="submit"
              disabled={ isLoading }
            >
              Create Supplier
            </button>
            <button
              type="button"
              onClick={() => resetForm()}
              disabled={ isLoading }
            >
              Reset
            </button>
          </div>
        </form>
        <Link to="/suppliers">
          Back to Suppliers
        </Link>
      </div>
    </PharmaceuticalLayout>
  )
}

