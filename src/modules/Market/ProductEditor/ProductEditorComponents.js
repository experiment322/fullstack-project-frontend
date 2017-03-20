import React from 'react';
import _ from 'lodash';
import { Form, FormGroup, FormControl, Button, ButtonGroup, Panel, Glyphicon, ProgressBar, Label, ControlLabel, HelpBlock } from 'react-bootstrap';

export class ProductEditorForm extends React.Component {
    static propTypes = {
        product: React.PropTypes.shape({
            id: React.PropTypes.number,
            name: React.PropTypes.string,
            description: React.PropTypes.string,
            supplierId: React.PropTypes.number,
            quantity: React.PropTypes.number,
            price: React.PropTypes.number
        }),
        suppliers: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        onClickCreate: React.PropTypes.func.isRequired,
        onClickUpdate: React.PropTypes.func.isRequired,
        onClickDelete: React.PropTypes.func.isRequired
    };
    constructor(props) {
        super(props);
        this.defaultState = {
            name: '',
            description: '',
            supplierId: '',
            quantity: '',
            price: ''
        };
        this.state = Object.assign({}, this.defaultState, props.product);
        this.changeState = function(e) {
            const { name, value } = e.target;
            this.setState({
                [name]: value
            });
        }.bind(this);
        this.checkInput = function(field) {
            let isValid = {
                name: true,
                description: true,
                supplierId: true,
                quantity: true,
                price: true
            };
            let isEverythingValid = true;
            const input = this.state;
            if (!(input.name && _.inRange(input.name.length, 10, 256))) isValid.name = isEverythingValid = false;
            if (!(input.description && _.inRange(input.description.length, 10, 256))) isValid.description = isEverythingValid = false;
            if (!(input.supplierId && _.find(this.props.suppliers, {id: Number(input.supplierId)}))) isValid.supplierId = isEverythingValid = false;
            if (!(input.quantity && _.inRange(input.quantity, 0, 1000000000))) isValid.quantity = isEverythingValid = false;
            if (!(input.price && _.inRange(input.price, 1, 1000000))) isValid.price = isEverythingValid = false;
            if (field) return isValid[field];
            else return isEverythingValid;
        }.bind(this);
    }
    componentWillReceiveProps(newProps) {
        if (newProps.product) {
            this.setState(newProps.product);
        } else {
            this.setState(this.defaultState);
        }
    }
    render() {
        const { product, suppliers, onClickCreate, onClickUpdate, onClickDelete } = this.props;
        const supplierSelectorOptions = suppliers.map(function(supplier) {
            return (<option key={supplier.id} value={supplier.id}>{supplier.name}</option>);
        }).concat([<option key={-1} value={''}>{''}</option>]);
        return (
            <Form onSubmit={e => e.preventDefault()}>
                {product && <h4><Label>Editing product with id {product.id}.</Label></h4>}
                {!product && <h4><Label>Creating a new product.</Label></h4>}
                <FormGroup validationState={this.checkInput('name') ? 'success' : 'error'}>
                    <ControlLabel>Name</ControlLabel>
                    <FormControl name="name" value={this.state.name} onChange={this.changeState} type="text" />
                </FormGroup>
                <FormGroup validationState={this.checkInput('description') ? 'success' : 'error'}>
                    <ControlLabel>Description</ControlLabel>
                    <FormControl name="description" value={this.state.description} onChange={this.changeState} type="text" />
                </FormGroup>
                <FormGroup validationState={this.checkInput('supplierId') ? 'success' : 'error'}>
                    <ControlLabel>Supplier</ControlLabel>
                    <FormControl name="supplierId" value={this.state.supplierId} onChange={this.changeState} componentClass="select">
                        {supplierSelectorOptions}
                    </FormControl>
                    {suppliers.length === 0 && <HelpBlock>Note: Maybe you should add some suppliers first :).</HelpBlock>}
                </FormGroup>
                <FormGroup validationState={this.checkInput('quantity') ? 'success' : 'error'}>
                    <ControlLabel>Quantity</ControlLabel>
                    <FormControl name="quantity" value={this.state.quantity} onChange={this.changeState} type="number" />
                </FormGroup>
                <FormGroup validationState={this.checkInput('price') ? 'success' : 'error'}>
                    <ControlLabel>Price($)</ControlLabel>
                    <FormControl name="price" value={this.state.price} onChange={this.changeState} type="number" />
                </FormGroup>
                <ButtonGroup>
                    {!product && <Button bsStyle="primary" onClick={() => this.checkInput() && onClickCreate(this.state)}>CREATE</Button>}
                    {product && <Button bsStyle="primary" onClick={() => this.checkInput() && onClickUpdate(this.state)}>UPDATE</Button>}
                    {product && <Button bsStyle="primary" onClick={() => onClickDelete(this.state.id)}>DELETE</Button>}
                </ButtonGroup>
            </Form>
        );
    }
};

export class ProductEditorPanel extends React.Component {
    static propTypes = {
        actionPending: React.PropTypes.bool.isRequired,
        actionError: React.PropTypes.bool.isRequired,
        onClickClose: React.PropTypes.func.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            processing: false,
            error: false
        };
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            processing: newProps.actionPending,
            error: this.state.processing && newProps.actionError
        });
    }
    render() {
        const { children, onClickClose } = this.props;
        const panelHeader = (
            <ButtonGroup>
                <Button onClick={() => onClickClose()}>
                    <Glyphicon glyph="remove" />
                </Button>
                <Button disabled>PRODUCT EDITOR</Button>
            </ButtonGroup>
        );
        return (
            <Panel header={panelHeader} bsStyle={this.state.error ? 'danger' : 'default'}>
                {this.state.processing && <ProgressBar now={100} label="PROCESSING REQUEST..." active />}
                {!this.state.processing && children}
            </Panel>
        );
    }
};
