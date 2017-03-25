import { getProducts } from './ProductsResources';
import { push, replace } from 'react-router-redux';

export function getProductsAsync() {
    return {
        type: 'GET_PRODUCTS',
        payload: getProducts()
    };
};

export function setQuery(location, query) {
    return replace({
        pathname: location.pathname,
        query: {
            ...location.query,
            page: 1,
            name: query.toLowerCase()
        }
    });
};

export function setActivePage(location, page) {
    return replace({
        pathname: location.pathname,
        query: {
            ...location.query,
            page: page
        }
    });
};

export function setPageSize(location, size) {
    return replace({
        pathname: location.pathname,
        query: {
            ...location.query,
            page: 1,
            size: size
        }
    });
};

export function openEditor(location, id) {
    return push({
        pathname: '/products/' + id,
        query: location.query
    });
};
