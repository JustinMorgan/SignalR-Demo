(function () {
    "use strict";
    angular.module('Feeds')
        .controller('List', [
            '$scope', 'FeedsResource',
            function ($scope, FeedsResource) {
                var count = 1,
                    maxWallLength = 30;

                $.extend($scope, {
                    items: FeedsResource.api.list(),
                    wallLength: 10,
                    post: {
                        Body: 'test 1',
                        FeedName: Math.ceil(Math.random() * 5)
                    },
                    addPost: function () {
                        FeedsResource.hub.trigger('post', $.extend($scope.post, {
                            DateTime: new Date(),
                            Id: guid()
                        }));
                        $scope.post.Body = "test " + (++count);
                    }
                });

                FeedsResource.hub.on('publish', function (data) {
                    $scope.items.unshift(data);
                    while ($scope.items.length > maxWallLength) {
                        $scope.items.pop();
                    }
                    $scope.$apply();
                    $(document).trigger('newPost');
                });
            }
        ]);
})();