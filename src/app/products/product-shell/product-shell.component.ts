import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Product } from '../product';
import { Store } from '@ngrx/store';
import { State, getCurrentProduct, getError, getProducts, getShowProductCode } from '../state';
import { ProductPageActions } from '../state/actions';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  templateUrl: './product-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductShellComponent implements OnInit {

  products$: Observable<Product[]>;
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;
  selectedProduct$: Observable<Product | null>;
  productForm: FormGroup;


  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.store.dispatch(ProductPageActions.loadProducts());
    
    // Do NOT subscribe here because it uses an async pipe
    // This gets the initial values until the load is complete.
    this.products$ = this.store.select(getProducts);

    // Do NOT subscribe here because it uses an async pipe
    this.errorMessage$ = this.store.select(getError);

    // Do NOT subscribe here because it uses an async pipe
    this.selectedProduct$ = this.store.select((getCurrentProduct));

    // Do NOT subscribe here because it uses an async pipe
    this.displayCode$ = this.store.select(getShowProductCode);

    // this.product$ = this.store.select(getCurrentProduct).pipe(tap(
    //   currentProduct => this.displayProduct(currentProduct)
    // ));
  }

  checkChanged(): void {
    this.store.dispatch(ProductPageActions.toggleProductCode())
  }

  newProduct(): void {
    this.store.dispatch(ProductPageActions.initializeCurrentProduct())
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductPageActions.setCurrentProduct({ currentProductId: product.id }))
  }

  deleteProduct(product: Product): void {
    this.store.dispatch(ProductPageActions.deleteProduct({ productId: product.id }))
  }

  clearProduct(): void {
    this.store.dispatch(ProductPageActions.clearCurrentProduct())
  }

  createProduct(product: Product): void {
    this.store.dispatch(ProductPageActions.createProduct({ product: product }))
  }

  updateProduct(product: Product): void {
    this.store.dispatch(ProductPageActions.updateProduct({ product }))
  }
  
}
