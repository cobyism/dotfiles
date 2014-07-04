# project-palette-finder package

[![Build Status](https://travis-ci.org/abe33/atom-project-palette-finder.svg)](https://travis-ci.org/abe33/atom-project-palette-finder)

Finds and exposes colors defined in a project's Less, Sass or Stylus files.

![Palette View](https://raw.github.com/abe33/atom-project-palette-finder/master/screenshot.gif)

In itself this packages only offer the to following commands:

 * `palette:refresh` - It just scans the project directory for Less, Sass (scss & sass) and Stylus files and search for variables containing colors. It do so at startup and everytime you trigger the `palette:refresh` command.
 * `palette:view` - It scans the project and display a view in the active pane that lists all the colors defined in the palette, with source and path to the definition.

Theses colors are then stored in a `Palette` object that is exposed by the package.
After a project scan the colors can be retrieved with their name (the name of variable that hold them).

### API

To access the package you can use the following snippets:

```coffee
ProjectPaletteFinder =
require atom.packages.activePackages['project-palette-finder'].path

ProjectPaletteFinder =
require atom.packages.getLoadedPackage('project-palette-finder').path
```

#### Retrieving The Palette

To access the project palette use:

```coffee
palette = ProjectPaletteFinder.palette
```

It references a `Palette` instance containing as many `PaletteItem` as variables holding colors found in the project files.

#### Retrieving Palette Items

You can retrieve items using the following methods:

```coffee
palette.getItemByName('@less_variable_name') # :PaletteItem
palette.getItemsForPath('/path/to/file.sass') # :Array<PaletteItem>
palette.getItemsForPathInRange('/path/to/file.styl', [[startRow, startCol], [endRow, endCol]]) # :Array<PaletteItem>
```

#### Palette Items

A `PaletteItem` instance has the following properties:

 * `name` - The name of the variable holding the color
 * `filePath` - The path to the file that defines that color
 * `row` - The row at which the color is defined
 * `lineRange` - An array containing the start and end index of the color definition
 * `colorString` - The color string that was found during the project scan
 * `color` - The `Color` object representing this color.

And the following method:

 * `getRange()` - Returns an Array representing the color string range as a valid Atom range in the form `[[startRow, startCol], [endRow, endCol]]`

#### Color

The `Color` class is provided by the [pigments module](https://github.com/abe33/pigments) and offers conversions from many color spaces such RGB, HSL or HSV.

The `Color` class registers expressions to match and parse colors in strings, allowing to create a color with any valid strings such as:

```coffee
# All this colors are equal
new Color('red')
new Color('#f00')
new Color('#ff0000')
new Color('rgba(255,0,0,1)')
new Color('saturate(desaturate(rgba(255,0,0,1), 50%), 50%)')
new Color('vec4(1,0,0,1)')
new Color('0xffff0000')
```

By default, the class offer support for every CSS color notations, Less, Sass, and Stylus color functions, GLSL `vec4` type and hexadecimal integer notation.

The project palette finder will also creates its own expression using the variables names, meaning that if a Sass file defines the following variable:

```sass
$color-red: red
```

Creating a color with `new Color('$color-red')` will produces the same color as `new Color('red')`.

It'll also enable to parse color operations that uses a color variable. For instance, the two following colors will be equal:

```coffee
new Color('darken($color-red, 20%)')
new Color('darken(red, 20%)')
```

#### Accessing The Color Class

The class can be retrieved directly from the palette using:

```coffee
Color = palette.Color
```

#### Real World Example

The [atom-color-highlight package](https://atom.io/packages/atom-color-highlight) will make uses of the palette colors if the package is installed, allowing to highlights all the places a variable holding a color is used in a file.
