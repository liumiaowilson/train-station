const fs = require("fs");
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
const express = require('express');
const app = express();
const _ = require("lodash");
const ini = require('ini');
const http = require('http');

const servicesConfig = ini.parse(fs.readFileSync('./services/config.ini', 'utf-8'));
const networkConfig = JSON.parse(fs.readFileSync('./services/network.json', 'utf-8'));

let ip = "localhost";

function toService(line) {
    const items = _.split(line, "=");
    return {
        name: items[0],
        status: items[1],
        url: items[2],
    };
}

function updateServiceNetwork(service) {
    if(networkConfig.nat) {
        var nat = networkConfig.nat[service.name];
        if(nat) {
            service.url = "http://" + ip + ":" + nat;
        }
    }

    return service;
}

app.get("/api/services/status", function(req, resp) {
    exec("./services/status.sh", function(error, stdout, stderr) {
        if(error) {
            console.log(error);
            resp.send("Internal Error");
            return;
        }

        const services = _.split(stdout, '\n')
            .map(toService)
            .filter(s => s.name)
            .map(updateServiceNetwork);

        resp.send(JSON.stringify(services));
    });
});

app.get("/api/services/start", function(req, resp) {
    spawn("./services/start.sh", {
        stdio: "ignore",
        detached: true,
    }).unref();
    resp.send("Starting commands issued.");
});

app.get("/api/services/stop", function(req, resp) {
    exec("./services/stop.sh", function(error, stdout, stderr) {
        if(error) {
            console.log(error);
            resp.send("Internal Error");
            return;
        }

        resp.send("Stopping commands issued.");
    });
});

app.get("/api/services/status/:name", function(req, resp) {
    const name = req.params.name;
    const port = servicesConfig[name];
    exec("./services/status_one.sh " + port + " " + name, function(error, stdout, stderr) {
        if(error) {
            console.log(error);
            resp.send("Internal Error");
            return;
        }

        resp.send(stdout);
    });
});

app.get("/api/services/start/:name", function(req, resp) {
    const name = req.params.name;
    const port = servicesConfig[name];
    spawn("./services/start_one.sh", [port, name], {
        stdio: "ignore",
        detached: true,
    }).unref();
    resp.send("Starting command issued.");
});

app.get("/api/services/stop/:name", function(req, resp) {
    const name = req.params.name;
    const port = servicesConfig[name];
    exec("./services/stop_one.sh " + port + " " + name, function(error, stdout, stderr) {
        if(error) {
            console.log(error);
            resp.send("Internal Error");
            return;
        }

        resp.send("Stopping command issued.");
    });
});

app.use(express.static('build'));

const req = http.get({
    host: "api.ipify.org",
    path: "/?format=json",
}, resp => {
    let body = '';
    resp.on('data', d => body += d);
    resp.on('end', () => {
        ip = JSON.parse(body).ip;
    });
});

app.listen(40000, () => console.log("App listening to port 40000 with external ip: " + ip));
