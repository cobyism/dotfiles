Color = require 'pigments'

module.exports =
class PaletteItem
  constructor: ({@name, @filePath, @row, @lineRange, @lineText, @colorString, @language, @extension}) ->
    @color = new Color @colorString

  getRange: ->
    [[@row, @lineRange[0]], [@row, @lineRange[1]]]

  serialize: ->
    {@name, @filePath, @row, @lineRange, @lineText, @colorString, @language}
