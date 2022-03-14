const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { executeInteractiveCommand } = require('./utils');

const javaVersions = {
    8: '8.0.302-open',
    17: '17.0.2-open'
}

class VersionManager {
    constructor(folder = null) {
        this.folder = folder;
    }

    async get(type = 'spigot', version = '1.18.1') {
        if (!(type == 'spigot' || type == 'paper'))
            throw new Error(`This api currently only supports spigot or paper versions! And not ${type}! If you want other pls contact me!`);

        const effectiveVersion = version.split('.')[1];
        const javaVersion = effectiveVersion > 16 ? javaVersions['17'] : javaVersions['8'];

        if (!await this.checkIfJavaVersionIsInstalled(javaVersion)) {
            console.log(`The Java Version for the minecraft version ${type}-${version} : ${javaVersion}! Is not installed yet! It will be installed!`);
            await this.installJavaVersion(javaVersion)
        }

        //Use Version

        console.log(version, effectiveVersion, javaVersion);
        return new Version(this, type, version, javaVersion)
    }

    //sdk list java | grep installed
    //sdk install java <version>
    //sdk use java <version>

    async installJavaVersion(version) {
        await executeInteractiveCommand(process.cwd(), `sdk install java ${version}`);
    }

    async checkIfJavaVersionIsInstalled(version) {
        const lines = await executeInteractiveCommand(process.cwd(), `sdk list java | grep installed`);
        console.log(lines, version);
        const found = lines.find(e => e.includes(version));
        return Boolean(found);
    }

    async useJavaVersion(version) {
        //TODO: Somehow spawn a shell and reset the path
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
                const builds = (await axios.get(`https://papermc.io/api/v2/projects/paper/versions/${this.version}`)).data.builds;
                const build = builds.pop()
                console.log(build);
                const name = `${this.type}-${this.version}-${this.build}`;
                const downloadURL = `https://papermc.io/api/v2/projects/paper/versions/${this.version}/builds/${build}/downloads/${name}`;
                return downloadURL;
            } break;

            default:
                throw new Error(this.type + ' is not supported! Only spigot or paper');
                break;
        }
    }

    toNiceName() {
        return `${this.type}-${this.version}`;
    }

    async download(location) {
        const name = this.toNiceName();

        const dlPath = path.join(location, name)

        if (fs.existsSync(dlPath))
            return;


        const url = await this.generateDownloadURL();
        const writer = fs.createWriteStream(dlPath)
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