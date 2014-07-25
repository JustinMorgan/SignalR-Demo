"use strict";

info = $ '#info' 
output = $ '#output' 
id = do guid
do (connection = $.connection '/blocksConnection').start

draggable = $('[draggable]').draggable 
    drag: (event, ui) ->
      connection.send 
        method: "drag"
        sender: id
        coords:
          top: ui.position.top
          left: ui.position.left
      info.text """
        position: { 
          top: #{ui.position.top}, 
          left: #{ui.position.left} 
        };
        offset: { 
          top: #{ui.offset.top}, 
          left: #{ui.offset.left} 
        };
        id: \"#{id}\"
      """
  .css "background-color", "#" + id.substr(0, 6)
  
methods = 
  move: ({top, left}, sender) -> 
    output.text """ 
        received: {
          top: #{top}, 
          left: #{left} 
        }; 
        sender: \"#{sender}\" 
      """
    if sender isnt id  
      draggable.css {
        top
        left
      }

connection.received (data) ->
  methods[data.method](data.coords, data.sender);

#--------------------------------------
id = do guid
do (connection = $.connection '/blocksConnection').start

draggable = $('.persistent [draggable]').draggable 
    drag: (event, ui) ->
      connection.send 
        method: "drag"
        sender: id
        coords:
          top: ui.position.top
          left: ui.position.left
  .css "background-color", "#" + id.substr(0, 6)

methods = 
  move: ({top, left}, sender) -> 
    if sender isnt id  
      draggable.css {
        top
        left
      }

connection.received (data) ->
  methods[data.method](data.coords, data.sender);
#--------------------------------------
id = do guid
do (hub = $.connection.blockHub).start

draggable = $('.hub [draggable]').draggable 
    drag: (event, ui) ->
      hub.server.drag
        sender: id
        coords:
          top: ui.position.top
          left: ui.position.left
  .css "background-color", "#" + id.substr(0, 6)

hub.client.move = ({top, left}, sender) -> 
    if sender isnt id  
      draggable.css {
        top
        left
      }
#--------------------------------------