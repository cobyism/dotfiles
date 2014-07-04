{$, WorkspaceView} = require 'atom'
VisualBell = require '../lib/visual-bell'

describe "VisualBell", ->
  beforeEach ->
    atom.workspaceView = new WorkspaceView()

    waitsForPromise ->
      atom.packages.activatePackage("visual-bell")

  describe "when visual bells are enabled (default)", ->
    it "appends div.visual-bell to body on 'beep' event", ->
      atom.workspaceView.trigger 'beep'
      expect($('body > .visual-bell')).toExist()

    it "does not ever create two overlays", ->
      atom.workspaceView.trigger 'beep'
      atom.workspaceView.trigger 'beep'
      expect($('body > .visual-bell')).toHaveLength 1

  describe "when visual bells are disabled", ->
    it "does not append div.visual-bell on 'beep' event", ->
      atom.config.set('visual-bell.enabled', false)
      atom.workspaceView.trigger 'beep'
      expect($('body > .visual-bell')).not.toExist()
