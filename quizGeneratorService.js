/*global conquizgamer*/
conquizgamer.factory('quizGeneratorService', [
  '$http',
  '$filter',
  function ($http, $filter) {
    'use strict';
    return {
      generate: function (templates, games) {
        var template, game, question, subject, answers, i, j;
        templates = $filter('filter')(templates, {"subcategory": "is"});
        template = templates[Math.floor(Math.random() * templates.length)];
        games = $filter('filter')(games, function (value, index, array) {
          return value.hasOwnProperty(template.category);
        });
        game = games.splice(Math.floor(Math.random() * games.length), 1)[0];
        subject = game[template.category];
        if (Array.isArray(subject)) {
          subject = subject[Math.floor(Math.random() * subject.length)];
        }
        answers = [];
        while (games.length > 0) {
          j = Math.floor(Math.random() * games.length);
          answers.push(games.splice(j, 1)[0].name);
        }
        answers.splice(
          Math.floor(Math.random() * answers.length),
          0,
          game.name
        );
        question = template.question.replace('%s', subject);
        return {
          question: question,
          answers: answers,
          correct: game.name
        };
      }
    };
  }
]);
