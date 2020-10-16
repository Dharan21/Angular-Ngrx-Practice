import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers/product.reducer';
import { removeSingleFromCart, removeFromCart } from 'src/app/store/actions/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.component.html',
})
export class CartComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private store: Store<{state: State}>
  ) { }

  ngOnInit() {
    this.store.select('state').subscribe((state: State) => {
      this.products = state.cartItems;
    });
  }

  onRemoveSingleQuantity(product: Product) {
    this.store.dispatch(removeSingleFromCart({product}));
  }

  onRemoveFromCart(product: Product) {
    this.store.dispatch(removeFromCart({product}));
  }
}
