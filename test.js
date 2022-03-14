const MCServer = require("./src/MCServer");
const ServerProperties = require("./src/ServerProperties");
const { executeCommand, executeInteractiveCommand } = require("./src/utils");
const { VersionManager, Version } = require("./src/VersionManager");

const veM = new VersionManager();

var isWin = /^win/.test(process.platform);

if (!isWin) {
    console.log('not Windows');
    process.env.PATH = process.env.PATH + ':/usr/local/bin';
}

// veM.get('spigot', '1.18.1');
// veM.get('spigot', '1.18');
// veM.get('spigot', '1.17.1');
// veM.get('spigot', '1.17');
// veM.get('spigot', '1.16.5');
// veM.get('spigot', '1.16.4');
// veM.get('spigot', '1.16.3');
// veM.get('spigot', '1.16.2');
// veM.get('spigot', '1.16.1');
// veM.get('spigot', '1.15.2');
// veM.get('spigot', '1.15.1');
// veM.get('spigot', '1.15');

(async () => {

    process.stdin.resume();//so the program will not close instantly

    function exitHandler(options, exitCode) {
        if (options.cleanup) console.log('clean');
        if (exitCode || exitCode === 0) console.log(420, exitCode);
        if (options.exit) process.exit();
        server.stop();
    }

    //do something when app is closing
    process.on('exit', exitHandler.bind(null, { cleanup: true }));

    //catches ctrl+c event
    process.on('SIGINT', exitHandler.bind(null, { exit: true }));

    // catches "kill pid" (for example: nodemon restart)
    process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
    process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

    //catches uncaught exceptions
    process.on('uncaughtException', exitHandler.bind(null, { exit: true }));

    // console.log(await executeInteractiveCommand(process.cwd(), 'sdk'));

    // return;

    const version = await veM.get('spigot', '1.8.8');

    const server = new MCServer('Test123', version, undefined, {
        port: 3737,
    });

    await server.start();
})();