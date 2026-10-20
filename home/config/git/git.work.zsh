# Work machine specific configuration

# Add the work machine SSH key to the Apple keychain so it doesn't prompt for the passphrase every time
ssh-add --apple-use-keychain ~/.ssh/id_chapc3_airnz_rsa >/dev/null 2>&1

# Load this laptop's @cobyism github personal signing key
ssh-add --apple-use-keychain "$HOME/.ssh/id_ed25519_cobyism_signing" >/dev/null 2>&1
