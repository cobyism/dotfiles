_ = require 'underscore-plus'
fs = require 'fs'
url = require 'url'
path = require 'path'
Color = require 'pigments'
querystring = require 'querystring'
{Emitter} = require 'emissary'

Palette = require './palette'
PaletteItem = require './palette-item'
ProjectPaletteView = require './project-palette-view'

class ProjectPaletteFinder
  @Color: Color
  Emitter.includeInto(this)

  @patterns: [
    '\\$[a-zA-Z0-9-_]+\\s*:'
    '@[a-zA-Z0-9-_]+\\s*:'
    '[a-zA-Z0-9-_]+\\s*='
  ]

  @filePatterns: [
    '**/*.sass'
    '**/*.scss'
    '**/*.less'
    '**/*.styl'
  ]

  @grammarForExtensions:
    sass: 'sass'
    scss: 'scss'
    less: 'less'
    styl: 'stylus'

  constructor: ->
    @Color = Color

  activate: ({palette}) ->
    @scanProject()

    atom.workspaceView.command 'palette:refresh', => @scanProject()
    atom.workspaceView.command 'palette:view', => @displayView()

    atom.workspace.registerOpener (uriToOpen) ->
      {protocol, host, pathname} = url.parse uriToOpen
      pathname = querystring.unescape(pathname) if pathname

      return unless protocol is 'palette:'
      new ProjectPaletteView

  deactivate: ->

  serialize: ->
    {
      # palette: @palette.serialize()
    }

  displayView: ->
    @scanProject().then (palette) ->
      uri = "palette://view"

      pane = atom.workspace.paneContainer.paneForUri uri

      pane ||= atom.workspaceView.getActivePaneView().model

      atom.workspace.openUriInPane(uri, pane, {}).done (view) ->
        if view instanceof ProjectPaletteView
          view.setPalette palette

  scanProject: ->
    @palette = new Palette

    filePatterns = @constructor.filePatterns
    results = []

    promise = atom.project.scan @getPatternsRegExp(), paths: filePatterns, (m) ->
      results.push m

    promise.then =>
      for {filePath, matches} in results
        for {lineText, matchText, range} in matches
          lineForMatch = lineText.replace(/\/\/.+$/, '')
          res = Color.searchColorSync(lineForMatch, matchText.length)
          if res?
            spaceBefore = lineForMatch[matchText.length...res.range[0]]
            spaceEnd = lineForMatch[res.range[1]..-1]
            continue unless spaceBefore.match /^\s*$/
            continue unless spaceEnd.match /^[\s;]*$/

            row = range[0][0]
            ext = filePath.split('.')[-1..][0]
            language = @constructor.grammarForExtensions[ext]
            @palette.addItem new PaletteItem {
              filePath
              row
              lineText
              language
              extension: ext
              name: matchText.replace /[\s=:]/g, ''
              lineRange: res.range
              colorString: res.match
            }

            items = @palette.items
            .map (item) ->
              _.escapeRegExp item.name
            .sort (a,b) ->
              b.length - a.length

            paletteRegexp = '(' + items.join('|') + ')(?!-|[ \\t]*[\\.:=])\\b'
            Color.removeExpression('palette')

            Color.addExpression 'palette', paletteRegexp, (color, expr) =>
              color.rgba = @palette.getItemByName(expr).color.rgba

      @emit 'palette:ready', @palette
      @palette

  getPatternsRegExp: ->
    new RegExp '(' + @constructor.patterns.join('|') + ')', 'gi'

module.exports = new ProjectPaletteFinder
