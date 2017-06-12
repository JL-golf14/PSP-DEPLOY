
var app = angular.module('ConnectApp', ['ngRoute','firebase', 'ui.bootstrap', 'ngMaterial', 'material.svgAssetsCache', '720kb.tooltips']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/home', {
    templateUrl: 'views/home.html',
    controller: 'HomeController',
    controllerAs: 'hc',
    onEnter: scrollContent
  })
  .when('/header', {
    templateUrl: 'views/header.html',
    controller: 'HeaderController',
    controllerAs: 'hrc',
    onEnter: scrollContent
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginController',
    controllerAs: 'lc',
    onEnter: scrollContent
  })
  .when('/idea', {
    templateUrl: 'views/idea.html',
    controller: 'IdeaController',
    controllerAs: 'ic',
    onEnter: scrollContent
  })
  .when('/flag/:id?/:user_id?/:idea_id?', {
    templateUrl: 'views/flag.html',
    controller: 'FlagController',
    controllerAs: 'fc',
    onEnter: scrollContent
  })
  .when('/comment/:id', {
    templateUrl: 'views/comments.html',
    controller: 'CommentController',
    controllerAs: 'cc',
    onEnter: scrollContent
  })
  .when('/subtopics/:id', {
    templateUrl: 'views/subtopics.html',
    controller: 'SubtopicsController',
    controllerAs: 'stc',
    onEnter: scrollContent
  })
  .when('/admin-manage-users', {
    templateUrl: 'views/admin-views/admin-manage-users.html',
    controller: 'AdminManageUsersController',
    controllerAs: 'amuc',
    onEnter: scrollContent
  })
  .when('/admin-flags', {
    templateUrl: 'views/admin-views/admin-flags.html',
    controller: 'AdminFlaggedController',
    controllerAs: 'afc',
    onEnter: scrollContent
  })
  .when('/admin-reports', {
    templateUrl: 'views/admin-views/admin-reports.html',
    controller: 'AdminReportsController',
    controllerAs: 'arc',
    onEnter: scrollContent
  })
  .when('/admin-topics', {
    templateUrl: 'views/admin-views/admin-topics.html',
    controller: 'AdminTopicsController',
    controllerAs: 'atc',
    onEnter: scrollContent
  })
  .when('/403', {
    templateUrl: 'views/templates/403.html'
    // controller: 'AdminTopicsController',
    // controllerAs: 'atc',
    // onEnter: scrollContent
  })
  .otherwise({
    redirectTo: 'home',
    onEnter: scrollContent
  });


  var scrollContent = function() {
    $window.scrollTo(0, 0);
  };

}]);
