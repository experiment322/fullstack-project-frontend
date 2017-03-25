import { createSupplier, updateSupplier, deleteSupplier } from './SupplierEditorResources';
import { push } from 'react-router-redux';


export function createSupplierAsync(data) {
    return {
        type: 'CREATE_SUPPLIER',
        payload: createSupplier(data)
    };
};

export function updateSupplierAsync(data) {
    return {
        type: 'UPDATE_SUPPLIER',
        payload: updateSupplier(data)
    };
};

export function deleteSupplierAsync(id) {
    return {
        type: 'DELETE_SUPPLIER',
        payload: deleteSupplier(id)
    };
};

export function closeEditor(location) {
    return push({
        pathname: '/suppliers',
        query: location.query
    });
};

export function didRefetchSuppliers() {
    return {
        type: 'DID_REFETCH_SUPPLIERS'
    };
};
