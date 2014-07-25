(function() {
  (function() {
    "use strict";
    var client, connection, draggable, id;
    id = guid();
    connection = $.connection('/blocksConnection');
    connection.start();
    draggable = $('.persistent [draggable]').draggable({
      drag: function(event, ui) {
        return connection.start().done(function() {
          return connection.send({
            method: "drag",
            sender: id,
            top: ui.position.top,
            left: ui.position.left
          });
        });
      }
    }).css("background-color", "#" + id.substr(0, 6));
    connection.received(function(data) {
      return client[data.method](data.top, data.left, data.sender);
    });
    return client = {
      move: function(top, left, sender) {
        if (sender !== id) {
          return draggable.css({
            top: top,
            left: left
          });
        }
      }
    };
  })();

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
