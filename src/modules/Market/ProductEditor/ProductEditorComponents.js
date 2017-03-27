import React from 'react';
import _ from 'lodash';
import { Form, FormGroup, FormControl, Button, ButtonGroup, Panel, Glyphicon, ProgressBar, Label, ControlLabel, HelpBlock, OverlayTrigger, Popover, Alert } from 'react-bootstrap';

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
            isValid: {
                name: true,
                description: true,
                supplierId: true,
                quantity: true,
                price: true
            },
            data: {
                name: '',
                description: '',
                supplierId: '',
                quantity: '',
                price: ''
            }
        };
        this.state = {
            isValid: {
                ...this.defaultState.isValid
            },
            data: {
                ...this.defaultState.data,
                ...props.product
            }
        };
        this.changeState = function(e) {
            const { name, value } = e.target;
            this.setState({
                isValid: {
                    ...this.state.isValid,
                    [name]: true
                },
                data: {
                    ...this.state.data,
                    [name]: value
                }
            });
        }.bind(this);
        this.checkInput = function() {
            const { data } = this.state;
            let isValid = {
                name: /^[!-~][ -~]{8,253}[!-~]$/.test(data.name),
                description: /^[!-~][ -~]{8,253}[!-~]$/.test(data.description),
                supplierId: /^\d+$/.test(data.supplierId),
                quantity: /^([1-9]\d{0,8}|0)$/.test(data.quantity),
                price: /^[1-9]\d{0,5}$/.test(data.price)
            };
            this.setState({isValid});
            return _.reduce(isValid, function(result, isFieldValid) {
                return result && isFieldValid;
            }, true);
        }.bind(this);
    }
    render() {
        const { data, isValid } = this.state;
        const { product, suppliers, onClickCreate, onClickUpdate, onClickDelete } = this.props;
        const helpPopover = (
            <Popover id="delete-confirmation" title="DELETE CONFIRMATION">
                <Alert bsStyle="danger">Do you want to continue?</Alert>
                <Button bsStyle="danger" onClick={() => onClickDelete(data.id)}>CONTINUE</Button>
            </Popover>
        );
        let supplierSelectorOptions = suppliers.map(function(supplier) {
            return (<option key={supplier.id} value={supplier.id}>{supplier.name}</option>);
        });
        !data.supplierId && supplierSelectorOptions.push(<option key={-1} value={''}>{''}</option>);
        return (
            <Form onSubmit={e => e.preventDefault()}>
                {product && <h4><Label>Editing product with id {product.id}.</Label></h4>}
                {!product && <h4><Label>Creating a new product.</Label></h4>}
                <FormGroup validationState={isValid.name ? null : 'error'}>
                    <ControlLabel>Name</ControlLabel>
                    <FormControl name="name" value={data.name} onChange={this.changeState} type="text" />
                    <HelpBlock>A string between 10 and 255 characters.</HelpBlock>
                </FormGroup>
                <FormGroup validationState={isValid.description ? null : 'error'}>
                    <ControlLabel>Description</ControlLabel>
                    <FormControl name="description" value={data.description} onChange={this.changeState} type="text" />
                    <HelpBlock>A string between 10 and 255 characters.</HelpBlock>
                </FormGroup>
                <FormGroup validationState={isValid.supplierId ? null : 'error'}>
                    <ControlLabel>Supplier</ControlLabel>
                    <FormControl name="supplierId" value={data.supplierId} onChange={this.changeState} componentClass="select">
                        {supplierSelectorOptions}
                    </FormControl>
                    {suppliers.length !== 0 && <HelpBlock>Select a supplier from the list.</HelpBlock>}
                    {suppliers.length === 0 && <HelpBlock>Note: Maybe you should add some suppliers first :).</HelpBlock>}
                </FormGroup>
                <FormGroup validationState={isValid.quantity ? null : 'error'}>
                    <ControlLabel>Quantity</ControlLabel>
                    <FormControl name="quantity" value={data.quantity} onChange={this.changeState} type="number" />
                    <HelpBlock>A number between 0 and 999 999 999.</HelpBlock>
                </FormGroup>
                <FormGroup validationState={isValid.price ? null : 'error'}>
                    <ControlLabel>Price($)</ControlLabel>
                    <FormControl name="price" value={data.price} onChange={this.changeState} type="number" />
                    <HelpBlock>A number between 1 and 999 999.</HelpBlock>
                </FormGroup>
                <ButtonGroup>
                    {!product && <Button bsStyle="primary" onClick={() => this.checkInput() && onClickCreate(data)}>CREATE</Button>}
                    {product && <Button bsStyle="primary" onClick={() => this.checkInput() && onClickUpdate(data)}>UPDATE</Button>}
                    {product &&
                        <OverlayTrigger trigger="click" placement="top" overlay={helpPopover} rootClose>
                            <Button bsStyle="primary">DELETE</Button>
                        </OverlayTrigger>
                    }
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
