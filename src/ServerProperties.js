/**
 * @typedef {Object} ServerObjectProperties
 * @property {Number=} viewDistance=10
 * @property {Number=} maxBuildHeight=256
 * @property {Boolean=} allowNether=true
 * @property {Number=} port=25565
 * @property {Boolean=} enableCommandBlock=false
 * @property {String=} motd="A Minecraft Server"
 * @property {Boolean=} whiteList=false
 * @property {Boolean=} pvp=true
 * @property {Number=} maxPlayers=20
 * @property {Boolean=} onlineMode=true
 * @property {Boolean=} allowFlight=false
 * 
 */

/**
 * @type {ServerObjectProperties}
 */
const defaultProperties = {
    viewDistance: 10,
    maxBuildHeight: 256,
    allowNether: true,
    port: 25565,
    enableCommandBlock: false,
    motd: 'A Minecraft Server',
    whiteList: false,
    pvp: true,
    maxPlayers: 20,
    onlineMode: true,
    allowFlight: false
};

class ServerProperties {
    /**
     * @param  {ServerObjectProperties} properties
     */
    constructor(properties) {
        this.properties = { ...properties, ...defaultProperties };
    }

    out() {
        return `
                #Minecraft server properties
                #Sun Feb 27 15:19:00 CET 2022
                view-distance=${this.properties.viewDistance}
                max-build-height=${this.properties.maxBuildHeight}
                server-ip=
                level-seed=
                allow-nether=${this.properties.allowNether}
                server-port=${this.properties.port}
                enable-command-block=${this.properties.enableCommandBlock}
                gamemode=0
                enable-rcon=false
                op-permission-level=4
                enable-query=false
                generator-settings=
                resource-pack=
                level-name=world
                player-idle-timeout=0
                motd=${this.properties.motd || 'A Minecraft Server'}
                announce-player-achievements=true
                force-gamemode=false
                hardcore=false
                white-list=${this.properties.whiteList}
                pvp=${this.properties.pvp}
                spawn-npcs=true
                spawn-animals=true
                generate-structures=true
                snooper-enabled=true
                difficulty=1
                network-compression-threshold=256
                level-type=DEFAULT
                spawn-monsters=true
                max-players=${this.properties.maxPlayers}
                spawn-protection=16
                online-mode=${this.properties.onlineMode}
                allow-flight=${this.properties.allowFlight}
                resource-pack-hash=
                max-world-size=29999984
        `
    }
}

module.exports = ServerProperties;