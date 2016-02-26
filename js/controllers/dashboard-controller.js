app.components
    .controller('DashboardCtrl', DashboardController);

DashboardController.inject = ['$scope', '$state'];

function DashboardController($scope, $state) {
    init();

    function init() {
        console.log('Dashboard ctrl is initializing...');
    }
}