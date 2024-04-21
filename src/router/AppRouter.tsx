import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes";
import { PharmaceuticalRoutes } from "../pharmaceutical/routes";
import { useCheckAuth } from "../hooks";

enum AuthStatus {
  NotAuthenticated = 'not-authenticated',
  Authenticated = 'authenticated',
}

export const AppRouter = () => {

  const { status } = useCheckAuth();

  return (
    <Routes>
      {
        status === AuthStatus.Authenticated ? (
          <Route path="/*" element={ <PharmaceuticalRoutes /> } />
        ) : (
          <Route path="/auth/*" element={ <AuthRoutes /> } />
        )
      }

      <Route path='/*' element={ <Navigate to='/auth/login' />  } />
    </Routes>
  );
}