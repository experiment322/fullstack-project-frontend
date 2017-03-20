import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { CustomTable } from './../MarketComponents';
import _ from 'lodash';

export class SupplierTable extends React.Component {
    static propTypes = {
        list: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        activePage: React.PropTypes.number.isRequired,
        pageSize: React.PropTypes.number.isRequired,
        onClickEdit: React.PropTypes.func.isRequired
    };
    render() {
        const { list, activePage, pageSize, onClickEdit } = this.props;
        const pageStartIndex = (activePage - 1) * pageSize;
        const page = list.slice(pageStartIndex, pageStartIndex + pageSize);
        const tableHeader = (
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>ADDRESS</th>
            </tr>
        );
        const tableBody = page.map(function(supplier, index) {
            return (
                <tr key={supplier.id}>
                    <td>
                        <Button bsSize="xsmall" bsStyle="info" onClick={() => onClickEdit(supplier.id)}>
                            <Glyphicon glyph="edit" />{' '}<strong>{supplier.id}</strong>
                        </Button>
                    </td>
                    <td>{supplier.name}</td>
                    <td>{supplier.address}</td>
                </tr>
            );
        });
        return (
            <CustomTable header={tableHeader} body={tableBody}/>
        );
    }
};
