# CoffeeScript
"use strict";
angular.module('Feeds')
    .factory('FeedsResource', [
        () ->
            #$resource('api/feeds/:id', { id: '@id' }, {
            #    list: { method: 'GET', url: 'api/feeds', isArray: true }
            #});

            hub = $.connection.feedHub

            trigger = (clientEvent, data, retriesLeft = 5) ->
                hub.server[clientEvent](data)
                    .fail () ->
                      if retriesLeft
                        console.log 'retrying', retriesLeft, data.Body
                        setTimeout () ->
                            console.log 'triggering', retriesLeft, data.Body
                            trigger clientEvent, data, retriesLeft - 1 
                        , 1000 * (5 - retriesLeft)
                      else
                          console.warn 'ERROR: Could not connect to the feed server.' +
                                       'Please check your Internet connection.'

            _on = (serverEvent, handler) ->
                hub.client[serverEvent] = handler

            $.connection.hub.start()
            $.connection.hub.disconnected () ->
                setTimeout () -> 
                  $.connection.hub.start()
                , 5000 #Restart connection after 5 seconds

            trigger: trigger,
            on: _on
    ])