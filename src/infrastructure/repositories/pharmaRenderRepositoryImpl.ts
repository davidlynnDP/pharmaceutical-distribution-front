import { PharmaDataSource } from "../../domain/datasources";
import { CreateClientParams, PaginationParams, UpdateClientParams, CreateSupplierParams, UpdateSupplierParams, CreateProductParams, CreateProductQuery, UpdateProductParams, UpdateProductQuery, CreateSaleParams, CreateSaleQuery } from "../../domain/interfaces";
import { Client, Supplier, Product, Sale } from "../../domain/models";
import { PharmaRepository } from "../../domain/repositories";
import { PharmaRenderDatasourceImpl } from "../datasources/pharmaRenderDatasourceImpl";


export class PharmaRenderRepositoryImpl implements PharmaRepository {

    private datasource: PharmaDataSource;

    constructor(datasource?: PharmaDataSource) {
        this.datasource = datasource ?? new PharmaRenderDatasourceImpl();
    }

    async createClient(createClientParams: CreateClientParams): Promise<Client> {
        return this.datasource.createClient(createClientParams);
    };
    
    async findAllClients(paginationParams: PaginationParams): Promise<Client[]> {
        return this.datasource.findAllClients(paginationParams);
    };
    
    async findClientById(id: string): Promise<Client> {
        return this.datasource.findClientById(id);
    };
    
    async updateClient(id: string, updateClientParams: UpdateClientParams): Promise<Client> {
        return this.datasource.updateClient(id, updateClientParams);
    };
    
    async deleteClient(id: string): Promise<void> {
        return this.datasource.deleteClient(id);
    };
    
    async createSupplier(createSupplierParams: CreateSupplierParams): Promise<Supplier> {
        return this.datasource.createSupplier(createSupplierParams);
    };
    
    async findAllSuppliers(paginationParams: PaginationParams): Promise<Supplier[]> {
        return this.datasource.findAllSuppliers(paginationParams);
    };
    
    async findSupplierById(id: string): Promise<Supplier> {
        return this.datasource.findSupplierById(id);
    };
    
    async updateSupplier(id: string, updateSupplierParams: UpdateSupplierParams): Promise<Supplier> {
        return this.datasource.updateSupplier(id, updateSupplierParams);
    };
    
   async deleteSupplier(id: string): Promise<void> {
        return this.datasource.deleteSupplier(id);
    };
    
    async createProduct(createProductParams: CreateProductParams, createProductQuery: CreateProductQuery): Promise<Product> {
        return this.datasource.createProduct(createProductParams, createProductQuery);
    };
    
    async findAllProducts(paginationParams: PaginationParams): Promise<Product[]> {
        return this.datasource.findAllProducts(paginationParams);
    };
    
    async findProductById(id: string): Promise<Product> {
        return this.datasource.findProductById(id);
    };
    
    async updateProduct(id: string, updateProductParams: UpdateProductParams, updateProductQuery: UpdateProductQuery): Promise<Product> {
        return this.datasource.updateProduct(id, updateProductParams, updateProductQuery);
    };
    
    async deleteProduct(id: string): Promise<void> {
        return this.datasource.deleteProduct(id);
    };
    
    async createSale(createSaleParams: CreateSaleParams, createSaleQuery: CreateSaleQuery): Promise<Sale> {
        return this.datasource.createSale(createSaleParams, createSaleQuery);
    };
    
    async findAllSales(paginationParams: PaginationParams): Promise<Sale[]> {
        return this.datasource.findAllSales(paginationParams);
    };
    
    async findSaleById(id: string): Promise<Sale> {
        return this.datasource.findSaleById(id);
    };
    
}