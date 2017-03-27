import React from 'react';
import _ from 'lodash';
import { Well, Button } from 'react-bootstrap';
import { SupplierTable } from './SuppliersComponents';
import { SearchField, Paginator, PageResizer } from './../MarketComponents';

export default class SuppliersView extends React.Component {
    render() {
        const { suppliers, setQuery, query, pageSize, activePage, setActivePage, openEditor, setPageSize } = this.props;
        const filteredSuppliers = _.filter(suppliers, function(supplier) {
            return _.includes(supplier.name.toLowerCase(), query);
        });
        return (
            <Well>
                <SearchField onChange={setQuery} value={query} />
                <Button bsStyle="primary" onClick={() => openEditor('new')}>NEW SUPPLIER</Button>
                <PageResizer pageSize={pageSize} onSizeChange={setPageSize} />
                <SupplierTable pageSize={pageSize} activePage={activePage} suppliers={filteredSuppliers} onClickEdit={openEditor} />
                <Paginator itemCount={filteredSuppliers.length} pageSize={pageSize} activePage={activePage} onPageChange={setActivePage} />
            </Well>
        );
    }
};
