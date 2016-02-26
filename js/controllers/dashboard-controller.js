app.components
    .controller('DashboardCtrl', DashboardController);

DashboardController.inject = ['$scope', '$state'];

function DashboardController($scope, $state) {
    $scope.lat = "0";
    $scope.lng = "0";
    $scope.accuracy = "0";
    $scope.error = "";
    $scope.model = { myMap: undefined };

    $scope.showError = function(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                $scope.error = "User denied the request for Geolocation."
                break;
            case error.POSITION_UNAVAILABLE:
                $scope.error = "Location information is unavailable."
                break;
            case error.TIMEOUT:
                $scope.error = "The request to get user location timed out."
                break;
            case error.UNKNOWN_ERROR:
                $scope.error = "An unknown error occurred."
                break;
        }
        $scope.$apply();
    }

    $scope.showResult = function() {
        return $scope.error == "";
    }

    $scope.mapOptions = {
        center: new google.maps.LatLng($scope.lat, $scope.lng),
        zoom: 15,
        disableDoubleClickZoom: false,
        draggable: false,
        keyboardShortcuts: false,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.showPosition = function(position) {
        $scope.lat = position.coords.latitude;
        $scope.lng = position.coords.longitude;
        $scope.accuracy = position.coords.accuracy;
        $scope.$apply();

        var latlng = new google.maps.LatLng($scope.lat, $scope.lng);
        $scope.model.myMap.setCenter(latlng);
    }

    $scope.getLocation = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
        } else {
            $scope.error = "Geolocation is not supported by this browser.";
        }
    }

    function init() {
        console.log('Dashboard ctrl is initializing...');
        $scope.getLocation();
    }

    init();
}
