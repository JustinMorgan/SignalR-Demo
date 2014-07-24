(function() {
  "use strict";
  var connection, draggable, id, info, output;

  info = $('#info');

  output = $('#output');

  connection = $.connection('/blocksConnection');

  connection.start();

  id = guid();

  draggable = $('[draggable]').draggable({
    drag: function(event, ui) {
      connection.start().done(function() {
        return connection.send({
          top: ui.position.top,
          left: ui.position.left,
          sender: id
        });
      });
      return info.text("position: { top: " + ui.position.top + ", left: " + ui.position.left + " };\noffset: { top: " + ui.offset.top + ", left: " + ui.offset.left + " };\nid: \"" + id + "\"");
    }
  });

  draggable.css("background-color", "#" + id.substr(0, 6));

  connection.received(function(data) {
    var left, sender, top, _ref;
    _ref = JSON.parse(data), top = _ref.top, left = _ref.left, sender = _ref.sender;
    output.text(" \nreceived: {\n  top: " + top + ", \n  left: " + left + " \n}; \nsender: \"" + sender + "\" ");
    if (sender !== id) {
      return draggable.css({
        top: top,
        left: left
      });
    }
  });

}).call(this);
