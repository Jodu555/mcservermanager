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

    function multiReplacer(string, replacor, ...param) {
        if (!string)
            return string;
        param.forEach(p => string = string.replace(p, replacor));
        return string;
    }


    const logs = [
        '[09:05:50] [Async Chat Thread - #0/INFO]: <Jodu555> lol',
        '[09:05:52] [Server thread/INFO]: Jodu555 issued server command: /tps',
        '[11:01:00] [Async Chat Thread - #1/INFO]: <JoduCoding> tes[m',
        '[11:01:03] [Server thread/INFO]: JoduCoding issued server command: /tps',
        '[11:01:23] [User Authenticator #10/INFO]: UUID of player Jodu555 is 076b1e9c-3771-4e84-b1c7-0638514aba2e',
        '[11:01:23] [Server thread/INFO]: Jodu555[/0.0.0.0:9905] logged in with entity id 1157 at ([world]-256.2177770048223, 94.0, 247.69999998807907)'
    ];
    const bracketRegex = /\[.*?\]/m;
    const chatRegex = /\<.*?\>/m;
    logs.forEach(log => {
        const time = log.match(bracketRegex)[0];
        log = log.replace(bracketRegex, '');

        const [thread, level] = multiReplacer(log.match(bracketRegex)[0], '', '[', ']').split('/');
        log = log.replace(bracketRegex, '');

        const player = multiReplacer(log.match(chatRegex)?.[0], '', '<', '>') || null;

        console.log({ time, thread, level, log, player });
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