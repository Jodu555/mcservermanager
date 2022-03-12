const MCServer = require("./src/MCServer");
const ServerProperties = require("./src/ServerProperties");
const { executeCommand } = require("./src/utils");
const { VersionManager, Version } = require("./src/VersionManager");

const veM = new VersionManager();

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

// const v = new Version(null, 'spigot', '1.16.1', null);
// const v = new Version(null, 'paper', '1.16.1', null);

// v.download('https://download.getbukkit.org/spigot/spigot-1.17.1.jar', process.cwd());

// const url = v.generateDownloadURL();
// console.log(url);

(async () => {


    console.log(await executeCommand(process.cwd(), 'echo "$SHELL" && type sdk'));

    return;

    const version = await veM.get('spigot', '1.8.8');

    const server = new MCServer('Test123', version, undefined, {
        port: 3737,
    });

    await server.start();
})();




// server.init();


// createMCServerManager()