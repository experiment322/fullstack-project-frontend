import React from 'react';
import _ from 'lodash';
import { CustomTable } from './../MarketComponents';

export class CompactTable extends React.Component {
    static propTypes = {
        list: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    };
    render() {
        const { list } = this.props;
        const tableHeader = (
            <tr>
                <th>ID</th>
                <th>NAME</th>
            </tr>
        );
        const tableBody = list.map(function(object, index) {
            return (
                <tr key={object.id}>
                    <td>{object.id}</td>
                    <td>{object.name}</td>
                </tr>
            );
        });
        return (
            <CustomTable header={tableHeader} body={tableBody} />
        );
    }
};
