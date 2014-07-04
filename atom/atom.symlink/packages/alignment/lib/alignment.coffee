escape = require('escape-regexp')

sortLength = (a, b) ->
  b.length - a.length

alignment = module.exports = (text) ->
  leftSeparators  = atom.config.get('alignment.leftSeparators')
  rightSeparators = atom.config.get('alignment.rightSeparators')
  separators      = leftSeparators.concat(rightSeparators)
  spaceSeparators = atom.config.get('alignment.spaceSeparators')
  separatorRegExp = new RegExp(
    '^(?:' + [
      '\\\\.',
      '"(?:\\\\.|[^"])*?"',
      '\'(?:\\\\.|[^\'])*?\'',
      '[^\'"]'
    ].join('|') + ')*?' +
    '(' + separators.sort(sortLength).map(escape).join('|') + ')'
  )

  alignText = (text) ->
    lines   = text.split('\n')
    matches = 0

    # Split each line into the left context, separator and right content.
    parts = lines.map((line, index) ->
      match = line.match(separatorRegExp)

      return if !match

      matches += 1

      [
        match[0].substr(0, match[0].length - match[1].length).trimRight(),
        match[1],
        line.substr(match[0].length).trimLeft()
      ]
    )

    # Return early if there weren't enough matches to align.
    return [text, []] if !matches

    # Using recursion, align the parts to the right again.
    rightParts = alignText(parts.map((part) ->
      if part then part[2] else ''
    ).join('\n'))

    # Get the text of the right parts.
    rightLines = rightParts[0].split('\n')

    # Iterate over the parts and find the longest left length string.
    leftLength = parts.reduce((prev, part) ->
      return prev if !part

      length = part[0].length + part[1].length + 1

      if part[1] in spaceSeparators
        length += 1

      return if length > prev then length else prev
    , 0)

    # An array of insertion positions.
    positions = []

    # Map the parts into their sanitized pieces with whitespace padding.
    text = parts.map((part, index) ->
      return lines[index] if !part

      line     = part[0]
      spaces   = leftLength - line.length
      position = 0

      if part[1] in spaceSeparators
        line += ' '
        spaces -= 1

      padding = Array(spaces - part[1].length).join(' ')

      if part[1] in leftSeparators
        positions.push([index, line.length])
        line += part[1] + padding
      else
        line += padding + part[1]
        positions.push([index, line.length - part[1].length])

      if rightParts[1][index]
        positions.push([
          rightParts[1][index][0],
          rightParts[1][index][1] + line.length + 1
        ])

      line + ' ' + rightLines[index]
    ).join('\n')

    # Return the aligned text and an array of the separator insertion coords.
    [text, positions]

  # Align the initial text.
  alignText(text)
