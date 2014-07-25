(function() {
  "use strict";
  var connection, draggable, hub, id, info, methods, output;

  info = $('#info');

  output = $('#output');

  id = guid();

  (connection = $.connection('/blocksConnection')).start();

  draggable = $('[draggable]').draggable({
    drag: function(event, ui) {
      connection.send({
        method: "drag",
        sender: id,
        coords: {
          top: ui.position.top,
          left: ui.position.left
        }
      });
      return info.text("position: { \n  top: " + ui.position.top + ", \n  left: " + ui.position.left + " \n};\noffset: { \n  top: " + ui.offset.top + ", \n  left: " + ui.offset.left + " \n};\nid: \"" + id + "\"");
    }
  }).css("background-color", "#" + id.substr(0, 6));

  methods = {
    move: function(_arg, sender) {
      var left, top;
      top = _arg.top, left = _arg.left;
      output.text(" \nreceived: {\n  top: " + top + ", \n  left: " + left + " \n}; \nsender: \"" + sender + "\" ");
      if (sender !== id) {
        return draggable.css({
          top: top,
          left: left
        });
      }
    }
  };

  connection.received(function(data) {
    return methods[data.method](data.coords, data.sender);
  });

  id = guid();

  (connection = $.connection('/blocksConnection')).start();

  draggable = $('.persistent [draggable]').draggable({
    drag: function(event, ui) {
      return connection.send({
        method: "drag",
        sender: id,
        coords: {
          top: ui.position.top,
          left: ui.position.left
        }
      });
    }
  }).css("background-color", "#" + id.substr(0, 6));

  methods = {
    move: function(_arg, sender) {
      var left, top;
      top = _arg.top, left = _arg.left;
      if (sender !== id) {
        return draggable.css({
          top: top,
          left: left
        });
      }
    }
  };

  connection.received(function(data) {
    return methods[data.method](data.coords, data.sender);
  });

  id = guid();

  (hub = $.connection.blockHub).start();

  draggable = $('.hub [draggable]').draggable({
    drag: function(event, ui) {
      return hub.server.drag({
        sender: id,
        coords: {
          top: ui.position.top,
          left: ui.position.left
        }
      });
    }
  }).css("background-color", "#" + id.substr(0, 6));

  hub.client.move = function(_arg, sender) {
    var left, top;
    top = _arg.top, left = _arg.left;
    if (sender !== id) {
      return draggable.css({
        top: top,
        left: left
      });
    }
  };

}).call(this);
