import React from 'react';
import { Well, Breadcrumb } from 'react-bootstrap';

export default class MainView extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <Well>
        <Breadcrumb>
          <Breadcrumb.Item href="/#">HOME</Breadcrumb.Item>
          <Breadcrumb.Item href="/#/latest">LATEST</Breadcrumb.Item>
          <Breadcrumb.Item href="/#/suppliers">SUPPLIERS</Breadcrumb.Item>
          <Breadcrumb.Item href="/#/products">PRODUCTS</Breadcrumb.Item>
        </Breadcrumb>
        {children}
      </Well>
    );
  }
};
