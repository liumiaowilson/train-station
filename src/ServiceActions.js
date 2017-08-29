import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

class ServiceActions extends Component {
    constructor(props) {
        super(props);

        this.startService = this.startService.bind(this);
        this.stopService = this.stopService.bind(this);
    }

    startService() {
        if(this.props.onStartService) {
            this.props.onStartService(this.props.service.name);
        }
    }

    stopService() {
        if(this.props.onStopService) {
            this.props.onStopService(this.props.service.name);
        }
    }

    render() {
        if("Active" === this.props.service.status) {
            return (
                <Button bsStyle="danger" bsSize="xsmall" onClick={ this.stopService }>Stop</Button>
            );
        }
        else {
            return (
                <Button bsStyle="success" bsSize="xsmall" onClick={ this.startService }>Start</Button>
            );
        }
    }
}

ServiceActions.propTypes = {
    service: PropTypes.object,
    onStartService: PropTypes.func,
    onStopService: PropTypes.func,
};

export default ServiceActions;
