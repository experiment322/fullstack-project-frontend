import React from 'react';
import { SupplierEditorForm, SupplierEditorPanel } from './SupplierEditorComponents';

export default class SupplierEditorView extends React.Component {
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
