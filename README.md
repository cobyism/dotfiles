# @cobyism’s dotfiles

`$HOME`, sweet `$HOME`!

My dotfiles are managed using [thoughtbot](https://thoughtbot.com)’s wonderfully simple `rcm` tool
([code](https://github.com/thoughtbot/rcm) • [docs](https://thoughtbot.github.io/rcm/rcm.7.html)).

### Prerequisites

- [Homebrew](https://brew.sh/).
- `brew install git rcm`

### Usage

- Clone this repo into `~/code/dotfiles`.
- From scratch, run [`script/bootstrap`](./script/bootstrap) to symlink `~/.dotfiles` and [`~/.rcrc`](./rcrc) into place.
- Ensure `rcm` is installed and available in your `PATH` (e.g., via Homebrew: `brew install rcm`).
- Subsequently use `rcup`, `rcdn`, `lsrc`, and `mkrc` to manage.

Example setup from scratch:

```zsh
brew install git rcm
mkdir -p ~/code
git clone https://github.com/cobyism/dotfiles.git ~/code/dotfiles
cd ~/code/dotfiles
script/bootstrap
cd ~
rcup
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
