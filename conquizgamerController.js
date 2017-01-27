/*global conquizgamer, answerEvaluaterService */
conquizgamer.controller('conquizgamerController', [
  '$filter',
  '$http',
  '$interval',
  '$q',
  '$scope',
  'quizGeneratorService',
  function (
    $filter,
    $http,
    $interval,
    $q,
    $scope,
    quizGeneratorService
  ) {
    'use strict';
    $scope.totalPoints = 0;
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
    $scope.points = 5;
    $interval(function () {
      if ($scope.points > 0) {
        $scope.quiz.answers[
          $scope.quiz.answers.length - $scope.points
        ].disabled = "disabled";
        $scope.points -= 1;
      }
    }, 3000);
    $scope.evaluate = function (answer) {
      if ($scope.quiz.answers[0].text === answer.text) {
        $scope.totalPoints += $scope.points;
      }
      $scope.quiz = quizGeneratorService.generate(
        $scope.templates,
        $scope.games
      );
      $scope.points = 5;
    };
  }
]);
