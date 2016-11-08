/*global conquizgamer*/
conquizgamer.factory('answerEvaluaterService', [
  function () {
    'use strict';
    return {
      evaluate: function (quiz, answer) {
        return quiz.correct === answer ? 1 : 0;
      }
    };
  }
]);
