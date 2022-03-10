const fs = require('fs');
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
        const effectiveVersion = version.split('.')[1];
        const javaVersion = effectiveVersion > 16 ? javaVersions['17'] : javaVersions['8'];

        console.log(version, effectiveVersion, javaVersion);
        return new Version(this, type, version, javaVersion)
    }

}

class Version {
    constructor(versionmanager, type, version, javaVersion) {
        this.versionmanager = versionmanager;
        this.type = type;
        this.version = version;
        this.javaVersion = javaVersion;
    }

    download(url, path) {
        const writer = fs.createWriteStream(path)
        axios.get(url, { responseType: 'stream' }).then(response => {
            return new Promise((resolve, reject) => {
                response.data.pipe(writer);
                let error = null;
                writer.on('error', err => {
                    error = err;
                    writer.close();
                    reject(err);
                });
                writer.on('close', () => {
                    if (!error) {
                        resolve(true);
                    }
                });
            });
        });
    }
}

module.exports = VersionManager;