function collapse_pwd {
    echo $(pwd | sed -e "s,^$HOME,~,")
}

function prompt_char {
  git branch >/dev/null 2>/dev/null && echo '±' && return
  hg root >/dev/null 2>/dev/null && echo '☿' && return
  # echo '○'
	echo '➜'
	# echo '⚡'
  # echo '➤'
  # echo '❯'
  # echo '⌁'
}

function battery_charge {
    echo `$BAT_CHARGE` 2>/dev/null
}

function virtualenv_info {
    [ $VIRTUAL_ENV ] && echo '('`basename $VIRTUAL_ENV`') '
}

 function hg_prompt_info {
#     hg prompt --angle-brackets "\
# < on %{$fg[magenta]%}<branch>%{$reset_color%}>\
# < at %{$fg[yellow]%}<tags|%{$reset_color%}, %{$fg[yellow]%}>%{$reset_color%}>\
# %{$fg[green]%}<status|modified|unknown><update>%{$reset_color%}<
# patches: <patches|join( → )|pre_applied(%{$fg[yellow]%})|post_applied(%{$reset_color%})|pre_unapplied(%{$fg_bold[black]%})|post_unapplied(%{$reset_color%})>>" 2>/dev/null
 }

function rbenv_version {
  echo `rbenv version | cut -f 1 -d " "`
}

function collapse_user {
    echo $($USER | sed -e "s,^coby,,")
}

function collapse_hostname {
    echo $(hostname -s | sed -e "s,^Vulcan,,")
}

# PROMPT=''
# if [ $USER != "coby" ]; then
#   PROMPT="$PROMPT%{$fg[magenta]%}$(collapse_user)%{$reset_color%}"
# fi
# if [ $(hostname -s) != "Vulcan" ]; then
#   if [ $USER != "coby" ]; then
#     PROMPT="$PROMPT at "
#   fi
#   PROMPT="$PROMPT%{$fg[yellow]%}$(collapse_hostname)%{$reset_color%} in "
# fi
# PROMPT="$PROMPT%{$fg_bold[green]%}$(collapse_pwd)%{$reset_color%}$(hg_prompt_info)$(git_prompt_info)
# $(virtualenv_info)$(prompt_char) "

PROMPT='
%{$fg[magenta]%}%n%{$reset_color%} at %{$fg[yellow]%}%m%{$reset_color%} in %{$fg_bold[green]%}$(collapse_pwd)%{$reset_color%}$(hg_prompt_info)$(git_prompt_info)
$(virtualenv_info)$(prompt_char) '


RPROMPT='%{$fg[red]%}$(rbenv_version)%{$reset_color%}'
RPROMPT=''

ZSH_THEME_GIT_PROMPT_PREFIX=" ⌥ %{$fg[magenta]%}"
ZSH_THEME_GIT_PROMPT_SUFFIX="%{$reset_color%}"
ZSH_THEME_GIT_PROMPT_DIRTY="%{$fg[red]%} •"
ZSH_THEME_GIT_PROMPT_UNTRACKED="%{$fg[red]%} •"
ZSH_THEME_GIT_PROMPT_CLEAN="%{$fg[green]%} •"

# source ~/.powerline/powerline/bindings/zsh/powerline.zsh
