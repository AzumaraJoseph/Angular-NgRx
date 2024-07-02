import { createAction, props } from "@ngrx/store";
import { Product } from "../../product";

export const loadProductsSuccess = createAction(
    '[Product Api] Load Success',
    props<{products: Product[]}>()
)

export const loadProductsFailure = createAction(
    '[Product Api] Load Failure',
    props<{ error: string }>()
)

export const updateProductSuccess = createAction(
    '[Product Api] Update Product Success',
    props<{ product: Product }>()
)

export const updateProductFailure = createAction(
    '[Product Api] Update Product Success',
    props<{ error: string }>()
)

export const createProductSuccess = createAction(
    '[Product Api] New Product Success',
    props<{ product: Product }>()
)

export const createProductFailure = createAction(
    '[Product Api] New Product Failure',
    props<{ error: string }>()
)

export const deleteProductSuccess = createAction(
    '[Product Api] Delete Product Success',
    props<{ productId: number }>()
)

export const deleteProductFailure = createAction(
    '[Product Api] Delete Product Failure',
    props<{ error: string }>()
)
