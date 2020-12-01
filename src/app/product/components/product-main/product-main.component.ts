import { Product } from 'src/app/shared/models/product.model';
import { tap, map, switchMap, mergeMap } from 'rxjs/operators';
import { State } from './../../../store/reducers/product.reducer';
import { Component, OnInit } from '@angular/core';
import { ProductApiService } from 'src/app/shared/services/product-api-call.service';
import { of, Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-product-main',
  templateUrl: 'product-main.component.html'
})
export class ProductMainComponent implements OnInit {
  productsSub: Subscription;
  constructor(
    private api: ProductApiService,
    private spinner: NgxSpinnerService,
    private store: Store<{ state: State }>
  ) { }

  ngOnInit() {
    this.store.select('state')
      .pipe(
        map((state: State) => {
          return state.products;
        }),
        switchMap((products: Product[]) => {
          if (products.length === 0) {
            return this.api.fetchProducts();
          } else {
            return of();
          }
        }))
      .subscribe();
  }
}
