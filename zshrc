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
eval "$(mcfly init zsh)"
eval "$(zoxide init zsh)"

source_file "$DOTFILES/config/iterm2/iterm2_shell_integration.zsh"
source_file "$(brew --prefix asdf)/libexec/asdf.sh"
source_file "$HOME/.cargo/env"

# =============================== PROMPT

source_file "$DOTFILES/resources/prompt-typewritten.zsh"

# =============================== OMZ

# export OMZ="$HOME/.oh-my-zsh" # OMZ expects/hijacks $ZSH
# source_file $OMZ # Sources ~/.oh-my-zsh/oh-my-zsh.sh

# =============================== ALIASES

## Shell

alias exa="exa --icons" # --group-directories-first
alias ls="exa"
alias l="ls -lah"
alias cd="z"
alias ..="cd .."
alias grep="grepp"

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
# alias grmc="git rm -r --cached"

# =============================== LOCALRC

# Use .localrc for secret crap since this is a public, versioned repo.
if [[ -a $HOME/.localrc ]]
then
  source $HOME/.localrc
fi

# Thanks for reading! ^_^