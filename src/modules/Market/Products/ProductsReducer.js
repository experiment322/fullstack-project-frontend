const initialState = {
    list: [],
    query: '',
    pageSize: 5,
    activePage: 1,
    listError: false,
    listPending: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case 'PRODUCTS_REQUEST_LIST': {
            return {
                ...initialState,
                listPending: true
            };
        }
        case 'PRODUCTS_RECEIVE_LIST': {
            return {
                ...state,
                listPending: false,
                list: action.payload.list
            };
        }
        case 'PRODUCTS_RECEIVE_LIST_ERROR': {
            return {
                ...state,
                listPending: false,
                listError: true
            };
        }
        case 'PRODUCTS_SET_QUERY': {
            return {
                ...state,
                query: action.payload.query,
                activePage: initialState.activePage
            };
        }
        case 'PRODUCTS_SET_ACTIVE_PAGE': {
            return {
                ...state,
                activePage: action.payload.page
            };
        }
        default: {
            return state;
        }
    }
};
