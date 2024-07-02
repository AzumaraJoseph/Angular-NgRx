import {  createReducer, on } from "@ngrx/store";
import { Product } from "../product";
import { ProductApiActions, ProductPageActions } from "./actions";


export interface ProductState {
    showProductCode: boolean,
    currentProductId: number | null,
    products: Product[],
    error: string
}

const initialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: ''
}

export const productReducer = createReducer<ProductState>(
    initialState,
    on(ProductPageActions.toggleProductCode, (state): ProductState => {
        return {
            ...state,
            showProductCode: !state.showProductCode
        }
    }),
    on(ProductPageActions.setCurrentProduct, (state, action): ProductState => {
        return {
            ...state,
            currentProductId: action.currentProductId
        }
    }),
    on(ProductPageActions.clearCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProductId: null
        }
    }),
    on(ProductPageActions.initializeCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProductId: 0
        }
    }),
    on(ProductApiActions.loadProductsSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: action.products,
            error: ''
        }
    }),
    on(ProductApiActions.loadProductsFailure, (state, action): ProductState => {
        return {
            ...state,
            products: [],
            error: action.error
        }
    }),
    on(ProductApiActions.updateProductSuccess, (state, action): ProductState => {
        const updatedProducts = state.products.map(item => item.id === action.product.id ? action.product : item);
        return {
            ...state,
            currentProductId: action.product.id,
             products: updatedProducts,
             error: ''

        }
    }),
    on(ProductApiActions.updateProductFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error 
        }
    } ),
    on(ProductApiActions.createProductSuccess, (state, action): ProductState => {
        const createProduct = [...state.products, action.product]
        return {
            ...state,
            products: createProduct,
            error: '',
            currentProductId: action.product.id
        }
    }),
    on(ProductApiActions.createProductFailure, (state, action): ProductState =>{
        return {
            ...state,
            error: action.error
        }
    }),
    on(ProductApiActions.deleteProductSuccess, (state, action): ProductState => {
        const deleteProduct = state.products.filter(product => product.id !== action.productId )
        return {
            ...state,
            currentProductId: null,
            products: deleteProduct,
            error: ''
        }
    }),
    on(ProductApiActions.deleteProductFailure, (state, action): ProductState => {
        return {
            ...state,
            products: [],
            error: action.error
        }
    })
)