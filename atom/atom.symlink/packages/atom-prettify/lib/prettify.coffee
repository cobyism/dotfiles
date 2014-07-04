RangeFinder = require './range-finder'
beautify = require('js-beautify').html

module.exports =
  activate: ->
    atom.workspaceView.command 'prettify:prettify', '.editor', ->
      editor = atom.workspaceView.getActivePaneItem()
      prettify(editor)

prettify = (editor) ->
  sortableRanges = RangeFinder.rangesFor(editor)
  sortableRanges.forEach (range) ->
    text = editor.getTextInBufferRange(range)
    text = beautify text,
      "indent_size": 2
    editor.setTextInBufferRange(range, text)
