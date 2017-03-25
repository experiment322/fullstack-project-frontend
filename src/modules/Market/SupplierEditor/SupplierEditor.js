import { connect } from 'react-redux';
import { createSupplierAsync, updateSupplierAsync, deleteSupplierAsync, closeEditor } from './SupplierEditorActions';
import _ from 'lodash';
import SupplierEditorView from './SupplierEditorView';

function mapStateToProps(state, props) {
    return {
        supplier: _.find(state.Suppliers.list, {id: Number(props.params.id)}),
        actionPending: state.SupplierEditor.createPending || state.SupplierEditor.updatePending || state.SupplierEditor.deletePending,
        actionError: state.SupplierEditor.createError || state.SupplierEditor.updateError || state.SupplierEditor.deleteError
    };
}

function mapDispatchToProps(dispatch, props) {
    const { location } = props;
    return {
        createSupplier: function(supplier) {
            dispatch(createSupplierAsync(supplier));
        },
        updateSupplier: function(supplier) {
            dispatch(updateSupplierAsync(supplier));
        },
        deleteSupplier: function(supplierId) {
            dispatch(deleteSupplierAsync(supplierId));
        },
        closeEditor: function() {
            dispatch(closeEditor(location));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SupplierEditorView);
