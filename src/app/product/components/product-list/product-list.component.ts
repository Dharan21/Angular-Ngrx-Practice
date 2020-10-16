import { State } from './../../../store/reducers/product.reducer';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list.component.html'
})
export class ProductListComponent implements OnInit {
  products: Product[];

  constructor(
    private store: Store<{ state: State }>
  ) { }

  ngOnInit() {
    this.store.select('state').subscribe((state: State) => {
      this.products = state.products;
    });
  }
}
