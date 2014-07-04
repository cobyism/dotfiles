{$, $$} = require 'atom'

module.exports =
  configDefaults:
    enabled: true

  activate: ->
    atom.workspaceView.on 'beep', =>
      return unless atom.config.get('visual-bell.enabled')
      @addOverlay()
      setTimeout((=> @removeOverlay()), 300)

  deactivate: ->
    @removeOverlay()

  addOverlay: ->
    @removeOverlay() if @overlay
    @overlay = $$ -> @div class: 'visual-bell'
    $('body').append @overlay

  removeOverlay: ->
    @overlay?.remove()
    @overlay = null
