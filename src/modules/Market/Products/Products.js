import { connect } from 'react-redux';
import { setQuery, setActivePage } from './ProductsActions';
import { push } from 'react-router-redux';
import _ from 'lodash';
import ProductsView from './ProductsView';

function mapStateToProps(state, props) {
    return {
        query: state.Products.query,
        pageSize: state.Products.pageSize,
        activePage: state.Products.activePage,
        suppliers: state.Suppliers.list,
        filteredList: _.filter(state.Products.list, function(product) {
            return _.includes(product.name, state.Products.query);
        })
    };
}

function mapDispatchToProps(dispatch, props) {
    return {
        setQuery: function(query) {
            dispatch(setQuery(query));
        },
        setActivePage: function(page) {
            dispatch(setActivePage(page));
        },
        openEditor: function(id) {
            dispatch(push('/Products/' + id));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductsView);
