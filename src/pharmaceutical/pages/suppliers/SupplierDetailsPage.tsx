import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link, useNavigate, useParams } from "react-router-dom";

import { PharmaceuticalLayout } from "../../layout"
import { useCheckInformation } from "../../../hooks";
import { Supplier } from "../../../domain/models";
import { useEffect, useState } from "react";

import './SupplierDetailsPage.css';

interface Values {
  phone: string;
  email: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}


const SupplierNotFound = () => {
  return <div>Supplier not found!</div>;
};

export const SupplierDetailsPage = () => {

  const { supplierId } = useParams<{ supplierId: string }>();
  const navigate = useNavigate();
  const { handleUpdateSupplier, handleDeleteSupplier, suppliers, isLoading } = useCheckInformation();
  const [ supplier, setSupplier ] = useState<Supplier | undefined>(undefined);

  useEffect(() => {
    const fetchedSupplier = suppliers.find( supplier => supplier.id === supplierId );
    if ( fetchedSupplier ) {
      setSupplier( fetchedSupplier );
    }
  }, [ supplierId, suppliers ]);

  const onSubmit = async(values: Values) => {

    if ( !supplier ) return;
    try {
      await handleUpdateSupplier( supplier.id, {
        phone: values.phone,
        email: values.email,
        address: values.address,
        city: values.city,
        country: values.country,
        postalCode: values.postalCode,
      });
      navigate('/suppliers');
    } catch (error) {
      console.log( error );
    }
  };

  const onDelete = async() => {

    if ( !supplier ) return;
    try {
      await handleDeleteSupplier( supplier.id );
    } catch (error) {
      console.log( error );
    }
  }

  const { handleSubmit, errors, touched, getFieldProps } = useFormik({
    initialValues: {
      phone: supplier?.phone ?? '',
      email: supplier?.email ?? '',
      address: supplier?.address ?? '',
      city: supplier?.city ?? '',
      country: supplier?.country ?? '',
      postalCode: supplier?.postalCode ?? '',
    },
    onSubmit: onSubmit,
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

  if ( !supplier ) {
    return <SupplierNotFound />;
  }

  return (
    <PharmaceuticalLayout>
      <div>
        <h2>Edit Supplier</h2>
        <div>
          <p>Editing Supplier:</p>
          <p>ID: { supplier.id }</p>
          <p>Phone: { supplier.phone }</p>
          <p>Email: { supplier.email }</p>
          <p>Address: { supplier.address }</p>
          <p>City: { supplier.city }</p>
          <p>Country: { supplier.country }</p>
          <p>Postal Code: { supplier.postalCode }</p>
        </div>
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
                <div>{ errors.city }</div>
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
              Update Supplier
            </button>
            <button
              type="button"
              onClick={ onDelete }
              disabled={ isLoading }
            >
              Delete Supplier
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
