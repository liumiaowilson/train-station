import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ServiceName extends Component {
    render() {
        if(this.props.service.url && this.props.service.status === "Active") {
            return (
                <a href={ this.props.service.url } target="_blank">{ this.props.service.name }</a>
            );
        }
        else {
            return (
                <span>{ this.props.service.name }</span>
            );
        }
    }
}

ServiceName.propTypes = {
    service: PropTypes.object,
};

export default ServiceName;
