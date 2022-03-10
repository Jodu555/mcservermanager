const fs = require('fs');
const path = require('path');
const axios = require('axios');



const javaVersions = {
    8: '8.0.302-open',
    17: '17.0.2-open'
}

class VersionManager {
    constructor(folder) {
        this.folder = folder;
    }

    get(type = 'spigot', version = '1.18.1') {
        if (!(type == 'spigot' || type == 'paper'))
            throw new Error(`This api currently only supports spigot or paper versions! And not ${type}! If you want other pls contact me!`);

        const effectiveVersion = version.split('.')[1];
        const javaVersion = effectiveVersion > 16 ? javaVersions['17'] : javaVersions['8'];

        console.log(version, effectiveVersion, javaVersion);
        return new Version(this, type, version, javaVersion)
    }

}

class Version {

    /**
     * @param  {VersionManager} versionmanager
     * @param  {Strin} type
     * @param  {String} version
     * @param  {String} javaVersion
     */
    constructor(versionmanager, type, version, javaVersion) {
        this.versionmanager = versionmanager;
        this.type = type;
        this.version = version;
        this.javaVersion = javaVersion;
    }

    async generateDownloadURL() {
        switch (this.type.toLowerCase()) {
            case 'spigot': {
                const response = await axios.get('https://raw.githubusercontent.com/Jodu555/MinecraftVersionScraper/master/out.json');
                const info = response.data.find(e => e.version == this.version);
                if (!info)
                    throw new Error(`It seems the version you inserted dont exist! ${this.version} with type: ${this.type}! If it does pls contact me`)
                return info.downloadURL;
            } break;
            case 'paper': {

            } break;

            default:
                throw new Error(this.type + ' is not supported! Only spigot or paper');
                break;
        }
    }

    async download(location) {
        const url = await this.generateDownloadURL();
        const writer = fs.createWriteStream(path.join(location, 'spigot.jar'))
        const response = await axios.get(url, { responseType: 'stream' })
        response.data.pipe(writer);
        let error = null;
        writer.on('error', err => {
            error = err;
            writer.close();
            reject(err);
        });
        writer.on('close', () => {
            if (!error) {
                console.log('Failed to Download version ' + url, error);
            }
        });
    }
}

module.exports = { VersionManager, Version };