class LogParser {
    constructor() {
        this.events;
    }

    parse(log, fireEvent = true) {
        const bracketRegex = /\[.*?\]/m;
        const chatRegex = /\<.*?\>/m;

        const time = log.match(bracketRegex)[0];
        log = log.replace(bracketRegex, '');

        const [thread, level] = this.multiReplacer(log.match(bracketRegex)[0], '', '[', ']').split('/');
        log = this.splitAtIndex(log.replace(bracketRegex, ''), ':', 0).trim();


        const player = this.multiReplacer(log.match(chatRegex)?.[0], '', '<', '>') || null;
        log = log.replace(chatRegex, '');

        if (!player) {
            //NO Chat
            if (log.includes('issued server command')) {
                //Command Execution
                // [11:01:03] [Server thread/INFO]: JoduCoding issued server command: /tps
                console.log('Got Command Execution');
                console.log(log.split(' ')[0]);
            }
            if (log.includes('logged in')) {
                //Login
                // [11:01:23] [Server thread/INFO]: Jodu555[/0.0.0.0:9905] logged in with entity id 1157 at ([world]-256, 94.0, 247)
                console.log('Got Log in');
                console.log(log.split(' ')[0]);
            }
            if (log.includes('lost connection')) {
                //Logout
                // [23:30:05] [Server thread/INFO]: Jodu555 lost connection: Disconnected
                console.log('Got Log out');
                console.log(log.split(' ')[0]);
            }
        } else {
            //YES Chat
            log = log.trim();
            // console.log({ time, info: { thread, level }, player, log });
        }
    }

    multiReplacer(string, replacor, ...param) {
        if (!string)
            return string;
        param.forEach(p => string = string.replace(p, replacor));
        return string;
    }

    splitAtIndex(str, splitter, idx) {
        const arr = [];
        str.split(splitter).forEach((l, i) => {
            if (i > idx)
                arr.push(l);
        });
        return arr.join(splitter);
    }
}

module.exports = LogParser;