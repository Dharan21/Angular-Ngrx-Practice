import { State } from './../../store/reducers/product.reducer';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { Product } from '../models/product.model';
import { Store } from '@ngrx/store';
import { initializeProducts } from 'src/app/store/actions/product.actions';

@Injectable({ providedIn: 'root' })
export class ProductApiService {

  constructor(
    private http: HttpClient,
    private store: Store<{ state: State }>
  ) { }

  fetchProducts() {
    return this.http
      .get<Product[]>('https://shopping-cart-f21f6.firebaseio.com/products.json')
      .pipe(
        tap(products => {
          this.store.dispatch(initializeProducts({products}));
        })
      );
  }
}
