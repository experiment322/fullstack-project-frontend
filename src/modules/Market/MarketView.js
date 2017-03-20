import React from 'react';
import { Alert, ProgressBar } from 'react-bootstrap';

export default class MarketView extends React.Component {
    componentDidMount() {
        const { fetchData } = this.props;
        fetchData();
    }
    componentDidUpdate() {
        const { shouldRefetchData, refetchData } = this.props;
        shouldRefetchData && refetchData();
    }
    render() {
        const { dataError, dataPending, children } = this.props;
        return (
            <div>
                {dataError && <Alert bsStyle="danger">Error fetching data from server...</Alert>}
                {!dataError && dataPending && <ProgressBar now={100} label="FETCHING DATA FROM SERVER..." active />}
                {!dataError && !dataPending && children}
            </div>
        );
    }
};
