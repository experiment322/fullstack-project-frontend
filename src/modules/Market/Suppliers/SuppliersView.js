import React from 'react';
import { Well, Button } from 'react-bootstrap';
import { SupplierTable } from './SuppliersComponents';
import { SearchField, Paginator } from './../MarketComponents';

export default class SuppliersView extends React.Component {
    render() {
        const { children, filteredList, setQuery, query, pageSize, activePage, setActivePage, openEditor } = this.props;
        return (
            <Well>
                <SearchField onChange={setQuery} value={query} />
                <Button onClick={() => openEditor('new')}>NEW SUPPLIER</Button>
                <SupplierTable pageSize={pageSize} activePage={activePage} list={filteredList} onClickEdit={openEditor} />
                <Paginator itemCount={filteredList.length} pageSize={pageSize} activePage={activePage} onPageChange={setActivePage} />
                {children}
            </Well>
        );
    }
};
