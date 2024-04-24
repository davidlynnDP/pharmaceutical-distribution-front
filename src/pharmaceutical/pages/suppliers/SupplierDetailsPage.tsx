import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link, useNavigate, useParams } from "react-router-dom";

import { PharmaceuticalLayout } from "../../layout"
import { useCheckInformation } from "../../../hooks";
import { Supplier } from "../../../domain/models";
import { useEffect, useState } from "react";

import styles from './SupplierDetailsPage.module.css';

interface Values {
  phone: string;
  email: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}


const SupplierNotFound = () => {
  return <div className={ styles.supplier__not__found }>Supplier not found!</div>;
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
      navigate('/suppliers');
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
      <div className={ styles.edit__supplier__container }>
        <h2 className={ styles.title__page }>Edit Supplier</h2>
        <div className={ styles.info__supplier }>
          <p className={ styles.title__editing }>Editing Supplier:</p>
          <p className={ styles.id__supplier }>ID: { supplier.id }</p>
          <p className={ styles.phone__supplier }>Phone: { supplier.phone }</p>
          <p className={ styles.email__supplier }>Email: { supplier.email }</p>
          <p className={ styles.address__supplier }>Address: { supplier.address }</p>
          <p className={ styles.city__supplier }>City: { supplier.city }</p>
          <p className={ styles.country__supplier }>Country: { supplier.country }</p>
          <p className={ styles.postalCode__supplier }>Postal Code: { supplier.postalCode }</p>
        </div>
        <form onSubmit={ handleSubmit } className={ styles.form }>
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
                <div className={ styles.input__error }>{ errors.city }</div>
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
              id="postalCode" 
              className={ styles.input__text }
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
              Update Supplier
            </button>
            <button
              type="button"
              className={ styles.btn }
              onClick={ onDelete }
              disabled={ isLoading }
            >
              Delete Supplier
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
