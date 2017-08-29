# Train Station

This project is used to manage servers running at localhostand expose them through [Localtunnel](https://localtunnel.github.io/www/).

  - Script utilities to start, stop and query running services.
  - Basic UI to manage running services.
  - Auto launch Localtunnel to expose locally running services.

### Tech

This project uses a number of open source projects to work properly:

* [React] - Front-end framework
* [Bootstrap] - Responsive styling framework
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework
* [Gulp] - the streaming build system

### Installation

Install the dependencies and start the server.

```sh
$ cd train-station
$ npm install
$ node run server
```

### Build

```sh
$ npm run build
````

### Development

```sh
$ npm start
```

### Service Management

To manage configurations for services, refer to ``services/config.ini``.

```ini
# The name of the service folder and the port it will bind to.
example=40001
```

To add a new service, follow the steps:
1. Copy the ``services/example`` folder to create your own service.
2. Add the service into the ``services/config.ini``.
3. Modify ``services/newService/start.sh``, ``services/newService/stop.sh``, ``services/newService/status.sh`` files to control your service.
