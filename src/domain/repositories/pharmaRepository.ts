import { CreateClientParams, UpdateClientParams, PaginationParams, CreateSupplierParams, UpdateSupplierParams, CreateProductParams, CreateProductQuery, CreateSaleQuery, UpdateProductQuery, UpdateProductParams, CreateSaleParams } from "../interfaces";
import { Client, Product, Sale, Supplier } from "../models"



export interface PharmaRepository {

    createClient(createClientParams: CreateClientParams): Promise<Client>;
    findAllClients(paginationParams: PaginationParams): Promise<Client[]>;
    findClientById(id: string): Promise<Client>;
    updateClient(id: string, updateClientParams: UpdateClientParams): Promise<Client>;
    deleteClient(id: string): Promise<void>;

    createSupplier(createSupplierParams: CreateSupplierParams): Promise<Supplier>;
    findAllSuppliers(paginationParams: PaginationParams): Promise<Supplier[]>;
    findSupplierById(id: string): Promise<Supplier>;
    updateSupplier(id: string, updateSupplierParams: UpdateSupplierParams): Promise<Supplier>;
    deleteSupplier(id: string): Promise<void>;

    createProduct(createProductParams: CreateProductParams, createProductQuery: CreateProductQuery): Promise<Product>;
    findAllProducts(paginationParams: PaginationParams): Promise<Product[]>;
    findProductById(id: string): Promise<Product>;
    updateProduct(id: string, updateProductParams: UpdateProductParams, updateProductQuery: UpdateProductQuery): Promise<Product>;
    deleteProduct(id: string): Promise<void>;

    createSale(createSaleParams: CreateSaleParams, createSaleQuery: CreateSaleQuery): Promise<Sale>;
    findAllSales(paginationParams: PaginationParams): Promise<Sale[]>;
    findSaleById(id: string): Promise<Sale>;

}