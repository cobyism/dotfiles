# Use `hub` as our git wrapper:
#   http://defunkt.github.com/hub/

hub_path=$(which hub)
if [[ -f $hub_path ]]
then
  alias git=$hub_path
fi

alias ga='git add'
alias gai='git add --interactive'
alias gap='git add --patch'
alias gb='git branch'
alias gc='git commit'
alias gcm='git commit -m'
alias gca='git commit -a'
alias gcam='git commit -a -m'
alias gco='git checkout'
alias gcob='git checkout -b'
alias gcom='git checkout master'
alias gd='git diff'
alias gdc='git diff --cached'
alias gg='git log --graph --decorate --pretty=oneline --abbrev-commit'
alias gga='git log --graph --decorate --pretty=oneline --abbrev-commit --all'
alias gl='git log'
alias glb='git shortlog -sn'
alias gpm='git checkout master && git pull'
#alias gup="git push origin `git rev-parse --symbolic-full-name --abbrev-ref HEAD`"
#alias gsy="git pull origin `git rev-parse --symbolic-full-name --abbrev-ref HEAD`"
alias gr='git remote'
alias grm='git rm'
alias grma="git status | grep deleted | awk '{print \$3}' | xargs git rm"
alias grv='git remote -v'
alias gs='git status -sb'
alias distpush='git subtree push --prefix dist origin gh-pages'
