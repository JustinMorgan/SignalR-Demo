"use strict";

info = $ '#info' 
output = $ '#output' 
connection = $.connection '/blocksConnection' 
do connection.start
id = do guid

draggable = $('[draggable]').draggable 
  drag: (event, ui) ->
    connection.start().done () ->
      connection.send 
        top: ui.position.top
        left: ui.position.left
        sender: id
    info.text """
      position: { top: #{ui.position.top}, left: #{ui.position.left} };
      offset: { top: #{ui.offset.top}, left: #{ui.offset.left} };
      id: \"#{id}\"
    """

draggable.css("background-color", "#" + id.substr 0, 6)

connection.received (data) ->
  {top, left, sender} = JSON.parse data 
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