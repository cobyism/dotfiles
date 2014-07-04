{align} = require '../lib/atom-alignment'

describe 'atom alignment', ->
  it 'should align correctly', ->
    editor = atom.project.openSync()
    buffer = editor.getBuffer()

    atom.config.set('alignment.leftSeparators',  [':'])
    atom.config.set('alignment.rightSeparators', ['='])
    atom.config.set('alignment.spaceSeparators', ['='])

    editor.setText """
      test= something
      another   : test
    """
    editor.setSelectedBufferRange([[0, 0], [1, 5]])

    align(editor)

    expect(buffer.lineForRow(0)).toBe('test   = something')
    expect(buffer.lineForRow(1)).toBe('another: test')

    expect(editor.getCursors()[0].getBufferPosition().row).toEqual(0)
    expect(editor.getCursors()[0].getBufferPosition().column).toEqual(7)
    expect(editor.getCursors()[1].getBufferPosition().row).toEqual(1)
    expect(editor.getCursors()[1].getBufferPosition().column).toEqual(7)
