(function () {
    'use strict';

    angular
        .module('sigModule')
        .service('CasoUsoService', CasoUsoService);

    /*@ngInject*/
    function CasoUsoService(PdService) {
        this.getPdService = getPdService;

        function getPdService() {
            var ps = new PdService('casoUsoController', 'id', 'descricao');
            ps.viewCadastro = 'caso-uso';
            ps.viewPesquisa = 'caso-uso';
            return ps;
        }
    }
})();