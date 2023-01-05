import React from "react";
import { createContext, useReducer } from "react";


export const Store = createContext();

const initialState = {
    filteredProducts: [],
    products: [],
    minPrice: null,
    maxPrice: null,
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    },
    wish: {
        wishItems: localStorage.getItem('wishItems') ? JSON.parse(localStorage.getItem('wishItems')) : [], //empty wish default
    }
};

function reducer(state, action) {
    switch (action.type) {
        case 'CART_ADD_ITEM': {
            
            //add to cart
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find((item) => item._id === newItem._id);
            const cartItems = existItem ? state.cart.cartItems.map((item) => item._id === existItem._id ? newItem : item) : [...state.cart.cartItems, newItem];
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return { ...state, cart: { ...state.cart, cartItems } };
        }

        case 'WISH_ADD_ITEM': {
            //add to wish
            const newItem = action.payload;
            const existItem = state.wish.wishItems.find((item) => item._id === newItem._id);
            const wishItems = existItem ? state.wish.wishItems.map((item) => item._id === existItem._id ? newItem : item) : [...state.wish.wishItems, newItem];
            localStorage.setItem('wishItems', JSON.stringify(wishItems));
            return {...state, wish: {...state.wish, wishItems: [...state.wish.wishItems, action.payload]}};
            }

        case 'CART_REMOVE_ITEM': {
            const cartItems = state.cart.cartItems.filter((item) => item._id !== action.payload._id);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return { ...state, cart: { ...state.cart, cartItems } };
        }

        case 'CART_CLEAR':
            return { ...state, cart: { ...state.cart, cartItems: [] } };

        case 'WISH_REMOVE_ITEM': {
            const wishItems = state.wish.wishItems.filter((item) => item._id !== action.payload._id);
            localStorage.setItem('wishItems', JSON.stringify(wishItems));
            return { ...state, wish: { ...state.wish, wishItems } };
        }

        case 'SORT_PRODUCTS': {
            const { products, sort } = action.payload;
            let tempProducts = [];
            if (sort === "latest") {
              tempProducts = products;
            }
      
            if (sort === "lowest-price") {
              tempProducts = products.slice().sort((a, b) => {
                return a.price - b.price;
              });
            }
      
            if (sort === "highest-price") {
              tempProducts = products.slice().sort((a, b) => {
                return b.price - a.price;
              });
            }
      
            if (sort === "a-z") {
              tempProducts = products.slice().sort((a, b) => {
                return a.name.localeCompare(b.name);
              });
            }
            if (sort === "z-a") {
              tempProducts = products.slice().sort((a, b) => {
                return b.name.localeCompare(a.name);
              });
            }
      
            state.filteredProducts = tempProducts;
        }
        case 'STORE_PRODUCTS': {
            state.products = action.payload.products;
        }
        case 'GET_PRICE_RANGE': {
            const { products } = action.payload;
            const array = [];
            products.map((product) => {
              const price = product.price;
              return array.push(price);
            });
            const max = Math.max(...array);
            const min = Math.min(...array);
      
            state.minPrice = min;
            state.maxPrice = max;
        }

        default:
            return state;
    }
}

export function StoreProvider(props) {
    const[state, dispatch] = useReducer(reducer, initialState);
    const value = {state, dispatch};

    return <Store.Provider value={value}>{props.children}</Store.Provider>


}