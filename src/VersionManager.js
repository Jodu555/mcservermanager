const javaVersions = {
    8: '8.0.302-open',
}

class VersionManager {
    constructor(folder) {
        this.folder = folder;
    }

    get(type = 'spigot', version = '1.18.1') {
        const effectiveVersion = version.split('.')[1];
        const JavaVersion;
        console.log(effectiveVersion);
    }

}

module.exports = VersionManager;