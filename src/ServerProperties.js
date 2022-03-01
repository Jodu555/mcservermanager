/**
 * @typedef {Object} ServerObjectProperties
 * @property {Number=} viewDistance=10
 * @property {Number=} maxBuildHeight=256
 * @property {Boolean=} allowNether=true
 * @property {Number=} port=25565
 * @property {Number=} maxPlayers=20
 * 
 */
class ServerProperties {
    /**
     * @param  {ServerObjectProperties} properties
     */
    constructor(properties) {
        this.properties = properties;
    }

    out() {
        return `
                #Minecraft server properties
                #Sun Feb 27 15:19:00 CET 2022
                view-distance=${this.properties.viewDistance || 10}
                max-build-height=${this.properties.maxBuildHeight || 256}
                server-ip=
                level-seed=
                allow-nether=${Boolean(this.properties.allowNether)}
                server-port=${this.properties.port || 25565}
                enable-command-block=false
                gamemode=0
                enable-rcon=false
                op-permission-level=4
                enable-query=false
                generator-settings=
                resource-pack=
                level-name=world
                player-idle-timeout=0
                motd=A Minecraft Server
                announce-player-achievements=true
                force-gamemode=false
                hardcore=false
                white-list=false
                pvp=true
                spawn-npcs=true
                spawn-animals=true
                generate-structures=true
                snooper-enabled=true
                difficulty=1
                network-compression-threshold=256
                level-type=DEFAULT
                spawn-monsters=true
                max-players=${this.properties.maxPlayers || 20}
                spawn-protection=16
                online-mode=true
                allow-flight=false
                resource-pack-hash=
                max-world-size=29999984
        `
    }
}

module.exports = ServerProperties;