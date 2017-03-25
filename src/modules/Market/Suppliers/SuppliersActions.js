import { getSuppliers } from './SuppliersResources';
import { push, replace } from 'react-router-redux';

export function getSuppliersAsync() {
    return {
        type: 'GET_SUPPLIERS',
        payload: getSuppliers()
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
        pathname: '/suppliers/' + id,
        query: location.query
    });
};
