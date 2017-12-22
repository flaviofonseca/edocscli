(function () {
    'use strict';

    angular
        .module('sigModule')
        .controller('PesquisaCasoUsoController', PesquisaCasoUsoController);

    /*@ngInject*/
    function PesquisaCasoUsoController() {
        var vm = this;
        vm.onConfigurarGrid = onConfigurarGrid;
       
        function onConfigurarGrid($gridScope){
            var coluna = {};
            
            coluna.field = 'id';
            coluna.name = 'Código';
            coluna.width = '120';
            $gridScope.addColuna(coluna);

            coluna = {};
            coluna.field = 'ds';
            coluna.name = 'Descrição';
            $gridScope.addColuna(coluna);
        }
    }
})();
