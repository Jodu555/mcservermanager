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
    }

}

module.exports = VersionManager;