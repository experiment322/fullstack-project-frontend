import axios from 'axios';

export function createProduct(productData) {
    return axios({
        method: 'POST',
        url: '/api/product/create',
        data: productData
    });
};

export function updateProduct(productData) {
    return axios({
        method: 'PUT',
        url: '/api/product/update',
        data: productData
    });
};

export function deleteProduct(productId) {
    return axios({
        method: 'DELETE',
        url: '/api/product/delete/' + productId
    });
};
