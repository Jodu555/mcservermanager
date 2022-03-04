// const MCServer = require("./src/MCServer");
const ServerProperties = require("./src/ServerProperties");
const VersionManager = require("./src/VersionManager");


// const props = new ServerProperties({ motd: 'Test123', allowFlight: true });
// console.log(props.out());

const veM = new VersionManager('test');

veM.get('spigot', '1.18.1');
veM.get('spigot', '1.18');
veM.get('spigot', '1.17.1');
veM.get('spigot', '1.17');
veM.get('spigot', '1.16.5');
veM.get('spigot', '1.16.4');
veM.get('spigot', '1.16.3');
veM.get('spigot', '1.16.2');
veM.get('spigot', '1.16.1');
veM.get('spigot', '1.15.2');
veM.get('spigot', '1.15.1');
veM.get('spigot', '1.15');


// createMCServerManager()