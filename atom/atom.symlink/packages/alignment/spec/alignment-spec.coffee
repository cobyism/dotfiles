alignment = require('../lib/alignment')

describe 'alignment', ->
  beforeEach ->
    atom.config.set('alignment.leftSeparators',  [':'])
    atom.config.set('alignment.rightSeparators', ['=', '+=', '-=', '/='])
    atom.config.set('alignment.spaceSeparators', ['=', '+=', '-=', '/='])

  it 'should align text with equal signs', ->
    result = alignment("""
      left=right
      another = more
    """)

    expect(result[0]).toEqual("""
      left    = right
      another = more
    """)

    expect(result[1]).toEqual([[0, 8], [1, 8]])

  it 'should align PHP-style variables', ->
    result = alignment("""
      $a = 1;
      $bg = 2;
    """)

    expect(result[0]).toEqual("""
      $a  = 1;
      $bg = 2;
    """)

    expect(result[1]).toEqual([[0, 4], [1, 4]])

  it 'should align text with colons', ->
    result = alignment("""
      left  : right
      another   :test
      something: else
    """)

    expect(result[0]).toEqual("""
      left:      right
      another:   test
      something: else
    """)

    expect(result[1]).toEqual([[0, 4], [1, 7], [2, 9]])

  it 'should align text with colons and equal signs', ->
    result = alignment("""
      left  = right
      another   :test
      something: else
    """)

    expect(result[0]).toEqual("""
      left     = right
      another:   test
      something: else
    """)

    expect(result[1]).toEqual([[0, 9], [1, 7], [2, 9]])

  it 'should ignore text in quotes and align correctly', ->
    result = alignment("""
      "left:test"  = right
      "another ="  :test
      something: else
    """)

    expect(result[0]).toEqual("""
      "left:test" = right
      "another =":  test
      something:    else
    """)

    expect(result[1]).toEqual([[0, 12], [1, 11], [2, 9]])

  it 'should align multiple signs properly', ->
    result = alignment("""
      this = that = test
      another = thing = here
    """)

    expect(result[0]).toEqual("""
      this    = that  = test
      another = thing = here
    """)

    expect(result[1]).toEqual([[0, 8], [0, 16], [1, 8], [1, 16]])

  it 'should ignore escaped quotes', ->
    result = alignment("""
      "test\\" escape": more
      'yet another \\' escape' = more
    """)

    expect(result[0]).toEqual("""
      "test\\" escape":          more
      'yet another \\' escape' = more
    """)

    expect(result[1]).toEqual([[0, 15], [1, 24]])

  it 'should properly align multiple separators', ->
    result = alignment("""
      test += 1
      something -= 1
      else /= 1
    """)

    expect(result[0]).toEqual("""
      test      += 1
      something -= 1
      else      /= 1
    """)

    expect(result[1]).toEqual([[0, 10], [1, 10], [2, 10]])

  it 'should ignore lines with no separator', ->
    result = alignment("""
      something += 1
      # comment
      again = 5
    """)

    expect(result[0]).toEqual("""
      something += 1
      # comment
      again      = 5
    """)

    expect(result[1]).toEqual([[0, 10], [2, 11]])

  it 'should ignore escaped opening quotes', ->
    result = alignment("""
      test\\"something=":else"
      something = simple
    """)

    expect(result[0]).toEqual("""
      test\\"something = ":else"
      something       = simple
    """)

    expect(result[1]).toEqual([[0, 16], [1, 16]])

  it 'should catch escaped escape characters', ->
    result = alignment("""
      "test\\\\" :escape":more
      'yet another \\' escape' = more
    """)

    expect(result[0]).toEqual("""
      "test\\\\":                 escape":more
      'yet another \\' escape' = more
    """)

    expect(result[1]).toEqual([[0, 8], [1, 24]])
