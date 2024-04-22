import { Navigate, Route, Routes } from "react-router-dom"
import { SummaryPage, ProductsPage, SuppliersPage, ClientsPage, SalesPage, ProductDetailsPage, NewProductPage, SupplierDetailsPage, NewSupplierPage, ClientDetailsPage, NewClientPage, SaleDetailsPage, NewSalePage  } from "../pages"



export const PharmaceuticalRoutes = () => {

  return (
    <Routes>
      
      <Route 
        path="/" 
        element={ <SummaryPage /> } 
      />

      <Route path="/products">
        <Route index element={ <ProductsPage /> } /> 
        <Route path=":productId" element={ <ProductDetailsPage /> } />
        <Route path="new" element={ <NewProductPage /> } /> 
      </Route>

      <Route path="/suppliers">
        <Route index element={ <SuppliersPage /> } /> 
        <Route path=":supplierId" element={ <SupplierDetailsPage /> } />
        <Route path="new" element={ <NewSupplierPage /> } /> 
      </Route>

      <Route path="/clients">
        <Route index element={ <ClientsPage /> } /> 
        <Route path=":clientId" element={ <ClientDetailsPage /> } />
        <Route path="new" element={ <NewClientPage /> } /> 
      </Route>

      <Route path="/sales">
        <Route index element={ <SalesPage /> } /> 
        <Route path=":saleId" element={ <SaleDetailsPage /> } />
        <Route path="new" element={ <NewSalePage /> } /> 
      </Route>

      <Route path="/*" element={ <Navigate to="/" /> } />

    </Routes>
  )
}
