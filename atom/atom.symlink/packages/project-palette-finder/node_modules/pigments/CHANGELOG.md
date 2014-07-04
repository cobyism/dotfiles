<a name="v1.6.0"></a>
# v1.6.0 (2014-06-03)

## :sparkles: Features

- Implement color expressions priority ([b807897f](https://github.com/abe33/pigments/commit/b807897fb1eab616efd42dafea8404a3c209814c))  <br>Allowing some expression regexp to be evaluated prior any
  other.

## :bug: Bug Fixes

- Fix unmatched colors from variables ([f0dabc0a](https://github.com/abe33/pigments/commit/f0dabc0ab390555f5e0de519193da29d86415945))
- Fix invalid empty match making extraction fail ([f73ed8b0](https://github.com/abe33/pigments/commit/f73ed8b0c2134596694da68c256f5b727940f8e5))
- Fix missing variables expressions require in index ([b4c35ed7](https://github.com/abe33/pigments/commit/b4c35ed7890e0ef5f5af96610337e9fc2f9c324a))

<a name="v1.5.0"></a>
# v1.5.0 (2014-06-03)

## :sparkles: Features

- Implement variables parsing before searching for colors ([83ab2fcc](https://github.com/abe33/pigments/commit/83ab2fcc0508a845d9e46e894e1332edcce02bb8))
- Add a `color` property in buffer scan results ([ed588a7f](https://github.com/abe33/pigments/commit/ed588a7f2d01a3826ee1e4b7131f79306d13588b))  <br>The `color` property stores a `Color` object corresponding
  to the found color.
- Implement variables search for less, sass, scss and stylus syntax ([9bf60ac2](https://github.com/abe33/pigments/commit/9bf60ac2a5b377c946b3be6b18a9bed99d813c99)), [c484de2a](https://github.com/abe33/pigments/commit/c484de2aed4262c6b13328a39978693fc1b98c12))

## :bug: Bug Fixes

- Fix false positive match in `canHandle` ([5b8a260b](https://github.com/abe33/pigments/commit/5b8a260bc90b4572dd7df1eb173e2bbec123a0e8))

<a name="v1.4.1"></a>
# v1.4.1 (2014-05-29)

## :sparkles: Features

- Add a CHANGELOG file ([81d5107a](https://github.com/abe33/pigments/commit/81d5107a35e81a7c0c6fca379b759b73420e8b60))

## :bug: Bug Fixes

- Fix invalid match with hexa colors ([c3dfbc23](https://github.com/abe33/pigments/commit/c3dfbc23931d38081b3bc9e5040c51d902a8b5c3), Closes [abe33/atom-color-highlight#12](https://github.com/abe33/atom-color-highlight/issues/12))

<a name="v1.4.0"></a>
# v1.4.0 (2014-05-29)

## :sparkles: Features

- Adds luma function to color-model ([f7fa32de](https://github.com/abe33/pigments/commit/f7fa32dee41aadf91aef99d2f224497d4088ba41))

<a name="v1.3.0"></a>
# v1.3.0 (2014-05-29)

## :racehorse: Performances

- Totally revert to previous operation handling ([f90d529](https://github.com/abe33/pigments/commit/f90d52924257309155d89369644468651c4024a7))
  <br>The « smart » version was too expensive, and was using too much
recursion, a simple file with many operations was causing racing
conditions that was causing the search to never end. It also leads the
search process to climb to several Go in RAM.

<a name="v1.2.0"></a>
# v1.2.0 (2014-05-29)

## :sparkles: Features

- Implements a fully asynchrone operation search ([41e9e472](https://github.com/abe33/pigments/commit/41e9e472557d187b9f8c253aca0821e7150071f2))


<a name="v1.1.1"></a>
# v1.1.1 (2014-05-29)

## :bug: Bug Fixes

- Fixes parsing order that was jumping too far in text ([2bd5874d](https://github.com/abe33/pigments/commit/2bd5874d56124b7e3481191d8417924ed56d2493))


<a name="v1.1.0"></a>
# v1.1.0 (2014-05-29)

## :sparkles: Features

- Adds public methods to remove expressions/operations ([dfff95cb](https://github.com/abe33/pigments/commit/dfff95cb639001640d0cd68b79d88db273de6fa2))
- Adds a name to identify expressions and operations ([e8e42ebb](https://github.com/abe33/pigments/commit/e8e42ebb4832db62837e4e35d36600d82d1af8c5))
