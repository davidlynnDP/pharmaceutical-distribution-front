import { createContext } from "react";
import { Client, Product, Sale, Supplier } from "../../domain/models";
import {
    CreateClientParams,
    UpdateClientParams,
    CreateSupplierParams,
    UpdateSupplierParams,
    CreateProductParams,
    CreateProductQuery,
    UpdateProductParams,
    UpdateProductQuery,
    CreateSaleParams,
    CreateSaleQuery,
    PaginationParams,
  } from "../../domain/interfaces";


interface InformationContextProps {
    clients: Client[];
    suppliers: Supplier[];
    products: Product[];
    sales: Sale[];

    //clients
    createClient: (createClientParams: CreateClientParams) => Promise<Client>;
    findAllClients: (paginationParams: PaginationParams) => Promise<Client[]>;
    findClientById: (id: string) => Promise<Client>;
    updateClient: (id: string, updateClientParams: UpdateClientParams) => Promise<Client>;
    deleteClient: (id: string) => Promise<void>;

    //suppliers
    createSupplier: (createSupplierParams: CreateSupplierParams) => Promise<Supplier>;
    findAllSuppliers: (paginationParams: PaginationParams) => Promise<Supplier[]>;
    findSupplierById: (id: string) => Promise<Supplier>;
    updateSupplier: (id: string, updateSupplierParams: UpdateSupplierParams) => Promise<Supplier>;
    deleteSupplier: (id: string) => Promise<void>;

    //products
    createProduct: (createProductParams: CreateProductParams, createProductQuery: CreateProductQuery) => Promise<Product>;
    findAllProducts: (paginationParams: PaginationParams) => Promise<Product[]>;
    findProductById: (id: string) => Promise<Product>;
    updateProduct: (
        id: string,
        updateProductParams: UpdateProductParams,
        updateProductQuery: UpdateProductQuery
    ) => Promise<Product>;
    deleteProduct: (id: string) => Promise<void>;

    //sales
    createSale: (createSaleParams: CreateSaleParams, createSaleQuery: CreateSaleQuery) => Promise<Sale>;
    findAllSales: (paginationParams: PaginationParams) => Promise<Sale[]>;
    findSaleById: (id: string) => Promise<Sale>;
}


export const InformationContext = createContext({} as InformationContextProps);