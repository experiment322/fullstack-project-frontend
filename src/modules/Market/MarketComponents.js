import React from 'react';
import { Form, FormGroup, FormControl, InputGroup, Button, Glyphicon, Pagination, Table } from 'react-bootstrap';
import _ from 'lodash';

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
            <Pagination ellipsis boundaryLinks items={Math.ceil(itemCount / pageSize)} activePage={activePage} onSelect={onPageChange} />
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
