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
        '[11:01:00] [Async Chat Thread - #1/INFO]: <JoduCoding> test',
        '[11:01:03] [Server thread/INFO]: JoduCoding issued server command: /tps',
        '[11:01:23] [User Authenticator #10/INFO]: UUID of player Jodu555 is 076b1e9c-3771-4e84-b1c7-0638514aba2e',
        '[11:01:23] [Server thread/INFO]: Jodu555[/0.0.0.0:9905] logged in with entity id 1157 at ([world]-256.2177770048223, 94.0, 247.69999998807907)',
        '[23:30:05] [Server thread/INFO]: Jodu555 lost connection: Disconnected',
        '[23:41:34] [Thread-16/INFO]: UUID of player Editfusee is 79f06bc9-99f8-4bd0-8715-3edf48756014',
        '[23:41:34] [Netty Epoll Server IO #2/WARN]: [ViaVersion] Ignoring plugin channel in outgoing REGISTER: WECUI',
        '[23:41:34] [Server thread/INFO]: Editfusee[/1.1.1.1:50159] logged in with entity id 2459 at ([world]-0.6621907329410326, 4.0, 0.6181414894586275)',
        '[23:41:36] [Server thread/INFO]: Editfusee issued server command: /pl',
        '[23:42:52] [Server thread/INFO]: Editfusee issued server command: /build',
    ];
    const bracketRegex = /\[.*?\]/m;
    const chatRegex = /\<.*?\>/m;
    logs.forEach(log => {
        const time = log.match(bracketRegex)[0];
        log = log.replace(bracketRegex, '');

        const [thread, level] = multiReplacer(log.match(bracketRegex)[0], '', '[', ']').split('/');
        console.log(1, log.replace(bracketRegex, '').split(':'));
        log = log.replace(bracketRegex, '').split(':')[1];

        console.log(1337, log);

        const player = multiReplacer(log.match(chatRegex)?.[0], '', '<', '>') || null;
        log = log.replace(chatRegex, '');

        if (!player) {
            //NO Chat
            // console.log(2, log);
            if (log.includes('issued Server command:')) {
                //Command Execution
                // [11:01:03] [Server thread/INFO]: JoduCoding issued server command: /tps
                console.log('Got Command Execution');
            }
            if (log.includes('logged in')) {
                //Login
                // [11:01:23] [Server thread/INFO]: Jodu555[/0.0.0.0:9905] logged in with entity id 1157 at ([world]-256, 94.0, 247)
                console.log('Got Log in');
            }
            if (log.includes('lost connection')) {
                //Logout
                // [23:30:05] [Server thread/INFO]: Jodu555 lost connection: Disconnected
                console.log('Got Log out');
            }
        } else {
            //YES Chat
            log = log.trim();
            // console.log({ time, info: { thread, level }, player, log });
        }

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