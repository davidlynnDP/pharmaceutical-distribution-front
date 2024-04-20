import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage } from '../pages';


export const AuthRoutes = () => {

  return (
    <Routes>
        <Route path="sign-in" element={ <LoginPage /> } />
        <Route path="sign-up" element={ <RegisterPage /> } />

        <Route path='/*' element={ <Navigate to="/auth/sign-in" /> } />
    </Routes>
  )
  
}