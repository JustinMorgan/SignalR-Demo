(function() {
  (function() {
    "use strict";
    var draggable, hub, id;
    id = guid();
    hub = $.connection.blocksHub;
    $.connection.hub.start();
    draggable = $('.hub [draggable]').draggable({
      drag: function(event, ui) {
        return $.connection.hub.start().done(function() {
          return hub.server.drag(id, ui.position.top, ui.position.left);
        });
      }
    }).css("background-color", "#" + id.substr(0, 6));
    return hub.client.move = function(top, left, sender) {
      if (sender !== id) {
        return draggable.css({
          top: top,
          left: left
        });
      }
    };
  })();

}).call(this);
