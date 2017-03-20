import { connect } from 'react-redux';
import _ from 'lodash';
import LatestView from './LatestView';

function mapStateToProps(state, props) {
    return {
        latestSuppliers: _.take(_.orderBy(state.Suppliers.list, 'id', 'desc'), 3),
        latestProducts: _.take(_.orderBy(state.Products.list, 'id', 'desc'), 3)
    };
}

function mapDispatchToProps(dispatch, props) {
    return {
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LatestView);
