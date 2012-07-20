# Use `hub` as our git wrapper:
#   http://defunkt.github.com/hub/

hub_path=$(which hub)
if [[ -f $hub_path ]]
then
  alias git=$hub_path
fi

alias gs='git status -sb'
alias gcm='git commit'
alias gcmm='git commit -m'
alias gco='git checkout'
alias gcob='git checkout -b'
alias gg='git log --graph --all --oneline'
alias gl='git log'
alias glb='git shortlog -sn'
alias gd='git diff'
alias gdc='git diff --cached'
alias gca='git commit -a'
alias gcam='git commit -a -m'
alias gb='git branch'
alias ga='git add'
alias gap='git add --patch'
alias gai='git add --interactive'
