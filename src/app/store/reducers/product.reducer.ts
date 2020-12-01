import { initializeProducts, addProduct , updateProduct } from './../actions/product.actions';
import { addToCart , removeFromCart, removeSingleFromCart } from './../actions/cart.actions';
import { Product } from './../../shared/models/product.model';
import { createReducer, on, Action } from '@ngrx/store';

export interface State {
    products: Product[];
    cartItems: Product[];
}

const initialState: State = { products: [], cartItems: [] };

const productReducre = createReducer(
    initialState,
    on(initializeProducts, (state: State, {products}) => ({products})),
    on(addProduct, (state: State, {product}) => ({ ...state, products: [ ...state.products, product ] })),
    on(updateProduct, (state: State, {index, newProduct}) => {
        const newProducts = [...state.products];
        const newCartItems = state.cartItems ? [...state.cartItems] : [];
        newProducts[index] = newProduct;
        const cartIndex = newCartItems.findIndex(x => x.id === newProduct.id);
        // if (cartIndex !== -1) {
        //     const c = 
        // } 
        return { ...state, products: newProducts};
     }),
    on(addToCart, (state: State, {product}) => {
        const newProducts = state.products ? [...state.products] : [];
        const newCartItems = state.cartItems ? [...state.cartItems] : [];
        // reduce one quantity from products
        const productIndex = newProducts.findIndex(x => x.id === product.id);
        if (productIndex !== -1) {
            const p = {...newProducts[productIndex]};
            p.quantity -= 1;
            newProducts[productIndex] = p;
        }
        // add product to cart
        const checkInCart = newCartItems.findIndex(x => x.id === product.id);
        if (checkInCart !== -1) {
            const c = {...newCartItems[checkInCart]};
            c.quantity += 1;
            newCartItems[checkInCart] = c;
        } else {
            const p = {...product};
            p.quantity = 1;
            newCartItems.push(p);
        }
        return { products: newProducts, cartItems: newCartItems };
    }),
    on(removeSingleFromCart, (state: State, {product}) => {
        const newProducts = state.products ? [...state.products] : [];
        const newCartItems = state.cartItems ? [...state.cartItems] : [];
        // remove single quantity from cart
        const cartIndex = newCartItems.findIndex(x => x.id === product.id);
        if (cartIndex !== -1) {
            const c = {...newCartItems[cartIndex]};
            c.quantity -= 1;
            if (c.quantity === 0) {
                newCartItems.splice(cartIndex, 1);
            } else {
                newCartItems[cartIndex] = c;
            }
        }
        // add removed quantity to products
        const productIndex = newProducts.findIndex(x => x.id === product.id);
        if (productIndex !== -1) {
            const p = {...newProducts[productIndex]};
            p.quantity += 1;
            newProducts[productIndex] = p;
        }
        return { products: newProducts, cartItems: newCartItems };
    }),
    on(removeFromCart, (state: State, {product}) => {
        const newProducts = state.products ? [...state.products] : [];
        const newCartItems = state.cartItems ? [...state.cartItems] : [];
         // remove item from cart
        const cartIndex = newCartItems.findIndex(x => x.id === product.id);
        if (cartIndex !== -1) {
            newCartItems.splice(cartIndex, 1);
        }
        // add removed quantity to products
        const productIndex = newProducts.findIndex(x => x.id === product.id);
        if (productIndex !== -1) {
            const p = {...newProducts[productIndex]};
            p.quantity += product.quantity;
            newProducts[productIndex] = p;
        }
        return { products: newProducts, cartItems: newCartItems };
    })
);

export function reducer(state: State, action: Action) {
    return productReducre(state, action);
}
