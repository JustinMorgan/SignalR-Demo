# CoffeeScript
"use strict";
angular.module('Feeds')
    .factory('FeedsResource', ['$resource',
        ($resource) ->
            feedHub = $.connection.feedHub

            do $.connection.hub.start
            $.connection.hub.disconnected () ->
                setTimeout () -> 
                  do $.connection.hub.start
                , 5000 #Restart connection after 5 seconds

            #returned object has "hub" and "api" hooks
            result =
              hub:
                trigger: (clientEvent, data, retriesLeft = 5) ->
                  feedHub.server[clientEvent](data)
                      .fail () ->
                        if retriesLeft
                          console.debug 'retrying', retriesLeft, data.Body
                          setTimeout () ->
                              console.debug 'triggering', retriesLeft, data.Body
                              result.hub.trigger clientEvent, data, retriesLeft - 1 
                          , 1000 * (5 - retriesLeft)
                        else
                            console.warn 'ERROR: Could not connect to the feed server.' +
                                         'Please check your Internet connection.'
                on: (serverEvent, handler) ->
                  feedHub.client[serverEvent] = handler
              api: $resource(
                      'api/feeds/:id'
                      { id: '@id' }
                      { list: 
                          method: 'GET'
                          url: 'api/feeds'
                          isArray: true
                        update:
                          method: 'PUT'
                      })
    ])