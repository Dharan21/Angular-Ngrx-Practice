import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductApiService } from '../../services/product-api-call.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  apiSub: Subscription;

  constructor(
    private api: ProductApiService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {}

  onFetchData() {
    this.spinner.show();
    this.apiSub = this.api.fetchProducts().subscribe(() => {
      this.spinner.hide();
    });
  }

  ngOnDestroy() {
    this.apiSub.unsubscribe();
  }
}
