#!/bin/bash
# GUM CHEATSHEET

# ==== CHOOSE ====
# Basic single choice
TYPE=$(gum choose "fix" "feat" "docs" "style" "refactor")
ACTIONS=$(gum choose --no-limit "Read" "Think" "Discard")
CHOICE=$(gum choose --cursor "> " --height 10 "Option 1" "Option 2")
# brew list | gum choose --no-limit | xargs brew uninstall
# git branch | cut -c 3- | gum choose --no-limit | xargs git branch -D

# ==== CONFIRM ====
# Basic confirmation (exits with code 0 if yes, 1 if no)
gum confirm "Are you sure?" && echo "Yes" || echo "No"
gum confirm "Delete this file?" && rm file.txt || echo "Not removed"
gum confirm --affirmative "Yes!" --negative "No way" "Proceed?"
gum confirm --default=false "Continue?"

# ==== INPUT ====
# Basic input
NAME=$(gum input --placeholder "Enter your name")
USERNAME=$(gum input --prompt "Username: " --placeholder "john_doe")
SUMMARY=$(gum input --value "$TYPE$SCOPE: " --placeholder "Summary")
PASSWORD=$(gum input --password --placeholder "Enter password")
gum input --cursor.foreground "#FF0" --prompt.foreground "#0FF" --prompt "* " --width 80
# git commit -m "$(gum input --width 50 --placeholder "Summary of changes")"

# ==== WRITE ====
# Multi-line editor (CTRL+D to finish)
DESCRIPTION=$(gum write --placeholder "Enter details...")
MESSAGE=$(gum write --width 80 --height 10 --placeholder "Long text")
# git commit -m "$(gum input)" -m "$(gum write --placeholder "Details")"
# gum write > output.txt

# ==== FILTER ====
# Fuzzy find files (ignores .git, node_modules)
FILE=$(gum filter)
# $EDITOR $(gum filter)
SESSION=$(tmux list-sessions -F \#S | gum filter --placeholder "Pick session...")
# git log --oneline | gum filter | cut -d' ' -f1
SELECTION=$(echo -e "Apple\nBanana\nCherry" | gum filter --height 5)
# gh pr list | cut -f1,2 | gum choose | cut -f1 | xargs gh pr checkout

# ==== FILE ====
# File picker from directory tree
SELECTED_FILE=$(gum file)
CONFIG=$(gum file /etc)
CHOSEN=$(gum file . --cursor "> ")

# ==== SPIN ====
# Spinner while running command
# Types: line, dot, minidot, jump, pulse, points, globe, moon, monkey, meter, hamburger
gum spin --title "Loading..." -- sleep 3
gum spin --spinner dot --title "Buying Bubble Gum..." -- sleep 5
gum spin --spinner pulse --title "Processing..." -- ./script.sh
gum spin --show-output --title "Installing..." -- npm install

# ==== STYLE ====
# Colors, borders, spacing (for color reference, see https://hexdocs.pm/color_palette/ansi_color_codes.html or https://en.wikipedia.org/wiki/ANSI_escape_code or https://misc.flogisoft.com/bash/tip_colors_and_formatting)
gum style --foreground 212 "Hello, World!"
gum style --border double --padding "2 4" --border-foreground 212 "Box"
gum style --foreground 212 --border double --align center --width 50 --margin "1 2" --padding "2 4" 'Title' 'Subtitle'
# Borders: none, normal, rounded, thick, double, hidden
gum style --border rounded --padding 1 "Rounded"
# Alignment: left, center, right
gum style --align center --width 50 "Centered"
# Text styling
gum style --bold --foreground 99 "Bold"
gum style --italic "Italic"
gum style --underline "Underlined"

# ==== JOIN ====
# Combine text (wrap styled output in quotes to preserve newlines)
I=$(gum style --padding "1 5" --border double --border-foreground 212 "I")
LOVE=$(gum style --padding "1 4" --border double --border-foreground 57 "LOVE")
gum join "$I" "$LOVE"  # horizontal
HEADER=$(gum style --bold "Header")
BODY=$(gum style "Body")
gum join --vertical "$HEADER" "$BODY"
gum join --align center --vertical "$I_LOVE" "$BUBBLE_GUM"

# ==== FORMAT ====
# Markdown, code, templates, emoji
gum format -- "# Gum" "- Markdown" "- Code"
echo "# Header\n## Sub\n- Item" | gum format
cat main.go | gum format -t code
echo '{{ Bold "Tasty" }} {{ Italic "Bubble" }}' | gum format -t template
echo 'I :heart: Gum :candy:' | gum format -t emoji

# ==== TABLE ====
gum table <<< "Flavor,Price\nStrawberry,$0.50\nBanana,$0.99"
gum table < data.csv
echo -e "Name\tAge\tCity\nAlice\t30\tNY" | gum table
gum table --border rounded --columns "Name,Age" < data.csv

# ==== PAGER ====
# Scroll with line numbers (↓↑: navigate, q: quit, /: search)
gum pager < README.md
gum pager --height 20 --width 80 < file.txt
ls -la | gum pager
gum pager --soft-wrap < my-file.txt

# ==== LOG ====
# Levels: debug, info, warn, error, fatal
gum log --level info "Application started"
gum log --structured --level debug "Creating file..." name file.txt
gum log --time rfc822 --level error "Connection timeout"
gum log --structured --level info "User login" user john ip 192.168.1.1

# ==== ENVIRONMENT VARIABLES ====
# export GUM_INPUT_CURSOR_FOREGROUND="#FF0"
# export GUM_INPUT_PROMPT_FOREGROUND="#0FF"
# export GUM_CHOOSE_CURSOR="> "
# export GUM_FILTER_PLACEHOLDER="Filter..."
# export GUM_SPIN_SPINNER="dot"

# ==== EXAMPLES ====

# Conventional commit
create_commit() {
  TYPE=$(gum choose "fix" "feat" "docs" "style" "refactor")
  SCOPE=$(gum input --placeholder "scope")
  test -n "$SCOPE" && SCOPE="($SCOPE)"
  SUMMARY=$(gum input --value "$TYPE$SCOPE: " --placeholder "Summary")
  DESCRIPTION=$(gum write --placeholder "Details")
  gum confirm "Commit?" && git commit -m "$SUMMARY" -m "$DESCRIPTION"
}

# Interactive menu
interactive_menu() {
  gum style --border double --padding "1 2" "Welcome"
  NAME=$(gum input --placeholder "Name?")
  ACTIONS=$(gum choose --no-limit "Read" "Think" "Process")
  echo "$ACTIONS" | grep -q "Read" && gum spin --title "Reading..." -- sleep 2
  gum style --bold "Done!"
}

# Safe delete
safe_delete() {
  FILE=$(gum file)
  [ -n "$FILE" ] && gum confirm "Delete $FILE?" && rm -i "$FILE"
}
