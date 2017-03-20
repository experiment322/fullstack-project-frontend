import React from 'react';
import { Well, Button } from 'react-bootstrap';
import { ProductTable } from './ProductsComponents';
import { SearchField, Paginator } from './../MarketComponents';

export default class ProductsView extends React.Component {
    render() {
        const { children, suppliers, filteredList, setQuery, query, pageSize, activePage, setActivePage, openEditor } = this.props;
        return (
            <Well>
                <SearchField onChange={setQuery} value={query} />
                <Button onClick={() => openEditor('new')}>NEW PRODUCT</Button>
                <ProductTable pageSize={pageSize} activePage={activePage} list={filteredList} onClickEdit={openEditor} suppliers={suppliers} />
                <Paginator itemCount={filteredList.length} pageSize={pageSize} activePage={activePage} onPageChange={setActivePage} />
                {children}
            </Well>
        );
    }
};
