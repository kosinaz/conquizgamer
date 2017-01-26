/*global conquizgamer, answerEvaluaterService */
conquizgamer.controller('conquizgamerController', [
  '$scope',
  '$http',
  '$q',
  'answerEvaluaterService',
  'quizGeneratorService',
  function ($scope, $http, $q, answerEvaluaterService, quizGeneratorService) {
    'use strict';
    $scope.templatesResponse = $http.get('templates.json');
    $scope.gamesResponse = $http.get('games.json');
    $q.all([$scope.gamesResponse, $scope.templatesResponse])
      .then(function (values) {
        $scope.templates = values[1].data;
        $scope.games = values[0].data;
        $scope.quiz = quizGeneratorService.generate(
          $scope.templates,
          $scope.games
        );
      });
    $scope.points = 0;
    $scope.evaluate = function (answer) {
      $scope.points += answerEvaluaterService.evaluate($scope.quiz, answer);
      $scope.quiz = quizGeneratorService.generate(
        $scope.templates,
        $scope.games
      );
    };
  }
]);
