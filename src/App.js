import React, { Component } from 'react';
import { Panel, PageHeader, Table, ButtonToolbar, ButtonGroup, Button, Modal } from 'react-bootstrap';
import _ from 'lodash';
// eslint-disable-next-line
import styles from './App.css';
import ServiceStatus from './ServiceStatus';
import ServiceName from './ServiceName';
import ServiceActions from './ServiceActions';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            services: [],
            confirm: {
                title: "Confirm",
                message: "Do you want to continue?",
                visible: false,
                onSave: null,
            },
        };

        this.onDialogSave = this.onDialogSave.bind(this);
        this.onDialogCancel = this.onDialogCancel.bind(this);

        this.refreshAll = this.refreshAll.bind(this);
        this.startAll = this.startAll.bind(this);
        this.stopAll = this.stopAll.bind(this);
        this.confirmStopAll = this.confirmStopAll.bind(this);

        this.startOne = this.startOne.bind(this);
        this.stopOne = this.stopOne.bind(this);
        this.confirmStopOne = this.confirmStopOne.bind(this);
    }

    componentDidMount() {
        this.refreshAll();
    }

    onDialogSave() {
        if(this.state.confirm.onSave) {
            this.state.confirm.onSave();
        }

        this.onDialogCancel();
    }

    onDialogCancel() {
        this.setState(() => {
            return {
                confirm: {
                    visible: false,
                }
            };
        });
    }

    refreshAll() {
        fetch("/api/services/status")
            .then(resp => resp.text())
            .then(body => this.setState((prevState, props) => {
                return {
                    "services": JSON.parse(body)
                };
            }));
    }

    startAll() {
        fetch("/api/services/start")
            .then(resp => {
                this.refreshAll();
            });
    }

    stopAll() {
        fetch("/api/services/stop")
            .then(resp => {
                this.refreshAll();
            });
    }

    confirmStopAll() {
        this.setState(() => {
            return {
                confirm: {
                    onSave: this.stopAll,
                    title: "Stop All",
                    message: "Do you want to stop all services?",
                    visible: true,
                },
            };
        });
    }

    startOne(name) {
        fetch("/api/services/start/" + name)
            .then(resp => {
                this.refreshAll();
            });
    }

    stopOne(name) {
        fetch("/api/services/stop/" + name)
            .then(resp => {
                this.refreshAll();
            });
    }

    confirmStopOne(name) {
        this.setState(() => {
            return {
                confirm: {
                    onSave: _.bind(this.stopOne, this, name),
                    title: "Stop Service",
                    message: "Do you want to stop this service?",
                    visible: true,
                },
            };
        });
    }

    render() {
        return (
            <div>
                <Panel>
                    <PageHeader>Services</PageHeader>
                    <ButtonToolbar>
                        <ButtonGroup>
                            <Button bsStyle="success" onClick={ this.startAll }>Start</Button>
                            <Button bsStyle="default" onClick={ this.refreshAll }>Refresh</Button>
                            <Button bsStyle="danger" onClick={ this.confirmStopAll }>Stop</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.services.map(service => (
                                    <tr key={service.name}>
                                        <td><ServiceName service={ service }/></td>
                                        <td><ServiceStatus value={ service.status }/></td>
                                        <td><ServiceActions service={ service } onStartService={ this.startOne } onStopService={ this.confirmStopOne }/></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Panel>
                <Modal show={ this.state.confirm.visible }>
                    <Modal.Header>
                        <Modal.Title>{ this.state.confirm.title }</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        { this.state.confirm.message }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={ this.onDialogCancel }>Cancel</Button>
                        <Button bsStyle="danger" onClick={ this.onDialogSave }>Yes</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default App;
