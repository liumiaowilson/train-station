import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label } from 'react-bootstrap';

class ServiceStatus extends Component {
    render() {
        switch(this.props.value) {
            case 'Active':
                return (
                    <Label bsStyle="success">{ this.props.value }</Label>
                );
            case 'Waiting':
                return (
                    <Label bsStyle="warning">{ this.props.value }</Label>
                );
            case 'Inactive':
                return (
                    <Label bsStyle="danger">{ this.props.value }</Label>
                );
            default:
                return (
                    <Label bsStyle="default">{ this.props.value }</Label>
                );
        }
    }
}

ServiceStatus.propTypes = {
    value: PropTypes.string,
};

export default ServiceStatus;
