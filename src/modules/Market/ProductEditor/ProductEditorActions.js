import { createProduct, updateProduct, deleteProduct } from './ProductEditorResources';

export function requestCreate() {
    return {
        type: 'PRODUCT_EDITOR_REQUEST_CREATE'
    };
};

export function receiveCreate(data) {
    return {
        type: 'PRODUCT_EDITOR_RECEIVE_CREATE'
    };
};

export function receiveCreateError() {
    return {
        type: 'PRODUCT_EDITOR_RECEIVE_CREATE_ERROR'
    };
};

export function createProductAsync(data) {
    return function(dispatch, getState) {
        dispatch(requestCreate());
        createProduct(data).then(function(response) {
            dispatch(receiveCreate());
        }).catch(function(error) {
            dispatch(receiveCreateError());
        });
    };
};

export function requestUpdate() {
    return {
        type: 'PRODUCT_EDITOR_REQUEST_UPDATE'
    };
};

export function receiveUpdate(data) {
    return {
        type: 'PRODUCT_EDITOR_RECEIVE_UPDATE'
    };
};

export function receiveUpdateError() {
    return {
        type: 'PRODUCT_EDITOR_RECEIVE_UPDATE_ERROR'
    };
};

export function updateProductAsync(data) {
    return function(dispatch, getState) {
        dispatch(requestUpdate());
        updateProduct(data).then(function(response) {
            dispatch(receiveUpdate());
        }).catch(function(error) {
            dispatch(receiveUpdateError());
        });
    };
};

export function requestDelete() {
    return {
        type: 'PRODUCT_EDITOR_REQUEST_DELETE'
    };
};

export function receiveDelete() {
    return {
        type: 'PRODUCT_EDITOR_RECEIVE_DELETE'
    };
};

export function receiveDeleteError() {
    return {
        type: 'PRODUCT_EDITOR_RECEIVE_DELETE_ERROR'
    };
};

export function deleteProductAsync(id) {
    return function(dispatch, getState) {
        dispatch(requestDelete());
        deleteProduct(id).then(function(response) {
            dispatch(receiveDelete());
        }).catch(function(error) {
            dispatch(receiveDeleteError());
        });
    };
};

export function didRefetchProducts() {
    return {
        type: 'PRODUCT_EDITOR_DID_REFETCH'
    };
};
