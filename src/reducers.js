import SuppliersReducer from './modules/Market/Suppliers/SuppliersReducer';
import ProductsReducer from './modules/Market/Products/ProductsReducer';
import SupplierEditorReducer from './modules/Market/SupplierEditor/SupplierEditorReducer';
import ProductEditorReducer from './modules/Market/ProductEditor/ProductEditorReducer';

export default {
    Suppliers: SuppliersReducer,
    Products: ProductsReducer,
    SupplierEditor: SupplierEditorReducer,
    ProductEditor: ProductEditorReducer
};
