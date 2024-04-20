import { Navigate, Route, Routes } from "react-router-dom"
import { PharmaceuticalPage } from "../pages"


export const PharmaceuticalRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={ <PharmaceuticalPage /> } />
      <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
  )
  
}
