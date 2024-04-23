import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";

import { PharmaceuticalLayout } from "../../layout"
import { useCheckInformation } from "../../../hooks";

import './NewProductPage.css';

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
}


export const NewProductPage = () => {

  const { handleCreateProduct, isLoading, suppliers } = useCheckInformation();
  const navigate = useNavigate();

  const onSubmit = async(values: Values) => {

    try {
      if (values.files === null) {
        throw new Error('Please select at least one image.');
      }
      await handleCreateProduct({
        name: values.name,
        description: values.description,
        stocks: Number( values.stocks ),
        price: Number( values.price ),
        files: values.files,
      }, { supplier: values.supplierId });
      navigate('/products');
    } catch (error) {
      console.log( error );
    }
  };

  const { handleSubmit, errors, touched, getFieldProps, resetForm, setFieldValue } = useFormik({
    initialValues: {
      name: '',
      description: '',
      stocks: '',
      price: '',
      supplierId: '',
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
        .required('Image is required')
        .test(
          'fileSize',
          'File size too large (Max 4MB)',
          (value) => {
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
  
  return (
    <PharmaceuticalLayout>
      <div>
        <h2>New Product</h2>
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
              onChange={ handleSupplierChange }>
                <option value="">Select Supplier</option>
                {
                  suppliers.map(supplier => (
                    <option key={ supplier.id } value={ supplier.id }>{ supplier.email }</option>
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
            <button 
              type="submit"
              disabled={ isLoading }
            >
              Create Product
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
        <Link to="/products">
          Back to Products
        </Link>
      </div>
    </PharmaceuticalLayout>
  )
}

