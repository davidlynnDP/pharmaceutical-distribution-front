import { FC, ReactNode, useEffect, useReducer } from "react";
import { Client, Product, Sale, Supplier } from "../../domain/models";
import { PharmaRepository } from "../../domain/repositories";
import { PharmaRenderRepositoryImpl } from "../../infrastructure/repositories/pharmaRenderRepositoryImpl";
import { InformationContext } from "./InformationContext";
import {
    CreateClientParams,
    UpdateClientParams,
    PaginationParams,
    CreateSupplierParams,
    UpdateSupplierParams,
    CreateProductParams,
    CreateProductQuery,
    UpdateProductParams,
    UpdateProductQuery,
    CreateSaleParams,
    CreateSaleQuery,
  } from "../../domain/interfaces";
import { informationReducer } from "./informationReducer";


export interface InformationState {
    clients: Client[];
    suppliers: Supplier[];
    products: Product[];
    sales: Sale[];
}

const INFORMATION_INITIAL_STATE: InformationState = {
    clients: [],
    suppliers: [],
    products: [],
    sales: [],
};


interface InformationProviderProps {
    children: ReactNode;
}

export const InformationProvider: FC<InformationProviderProps> = ({ children }) => {

    const [ state, dispatch ] = useReducer( informationReducer, INFORMATION_INITIAL_STATE );
    const pharmaRepository: PharmaRepository = new PharmaRenderRepositoryImpl();

    useEffect(() => {
        findAllClients({ limit: 10, offset: 0 });
        findAllSuppliers({ limit: 10, offset: 0 });
        findAllProducts({ limit: 10, offset: 0 });
        findAllSales({ limit: 10, offset: 0 });
    }, []);

    const createClient = async(createClientParams: CreateClientParams): Promise<Client> => {
        try {
          const client = await pharmaRepository.createClient(createClientParams);
          dispatch({ type: '[Information] - Create Client', payload: client });
          return client;
        } catch (error) {
            console.log(error);
            throw error;
          }
      };
    
      const findAllClients = async(paginationParams: PaginationParams): Promise<Client[]> => {
        try {
          const clients = await pharmaRepository.findAllClients(paginationParams);
          dispatch({ type: '[Information] - Set Clients', payload: clients });
          return clients;
        } catch (error) {
            console.log(error);
            throw error;
          }
      };
    
      const findClientById = async (id: string): Promise<Client> => {
        try {
          return await pharmaRepository.findClientById(id);
        } catch (error) {
            console.log(error);
            throw error;
          }
      };
    
      const updateClient = async (id: string, updateClientParams: UpdateClientParams): Promise<Client> => {
        try {
          const client = await pharmaRepository.updateClient(id, updateClientParams);
          dispatch({ type: '[Information] - Update Client', payload: client });
          return client;
        } catch (error) {
            console.log(error);
            throw error;
        }
      };
    
      const deleteClient = async (id: string): Promise<void> => {
        try {
          await pharmaRepository.deleteClient(id);
          dispatch({ type: '[Information] - Delete Client', payload: id });
        } catch (error) {
            console.log(error);
            throw error;
        }
      };

      const createSupplier = async (createSupplierParams: CreateSupplierParams): Promise<Supplier> => {
        try {
          const supplier = await pharmaRepository.createSupplier(createSupplierParams);
          dispatch({ type: '[Information] - Create Supplier', payload: supplier });
          return supplier;
        } catch (error) {
            console.log(error);
            throw error;
        }
      };
    
      const findAllSuppliers = async (paginationParams: PaginationParams): Promise<Supplier[]> => {
        try {
          const suppliers = await pharmaRepository.findAllSuppliers(paginationParams);
          dispatch({ type: '[Information] - Set Suppliers', payload: suppliers });
          return suppliers;
        } catch (error) {
            console.log(error);
            throw error;
        }
      };
    
      const findSupplierById = async (id: string): Promise<Supplier> => {
        try {
          return await pharmaRepository.findSupplierById(id);
        } catch (error) {
            console.log(error);
            throw error;
        }
      };
    
      const updateSupplier = async (id: string, updateSupplierParams: UpdateSupplierParams): Promise<Supplier> => {
        try {
          const supplier = await pharmaRepository.updateSupplier(id, updateSupplierParams);
          dispatch({ type: '[Information] - Update Supplier', payload: supplier });
          return supplier;
        } catch (error) {
            console.log(error);
            throw error;
        }
      };
    
      const deleteSupplier = async (id: string): Promise<void> => {
        try {
          await pharmaRepository.deleteSupplier(id);
          dispatch({ type: '[Information] - Delete Supplier', payload: id });
        } catch (error) {
            console.log(error);
            throw error;
        }
      };

      const createProduct = async (createProductParams: CreateProductParams, createProductQuery: CreateProductQuery): Promise<Product> => {
        try {
          const product = await pharmaRepository.createProduct(createProductParams, createProductQuery);
          dispatch({ type: '[Information] - Create Product', payload: product });
          return product;
        } catch (error) {
            console.log(error);
            throw error;
        }
      };
    
      const findAllProducts = async (paginationParams: PaginationParams): Promise<Product[]> => {
        try {
          const products = await pharmaRepository.findAllProducts(paginationParams);
          dispatch({ type: '[Information] - Set Products', payload: products });
          return products;
        } catch (error) {
            console.log(error);
            throw error;
        }
      };
    
      const findProductById = async (id: string): Promise<Product> => {
        try {
          return await pharmaRepository.findProductById(id);
        } catch (error) {
            console.log(error);
            throw error;
        }
      };
    
      const updateProduct = async (id: string, updateProductParams: UpdateProductParams, updateProductQuery: UpdateProductQuery): Promise<Product> => {
        try {
          const product = await pharmaRepository.updateProduct(id, updateProductParams, updateProductQuery);
          dispatch({ type: '[Information] - Update Product', payload: product });
          return product;
        } catch (error) {
            console.log(error);
            throw error;
        }
      };
    
      const deleteProduct = async (id: string): Promise<void> => {
        try {
          await pharmaRepository.deleteProduct(id);
          dispatch({ type: '[Information] - Delete Product', payload: id });
        } catch (error) {
            console.log(error);
            throw error;
        }
      };

      const createSale = async (createSaleParams: CreateSaleParams, createSaleQuery: CreateSaleQuery): Promise<Sale> => {
        try {
          const sale = await pharmaRepository.createSale(createSaleParams, createSaleQuery);
          dispatch({ type: '[Information] - Create Sale', payload: sale });
          return sale; 
        } catch (error) {
            console.log(error);
            throw error;
        }
      };
    
      const findAllSales = async (paginationParams: PaginationParams): Promise<Sale[]> => {
        try {
          const sales = await pharmaRepository.findAllSales(paginationParams);
          dispatch({ type: '[Information] - Set Sales', payload: sales });
          return sales;
        } catch (error) {
            console.log(error);
            throw error;
        }
      };
    
      const findSaleById = async (id: string): Promise<Sale> => {
        try {
          return await pharmaRepository.findSaleById(id);
        } catch (error) {
            console.log(error);
            throw error;
        }
      };

    return (
        <InformationContext.Provider value={{
            ...state,

            //clients
            createClient,
            findAllClients,
            findClientById,
            updateClient,
            deleteClient,

            //suppliers
            createSupplier,
            findAllSuppliers,
            findSupplierById,
            updateSupplier,
            deleteSupplier,

            //products
            createProduct,
            findAllProducts,
            findProductById,
            updateProduct,
            deleteProduct,

            //sales
            createSale,
            findAllSales,
            findSaleById,
        }}>
            { children }
        </InformationContext.Provider>
    )

}