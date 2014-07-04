fs = require 'fs'
path = require 'path'
temp = require 'temp'
wrench = require 'wrench'
Color = require 'pigments'
ProjectPaletteFinder = require '../lib/project-palette-finder'
{WorkspaceView} = require 'atom'

waitsForPromise = (fn) -> window.waitsForPromise timeout: 30000, fn

describe 'ProjectPaletteView', ->

  beforeEach ->
    atom.project.setPath(path.join(__dirname, 'fixtures'))

    tempPath = fs.realpathSync(temp.mkdirSync('atom'))
    fixturesPath = atom.project.getPath()
    wrench.copyDirSyncRecursive(fixturesPath, tempPath, forceDelete: true)
    atom.project.setPath(tempPath)
    readyCallback = null

    atom.workspaceView = new WorkspaceView
    atom.workspaceView.attachToDom()

    waitsForPromise ->
      atom.packages.activatePackage('project-palette-finder')

    runs ->
      readyCallback = jasmine.createSpy('readyCallback')
      ProjectPaletteFinder.on 'palette:ready', readyCallback

    waitsFor -> readyCallback.callCount is 1

  describe 'when palette:view command is triggered', ->
    it 'should have created a pane with the palette ui', ->
      paletteView = null
      runs ->
        atom.workspaceView.trigger "palette:view"

      waitsFor ->
        paletteView = atom.workspaceView.find('.palette')
        paletteView.length > 0

      runs ->
        expect(paletteView.find('.color').length).toEqual(12)
