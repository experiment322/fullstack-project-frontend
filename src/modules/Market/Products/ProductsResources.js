import axios from 'axios';

export function getProducts() {
    return axios({
        method: 'GET',
        url: '/api/product/list'
    });
};
