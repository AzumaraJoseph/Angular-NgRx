import { Injectable } from "@angular/core";
import { ProductService } from "../product.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductApiActions, ProductPageActions } from "./actions";
import { catchError, concatMap, map, mergeMap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class ProductEffect {
    constructor(private actions$: Actions, private productservice: ProductService) { }

    loadProducts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductPageActions.loadProducts),
            mergeMap(() => this.productservice.getProducts().pipe(
                map(products => ProductApiActions.loadProductsSuccess({products: products})),
                catchError(error => of(ProductApiActions.loadProductsFailure({ error: error })))
            ))
            
        )
    })

    updateProduct$ = createEffect( () => {
        return this.actions$.pipe(
            ofType(ProductPageActions.updateProduct),
            concatMap(action => this.productservice.updateProduct(action.product).pipe(
                map(product => ProductApiActions.updateProductSuccess({ product: product })),
                catchError(error => of(ProductApiActions.updateProductFailure({ error: error })))
            ))
        )
    })

    createNewProduct$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductPageActions.createProduct),
            concatMap((action) => this.productservice.createProduct(action.product).pipe(
                map(product => ProductApiActions.createProductSuccess({ product })),
                catchError(error => of(ProductApiActions.createProductFailure({ error })))
            ))
        )
    })

    deleteProduct$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductPageActions.deleteProduct),
            concatMap(action => this.productservice.deleteProduct(action.productId).pipe(
                map(() => ProductApiActions.deleteProductSuccess({ productId: action.productId })),
                catchError(error => of(ProductApiActions.deleteProductFailure({ error: error })))
            ))
        )
    });
    
}