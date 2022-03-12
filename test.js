const MCServer = require("./src/MCServer");
const ServerProperties = require("./src/ServerProperties");
const { executeCommand } = require("./src/utils");
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

// const v = new Version(null, 'spigot', '1.16.1', null);
// const v = new Version(null, 'paper', '1.16.1', null);

// v.download('https://download.getbukkit.org/spigot/spigot-1.17.1.jar', process.cwd());

// const url = v.generateDownloadURL();
// console.log(url);

(async () => {

    const { exec } = require('child_process');

    const ls = exec('cat ~/.bashrc', { shell: '/bin/bash' }, function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: ' + error.code);
            console.log('Signal received: ' + error.signal);
        }
        console.log('Child Process STDOUT: ' + stdout);
        console.log('Child Process STDERR: ' + stderr);
    });

    ls.on('exit', function (code) {
        console.log('Child process exited with exit code ' + code);
    });


    // console.log(await executeCommand(process.cwd(), 'echo "$SHELL" && bash && sdk'));

    return;

    const version = await veM.get('spigot', '1.8.8');

    const server = new MCServer('Test123', version, undefined, {
        port: 3737,
    });

    await server.start();
})();




// server.init();


// createMCServerManager()