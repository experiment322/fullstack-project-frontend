import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import reducers from './reducers';
import MainModule from './modules/Main/Main';
import HomeModule from './modules/Home/Home';
import MarketModule from './modules/Market/Market';
import LatestModule from './modules/Market/Latest/Latest';
import SuppliersModule from './modules/Market/Suppliers/Suppliers';
import ProductsModule from './modules/Market/Products/Products';
import SupplierEditorModule from './modules/Market/SupplierEditor/SupplierEditor';
import ProductEditorModule from './modules/Market/ProductEditor/ProductEditor';

const rootReducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

const rootMiddleware = applyMiddleware(
  thunkMiddleware,
  promiseMiddleware(),
  routerMiddleware(hashHistory)
);

const store = createStore(
  rootReducer,
  composeWithDevTools(rootMiddleware)
);

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={MainModule}>
        <IndexRoute component={HomeModule} />
        <Route component={MarketModule}>
          <Route path="latest" component={LatestModule} />
          <Route path="suppliers" component={SuppliersModule} />
          <Route path="suppliers/:id" component={SupplierEditorModule} />
          <Route path="products" component={ProductsModule} />
          <Route path="products/:id" component={ProductEditorModule} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
