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