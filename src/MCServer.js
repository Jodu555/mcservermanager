const fs = require('fs')
const path = require('path');
const execute = require('child_process').exec;
const ServerProperties = require('./ServerProperties');

const command = 'java -jar spigot.jar';
class MCServer {

    /**
     * @param  {String} name the servers referencing name
     * @param  {String} cwd='./CloudData/spigot-Server'
     * @param  {import('./ServerProperties').ServerObjectProperties} serverProperties the server.properties
     */
    constructor(name, cwd = './CloudData/spigot-Server', serverProperties = {}) {
        this.name = name;
        this.cwd = cwd;
        /**
         * @type {ServerProperties}
         */
        this.serverProperties = new ServerProperties(serverProperties);
        this.logs = [];
    }

    init() {
        fs.writeFileSync(path.join(this.cwd, 'server.properties'), this.serverProperties.out());
    }

    listenForLog() {
        this.process.stdout.on('data', (data) => {
            data = data.toString().split(/(\r?\n)/g);
            data.forEach((item, index) => {
                var line = data[index].trim();
                if (line !== '\n' && line !== '') {
                    // console.log('Console Output: "', data[index].trim(), '"');
                    this.logs.push(data[index].trim());
                }
            });
        });
    }
    /**
     * @param  {String} command the command
     */
    sendCommand(command) {
        this.process.stdin.setEncoding("utf8");
        this.process.stdin.write(command + '\n');
    }

    stop() {
        this.process.kill('SIGINT');
    }

    start() {
        this.process = execute(command, { cwd: this.cwd }, (err, stdout, stderr) => {
            if (err) {
                console.error('Server:start Error: ', err);
                return;
            }
            if (stderr) {
                console.error('Server:start Error: ', stderr);
                return;
            }
            if (stdout) {
                // console.log('LOG OUTPUT: ', stdout);
            }
        });

        try {
            this.listenForLog();
        } catch (error) {
            console.log('Error catched!');
            console.error(error);
        }
    }
}

module.exports = MCServer;