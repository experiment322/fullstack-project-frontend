const initialState = {
    createError: false,
    createPending: false,
    updateError: false,
    updatePending: false,
    deleteError: false,
    deletePending: false,
    shouldRefetch: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case 'CREATE_PRODUCT_PENDING': {
            return {
                ...state,
                createPending: true,
                createError: false
            };
        }
        case 'CREATE_PRODUCT_FULFILLED': {
            return {
                ...state,
                createPending: false,
                shouldRefetch: true
            };
        }
        case 'CREATE_PRODUCT_REJECTED': {
            return {
                ...state,
                createPending: false,
                createError: true
            };
        }
        case 'UPDATE_PRODUCT_PENDING': {
            return {
                ...state,
                updatePending: true,
                updateError: false
            };
        }
        case 'UPDATE_PRODUCT_FULFILLED': {
            return {
                ...state,
                updatePending: false,
                shouldRefetch: true
            };
        }
        case 'UPDATE_PRODUCT_REJECTED': {
            return {
                ...state,
                updatePending: false,
                updateError: true
            };
        }
        case 'DELETE_PRODUCT_PENDING': {
            return {
                ...state,
                deletePending: true,
                deleteError: false
            };
        }
        case 'DELETE_PRODUCT_FULFILLED': {
            return {
                ...state,
                deletePending: false,
                shouldRefetch: true
            };
        }
        case 'DELETE_PRODUCT_REJECTED': {
            return {
                ...state,
                deletePending: false,
                deleteError: true
            };
        }
        case 'DID_REFETCH_PRODUCTS': {
            return {
                ...state,
                shouldRefetch: false
            };
        }
        default: {
            return state;
        }
    }
};
