/*global conquizgamer, answerEvaluaterService */
conquizgamer.controller('conquizgamerController', [
  '$filter',
  '$http',
  '$interval',
  '$q',
  '$scope',
  '$timeout',
  'quizGeneratorService',
  function (
    $filter,
    $http,
    $interval,
    $q,
    $scope,
    $timeout,
    quizGeneratorService
  ) {
    'use strict';
    $scope.totalPoints = 0;
    $scope.fails = 0;
    $q.all([
      $http.get('assets/data/templates.json'),
      $http.get('assets/data/games.json')
    ]).then(function (requests) {
      $scope.templates = requests[0].data;
      $scope.games = requests[1].data;
      $scope.remaining = $scope.games.slice();
      $scope.quiz = quizGeneratorService.generate(
        $scope.templates,
        $scope.remaining
      );
    });
    $scope.points = 5;
    $interval(function () {
      if ($scope.points > 0 && !$scope.evaluating) {
        $scope.quiz.answers[
          $scope.quiz.answers.length - $scope.points
        ].disabled = 'disabled';
        $scope.points -= 1;
        if ($scope.points === 0) {
          $scope.evaluate({text: ''});
        }
      }
    }, 3000);
    $scope.evaluate = function (answer) {
      if ($scope.evaluating) {
        return;
      }
      $scope.evaluating = true;
      $scope.quiz.answers[0].color = 'w3-green';
      if ($scope.quiz.answers[0].text === answer.text) {
        $scope.totalPoints += $scope.points;
      } else {
        answer.color = 'w3-red';
        $scope.fails += 1;
      }
      $timeout(function () {
        $scope.quiz = quizGeneratorService.generate(
          $scope.templates,
          $scope.remaining
        );
        $scope.points = 5;
        if ($scope.fails > 2) {
          $scope.totalPoints = 0;
          $scope.fails = 0;
          $scope.remaining = $scope.games.slice();
        }
        $scope.evaluating = false;
      }, 3000);
    };
  }
]);
