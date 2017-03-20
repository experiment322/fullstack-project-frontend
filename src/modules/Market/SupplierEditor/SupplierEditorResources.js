import axios from 'axios';

export function createSupplier(supplierData) {
    return axios({
        method: 'POST',
        url: '/api/supplier/create',
        data: supplierData
    });
};

export function updateSupplier(supplierData) {
    return axios({
        method: 'PUT',
        url: '/api/supplier/update',
        data: supplierData
    });
};

export function deleteSupplier(supplierId) {
    return axios({
        method: 'DELETE',
        url: '/api/supplier/delete/' + supplierId
    });
};
