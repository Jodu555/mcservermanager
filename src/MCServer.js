const fs = require('fs')
const path = require('path');
const execute = require('child_process').exec;
const child_process = require('child_process');
const ServerProperties = require('./ServerProperties');
const { Version } = require('./VersionManager');
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
        this.command = `java -jar ${this.version.toNiceName()}.jar`
        this.initialized = false;

    }

    async init() {
        if (this.initialized)
            return;

        this.initialized = true;
        fs.mkdirSync(this.cwd, { recursive: true });

        fs.writeFileSync(path.join(this.cwd, 'eula.txt'), 'eula=true', 'utf-8');
        fs.writeFileSync(path.join(this.cwd, 'server.properties'), this.serverProperties.out());


        if (fs.existsSync(path.join(this.cwd, this.version.toNiceName())))
            return;

        if (this.version.versionmanager.folder == null) {
            await this.version.download(this.cwd);
        } else {
            const folder = this.version.versionmanager.folder;
            await this.version.download(folder);
            fs.copyFileSync(path.join(folder, this.version.toNiceName()), path.join(this.cwd, this.version.toNiceName()));
        }

    }

    addListeners() {

        this.process.stderr.on('data', (data) => console.log(data.toString()));

        this.process.stdout.on('data', (data) => {
            data = data.toString().split(/(\r?\n)/g);
            data.forEach((_, index) => {
                var line = data[index].trim();
                if (line !== '\n' && line !== '') {
                    this.logs.push(line);
                    console.log('LOG:', line);
                }
            });
        });
        const stop = () => {
            //The Server Stopped either normal or unnormal
            this.stopped = true;
        }
        this.process.on('close', stop);
        this.process.on('exit', stop);

        this.process.stdout.on('close', stop);
        this.process.stderr.on('close', stop);

        this.process.stdout.on('error', stop);
        this.process.stderr.on('close', stop);
    }
    /**
     * @param  {String} command the command
     */
    sendCommand(command) {
        this.process.stdin.setEncoding("utf8");
        this.process.stdin.write(command + '\n');
    }

    stop() {
        console.log('Stopped');
        this.process.kill('SIGINT');
    }

    async start() {

        await this.init();
        const javaUseCommand = await this.version.versionmanager.useJavaVersion(this.version.javaVersion);
        console.log('UNO', javaUseCommand);
        const finalCommand = `${this.command}` + (this.startupParameters || '');
        console.log('DOS', finalCommand);

        this.process = child_process.spawn('bash', ['-i'], { encoding: 'utf8', cwd: this.cwd });

        this.process.stdin.write(`${javaUseCommand}\n`);
        this.process.stdin.write(`${finalCommand}\n`);

        // this.process = execute(finalCommand, { cwd: this.cwd }, (err, stdout, stderr) => {
        //     if (err) {
        //         console.error('Server:start Error: ', err);
        //         return;
        //     }
        //     if (stderr) {
        //         console.error('Server:start Error: ', stderr);
        //         return;
        //     }
        //     if (stdout) {
        //         console.log('LOG OUTPUT: ', stdout);
        //     }
        // });

        try {
            this.addListeners();
        } catch (error) {
            console.log('Error catched!');
            console.error(error);
        }
    }
}

module.exports = MCServer;