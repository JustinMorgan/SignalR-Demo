(function() {
  "use strict";  angular.module('Feeds').factory('FeedsResource', [
    '$resource', function($resource) {
      var hub, trigger, _on;

      hub = $.connection.feedHub;
      trigger = function(clientEvent, data, retriesLeft) {
        if (retriesLeft == null) {
          retriesLeft = 5;
        }
        return hub.server[clientEvent](data).fail(function() {
          if (retriesLeft) {
            console.log('retrying', retriesLeft, data.Body);
            return setTimeout(function() {
              console.log('triggering', retriesLeft, data.Body);
              return trigger(clientEvent, data, retriesLeft - 1);
            }, 1000 * (5 - retriesLeft));
          } else {
            return console.warn('ERROR: Could not connect to the feed server.' + 'Please check your Internet connection.');
          }
        });
      };
      _on = function(serverEvent, handler) {
        return hub.client[serverEvent] = handler;
      };
      $.connection.hub.start();
      $.connection.hub.disconnected(function() {
        return setTimeout(function() {
          return $.connection.hub.start();
        }, 5000);
      });
      return {
        hub: {
          trigger: trigger,
          on: _on
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
