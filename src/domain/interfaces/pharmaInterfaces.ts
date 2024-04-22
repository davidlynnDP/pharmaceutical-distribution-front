


export interface CreateClientParams {
    name: string;
    phone: string;
    email: string;
};

export interface UpdateClientParams {
    name?: string;
    phone?: string;
    email?: string;
};


export interface CreateSupplierParams {
    phone: string;
    email: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
};

export interface UpdateSupplierParams {
    phone?: string;
    email?: string;
    address?: string;
    city?: string;
    country?: string;
    postalCode?: string;
};


export interface CreateProductParams {
    name: string;
    description: string;
    stocks: number;
    price: number;
    files: File[]; //jpg|png|jpeg
}

export interface CreateProductQuery {
    supplier: string;
}

export interface UpdateProductParams {
    name?: string;
    description?: string;
    stocks?: number;
    price?: number;
    files?: File[]; //jpg|png|jpeg
}

export interface UpdateProductQuery {
    deletePrevious?: boolean;
    supplier?: string;
}


interface Item {
    productId: string;
    quantity: number;
}

export interface CreateSaleParams {
    items: Item[];
}

export interface CreateSaleQuery {
    client: string;
}