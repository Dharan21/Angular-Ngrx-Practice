import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { State } from 'src/app/store/reducers/product.reducer';

@Component({
  selector: 'app-cart-invoice',
  templateUrl: 'cart-invoice.component.html'
})
export class CartInvoiceComponent implements OnInit {
  products: Product[] = [];
  subTotal = 0;
  discount = 0;
  vat = 0;
  total = 0;

  constructor(
    private store: Store<{state: State}>
  ) { }

  ngOnInit() {
    this.store.select('state').subscribe((state: State) => {
      this.products = state.cartItems;
      this.calculateInvoiceDetails();
    });
  }

  calculateInvoiceDetails() {
    this.subTotal = 0;
    if (this.products && this.products.length > 0) {
      this.products.forEach(product => {
        this.subTotal += product.cost * product.quantity;
      });
      this.discount = this.subTotal * 0.2;
      this.vat = this.subTotal * 0.1;
      this.total = this.subTotal - this.discount + this.vat;
    }
  }
}
