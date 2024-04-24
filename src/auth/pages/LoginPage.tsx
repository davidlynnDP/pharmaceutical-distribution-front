import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";

import { AuthLayout } from "../layout";
import { useCheckAuth } from "../../hooks";

import styles from './LoginPage.module.css';



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
      <div className={ styles.login__container }>
        <h2 className={ styles.title__page }>Iniciar Sesión</h2>
        <form onSubmit={ handleSubmit } className={ styles.form }>
          <div className={ styles.container__input }>
            <label htmlFor="email" className={ styles.input__name }>Email:</label>
            <input 
              type="email" 
              id="email" 
              className={ styles.input__text }
              {...getFieldProps("email")} 
            />
            { touched.email && errors.email ? <div className={ styles.input__error }>{ errors.email }</div> : null }
          </div>
          <div className={ styles.container__input }>
            <label htmlFor="password" className={ styles.input__name }>Contraseña:</label>
            <input 
              type="password" 
              id="password" 
              className={ styles.input__text }
              {...getFieldProps("password")} 
            />
            { touched.password && errors.password ? <div className={ styles.input__error }>{ errors.password }</div> : null }
          </div>
          <div className={ styles.btn__container }>
            <button 
              type="submit" 
              className={ styles.btn }
              disabled={ isLoading } >
              Iniciar Sesión
            </button>
            <button 
              type="button" 
              onClick={() => resetForm()} 
              className={ styles.btn }
              disabled={ isLoading } >
              Limpiar
            </button>
          </div>
        </form>
        <div className={ styles.link__container }>
          <p className={ styles.paragraph__text }>¿No tienes una cuenta? 
            <Link to="/auth/sign-up" className={ styles.paragraph__text__link }>Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
  
}
