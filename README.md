# @cobyism’s dotfiles

`$HOME`, sweet `$HOME`!

My dotfiles are managed using [thoughtbot](https://thoughtbot.com)’s wonderfully simple `rcm` tool
([code](https://github.com/thoughtbot/rcm) • [docs](https://thoughtbot.github.io/rcm/rcm.7.html)).

### Prerequisites

- [Homebrew](https://brew.sh/).
- `brew install git rcm`

### Usage

- Clone this repo into your code directory, e.g. `~/dev/dotfiles` (or `~/code/dotfiles` on older machines).
- From scratch, run [`script/bootstrap`](./script/bootstrap) to symlink `~/.dotfiles` and [`~/.rcrc`](./home/rcrc) into place, clone [toolshed](https://github.com/cobyism/toolshed) alongside, and run `rcup`.
- The code directory is exported as `$DIRDEV` from [`zshenv`](./home/zshenv): `~/dev` if it exists, otherwise `~/code`. Pin it per machine with `export DIRDEV=...` in `~/.zshenv.local` (bootstrap writes this for you if the repo isn't in `~/dev`).
- Ensure `rcm` is installed and available in your `PATH` (e.g., via Homebrew: `brew install rcm`).
- Subsequently use `rcup`, `rcdn`, `lsrc`, and `mkrc` to manage.

Example setup from scratch:

```zsh
brew install git rcm
git clone https://github.com/cobyism/dotfiles.git ~/dev/dotfiles
~/dev/dotfiles/script/bootstrap
```

### License

[MIT](./LICENSE) ^\_^

## Star History 🌟

<a href="https://star-history.com/#cobyism/dotfiles&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=cobyism/dotfiles&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=cobyism/dotfiles&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=cobyism/dotfiles&type=Date" />
 </picture>
</a>
