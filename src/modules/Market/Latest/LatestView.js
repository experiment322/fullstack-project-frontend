import React from 'react';
import { Well, Label } from 'react-bootstrap';
import { CompactTable } from './LatestComponents';

export default class LatestView extends React.Component {
    render() {
        const { latestProducts, latestSuppliers } = this.props;
        return (
            <Well>
                <h3><Label>Latest products</Label></h3>
                <CompactTable list={latestProducts} />
                <h3><Label>Latest suppliers</Label></h3>
                <CompactTable list={latestSuppliers} />
            </Well>
        );
    }
};
