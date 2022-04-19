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

    const logs = [
        '[09:05:50] [Async Chat Thread - #0/INFO]: <Jodu555> lol',
        '[09:05:52] [Server thread/INFO]: Jodu555 issued server command: /tps'
    ];

    logs.forEach(log => {
        let num = log.search(new RegExp('[*+]'));
        console.log(num);
    });



    return;

    process.stdin.resume();//so the program will not close instantly

    //exit: do something when app is closing
    //SIGINT: catches ctrl+c event
    // SIGUSR1 / SIGUSR2: catches "kill pid" (for example: nodemon restart)
    // uncaughtException: catches uncaught exceptions
    [`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
        process.on(eventType, () => {
            console.log(`Process Stopped from: ${eventType}! Stopping all current active Servers!`);
            server.stop();
        });
    });

    const version = await veM.get('spigot', '1.8.8');

    const server = new MCServer('Test123', version, undefined, {
        port: 3737,
    });

    await server.start();
})();