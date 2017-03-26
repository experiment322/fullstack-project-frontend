import React from 'react';
import { animateScroll } from 'react-scroll';
import { SupplierEditorForm, SupplierEditorPanel } from './SupplierEditorComponents';

export default class SupplierEditorView extends React.Component {
    componentDidMount() {
        animateScroll.scrollToBottom();
    }
    componentDidUpdate() {
        animateScroll.scrollToBottom();
    }
    componentWillUnmount() {
        animateScroll.scrollToTop();
    }
    render() {
        const { supplier, actionPending, actionError } = this.props;
        const { createSupplier, updateSupplier, deleteSupplier, closeEditor } = this.props;
        return (
            <SupplierEditorPanel actionPending={actionPending} actionError={actionError} onClickClose={closeEditor}>
                <SupplierEditorForm supplier={supplier} onClickCreate={createSupplier} onClickUpdate={updateSupplier} onClickDelete={deleteSupplier} />
            </SupplierEditorPanel>
        );
    }
};
