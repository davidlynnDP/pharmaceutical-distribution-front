import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";

import { AuthLayout } from "../layout";
import { useCheckAuth } from "../../hooks";

import './LoginPage.css';



export const LoginPage = () => {

  const { handleSignIn, isLoading } = useCheckAuth();
  const navigate = useNavigate();

  const { handleSubmit, errors, touched, getFieldProps, resetForm } = useFormik({
    initialValues: {
      password: '',
      email: '',
    },
    onSubmit: async( values ) => {
      await handleSignIn({ email: values.email, password: values.password });
      navigate('/');
      console.log( values );
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('El correo no tiene un formato válido')
        .required('Requerido'),
      password: Yup.string()
        .required('Requerido'),
    })
  });

  return (
    <AuthLayout>
      <div>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={ handleSubmit }>
          <div>
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              {...getFieldProps("email")} 
            />
            { touched.email && errors.email ? <div>{ errors.email }</div> : null }
          </div>
          <div>
            <label htmlFor="password">Contraseña:</label>
            <input 
              type="password" 
              id="password" 
              {...getFieldProps("password")} 
            />
            { touched.password && errors.password ? <div>{ errors.password }</div> : null }
          </div>
          <div>
            <button 
              type="submit" 
              disabled={ isLoading } >
              "Iniciar Sesión"
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
          <p>¿No tienes una cuenta? 
            <Link to="/auth/sign-up">Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
  
}
