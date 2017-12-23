'use strict';

module.exports = function (dep) {

    let cmd = {};
    cmd.command = 'help';
    cmd.desc = 'help edocs cli';
    cmd.builder = {};
    cmd.handler = function (argv) {
        const {join, shell, fs, mkdirp, log} = dep;

        log.debug('Versão: 0.1.0', 'info')
    };
    return cmd
};
