import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";

import { AuthLayout } from "../layout"

import './RegisterPage.css';
import { useCheckAuth } from "../../hooks";


export const RegisterPage = () => {

  const { handleSignUp, isLoading } = useCheckAuth();
  const navigate = useNavigate();

  const { handleSubmit, errors, touched, getFieldProps, resetForm } = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async( values ) => {
      await handleSignUp({ email: values.email, password: values.password, username: values.username });
      navigate('/');
      console.log(values);
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Username es requerido'),
      email: Yup.string()
        .email('El correo no tiene un formato válido')
        .required('Email es requerido'),
      password: Yup.string()
        .required('Contraseña es requerida'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
        .required('Confirma tu contraseña'),
    })
  });
  
  return (
    <AuthLayout>
      {
        isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div>
            <h2>Registro</h2>
            <form onSubmit={ handleSubmit }>
              <div>
                <label htmlFor="username">Username:</label>
                <input 
                  type="text" 
                  id="username" 
                  {...getFieldProps('username')} 
                />
                { touched.username && errors.username ? <div>{ errors.username }</div> : null }
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input 
                  type="email" 
                  id="email" 
                  {...getFieldProps('email')} 
                />
                { touched.email && errors.email ? <div>{ errors.email }</div> : null }
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input 
                  type="password" 
                  id="password" 
                  {...getFieldProps('password')} 
                />
                { touched.password && errors.password ? <div>{ errors.password }</div> : null }
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirmar Password:</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  {...getFieldProps('confirmPassword')}
                />
                { touched.confirmPassword && errors.confirmPassword ? <div>{ errors.confirmPassword }</div> : null }
              </div>
              <div>
                <button 
                  type="submit" 
                  disabled={ isLoading } >
                  Registrarse
                </button>
                <button 
                type="button" 
                onClick={() => resetForm()} 
                disabled={ isLoading } >
                  Limpiar
                </button>
              </div>
            </form>

            <div>
              <p>¿Ya tienes una cuenta? 
                <Link to="/auth/login">Inicia sesión aquí</Link>
              </p>
            </div>
          </div>
        )
      }
    </AuthLayout>
  )
}

