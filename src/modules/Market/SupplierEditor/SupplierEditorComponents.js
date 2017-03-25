import React from 'react';
import _ from 'lodash';
import { Form, FormGroup, FormControl, Button, ButtonGroup, Panel, Glyphicon, ProgressBar, Label, ControlLabel, HelpBlock, OverlayTrigger, Popover, Alert } from 'react-bootstrap';

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
            isValid: {
                name: true,
                address: true
            },
            data: {
                name: '',
                address: ''
            }
        };
        this.state = {
            isValid: {
                ...this.defaultState.isValid
            },
            data: {
                ...this.defaultState.data,
                ...props.supplier
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
        this.checkInput = function(field) {
            const { data } = this.state;
            let isValid = {
                name: /^[!-~][ -~]{8,253}[!-~]$/.test(data.name),
                address: /^[!-~][ -~]{8,253}[!-~]$/.test(data.address)
            };
            this.setState({isValid});
            return _.reduce(isValid, function(result, isFieldValid) {
                return result && isFieldValid;
            }, true);
        }.bind(this);
    }
    componentWillReceiveProps(newProps) {
        if (newProps.supplier) {
            this.setState({
                data: newProps.supplier
            });
        } else {
            this.setState(this.defaultState);
        }
    }
    render() {
        const { data, isValid } = this.state;
        const { supplier, onClickCreate, onClickUpdate, onClickDelete } = this.props;
        const helpPopover = (
            <Popover id="delete-confirmation" title="DELETE CONFIRMATION">
                <Alert bsStyle="danger">Deleting a supplier will delete all of its products. Do you want to continue?</Alert>
                <Button bsStyle="danger" onClick={() => onClickDelete(data.id)}>CONTINUE</Button>
            </Popover>
        );
        return (
            <Form onSubmit={e => e.preventDefault()}>
                {supplier && <h4><Label>Editing supplier with id {supplier.id}.</Label></h4>}
                {!supplier && <h4><Label>Creating a new supplier.</Label></h4>}
                <FormGroup validationState={isValid.name ? null : 'error'}>
                    <ControlLabel>Name</ControlLabel>
                    <FormControl name="name" value={data.name} onChange={this.changeState} type="text" />
                    <HelpBlock>A string between 10 and 255 characters.</HelpBlock>
                </FormGroup>
                <FormGroup validationState={isValid.address ? null : 'error'}>
                    <ControlLabel>Address</ControlLabel>
                    <FormControl name="address" value={data.address} onChange={this.changeState} type="text" />
                    <HelpBlock>A string between 10 and 255 characters.</HelpBlock>
                </FormGroup>
                <ButtonGroup>
                    {!supplier && <Button bsStyle="primary" onClick={() => this.checkInput() && onClickCreate(data)}>CREATE</Button>}
                    {supplier && <Button bsStyle="primary" onClick={() => this.checkInput() && onClickUpdate(data)}>UPDATE</Button>}
                    {supplier &&
                        <OverlayTrigger trigger="click" placement="top" overlay={helpPopover} rootClose>
                            <Button bsStyle="primary">DELETE</Button>
                        </OverlayTrigger>
                    }
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
