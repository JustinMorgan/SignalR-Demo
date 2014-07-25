#--------- Persistent connection version ----------------
do () ->
  "use strict";  
  id = do guid
  connection = $.connection '/blocksConnection'
  do connection.start

  draggable = $('.persistent [draggable]').draggable 
    drag: (event, ui) ->
      connection.start().done () ->
        connection.send 
          method: "drag"
          sender: id
          top: ui.position.top
          left: ui.position.left
  .css "background-color", "#" + id.substr(0, 6)

  connection.received (data) ->
    client[data.method](data.top, data.left, data.sender);

  client = 
    move: (top, left, sender) -> 
      if sender isnt id  
        draggable.css {
          top
          left
        }

#---------- Hub version ------------------------
do () ->
  "use strict";
  id = do guid
  hub = $.connection.blocksHub
  do $.connection.hub.start

  draggable = $('.hub [draggable]').draggable 
    drag: (event, ui) ->
      $.connection.hub.start().done () ->
        hub.server.drag id, ui.position.top, ui.position.left
  .css "background-color", "#" + id.substr(0, 6)

  hub.client.move = (top, left, sender) -> 
    if sender isnt id  
      draggable.css {
        top
        left
      }