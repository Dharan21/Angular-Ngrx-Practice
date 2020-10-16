import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers/product.reducer';
import { addToCart } from 'src/app/store/actions/cart.actions';

@Component({
  selector: 'app-product-item',
  templateUrl: 'product-item.component.html'
})
export class ProductItemComponent {
  @Input() product: Product;
  @Input() index: number;

  constructor(
    private store: Store<{state: State}>
  ) { }

  onClick() {
    this.store.dispatch(addToCart({product: this.product}));
  }
}
