{ScrollView} = require 'atom'
ProjectPaletteColorView = require './project-palette-color-view'

module.exports =
class CoffeeCompileView extends ScrollView
  @content: ->
    @div class: 'palette tool-panel padded native-key-bindings', tabIndex: -1, =>
      @div class: 'palette-controls', =>
        @div class: 'inline-block btn-group', =>
          @button outlet: 'gridSwitch', class: 'btn', 'Grid'
          @button outlet: 'listSwitch', class: 'btn selected', 'List'
        @div outlet: 'paletteStats', class: 'palette-stats inline-block'

      @div outlet: 'paletteColors', class: 'colors'

  initialize: ->
    @subscribe this, 'core:move-up', => @scrollUp()
    @subscribe this, 'core:move-down', => @scrollDown()

    @subscribe @gridSwitch, 'click', =>
      @gridSwitch.addClass 'selected'
      @listSwitch.removeClass 'selected'
      @paletteColors.addClass 'grid'

    @subscribe @listSwitch, 'click', =>
      @gridSwitch.removeClass 'selected'
      @listSwitch.addClass 'selected'
      @paletteColors.removeClass 'grid'

  setPalette: (@palette) ->
    files = {}
    files[i.filePath] = i for i in @palette.items

    pluralize = (n, singular, plural) ->
      if n is 1
        "#{n} #{singular}"
      else
        "#{n} #{plural}"

    @paletteStats.html """
    <span class="text-info">#{pluralize @palette.items.length, 'color', 'colors'}</span>
    found accross
    <span class="text-info">#{pluralize Object.keys(files).length, 'file', 'files'}</span>
    """

    for item in @palette.items
      view = new ProjectPaletteColorView item
      @paletteColors.append view

  getTitle: -> 'Project Palette'
  getURI: -> 'palette://view'
