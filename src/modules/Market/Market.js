import { connect } from 'react-redux';
import { getProductsAsync } from './Products/ProductsActions';
import { getSuppliersAsync } from './Suppliers/SuppliersActions';
import { didRefetchSuppliers } from './SupplierEditor/SupplierEditorActions';
import { didRefetchProducts } from './ProductEditor/ProductEditorActions';
import MarketView from './MarketView';

function mapStateToProps(state, props) {
    return {
        dataError: state.Products.listError || state.Suppliers.listError,
        dataPending: state.Products.listPending || state.Suppliers.listPending,
        shouldRefetchData: state.SupplierEditor.shouldRefetch || state.ProductEditor.shouldRefetch
    };
}

function mapDispatchToProps(dispatch, props) {
    return {
        fetchData: function() {
            dispatch(getProductsAsync());
            dispatch(getSuppliersAsync());
        },
        refetchData: function() {
            dispatch(getSuppliersAsync());
            dispatch(getProductsAsync());
            dispatch(didRefetchSuppliers());
            dispatch(didRefetchProducts());
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MarketView);
