import { createProduct, updateProduct, deleteProduct } from './ProductEditorResources';
import { push } from 'react-router-redux';

export function createProductAsync(data) {
    return {
        type: 'CREATE_PRODUCT',
        payload: createProduct(data)
    };
};

export function updateProductAsync(data) {
    return {
        type: 'UPDATE_PRODUCT',
        payload: updateProduct(data)
    };
};

export function deleteProductAsync(id) {
    return {
        type: 'DELETE_PRODUCT',
        payload: deleteProduct(id)
    };
};

export function closeEditor(location) {
    return push({
        pathname: '/products',
        query: location.query
    });
};


export function didRefetchProducts() {
    return {
        type: 'DID_REFETCH_PRODUCTS'
    };
};
