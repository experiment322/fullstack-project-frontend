import {  getSuppliers } from './SuppliersResources';

export function requestList() {
    return {
        type: 'SUPPLIERS_REQUEST_LIST'
    };
};

export function receiveList(list) {
    return {
        type: 'SUPPLIERS_RECEIVE_LIST',
        payload: {
            list: list
        }
    };
};

export function receiveListError() {
    return {
        type: 'SUPPLIERS_RECEIVE_LIST_ERROR'
    };
};

export function getSuppliersAsync() {
    return function(dispatch, getState) {
        dispatch(requestList());
        getSuppliers().then(function(response) {
            dispatch(receiveList(response.data.data));
        }).catch(function(error) {
            dispatch(receiveListError());
        });
    };
};

export function setQuery(query) {
    return {
        type: 'SUPPLIERS_SET_QUERY',
        payload: {
            query: query
        }
    };
};

export function setActivePage(page) {
    return {
        type: 'SUPPLIERS_SET_ACTIVE_PAGE',
        payload: {
            page: page
        }
    };
};
