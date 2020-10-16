import { Product } from './../../../shared/models/product.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers/product.reducer';
import { addProduct, updateProduct } from 'src/app/store/actions/product.actions';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  index: number;
  editMode = false;
  productForm: FormGroup;
  product: Product;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{ state: State }>
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.index = +params['id'];
      this.editMode = params['id'] != null;
      this.store.select('state').subscribe((state: State) => {
        this.product = state.products[this.index];
        this.initForm();
      });
      this.initForm();
    });
  }

  onSubmit() {
    const product = this.productForm.value;
    product.id = Math.random() * 100000 + 1;
    if (this.editMode) {
      this.store.dispatch(updateProduct({index: this.index, newProduct: product}));
    } else {
      this.store.dispatch(addProduct({product}));
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/products']);
  }

  private initForm() {
    let name = '';
    let image = '';
    let cost: number;
    let quantity: number;
    if (this.editMode && this.product) {
      name = this.product.name;
      image = this.product.image;
      cost = this.product.cost;
      quantity = this.product.quantity;
    }
    this.productForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      image: new FormControl(image, Validators.required),
      cost: new FormControl(cost, Validators.required),
      quantity: new FormControl(quantity, Validators.required),
    });
  }
}
