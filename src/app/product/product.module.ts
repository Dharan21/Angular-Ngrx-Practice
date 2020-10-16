import { NgModule } from '@angular/core';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductMainComponent } from './components/product-main/product-main.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ProductsResolver } from './services/products-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ProductMainComponent,
    children: [
      { path: '', redirectTo: 'new', pathMatch: 'full' },
      { path: 'new', component: ProductEditComponent },
      { path: ':id/edit', component: ProductEditComponent ,resolve: [ProductsResolver] },
    ],
  },
];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductItemComponent,
    ProductMainComponent,
    ProductEditComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class ProductModule { }
