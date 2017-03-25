import React from 'react';
import _ from 'lodash';
import { Well, Button } from 'react-bootstrap';
import { ProductTable } from './ProductsComponents';
import { SearchField, Paginator, PageResizer } from './../MarketComponents';

export default class ProductsView extends React.Component {
    render() {
        const { children, suppliers, products, setQuery, query, pageSize, activePage, setActivePage, openEditor, setPageSize } = this.props;
        const filteredProducts = _.filter(products, function(product) {
            return _.includes(product.name.toLowerCase(), query);
        });
        return (
            <Well>
                <SearchField onChange={setQuery} value={query} />
                <Button bsStyle="primary" onClick={() => openEditor('new')}>NEW PRODUCT</Button>
                <PageResizer pageSize={pageSize} onSizeChange={setPageSize} />
                <ProductTable pageSize={pageSize} activePage={activePage} suppliers={suppliers} products={filteredProducts} onClickEdit={openEditor} />
                <Paginator itemCount={filteredProducts.length} pageSize={pageSize} activePage={activePage} onPageChange={setActivePage} />
                {children}
            </Well>
        );
    }
};
