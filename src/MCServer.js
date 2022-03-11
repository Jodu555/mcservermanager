const fs = require('fs')
const path = require('path');
const execute = require('child_process').exec;
const ServerProperties = require('./ServerProperties');
const { Version } = require('./VersionManager');

const command = 'java -jar spigot.jar';
class MCServer {

    /**
     * @param  {String} name the servers referencing name
     * @param  {Version} version the servers version
     * @param  {String} cwd=path.join(process.cwd(), 'CloudData/spigot-Server')
     * @param  {import('./ServerProperties').ServerObjectProperties} serverProperties the server.properties
     * @param  {String} startupParameters the server.properties
     */
    constructor(name, version, cwd = path.join(process.cwd(), 'CloudData/spigot-Server'), serverProperties = {}, startupParameters) {
        this.name = name;
        this.version = version;
        this.cwd = cwd;
        /**
         * @type {ServerProperties}
         */
        this.serverProperties = new ServerProperties(serverProperties);
        this.startupParameters = startupParameters;
        this.logs = [];
        this.stopped = false;
    }

    init() {
        fs.mkdirSync(this.cwd, { recursive: true });
        this.createEula();
        fs.writeFileSync(path.join(this.cwd, 'server.properties'), this.serverProperties.out());

        if (this.version.versionmanager.folder == null) {
            this.version.download(this.cwd);
        }

    }

    addListeners() {
        this.process.stdout.on('data', (data) => {
            data = data.toString().split(/(\r?\n)/g);
            data.forEach((_, index) => {
                var line = data[index].trim();
                if (line !== '\n' && line !== '') {
                    this.logs.push(line);
                }
            });
        });
        const stop = () => {
            //The Server Stopped either normal or unnormal
            this.stopped = true;
        }
        this.process.on('close', stop);
        this.process.on('exit', stop);
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
        this.process = execute(command + this.startupParameters, { cwd: this.cwd }, (err, stdout, stderr) => {
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
            this.addListeners();
        } catch (error) {
            console.log('Error catched!');
            console.error(error);
        }
    }
    createEula() {
        fs.writeFileSync(path.join(this.cwd, 'eula.txt'), 'eula=true', 'utf-8');
    }
}

module.exports = MCServer;