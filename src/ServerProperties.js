class ServerProperties {

    /**
     * @typedef {Object} ServerObjectProperties
     * @property {Number=} viewDistance
     * 
     */

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
                view-distance=10
                max-build-height=256
                server-ip=
                level-seed=
                allow-nether=true
                server-port=25565
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
                max-players=20
                spawn-protection=16
                online-mode=true
                allow-flight=false
                resource-pack-hash=
                max-world-size=29999984
        `
    }
}

module.exports = ServerProperties;