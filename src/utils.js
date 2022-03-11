const child_process = require('child_process');
/**
 * @param  {String} cwd
 * @param  {String} command
 * @returns {Promise<String[]>}
 */
const executeCommand = async (cwd, command) => {
    return await new Promise((resolve, reject) => {
        child_process.exec(command, { encoding: 'utf8', cwd }, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            resolve([...stdout?.split('\n'), ...stderr?.split('\n')]);
        });
    })
}

module.exports = {
    executeCommand
}