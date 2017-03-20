import { connect } from 'react-redux';
import { setQuery, setActivePage } from './SuppliersActions';
import { push } from 'react-router-redux';
import _ from 'lodash';
import SuppliersView from './SuppliersView';

function mapStateToProps(state, props) {
    return {
        query: state.Suppliers.query,
        pageSize: state.Suppliers.pageSize,
        activePage: state.Suppliers.activePage,
        filteredList: _.filter(state.Suppliers.list, function(supplier) {
            return _.includes(supplier.name, state.Suppliers.query);
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
            dispatch(push('/suppliers/' + id));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SuppliersView);
