'use strict';

module.exports = function (dep) {

    let cmd = {};
    cmd.command = 'version';
    cmd.desc = 'versão edocs cli';
    cmd.builder = {};
    cmd.handler = function (argv) {
        const {join, shell, fs, mkdirp, log} = dep;
        const {version} = require(join(process.cwd(), '/package.json'));

        log.debug('Versão: 0.2.2', 'info')
    };
    return cmd
};
