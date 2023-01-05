import {
    API
} from '../../config';
import axios from 'axios';
export const createCategory = async (userId, category) => {
    return await axios({
        url: `/api/category/create/${userId}`,
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
         
        },
    
            data: JSON.stringify(category)
        })
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
};

export const updateCategory = (categoryId, userId, token, category) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
            method: 'PUT',
            headers: {
                // content type?
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(category)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: product
        })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const getCategory = categoryId => {
    return fetch(`${API}/category/${categoryId}`, {
            method: 'GET'
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getCategories = () => {
    return fetch("/api/category/list", {
            method: 'GET'
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listOrders = (userId, token) => {
    return fetch(`${API}/order/list/${userId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getStatusValues = (userId, token) => {
    return fetch(`${API}/order/status-values/${userId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateOrderStatus = (userId, token, orderId, status) => {
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                status,
                orderId
            })
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

/**
 * to perform crud on product
 * get all products
 * get a single product
 * update single product
 * delete single product
 */

export const getProducts = () => {
    return fetch("/api/products/list", {
            method: 'GET'
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const getUsers = () => {
    return fetch("/api/users/all", {
            method: 'GET'
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteProduct = ( id, ) => {
    return fetch(`../api/products/delete/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                
            }
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const deleteUser = ( id, ) => {
    return fetch(`../api/users/delete/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                
            }
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getProduct = productId => {
    return fetch(`${API}/product/${productId}`, {
            method: 'GET'
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: product
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};