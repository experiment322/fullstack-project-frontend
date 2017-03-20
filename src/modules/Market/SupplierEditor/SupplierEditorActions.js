import { createSupplier, updateSupplier, deleteSupplier } from './SupplierEditorResources';

export function requestCreate() {
    return {
        type: 'SUPPLIER_EDITOR_REQUEST_CREATE'
    };
};

export function receiveCreate(data) {
    return {
        type: 'SUPPLIER_EDITOR_RECEIVE_CREATE'
    };
};

export function receiveCreateError() {
    return {
        type: 'SUPPLIER_EDITOR_RECEIVE_CREATE_ERROR'
    };
};

export function createSupplierAsync(data) {
    return function(dispatch, getState) {
        dispatch(requestCreate());
        createSupplier(data).then(function(response) {
            dispatch(receiveCreate());
        }).catch(function(error) {
            dispatch(receiveCreateError());
        });
    };
};

export function requestUpdate() {
    return {
        type: 'SUPPLIER_EDITOR_REQUEST_UPDATE'
    };
};

export function receiveUpdate(data) {
    return {
        type: 'SUPPLIER_EDITOR_RECEIVE_UPDATE'
    };
};

export function receiveUpdateError() {
    return {
        type: 'SUPPLIER_EDITOR_RECEIVE_UPDATE_ERROR'
    };
};

export function updateSupplierAsync(data) {
    return function(dispatch, getState) {
        dispatch(requestUpdate());
        updateSupplier(data).then(function(response) {
            dispatch(receiveUpdate());
        }).catch(function(error) {
            dispatch(receiveUpdateError());
        });
    };
};

export function requestDelete() {
    return {
        type: 'SUPPLIER_EDITOR_REQUEST_DELETE'
    };
};

export function receiveDelete() {
    return {
        type: 'SUPPLIER_EDITOR_RECEIVE_DELETE'
    };
};

export function receiveDeleteError() {
    return {
        type: 'SUPPLIER_EDITOR_RECEIVE_DELETE_ERROR'
    };
};

export function deleteSupplierAsync(id) {
    return function(dispatch, getState) {
        dispatch(requestDelete());
        deleteSupplier(id).then(function(response) {
            dispatch(receiveDelete());
        }).catch(function(error) {
            dispatch(receiveDeleteError());
        });
    };
};

export function didRefetchSuppliers() {
    return {
        type: 'SUPPLIER_EDITOR_DID_REFETCH'
    };
};
