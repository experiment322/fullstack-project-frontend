import React from 'react';
import { Form, FormGroup, FormControl, InputGroup, Button, DropdownButton, MenuItem, Glyphicon, Pagination, Table, Alert } from 'react-bootstrap';
import _ from 'lodash';
import './Market.css';

export class SearchField extends React.Component {
    static propTypes = {
        value: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired
    };
    render() {
        const { value, onChange } = this.props;
        return (
            <Form onSubmit={e => e.preventDefault()}>
                <FormGroup>
                    <InputGroup>
                        <InputGroup.Addon>
                            <Glyphicon glyph="search" />
                        </InputGroup.Addon>
                        <FormControl value={value} onChange={e => onChange(e.target.value)} type="text" placeholder="Type a name to start searching..." />
                        <InputGroup.Button>
                            <Button onClick={() => onChange('')}><Glyphicon glyph="remove-sign"/></Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
            </Form>
        );
    }
};

export class Paginator extends React.Component {
    static propTypes = {
        itemCount: React.PropTypes.number.isRequired,
        pageSize: React.PropTypes.number.isRequired,
        activePage: React.PropTypes.number.isRequired,
        onPageChange: React.PropTypes.func.isRequired
    };
    render() {
        const { itemCount, pageSize, activePage, onPageChange } = this.props;
        return (
            <Pagination ellipsis boundaryLinks maxButtons={3} items={Math.ceil(itemCount / pageSize)} activePage={activePage} onSelect={onPageChange} />
        );
    }
};

export class PageResizer extends React.Component {
    static propTypes = {
        pageSize: React.PropTypes.number.isRequired,
        onSizeChange: React.PropTypes.func.isRequired
    };
    render() {
        const { pageSize, onSizeChange } = this.props;
        return (
            <DropdownButton id="page-resizer" bsStyle="primary" key={pageSize} onSelect={value => onSizeChange(value)} title={pageSize + ' items/page'}>
                <MenuItem eventKey="5">5</MenuItem>
                <MenuItem eventKey="10">10</MenuItem>
                <MenuItem eventKey="20">20</MenuItem>
            </DropdownButton>
        );
    }
};

export class CustomTable extends React.Component {
    static propTypes = {
        header: React.PropTypes.element.isRequired,
        body: React.PropTypes.arrayOf(React.PropTypes.element).isRequired
    };
    render() {
        const { header, body } = this.props;
        if (body.length === 0) return (
            <Alert bsStyle="info">There is no data to display...</Alert>
        );
        return (
            <Table bordered hover>
                <thead>
                    {header}
                </thead>
                <tbody>
                    {body}
                </tbody>
            </Table>
        );
    }
};
