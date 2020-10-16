import { State } from './../../../store/reducers/product.reducer';
import { Component, OnInit } from '@angular/core';
import { ProductApiService } from 'src/app/shared/services/product-api-call.service';
import { Subscription } from 'rxjs';
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
    this.store.select('state').subscribe((state: State) => {
      if (state.products.length === 0) {
        this.spinner.show();
        this.productsSub = this.api.fetchProducts().subscribe(
          () => {
            this.spinner.hide();
          },
          () => {
            this.spinner.hide();
          }
        );
      }
    });
  }
}
