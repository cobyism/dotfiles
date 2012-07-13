# Sets reasonable OS X defaults.
# Run ./osx-defaults.sh and you'll be good to go.

# Disable press-and-hold for keys in favor of key repeat
# defaults write -g ApplePressAndHoldEnabled -bool false
defaults write com.sublimetext.2 ApplePressAndHoldEnabled -bool false

# Show the ~Library folder
chflags nohidden ~/Library
