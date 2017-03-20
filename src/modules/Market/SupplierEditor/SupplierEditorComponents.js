import React from 'react';
import _ from 'lodash';
import { Form, FormGroup, FormControl, Button, ButtonGroup, Panel, Glyphicon, ProgressBar, Label, ControlLabel, HelpBlock } from 'react-bootstrap';

export class SupplierEditorForm extends React.Component {
    static propTypes = {
        supplier: React.PropTypes.shape({
            id: React.PropTypes.number,
            name: React.PropTypes.string,
            address: React.PropTypes.string
        }),
        onClickCreate: React.PropTypes.func.isRequired,
        onClickUpdate: React.PropTypes.func.isRequired,
        onClickDelete: React.PropTypes.func.isRequired
    };
    constructor(props) {
        super(props);
        this.defaultState = {
            name: '',
            address: ''
        };
        this.state = Object.assign({}, this.defaultState, props.supplier);
        this.changeState = function(e) {
            const { name, value } = e.target;
            this.setState({
                [name]: value
            });
        }.bind(this);
        this.checkInput = function(field) {
            let isValid = {
                name: true,
                address: true
            };
            let isEverythingValid = true;
            const input = this.state;
            if (!(input.name && _.inRange(input.name.length, 10, 256))) isValid.name = isEverythingValid = false;
            if (!(input.address && _.inRange(input.address.length, 10, 256))) isValid.address = isEverythingValid = false;
            if (field) return isValid[field];
            else return isEverythingValid;
        }.bind(this);
    }
    componentWillReceiveProps(newProps) {
        if (newProps.supplier) {
            this.setState(newProps.supplier);
        } else {
            this.setState(this.defaultState);
        }
    }
    render() {
        const { supplier, onClickCreate, onClickUpdate, onClickDelete } = this.props;
        return (
            <Form onSubmit={e => e.preventDefault()}>
                {supplier && <h4><Label>Editing supplier with id {supplier.id}.</Label></h4>}
                {!supplier && <h4><Label>Creating a new supplier.</Label></h4>}
                <FormGroup validationState={this.checkInput('name') ? 'success' : 'error'}>
                    <ControlLabel>Name</ControlLabel>
                    <FormControl name="name" value={this.state.name} onChange={this.changeState} type="text" />
                    <HelpBlock>A string between 10 and 255 characters.</HelpBlock>
                </FormGroup>
                <FormGroup validationState={this.checkInput('address') ? 'success' : 'error'}>
                    <ControlLabel>Address</ControlLabel>
                    <FormControl name="address" value={this.state.address} onChange={this.changeState} type="text" />
                    <HelpBlock>A string between 10 and 255 characters.</HelpBlock>
                </FormGroup>
                <ButtonGroup>
                    {!supplier && <Button bsStyle="primary" onClick={() => this.checkInput() && onClickCreate(this.state)}>CREATE</Button>}
                    {supplier && <Button bsStyle="primary" onClick={() => this.checkInput() && onClickUpdate(this.state)}>UPDATE</Button>}
                    {supplier && <Button bsStyle="primary" onClick={() => onClickDelete(this.state.id)}>DELETE</Button>}
                </ButtonGroup>
            </Form>
        );
    }
};

export class SupplierEditorPanel extends React.Component {
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
                <Button disabled>SUPPLIER EDITOR</Button>
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
