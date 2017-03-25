const initialState = {
    list: [],
    listError: false,
    listPending: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case 'GET_SUPPLIERS_PENDING': {
            return {
                ...initialState,
                listPending: true
            };
        }
        case 'GET_SUPPLIERS_FULFILLED': {
            return {
                ...initialState,
                list: action.payload.data.data
            };
        }
        case 'GET_SUPPLIERS_REJECTED': {
            return {
                ...initialState,
                listError: true
            };
        }
        default: {
            return state;
        }
    }
};
