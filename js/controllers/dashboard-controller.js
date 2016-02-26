app.components
    .controller('DashboardCtrl', DashboardController);

DashboardController.inject = ['$scope', '$state', '$http'];

function DashboardController($scope, $state, $http) {
    $scope.lat = "0";
    $scope.lng = "0";
    $scope.accuracy = "0";
    $scope.error = "";
    $scope.model = { myMap: undefined };
    $scope.myMarkers = [];
    $scope.weatherData = null;

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
        $scope.myMarkers.push(
            new google.maps.Marker({ map: $scope.model.myMap, position: latlng })
        );

        var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=aa03c952ea4dba3db6561d5fc09a4052' + '&lat=' + position.coords.latitude + '&lon=' + position.coords.longitude;

        $http.get(weatherUrl)
            .then(function(response) {
                if(response.status == 200){
                    $scope.weatherData = {
                        humidity: response.data.main.humidity,
                        pressure: response.data.main.pressure,
                        temp: response.data.main.temp - 273.15,
                        icon: 'http://openweathermap.org/img/w/'+response.data.weather[0].icon+'.png'
                    }
                }
            }, function(error) {
                console.log(error);
            })
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
