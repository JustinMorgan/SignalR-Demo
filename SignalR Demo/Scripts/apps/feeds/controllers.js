(function () {
    "use strict";
    angular.module('Feeds')
        .controller('List', [
            '$scope', 'FeedsResource',
            function ($scope, FeedsResource) {
                var count = 1,
                    maxWallLength = 30;

                $.extend($scope, {
                    items: [],
                    addFeed: '',
                    post: {
                        Body: 'test 1'
                    },
                    addPost: function () {
                        $scope.post.DateTime = new Date();
                        FeedsResource.trigger('post', $.extend({}, $scope.post));
                        $scope.post.Body = "test " + (++count);
                    },
                    subscribe: function (feedName) {
                        FeedsResource.trigger('subscribe', feedName);
                        return false;
                    },
                });

                FeedsResource.on('publish', function (data) {
                    $scope.items.unshift(data);
                    while ($scope.items.length > maxWallLength) {
                        $scope.items.pop();
                    }
                    $scope.$apply();
                });
            }
        ]);
})();