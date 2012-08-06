#!/usr/bin/env bash

# Ubuntu Laptop Setup Script
# Much taken from thoughtbot’s laptop setup script before they removed Ubuntu:
# https://github.com/thoughtbot/laptop/blob/bbe4b5c3e877afbadde71ab8ef67bd6017375fcd/ubuntu

sudo add-apt-repository ppa:zedtux/naturalscrolling
sudo apt-get update -y
sudo apt-get install naturalscrolling -y
sudo apt-get install xclip -y


# install rbenv and various rubies
# https://gist.github.com/1254518

apt-get -y install build-essential
apt-get -y install git-core

# ZSH
sudo apt-get install zsh -y
echo "Changing shell to ZSH..."
chsh -s /usr/bin/zsh
git clone git://github.com/robbyrussell/oh-my-zsh ~/.oh-my-zsh

# Install rbenv:
git clone git://github.com/sstephenson/rbenv.git ~/.rbenv

# Add rbenv to the path:
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> .bash_profile
echo 'eval "$(rbenv init -)"' >> .bash_profile
source ~/.bash_profile

# Install ruby-build:
pushd /tmp
  git clone git://github.com/sstephenson/ruby-build.git
  cd ruby-build
  ./install.sh
popd

# rbenv install <xyz>

rbenv rehash

# Install RubyGems


# Gnome Terminal solarized
# http://www.webupd8.org/2011/04/solarized-must-have-color-paletter-for.html
git clone https://github.com/sigurdga/gnome-terminal-colors-solarized.git ~/.gnome-solarized
~/.gnome-solarized/set_dark.sh


# Downloads
# Gnome Shell
# Google Chrome
# Dropbox
# Sublime Text
sudo ln -s ~/.dotfiles/sublime/sublime.ubuntu.desktop /usr/share/applications/sublime.desktop

