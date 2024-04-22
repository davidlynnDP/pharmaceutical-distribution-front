import { PharmaDataSource } from "../../domain/datasources";
import { CreateClientParams, PaginationParams, UpdateClientParams, CreateSupplierParams, UpdateSupplierParams, CreateProductParams, CreateProductQuery, CreateSaleParams, CreateSaleQuery, UpdateProductParams, UpdateProductQuery } from "../../domain/interfaces";
import { Client, Product, Sale, Supplier } from "../../domain/models";
import { pharmaApi } from "../../config/api";


export class PharmaRenderDatasourceImpl implements PharmaDataSource {

    async createClient(createClientParams: CreateClientParams): Promise<Client> {

        const { email, name, phone } = createClientParams;
        
        try {
            const response = await pharmaApi.post<Client>(`/clients/create`, {
                email, 
                name, 
                phone
            });

            return response.data;
        } catch (error) {
            console.log( error );
            throw error;
        }
    }

    async findAllClients(paginationParams: PaginationParams): Promise<Client[]> {

        const { limit = 10, offset = 0 } = paginationParams;

        try {
            const response = await pharmaApi.get<Client[]>(`/clients/find`, {
                params: {
                    limit,
                    offset,
                },
            });

            return response.data;
        } catch (error) {
            console.log( error );
            throw error;
        }
    }

    async findClientById(id: string): Promise<Client> {
        try {
            const response = await pharmaApi.get<Client>(`/clients/find/${ id }`);

            return response.data;
        } catch (error) {
            console.log( error );
            throw error;
        }
    }

    async updateClient(id: string, updateClientParams: UpdateClientParams): Promise<Client> {

        const { email, name, phone } = updateClientParams;

        try {
            const response = await pharmaApi.patch<Client>(`/clients/${ id }`, {
                email, 
                name, 
                phone
            });

            return response.data;
        } catch (error) {
            console.log( error );
            throw error;        
        }
    }

    async deleteClient(id: string): Promise<void> {
        try {
            await pharmaApi.delete(`/clients/${ id }`);
        } catch (error) {
            console.log( error );
            throw error;
        }
    }

    async createSupplier(createSupplierParams: CreateSupplierParams): Promise<Supplier> {

        const { phone,
                email,
                address,
                city,
                country,
                postalCode } = createSupplierParams;

        try {
            const response = await pharmaApi.post<Supplier>(`/suppliers/create`, {
                phone,
                email,
                address,
                city,
                country,
                postalCode
            });

            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async findAllSuppliers(paginationParams: PaginationParams): Promise<Supplier[]> {

        const { limit = 10, offset = 0 } = paginationParams;

        try {
            const response = await pharmaApi.get<Supplier[]>(`/suppliers/find`, {
                params: {
                    limit,
                    offset,
                },
            });

            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async findSupplierById(id: string): Promise<Supplier> {
        try {
            const response = await pharmaApi.get<Supplier>(`/suppliers/find/${ id }`);

            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateSupplier(id: string, updateSupplierParams: UpdateSupplierParams): Promise<Supplier> {

        const { phone,
                email,
                address,
                city,
                country,
                postalCode } = updateSupplierParams;

        try {
            const response = await pharmaApi.patch<Supplier>(`/suppliers/${ id }`, {
                phone,
                email,
                address,
                city,
                country,
                postalCode
            });

            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteSupplier(id: string): Promise<void> {
        try {
            await pharmaApi.delete(`/suppliers/${ id }`);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async createProduct(createProductParams: CreateProductParams, createProductQuery: CreateProductQuery): Promise<Product> {

        const { description, files, name, price, stocks } = createProductParams;

        const { supplier } = createProductQuery;

        try {
            const response = await pharmaApi.post<Product>(`/products/create?supplier=${ supplier }`, {
                description, 
                files, 
                name, 
                price, 
                stocks
            });
            
            return response.data;
          } catch (error) {
            console.log(error);
            throw error;
          }
    }

    async findAllProducts(paginationParams: PaginationParams): Promise<Product[]> {

        const { limit = 10, offset = 0 } = paginationParams;

        try {
            const response = await pharmaApi.get<Product[]>(`/products/find`, {
              params: {
                limit,
                offset,
              },
            });
            
            return response.data;
          } catch (error) {
            console.log(error);
            throw error;
          }
    }

    async findProductById(id: string): Promise<Product> {

        try {
            const response = await pharmaApi.get<Product>(`/products/find/${ id }`);
            
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateProduct(id: string, updateProductParams: UpdateProductParams, updateProductQuery: UpdateProductQuery): Promise<Product> {

        const { description, files, name, price, stocks } = updateProductParams;

        const { deletePrevious = false, supplier } = updateProductQuery;
        const queryParameters = `supplier=${ supplier }&deletePrevious=${ deletePrevious }`;

        try {
            const response = await pharmaApi.patch<Product>(`/products/${ id }?${ queryParameters }`, {
              description,
              files,
              name,
              price,
              stocks,
              deletePrevious,
              supplier,
            });
            
            return response.data;
          } catch (error) {
            console.log(error);
            throw error;
          }
    }

    async deleteProduct(id: string): Promise<void> {
        try {
            await pharmaApi.delete(`/products/${ id }`);
          } catch (error) {
            console.log(error);
            throw error;
          }
    }

    async createSale(createSaleParams: CreateSaleParams, createSaleQuery: CreateSaleQuery): Promise<Sale> {

        const { items } = createSaleParams;

        const { client } = createSaleQuery;

        try {
            const response = await pharmaApi.post<Sale>(`/sales/create?client=${ client }`, {
              items,
            });
            
            return response.data;
          } catch (error) {
            console.log(error);
            throw error;
          }
    }

    async findAllSales(paginationParams: PaginationParams): Promise<Sale[]> {

        const { limit = 10, offset = 0 } = paginationParams;

        try {
            const response = await pharmaApi.get<Sale[]>(`/sales/find`, {
              params: {
                limit,
                offset,
              },
            });
            
            return response.data;
          } catch (error) {
            console.log(error);
            throw error;
          }
    }

    async findSaleById(id: string): Promise<Sale> {
        
        try {
            const response = await pharmaApi.get<Sale>(`/sales/find/${ id }`);
            
            return response.data;
          } catch (error) {
            console.log(error);
            throw error;
          }
    }
    
}