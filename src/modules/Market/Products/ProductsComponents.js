import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { CustomTable } from './../MarketComponents';
import _ from 'lodash';

export class ProductTable extends React.Component {
    static propTypes = {
        list: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        suppliers: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        activePage: React.PropTypes.number.isRequired,
        pageSize: React.PropTypes.number.isRequired,
        onClickEdit: React.PropTypes.func.isRequired
    };
    render() {
        const { list, suppliers, activePage, pageSize, onClickEdit } = this.props;
        const pageStartIndex = (activePage - 1) * pageSize;
        const page = list.slice(pageStartIndex, pageStartIndex + pageSize);
        const tableHeader = (
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>DESCRIPTION</th>
                <th>SUPPLIER</th>
                <th>QUANTITY</th>
                <th>PRICE</th>
            </tr>
        );
        const tableBody = page.map(function(product) {
            const supplier = _.find(suppliers, {id: product.supplierId});
            return (
                <tr key={product.id}>
                    <td>
                        <Button bsSize="xsmall" bsStyle="info" onClick={() => onClickEdit(product.id)}>
                            <Glyphicon glyph="edit" />{' '}<strong>{product.id}</strong>
                        </Button>
                    </td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{supplier.name}({supplier.id})</td>
                    <td>{product.quantity}</td>
                    <td>{product.price}</td>
                </tr>
            );
        });
        return (
            <CustomTable header={tableHeader} body={tableBody} />
        );
    }
};
