import { connect } from 'react-redux';
import { createProductAsync, updateProductAsync, deleteProductAsync } from './ProductEditorActions';
import { push } from 'react-router-redux';
import _ from 'lodash';
import ProductEditorView from './ProductEditorView';

function mapStateToProps(state, props) {
    return {
        product: _.find(state.Products.list, {id: Number(props.params.id)}),
        suppliers: state.Suppliers.list,
        actionPending: state.ProductEditor.createPending || state.ProductEditor.updatePending || state.ProductEditor.deletePending,
        actionError: state.ProductEditor.createError || state.ProductEditor.updateError || state.ProductEditor.deleteError
    };
}

function mapDispatchToProps(dispatch, props) {
    return {
        createProduct: function(product) {
            dispatch(createProductAsync(product));
        },
        updateProduct: function(product) {
            dispatch(updateProductAsync(product));
        },
        deleteProduct: function(productId) {
            dispatch(deleteProductAsync(productId));
        },
        closeEditor: function() {
            dispatch(push('/products'));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductEditorView);
