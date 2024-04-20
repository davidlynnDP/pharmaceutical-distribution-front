import { Supplier } from './';


export interface Product {
    id:          string;
    name:        string;
    slug:        string;
    description: string;
    stocks:      number;
    price:       number;
    images:      Image[];
    supplier:    Supplier;
}

export interface Image {
    id:  string;
    url: string;
}