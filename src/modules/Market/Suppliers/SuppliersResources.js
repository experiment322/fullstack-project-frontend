import axios from 'axios';

export function getSuppliers() {
    return axios({
        method: 'GET',
        url: '/api/supplier/list'
    });
};

