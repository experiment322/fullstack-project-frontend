import React from 'react';
import { ProductEditorForm, ProductEditorPanel } from './ProductEditorComponents';

export default class ProductEditorView extends React.Component {
    render() {
        const { product, suppliers, actionPending, actionError } = this.props;
        const { createProduct, updateProduct, deleteProduct, closeEditor } = this.props;
        return (
            <ProductEditorPanel actionPending={actionPending} actionError={actionError} onClickClose={closeEditor}>
                <ProductEditorForm product={product} suppliers={suppliers} onClickCreate={createProduct} onClickUpdate={updateProduct} onClickDelete={deleteProduct} />
            </ProductEditorPanel>
        );
    }
};
