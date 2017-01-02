var app = angular.module('kisCicApp', []);

const apiRoot = 'https://kiscicapp.herokuapp.com/api';

app

.component('indexNews', {
  templateUrl: 'templates/news.html',
  controller: indexNewsController
})

.component('origoNews', {
  templateUrl: 'templates/news.html',
  controller: origoNewsController
})

.component('weatherComponent', {
  templateUrl: 'templates/weather.html',
  controller: weatherController
});

function indexNewsController ($scope, $http) {
  $scope.articles = [];
  $scope.image = './img/news-cat.svg';
  $scope.categories = false;
  $scope.getArticles = function () {
    $http.get(apiRoot + '/indexhu').then(
      function (res) {
        console.log(res);
        $scope.articles = [res.data[0], res.data[1], res.data[2]];
      },
      function (err) {
        $scope.articles = [];
      }
    );
  }
}

function origoNewsController ($scope, $http) {
  $scope.articles = [];
  $scope.image = './img/sports-cat.svg';
  $scope.categories = true;
  $scope.cats = [
    {
      src: './img/hu-cat.svg',
      url: apiRoot + '/origohu/itthon'
    },
    {
      src: './img/sports-cat.svg',
      url: apiRoot + '/origohu/sport'
    },
    {
      src: './img/movie-cat.svg',
      url: apiRoot + '/origohu/filmklub'
    },
    {
      src: './img/science-cat.svg',
      url: apiRoot + '/origohu/tudomany'
    }
  ];
  $scope.activeIndex = 1;
  $scope.isOpen === false;
  $scope.swapCat = function (index) {
    if (index === $scope.activeIndex) {
      $scope.isOpen = true;
    }
    else {
      $scope.isOpen = false;
      $scope.cats[index].active = true;
      $scope.cats[$scope.activeIndex].active = false;
      $scope.activeIndex = index;
      $scope.getArticles($scope.cats[index].url);
    }
  }
  $scope.getArticles = function (url) {
    $http.get(url || apiRoot + '/origohu/sport').then(
      function (res) {
        $scope.articles = [res.data[0], res.data[1], res.data[2]];
      },
      function (err) {
        $scope.articles = [];
      }
    );
  }
}

function weatherController ($scope, $http) {
  $scope.weather = null;
  $scope.image = './img/weather-cat.svg';
  $scope.getWeather = function () {
    $http.get(apiRoot + '/weather/budapest').then(
      function (res) {
        $scope.weather = res.data;
      },
      function (err) {
        $scope.weather = null;
      }
    )
  }
}
