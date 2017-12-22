(function () {
    'use strict';
    BUILD_VERSION
    angular
        .module('sigModule')
        .controller('CadastroCasoUso', CadastroCasoUso);

    /*@ngInject*/
    function CadastroCasoUso(CasoUsoService) {
        var vm = this;

        vm.pdService = CasoUsoService.getPdService();
        vm.onIniciar = onIniciar;

        function onIniciar(){
        }
    }
})();
