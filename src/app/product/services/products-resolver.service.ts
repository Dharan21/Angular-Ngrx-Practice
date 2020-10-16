import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Product } from 'src/app/shared/models/product.model';
import { ProductApiService } from 'src/app/shared/services/product-api-call.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers/product.reducer';
import { take, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductsResolver implements Resolve<Product[]> {

  constructor(
    private api: ProductApiService,
    private store: Store<{state: State}>
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.select('state').pipe(take(1))
    .subscribe((storeState: State) => {
      if (storeState.products.length === 0) {
        return this.api.fetchProducts();
      }
    });
    return null;
  }
}
