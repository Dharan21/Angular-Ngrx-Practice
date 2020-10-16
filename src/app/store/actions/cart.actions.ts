import { Product } from './../../shared/models/product.model';
import { createAction, props } from '@ngrx/store';

export const addToCart = createAction('[] AddToCart', props<{ product: Product }>());
export const removeSingleFromCart = createAction('[] RemoveSingleItemFromCart', props<{ product: Product }>());
export const removeFromCart = createAction('[] RemoveItemFromCart', props<{ product: Product }>());
