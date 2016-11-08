/*global conquizgamer, answerEvaluaterService */
conquizgamer.controller('conquizgamerController', [
  '$scope',
  'answerEvaluaterService',
  'quizGeneratorService',
  function ($scope, answerEvaluaterService, quizGeneratorService) {
    'use strict';
    $scope.points = 0;
    $scope.quiz = quizGeneratorService.generate();
    $scope.evaluate = function (answer) {
      $scope.points += answerEvaluaterService.evaluate($scope.quiz, answer);
      $scope.quiz = quizGeneratorService.generate();
    };
  }
]);
