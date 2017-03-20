import { getProducts } from './ProductsResources';

export function requestList() {
    return {
        type: 'PRODUCTS_REQUEST_LIST'
    };
};

export function receiveList(list) {
    return {
        type: 'PRODUCTS_RECEIVE_LIST',
        payload: {
            list: list
        }
    };
};

export function receiveListError() {
    return {
        type: 'PRODUCTS_RECEIVE_LIST_ERROR'
    };
};

export function getProductsAsync() {
    return function(dispatch, getState) {
        dispatch(requestList());
        getProducts().then(function(response) {
            dispatch(receiveList(response.data.data));
        }).catch(function(error) {
            dispatch(receiveListError());
        });
    };
};

export function setQuery(query) {
    return {
        type: 'PRODUCTS_SET_QUERY',
        payload: {
            query: query
        }
    };
};

export function setActivePage(page) {
    return {
        type: 'PRODUCTS_SET_ACTIVE_PAGE',
        payload: {
            page: page
        }
    };
};
