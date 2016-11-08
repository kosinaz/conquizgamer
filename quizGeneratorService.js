/*global conquizgamer*/
conquizgamer.factory('quizGeneratorService', [
  '$http',
  function ($http) {
    'use strict';
    var games = {};
    $http.get('games.json').then(function (response) {
      games = response.data;
    });
    return {
      generate: function () {
        return games[0] ? {
          question: 'What is the genre of ' + games[0].name + '?',
          answers: [
            games[0].genre,
            games[1].genre,
            games[2].genre,
            games[3].genre
          ],
          correct: games[0].genre
        } : {
          question: '',
          answers: [
            'Start'
          ]
        };
      }
    };
  }
]);
