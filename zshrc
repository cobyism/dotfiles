#!/usr/bin/env zsh

# From https://unix.stackexchange.com/questions/71253/what-should-shouldnt-go-in-zshenv-zshrc-zlogin-zprofile-zlogout
# Here is a non-exhaustive list, in execution-order, of what each file tends to contain:

# .zshenv is always sourced. It often contains exported variables that should be available to other programs. For example, $PATH, $EDITOR, and $PAGER are often set in .zshenv. Also, you can set $ZDOTDIR in .zshenv to specify an alternative location for the rest of your zsh configuration.
# .zprofile is for login shells. It is basically the same as .zlogin except that it's sourced before .zshrc whereas .zlogin is sourced after .zshrc. According to the zsh documentation, ".zprofile is meant as an alternative to .zlogin for ksh fans; the two are not intended to be used together, although this could certainly be done if desired."
# .zshrc is for interactive shells. You set options for the interactive shell there with the setopt and unsetopt commands. You can also load shell modules, set your history options, change your prompt, set up zle and completion, et cetera. You also set any variables that are only used in the interactive shell (e.g. $LS_COLORS).
# .zlogin is for login shells. It is sourced on the start of a login shell but after .zshrc, if the shell is also interactive. This file is often used to start X using startx. Some systems start X on boot, so this file is not always very useful.
# .zlogout is sometimes used to clear and reset the terminal. It is called when exiting, not when opening.

# =============================== AUTOLOAD

autoload -U promptinit; promptinit

# =============================== ENV

export DOTFILES="$HOME/.dotfiles"
export EDITOR="code -w"

# =============================== PATH

export PATH="/usr/local/opt/python/libexec/bin:$PATH"
export PATH="$DOTFILES/wip:./wip:$PATH"
export PATH="$DOTFILES/bin:./bin:$PATH"
export PATH="/Users/cobyism/.yarn/bin:$PATH"
export PATH="./script:$PATH"

# =============================== FUNCTIONS

function zz() {
  echo "Reloading from ~/.zshrc…"
  source ~/.zshrc
}

function source_file() {
  test -r "$1" && source "$1"
}

# =============================== EVALS

eval "$(/opt/homebrew/bin/brew shellenv)"
eval "$(zoxide init zsh)"

source_file "$DOTFILES/config/iterm2/iterm2_shell_integration.zsh"
source_file "$HOME/.cargo/env"

eval "$(/opt/homebrew/bin/mise activate zsh)"

# source_file "$(brew --prefix asdf)/libexec/asdf.sh"
# source_file "${XDG_CONFIG_HOME:-$HOME/.config}/asdf-direnv/zshrc"

# eval "$(/opt/homebrew/bin/brew shellenv)"

# # Conda insists on automagically managing this whole block of stuff… ಠ_ಠ
# # >>> conda initialize >>>
# # !! Contents within this block are managed by 'conda init' !!
# __conda_setup="$('/Users/cobyism/.asdf/installs/python/miniconda3-latest/bin/conda' 'shell.zsh' 'hook' 2> /dev/null)"
# if [ $? -eq 0 ]; then
#     eval "$__conda_setup"
# else
#     if [ -f "/Users/cobyism/.asdf/installs/python/miniconda3-latest/etc/profile.d/conda.sh" ]; then
#         . "/Users/cobyism/.asdf/installs/python/miniconda3-latest/etc/profile.d/conda.sh"
#     else
#         export PATH="/Users/cobyism/.asdf/installs/python/miniconda3-latest/bin:$PATH"
#     fi
# fi
# unset __conda_setup
# # <<< conda initialize <<<

# Added by OrbStack: command-line tools and integration
# source ~/.orbstack/shell/init.zsh 2>/dev/null || :

# =============================== PROMPT

source_file "$DOTFILES/resources/prompt-typewritten.zsh"

# =============================== Completions
# Installed via homebrew - zsh-completions
# See https://github.com/zsh-users/zsh-completions

if type brew &>/dev/null; then
  FPATH=$(brew --prefix)/share/zsh-completions:$FPATH
  autoload -Uz compinit
  compinit
fi

source_file "$DOTFILES/resources/completion-for-pnpm.zsh"

# =============================== OMZ

# export OMZ="$HOME/.oh-my-zsh" # OMZ expects/hijacks $ZSH
# source_file $OMZ # Sources ~/.oh-my-zsh/oh-my-zsh.sh

# =============================== ALIASES

## Shell

#alias exa="exa --icons" # --group-directories-first # No longer maintained
#alias ls="exa" # No longer maintained
alias l="ls -lah"
alias ll="ls -lah"
alias cd="z"
alias ..="cd .."
# alias grep="grepp"
alias rc="rclone copy --fast-list --progress --progress-terminal-title --verbose --stats 3s --transfers 10"

## Projects

alias be="bundle exec"
alias ni="npm install"
alias nr="npm run"
alias nrb="npm run build"
alias nrd="npm run dev"
alias nrt="npm run test"

## Git

alias gs="git status"
alias ga="git add"
alias gcm="git commit -m"
alias gco="git checkout"
alias gcob="git checkout -b"
alias gcom="git checkout main"
alias gr="git remote"
alias grv="git remote -v"
alias gl="git log"
alias gd="git diff"
alias gb="git branch"
alias gpull="git pull"
alias gpush="git push"
alias gg="git log --graph --all --oneline"
# alias grmc="git rm -r --cached"

# =============================== LOCALRC

# Use .localrc for secret crap since this is a public, versioned repo.
if [[ -a $HOME/.localrc ]]
then
  source $HOME/.localrc
fi

# Thanks for reading! ^_^
