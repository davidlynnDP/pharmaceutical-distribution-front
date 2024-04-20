import { Client } from ".";


export interface Sale {
    id:          string;
    saleDate:    string;
    client:      Client;
    saleDetails: SaleDetail[];
}

export interface SaleDetail {
    id:       string;
    quantity: number;
    total:    number;
    product:  Product;
}

export interface Product {
    id:          string;
    name:        string;
    slug:        string;
    description: string;
    stocks:      number;
    price:       number;
}
