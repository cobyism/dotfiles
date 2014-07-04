{Emitter} = require 'emissary'
PaletteItem = require './palette-item'

module.exports =
class Palette
  Emitter.includeInto(this)

  constructor: ({items}={}) ->
    items ||= []
    @items = []

    for item in items
      @addItem new PaletteItem item

  addItem: (item) ->
    @items.push item unless item in @items

  removeItem: (item) ->
    if item in @items
      @items.splice @items.indexOf(item), 1

  getItemByName: (name) ->
    @items.filter((item) -> item.name is name)[0]

  getItemsForPath: (filePath) ->
    @items.filter (item) -> item.filePath is filePath

  getItemsForPathInRange: (filePath, range) ->
    [[mStartRow, mStartCol], [mEndRow, mEndCol]] = range
    @getItemsForPath(filePath).filter (item) ->
      [[startRow, startCol], [endRow, endCol]] = item.getRange()

      startRow >= mStartRow and
      startColumn >= mStartCol and
      endRow <= mEndRow and
      endCol <= mEndCol

  serialize: -> { items: @items.map (i) -> i.serialize() }
