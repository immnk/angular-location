app.components.controller('MenuCtrl', MenuController);
MenuController.inject = ['$scope'];

function MenuController($scope) {
    init();

    function init() {
        console.log('Menu is initializing...');
    }
}
