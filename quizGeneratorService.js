/*global conquizgamer*/
conquizgamer.factory('quizGeneratorService', [
  '$http',
  '$filter',
  function ($http, $filter) {
    'use strict';
    return {
      generate: function (templates, games) {
        var
          answers,
          filtered,
          game,
          i,
          j,
          question,
          subject,
          template;
        templates = $filter('filter')(templates, {"subcategory": "is"});
        template = templates[Math.floor(Math.random() * templates.length)];
        filtered = $filter('filter')(games, function (value, index, array) {
          return value.hasOwnProperty(template.category);
        });
        game = filtered.splice(
          Math.floor(Math.random() * filtered.length),
          1
        )[0];
        subject = game[template.category];
        if (Array.isArray(subject)) {
          subject = subject[Math.floor(Math.random() * subject.length)];
        }
        games = $filter('filter')(games, function (value, index, array) {
          if (!(value.hasOwnProperty(template.category))) {
            return true;
          }
          if (Array.isArray(value[template.category])) {
            return !(value[template.category].includes(subject));
          }
          return value[template.category] !== subject;
        });
        answers = [];
        for (i = 0; i < 5; i += 1) {
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
