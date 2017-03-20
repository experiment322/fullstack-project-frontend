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
        case 'PRODUCT_EDITOR_REQUEST_CREATE': {
            return {
                ...state,
                createPending: true,
                createError: false
            };
        }
        case 'PRODUCT_EDITOR_RECEIVE_CREATE': {
            return {
                ...state,
                createPending: false,
                shouldRefetch: true
            };
        }
        case 'PRODUCT_EDITOR_RECEIVE_CREATE_ERROR': {
            return {
                ...state,
                createPending: false,
                createError: true
            };
        }
        case 'PRODUCT_EDITOR_REQUEST_UPDATE': {
            return {
                ...state,
                updatePending: true,
                updateError: false
            };
        }
        case 'PRODUCT_EDITOR_RECEIVE_UPDATE': {
            return {
                ...state,
                updatePending: false,
                shouldRefetch: true
            };
        }
        case 'PRODUCT_EDITOR_RECEIVE_UPDATE_ERROR': {
            return {
                ...state,
                updatePending: false,
                updateError: true
            };
        }
        case 'PRODUCT_EDITOR_REQUEST_DELETE': {
            return {
                ...state,
                deletePending: true,
                deleteError: false
            };
        }
        case 'PRODUCT_EDITOR_RECEIVE_DELETE': {
            return {
                ...state,
                deletePending: false,
                shouldRefetch: true
            };
        }
        case 'PRODUCT_EDITOR_RECEIVE_DELETE_ERROR': {
            return {
                ...state,
                deletePending: false,
                deleteError: true
            };
        }
        case 'PRODUCT_EDITOR_DID_REFETCH': {
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
