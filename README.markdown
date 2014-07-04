# @cobyism’s dotfiles

[Dotfiles](http://dotfiles.github.io/) are configuration and personalization files for various applications in use on computer systems. These are mine.

## Usage

Clone this repository locally, and then install with `rake`.

```sh
git clone https://github.com/cobyism/dotfiles ~/.dotfiles
cd ~/.dotfiles
rake
```

There are some other more specific `rake` commands you can use too.

```sh
rake install            # (default) Dotfiles: battle-stations! Prompt for orders if any already exist
rake install:backup     # Dotfiles: battle-stations! Backup any files that are already in place
rake install:overwrite  # Dotfiles: battle-stations! Overwrite any files that are already in place
rake install:skip       # Dotfiles: battle-stations! Skip any files that are already in place
rake uninstall          # Dotfiles: stand down!
```

## How this works

The way this project works is simple.

- Anything named in the form of `<example>.symlink` will be symlinked into `~/.<example>` when you run `rake`. This applies to both files (e.g. `zsh/zshrc.symlink` is symlinked to `~/.zshrc`) and folders (e.g. `atom/atom.symlink` is symlinked to `~/.atom`).

- Any files named in the form `<example>.zsh` get loaded into your environment when your shell starts.

## Contributing

I’d :heart: to receive contributions to this project. It doesn’t matter if it’s just a typo, or if you’re proposing an overhaul of the entire project—I’ll gladly take a look at your changes. Fork at will! :grinning:.

## License

[MIT](./LICENSE). Have at it! :grinning:

## Credit

There’s a very high probability that everything contained in this repo was
blatantly stolen from one of the following places:

- [Ryan Bates' dotfiles](https://github.com/ryanb/dotfiles)
- [Zach Holman's dotfiles](https://github.com/holman/dotfiles)
- [Ryan Tomayko's dotfiles](https://github.com/rtomayko/dotfiles)
- [thoughtbot's dotfiles](https://github.com/thoughtbot/dotfiles)
