import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link, useNavigate, useParams } from "react-router-dom";

import { PharmaceuticalLayout } from "../../layout"
import { useCheckInformation } from "../../../hooks";
import { Product } from "../../../domain/models";
import { useEffect, useState } from "react";

import styles from './ProductDetailsPage.module.css';

//NOTA: únicamente se aceptan imágenes de máximo 4 megabytes y con las extensiones jpg|png|jpeg

// name: string;
// description: string;
// stocks: number;
// price: number;
// files: ARCHIVO jpg|png|jpeg

interface Values {
  name: string;
  description: string;
  stocks: string;
  price: string;
  files: FileList | null;

  supplierId: string;
  deletePrevious: boolean; //checkbox
}


const ProductNotFound = () => {
  return <div className={ styles.product__not__found }>Product not found!</div>;
};

export const ProductDetailsPage = () => {

  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { handleUpdateProduct, handleDeleteProduct, isLoading, suppliers, products } = useCheckInformation();
  const [ product, setProduct ] = useState<Product | undefined>(undefined);

  useEffect(() => {
    const fetchedProduct = products.find( product => product.id === productId );
    if ( fetchedProduct ) {
      setProduct( fetchedProduct );
    }
  }, [ productId, products ]);

  const onSubmit = async(values: Values) => {

    if ( !product ) return;
    try {
      if (values.files === null) {
        throw new Error('Please select at least one image.');
      }
      await handleUpdateProduct( product.id, {
        name: values.name,
        description: values.description,
        stocks: Number( values.stocks ),
        price: Number( values.price ),
        files: values.files,
      }, { supplier: values.supplierId, deletePrevious: values.deletePrevious });
      navigate('/products');
    } catch (error) {
      console.log( error );
    }
  };

  const onDelete = async() => {

    if ( !product ) return;
    try {
      await handleDeleteProduct( product.id );
      navigate('/products');
    } catch (error) {
      console.log( error );
    }
  }

  const { handleSubmit, errors, touched, getFieldProps, setFieldValue } = useFormik({
    initialValues: {
      name: product?.name || '',
      description: product?.description || '',
      stocks: product?.stocks.toString() || '',
      price: product?.price.toString() || '',
      supplierId: product?.supplier.id || '',
      deletePrevious: false,
      files: null,
    },
    onSubmit: onSubmit,
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Name is required'),
      description: Yup.string()
        .required('Description is required'),
      stocks: Yup.number()
        .required('Stocks is required')
        .positive('Stocks must be a positive number')
        .integer('Stocks must be an integer'),
      price: Yup.number()
        .required('Price is required')
        .positive('Price must be a positive number'),
      supplierId: Yup.string()
        .required('Supplier is required'),
      files: Yup.array()
        .test(
          'fileSize',
          'File size too large (Max 4MB)',
          (value) => {
            if (!value) {
              return false;
            }
            for (let i = 0; i < value.length; i++) {
              if (value[i]?.size > 4 * 1024 * 1024) {
                return false;
              }
            }
            return true;
          }
        )
        .test(
          'fileType',
          'Invalid file type. Only jpg, png, jpeg allowed',
          (value) => {
            if (!value) {
              return false;
            }
            for (let i = 0; i < value.length; i++) {
              if (
                !['image/jpeg', 'image/png', 'image/jpg'].includes(value[i]?.type)
              ) {
                return false;
              }
            }
            return true;
          }
        ),
    })
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const files = event.target.files;
    if (files) {
      const filesArray = Array.from(files);
      setFieldValue('files', filesArray);
    }
  };

  const handleSupplierChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

    const supplierId = event.target.value;
    setFieldValue('supplierId', supplierId);
  };

  if (!product) {
    return <ProductNotFound />;
  }

  return (
    <PharmaceuticalLayout>
      <div className={ styles.details__container }>
        <h2 className={ styles.title__page }>Product Details</h2>
        <div className={ styles.product__details }>
          <div className={ styles.product__info }>
            <div className={ styles.product__info__item }>
              <strong className={ styles.info__label }>ID:</strong>
              <span className={ styles.info__value }>{ product.id }</span>
            </div>
            <div className={ styles.product__info__item }>
              <strong className={ styles.info__label }>Name:</strong>
              <span className={ styles.info__value }>{ product.name }</span>
            </div>
            <div className={ styles.product__info__item }>
              <strong className={ styles.info__label }>Slug:</strong>
              <span className={ styles.info__value }>{ product.slug }</span>
            </div>
            <div className={ styles.product__info__item }>
              <strong className={ styles.info__label }>Description:</strong>
              <span className={ styles.info__value }>{ product.description }</span>
            </div>
            <div className={ styles.product__info__item }>
              <strong className={ styles.info__label }>Stocks:</strong>
              <span className={ styles.info__value }>{ product.stocks }</span>
            </div>
            <div className={ styles.product__info__item }>
              <strong className={ styles.info__label }>Price:</strong>
              <span className={ styles.info__value }>${ product.price }</span>
            </div>
            <div className={ styles.product__info__item }>
              <strong className={ styles.info__label }>Supplier:</strong>
              <span className={ styles.info__value }>{ product.supplier.email }</span>
            </div>
          </div>
          <div className={ styles.product__images }>
            <strong className={ styles.info__label }>Images:</strong>
            <div className={ styles.image__container }>
              {
                product.images.map(({ id, url }) => (
                  <div key={ id } className={ styles.image__item }>
                    <img src={ url } alt={`Image ${ id }`} className={ styles.product__image } />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <form onSubmit={ handleSubmit } className={ styles.form }>
          <div className={ styles.container__input }>
            <label htmlFor="name" className={ styles.input__text }>Name:</label>
            <input
              type="text"
              id="name"
              className={ styles.input }
              {...getFieldProps("name")}
            />
            {
              touched.name && errors.name && (
                <div className={ styles.input__errors }>{ errors.name }</div>
              )
            }
          </div>
          <div className={ styles.container__input }>
            <label htmlFor="description" className={ styles.input__text }>Description:</label>
            <textarea
              id="description" 
              className={ styles.input }
              {...getFieldProps("description")}
            />
            {
              touched.description && errors.description && (
                <div className={ styles.input__errors }>{ errors.description }</div>
              )
            }
          </div>
          <div className={ styles.container__input }>
            <label htmlFor="stocks" className={ styles.input__text }>Stocks:</label>
            <input
              type="text"
              id="stocks" 
              className={ styles.input }
              {...getFieldProps("stocks")}
            />
            {
              touched.stocks && errors.stocks && (
                <div className={ styles.input__errors }>{ errors.stocks }</div>
              )
            }
          </div>
          <div className={ styles.container__input }>
            <label htmlFor="price" className={ styles.input__text }>Price:</label>
            <input
              type="text"
              id="price" 
              className={ styles.input }
              {...getFieldProps("price")}
            />
            {
              touched.price && errors.price && (
                <div className={ styles.input__errors }>{ errors.price }</div>
              )
            }
          </div>
          <div className={ styles.container__input }>
            <label htmlFor="supplierId" className={ styles.input__text }>Supplier:</label>
            <select
              id="supplierId" 
              className={ styles.input__select }
              {...getFieldProps("supplierId")}
              onChange={ handleSupplierChange }
            >
              <option value="" className={ styles.opt__select }>Select Supplier</option>
              {
                suppliers.map(supplier => (
                  <option key={ supplier.id } value={ supplier.id } className={ styles.opt__select }>
                    { supplier.email }
                  </option>
                ))
              }
            </select>
            {
              touched.supplierId && errors.supplierId && (
                <div className={ styles.input__errors }>{ errors.supplierId }</div>
              )
            }
          </div>
          <div className={ styles.container__input }>
            <label htmlFor="files" className={ styles.input__text }>Images:</label>
            <input
              type="file"
              id="files"
              multiple 
              className={ styles.input__files }
              onChange={ handleFileChange }
            />
            {
              touched.files && errors.files && (
                <div className={ styles.input__errors }>{ errors.files }</div>
              )
            }
          </div>
          <div className={ styles.container__input }>
            <label htmlFor="deletePrevious" className={ styles.input__text }>
              Delete Previous Images:
              <input
                type="checkbox"
                id="deletePrevious"  
                className={ styles.input__checkbox }
                {...getFieldProps("deletePrevious")}
              />
            </label>
          </div>
          <div className={ styles.btn__container }>
            <button
              type="submit"
              className={ styles.btn }
              disabled={ isLoading }
            >
              Update Product
            </button>
            <button
              type="button"
              className={ styles.btn }
              onClick={ onDelete }
              disabled={ isLoading }
            >
              Delete Product
            </button>
          </div>
        </form>
        <Link to="/products" className={ styles.btn__back }>
          Back to Products
        </Link>
      </div>
    </PharmaceuticalLayout>
  )
}