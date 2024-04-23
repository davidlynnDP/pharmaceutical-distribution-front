import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link, useNavigate, useParams } from "react-router-dom";

import { PharmaceuticalLayout } from "../../layout"
import { useCheckInformation } from "../../../hooks";
import { Product } from "../../../domain/models";
import { useEffect, useState } from "react";

import './ProductDetailsPage.css';

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
  return <div>Product not found!</div>;
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
      <div>
        <div>
          <h2>Product Details</h2>
          <div>
            <strong>ID:</strong> { product.id }
          </div>
          <div>
            <strong>Name:</strong> { product.name }
          </div>
          <div>
            <strong>Slug:</strong> { product.slug }
          </div>
          <div>
            <strong>Description:</strong> { product.description }
          </div>
          <div>
            <strong>Stocks:</strong> { product.stocks }
          </div>
          <div>
            <strong>Price:</strong> ${ product.price }
          </div>
          <div>
            <strong>Supplier:</strong> ({ product.supplier.email })
          </div>
          <div>
            <strong>Images:</strong>
            {
              product.images.map(({ id, url }) => (
                <div key={ id }>
                  <img src={ url } alt={`Image ${ id }`} />
                </div>
              ))
            }
          </div>
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
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              {...getFieldProps("description")}
            />
            {
              touched.description && errors.description && (
                <div>{ errors.description }</div>
              )
            }
          </div>
          <div>
            <label htmlFor="stocks">Stocks:</label>
            <input
              type="text"
              id="stocks"
              {...getFieldProps("stocks")}
            />
            {
              touched.stocks && errors.stocks && (
                <div>{ errors.stocks }</div>
              )
            }
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              id="price"
              {...getFieldProps("price")}
            />
            {
              touched.price && errors.price && (
                <div>{ errors.price }</div>
              )
            }
          </div>
          <div>
            <label htmlFor="supplierId">Supplier:</label>
            <select
              id="supplierId"
              {...getFieldProps("supplierId")}
              onChange={ handleSupplierChange }
            >
              <option value="">Select Supplier</option>
              {
                suppliers.map(supplier => (
                  <option key={ supplier.id } value={ supplier.id }>
                    { supplier.email }
                  </option>
                ))
              }
            </select>
            {
              touched.supplierId && errors.supplierId && (
                <div>{ errors.supplierId }</div>
              )
            }
          </div>
          <div>
            <label htmlFor="files">Images:</label>
            <input
              type="file"
              id="files"
              multiple
              onChange={ handleFileChange }
            />
            {
              touched.files && errors.files && (
                <div>{ errors.files }</div>
              )
            }
          </div>
          <div>
            <label htmlFor="deletePrevious">
              Delete Previous Images:
              <input
                type="checkbox"
                id="deletePrevious"
                {...getFieldProps("deletePrevious")}
              />
            </label>
          </div>
          <div>
            <button
              type="submit"
              disabled={ isLoading }
            >
              Update Product
            </button>
            <button
              type="button"
              onClick={ onDelete }
              disabled={ isLoading }
            >
              Delete Product
            </button>
          </div>
        </form>
        <Link to="/products">
          Back to Products
        </Link>
      </div>
    </PharmaceuticalLayout>
  )
}