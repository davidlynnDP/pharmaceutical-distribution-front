import { useContext, useState } from 'react';
import { InformationContext } from '../context';
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
    CreateSaleQuery
} from '../domain/interfaces';


export const useCheckInformation = () => {

    const { clients,
            suppliers,
            products,
            sales,
            createClient,
            findAllClients,
            findClientById,
            updateClient,
            deleteClient,
            createSupplier,
            findAllSuppliers,
            findSupplierById,
            updateSupplier,
            deleteSupplier,
            createProduct,
            findAllProducts,
            findProductById,
            updateProduct,
            deleteProduct,
            createSale,
            findAllSales,
            findSaleById } = useContext( InformationContext );

    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const handleCreateClient = async (createClientParams: CreateClientParams) => {
        setIsLoading(true);
        await createClient(createClientParams);
        setIsLoading(false);
    };

    const handleFindAllClients = async (paginationParams: PaginationParams) => {
        setIsLoading(true);
        await findAllClients(paginationParams);
        setIsLoading(false);
    };

    const handleFindClientById = async (id: string) => {
        setIsLoading(true);
        await findClientById(id);
        setIsLoading(false);
    };

    const handleUpdateClient = async (id: string, updateClientParams: UpdateClientParams) => {
        setIsLoading(true);
        await updateClient(id, updateClientParams);
        setIsLoading(false);
    };

    const handleDeleteClient = async (id: string) => {
        setIsLoading(true);
        await deleteClient(id);
        setIsLoading(false);
    };

    const handleCreateSupplier = async (createSupplierParams: CreateSupplierParams) => {
        setIsLoading(true);
        await createSupplier(createSupplierParams);
        setIsLoading(false);
    };

    const handleFindAllSuppliers = async (paginationParams: PaginationParams) => {
        setIsLoading(true);
        await findAllSuppliers(paginationParams);
        setIsLoading(false);
    };

    const handleFindSupplierById = async (id: string) => {
        setIsLoading(true);
        await findSupplierById(id);
        setIsLoading(false);
    };

    const handleUpdateSupplier = async (id: string, updateSupplierParams: UpdateSupplierParams) => {
        setIsLoading(true);
         await updateSupplier(id, updateSupplierParams);
        setIsLoading(false);
    };

    const handleDeleteSupplier = async (id: string) => {
        setIsLoading(true);
        await deleteSupplier(id);
        setIsLoading(false);
    };

    const handleCreateProduct = async (createProductParams: CreateProductParams, createProductQuery: CreateProductQuery) => {
        setIsLoading(true);
        await createProduct(createProductParams, createProductQuery);
        setIsLoading(false);
    };

    const handleFindAllProducts = async (paginationParams: PaginationParams) => {
        setIsLoading(true);
        await findAllProducts(paginationParams);
        setIsLoading(false);
    };

    const handleFindProductById = async (id: string) => {
        setIsLoading(true);
        await findProductById(id);
        setIsLoading(false);
    };

    const handleUpdateProduct = async (id: string, updateProductParams: UpdateProductParams, updateProductQuery: UpdateProductQuery) => {
        setIsLoading(true);
        await updateProduct(id, updateProductParams, updateProductQuery);
        setIsLoading(false);
    };

    const handleDeleteProduct = async (id: string) => {
        setIsLoading(true);
        await deleteProduct(id);
        setIsLoading(false);
    };

    const handleCreateSale = async (createSaleParams: CreateSaleParams, createSaleQuery: CreateSaleQuery) => {
        setIsLoading(true);
        await createSale(createSaleParams, createSaleQuery);
        setIsLoading(false);
    };

    const handleFindAllSales = async (paginationParams: PaginationParams) => {
        setIsLoading(true);
        await findAllSales(paginationParams);
        setIsLoading(false);
    };

    const handleFindSaleById = async (id: string) => {
        setIsLoading(true);
        await findSaleById(id);
        setIsLoading(false);
    };

    return {
        clients,
        suppliers,
        products,
        sales,
        isLoading,

        //clients
        handleCreateClient,
        handleFindAllClients,
        handleFindClientById,
        handleUpdateClient,
        handleDeleteClient,

        //suppliers
        handleCreateSupplier,
        handleFindAllSuppliers,
        handleFindSupplierById,
        handleUpdateSupplier,
        handleDeleteSupplier,

        //products
        handleCreateProduct,
        handleFindAllProducts,
        handleFindProductById,
        handleUpdateProduct,
        handleDeleteProduct,

        //sales
        handleCreateSale,
        handleFindAllSales,
        handleFindSaleById
    };
};