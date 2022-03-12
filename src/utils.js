const child_process = require('child_process');
/**
 * @param  {String} cwd
 * @param  {String} command
 * @returns {Promise<String[]>}
 */
const executeCommand = async (cwd, command) => {
    return await new Promise((resolve, reject) => {
        child_process.exec(command, { encoding: 'utf8', cwd, shell: '/usr/bin/bash' }, (error, stdout, stderr) => {
            if (error) {
                console.log(error, stdout, stderr);
                reject(error);
            }
            console.log(error, stdout, stderr);
            resolve([...stdout?.split('\n'), ...stderr?.split('\n')]);
        });
    })
}

module.exports = {
    executeCommand
}