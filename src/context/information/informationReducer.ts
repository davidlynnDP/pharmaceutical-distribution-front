import { Client, Supplier, Product, Sale } from "../../domain/models";
import { InformationState } from "./InformationProvider";


type InformationActionType = 
    | { type: '[Information] - Create Client', payload: Client }
    | { type: '[Information] - Set Clients', payload: Client[] }
    | { type: '[Information] - Update Client', payload: Client }
    | { type: '[Information] - Delete Client', payload: string }
    | { type: '[Information] - Create Supplier', payload: Supplier }
    | { type: '[Information] - Set Suppliers', payload: Supplier[] }
    | { type: '[Information] - Update Supplier', payload: Supplier }
    | { type: '[Information] - Delete Supplier', payload: string }
    | { type: '[Information] - Create Product', payload: Product }
    | { type: '[Information] - Set Products', payload: Product[] }
    | { type: '[Information] - Update Product', payload: Product }
    | { type: '[Information] - Delete Product', payload: string }
    | { type: '[Information] - Create Sale', payload: Sale }
    | { type: '[Information] - Set Sales', payload: Sale[] };

    
export const informationReducer = (state: InformationState, action: InformationActionType): InformationState => {

    switch ( action.type ) {

        case '[Information] - Create Client':
            return {
                ...state,
                clients: [ ...state.clients, action.payload ],
            };

        case '[Information] - Set Clients':
            return {
                ...state,
                clients: action.payload,
            };

        case '[Information] - Update Client':
            return {
                ...state,
                clients: state.clients.map( client =>
                    client.id === action.payload.id ? action.payload : client
                ),
            };

        case '[Information] - Delete Client':
            return {
                ...state,
                clients: state.clients.filter( client => client.id !== action.payload ),
            };
        
        case '[Information] - Create Supplier':
            return {
                ...state,
                suppliers: [ ...state.suppliers, action.payload ],
            };

        case '[Information] - Set Suppliers':
            return {
                ...state,
                suppliers: action.payload,
            };

        case '[Information] - Update Supplier':
            return {
                ...state,
                suppliers: state.suppliers.map( supplier =>
                    supplier.id === action.payload.id ? action.payload : supplier
                ),
            };

        case '[Information] - Delete Supplier':
            return {
                ...state,
                suppliers: state.suppliers.filter( supplier => supplier.id !== action.payload ),
            };

        case '[Information] - Create Product':
            return {
                ...state,
                products: [ ...state.products, action.payload ],
            };

        case '[Information] - Set Products':
            return {
                ...state,
                products: action.payload,
            };

        case '[Information] - Update Product':
            return {
                ...state,
                products: state.products.map( product =>
                    product.id === action.payload.id ? action.payload : product
                ),
            };

        case '[Information] - Delete Product':
            return {
                ...state,
                products: state.products.filter( product => product.id !== action.payload ),
            };
        
        case '[Information] - Create Sale':
            return {
                ...state,
                sales: [ ...state.sales, action.payload ],
            };
            
        case '[Information] - Set Sales':
            return {
                ...state,
                sales: action.payload,
            };

        default:
            return state;
    };
};
