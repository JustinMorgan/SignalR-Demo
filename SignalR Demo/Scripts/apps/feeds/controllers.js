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
                        Body: 'test 1',
                        FeedName: Math.ceil(Math.random() * 5)
                    },
                    addPost: function () {
                        FeedsResource.trigger('post', $.extend($scope.post, {
                            DateTime: new Date(),
                            Id: guid()
                        }));
                        $scope.post.Body = "test " + (++count);
                    }
                });

                FeedsResource.on('publish', function (data) {
                    $scope.items.unshift(data);
                    while ($scope.items.length > maxWallLength) {
                        $scope.items.pop();
                    }
                    $scope.$apply();
                    $(document).trigger('newPost');
                });
            }
        ]);

    //from http://stackoverflow.com/a/8809472/399649
    function guid() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
        return uuid;
    };
})();