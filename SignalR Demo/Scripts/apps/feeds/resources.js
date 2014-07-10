(function () {
    "use strict";
    angular.module('Feeds')
        .factory('FeedsResource', [
            function () {
                //$resource('api/feeds/:id', { id: '@id' }, {
                //    list: { method: 'GET', url: 'api/feeds', isArray: true }
                //});

                var hub = $.connection.feedHub,
                    trigger = function (clientEvent, data, retriesLeft) {
                        retriesLeft = retriesLeft || 5;

                        hub.server[clientEvent](data)
                            .fail(function () {
                                if (retriesLeft) {
                                    console.log('retrying', retriesLeft);
                                    setTimeout(function () {
                                        console.log('triggering', retriesLeft);
                                        trigger(clientEvent, data, retriesLeft - 1);
                                    }, 100);
                                } else {
                                    console.log('Could not connect to the feed server. Please check your Internet connection.');
                                }
                            });
                    },
                    on = function (serverEvent, handler) {
                        hub.client[serverEvent] = handler;
                    };

                $.connection.hub.start();
                $.connection.hub.disconnected(function () {
                    setTimeout($.connection.hub.start, 5000); // Restart connection after 5 seconds
                });

                return {
                    trigger: trigger,
                    on: on
                };
            }
        ]);
})();