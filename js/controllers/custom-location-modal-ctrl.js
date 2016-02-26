app.components
    .controller('CustomLocationModalCtrl', LctnController);

LctnController.inject = ['$scope', '$http', '$uibModalInstance'];

function LctnController($scope, $http, $uibModalInstance) {
    $scope.ok = function() {
        var response = {
            'message': $scope.user.postcode,
        }
        $uibModalInstance.close(response);
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
}
