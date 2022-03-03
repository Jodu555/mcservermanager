// const MCServer = require("./src/MCServer");
const ServerProperties = require("./src/ServerProperties");


const props = new ServerProperties({ motd: 'Test123', allowFlight: true });
console.log(props.out());


// createMCServerManager()