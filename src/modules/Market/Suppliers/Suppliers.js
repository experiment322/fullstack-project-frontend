import { connect } from 'react-redux';
import { setQuery, setActivePage, setPageSize, openEditor } from './SuppliersActions';
import SuppliersView from './SuppliersView';

function mapStateToProps(state, props) {
    const { location } = props;
    return {
        query: location.query.name || '',
        pageSize: Number(location.query.size) || 5,
        activePage: Number(location.query.page) || 1,
        suppliers: state.Suppliers.list
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
)(SuppliersView);
