(function() {
  "use strict";
  angular.module('Feeds').factory('FeedsResource', [
    '$resource', function($resource) {
      var feedHub, result;
      feedHub = $.connection.feedHub;
      $.connection.hub.start();
      $.connection.hub.disconnected(function() {
        return setTimeout(function() {
          return $.connection.hub.start();
        }, 5000);
      });
      return result = {
        hub: {
          trigger: function(clientEvent, data, retriesLeft) {
            if (retriesLeft == null) {
              retriesLeft = 5;
            }
            return feedHub.server[clientEvent](data).fail(function() {
              if (retriesLeft) {
                console.debug('retrying', retriesLeft, data.Body);
                return setTimeout(function() {
                  console.debug('triggering', retriesLeft, data.Body);
                  return result.hub.trigger(clientEvent, data, retriesLeft - 1);
                }, 1000 * (5 - retriesLeft));
              } else {
                return console.warn('ERROR: Could not connect to the feed server.' + 'Please check your Internet connection.');
              }
            });
          },
          on: function(serverEvent, handler) {
            return feedHub.client[serverEvent] = handler;
          }
        },
        api: $resource('api/feeds/:id', {
          id: '@id'
        }, {
          list: {
            method: 'GET',
            url: 'api/feeds',
            isArray: true
          },
          update: {
            method: 'PUT'
          }
        })
      };
    }
  ]);

}).call(this);
