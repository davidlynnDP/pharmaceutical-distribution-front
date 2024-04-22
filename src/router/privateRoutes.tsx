import { Navigate } from "react-router-dom";
import { ClientDetailsPage, ClientsPage, NewClientPage, NewProductPage, NewSalePage, NewSupplierPage, ProductDetailsPage, ProductsPage, SaleDetailsPage, SalesPage, SummaryPage, SupplierDetailsPage, SuppliersPage } from "../pharmaceutical/pages";


interface IRoute {
    path: string;
    element: JSX.Element;
    children?: IRoute[];
  }
  
  export const privateRoutes: IRoute[] = [
    {
      path: "/",
      element: <SummaryPage />,
    },
    {
      path: "/products",
      element: <ProductsPage />,
      children: [
        {
          path: ":productId",
          element: <ProductDetailsPage />,
        },
        {
          path: "new",
          element: <NewProductPage />,
        },
      ],
    },
    {
      path: "/suppliers",
      element: <SuppliersPage />,
      children: [
        {
          path: ":supplierId",
          element: <SupplierDetailsPage />,
        },
        {
          path: "new",
          element: <NewSupplierPage />,
        },
      ],
    },
    {
      path: "/clients",
      element: <ClientsPage />,
      children: [
        {
          path: ":clientId",
          element: <ClientDetailsPage />,
        },
        {
          path: "new",
          element: <NewClientPage />,
        },
      ],
    },
    {
      path: "/sales",
      element: <SalesPage />,
      children: [
        {
          path: ":saleId",
          element: <SaleDetailsPage />,
        },
        {
          path: "new",
          element: <NewSalePage />,
        },
      ],
    },
    {
      path: "/*",
      element: <Navigate to="/" />,
    },
  ]