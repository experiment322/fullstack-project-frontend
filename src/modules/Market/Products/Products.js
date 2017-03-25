import { connect } from 'react-redux';
import { setQuery, setActivePage, openEditor, setPageSize } from './ProductsActions';
import ProductsView from './ProductsView';

function mapStateToProps(state, props) {
    const { location } = props;
    return {
        query: location.query.name || '',
        pageSize: Number(location.query.size) || 5,
        activePage: Number(location.query.page) || 1,
        suppliers: state.Suppliers.list,
        products: state.Products.list
    };
}

function mapDispatchToProps(dispatch, props) {
    const { location } = props;
    return {
        setQuery: function(query) {
            dispatch(setQuery(location, query));
        },
        setActivePage: function(page) {
            dispatch(setActivePage(location, page));
        },
        setPageSize: function(size) {
            dispatch(setPageSize(location, size));
        },
        openEditor: function(id) {
            dispatch(openEditor(location, id));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductsView);
