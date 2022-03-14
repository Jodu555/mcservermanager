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

/**
 * @param  {String} cwd
 * @param  {String} command
 * @returns {Promise<String[]>}
 */
const executeInteractiveCommand = async (cwd, command) => {
    return await new Promise((resolve, reject) => {
        const output = [];
        const process = child_process.spawn('bash', ['-i'], { encoding: 'utf8', cwd, shell: '/usr/bin/bash' });
        process.stdout.on('data', (data) => output.push(data.toString()));
        process.stderr.on('data', (data) => output.push(data.toString()));

        process.stdout.on('close', (data) => resolve(output));
        process.stderr.on('close', (data) => resolve(output));

        process.stdout.on('error', (data) => reject(output));
        process.stderr.on('close', (data) => reject(output));

        process.stdin.write(`${command}\n`);
        process.stdin.end();
    });
}

module.exports = {
    executeCommand,
    executeInteractiveCommand
}