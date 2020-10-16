import { Product } from './../../shared/models/product.model';
import { createAction, props } from '@ngrx/store';

export const initializeProducts = createAction('[] Initialize', props<{ products: Product[]}>());
export const addProduct = createAction('[] AddProduct', props<{ product: Product }>());
export const updateProduct = createAction('[] UpdateProduct', props<{ index: number, newProduct: Product}>());
