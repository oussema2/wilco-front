#!/bin/bash

set -e

NOCOLOR='\033[0m'
RED='\033[1;31m'
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'

show() {
	echo -e "${GREEN}$1${NOCOLOR}"
}

show_sub() {
	echo -e "${BLUE}  $1${NOCOLOR}"
}

create-env-file() {
	BASE_ENV_FILE="env/.env.${STAGE}.base"
	DEST_ENV_FILE=".env.${STAGE}"

	if [ -f "$BASE_ENV_FILE" ]; then
		show_sub "Copying base env file ($BASE_ENV_FILE) to destination ($DEST_ENV_FILE)..."
		cp $BASE_ENV_FILE $DEST_ENV_FILE
	else
		show_sub "Creating empty env file in $DEST_ENV_FILE..."
		touch "$DEST_ENV_FILE"
	fi

	show_sub "Done"
}

sync-env-with-vault() {
	show_sub "Syncing ${STAGE} env with vault..."
	teller copy --from=hashicorp_vault --to=dotenv
	show_sub "Done"
}

setup-env() {
	show "Setting up env ${STAGE}..."
	
	create-env-file
	sync-env-with-vault

	show "All done!"
}

setup-dev-env() {
	export STAGE="dev"
	setup-env
}

setup-staging-env() {
	export STAGE="staging"
	setup-env
}

setup-production-env() {
	export STAGE="production"
	setup-env
}

setup-selected-env() {
	if [ "$1" = "all" ]; then
		setup-dev-env
		setup-staging-env
		setup-production-env
	else
		setup-$1-env
	fi
}

if [ $# -eq 0 ]; then
	echo "Usage: $0 [env]"
	echo "Setups the environment file for env. Allowed vaules for env are:"
	echo " - dev: setups the env file for development"
	echo " - staging: setups the env file for staging"
	echo " - production: setups the env file for production"
	echo " - all: setups the env files for development, staging and production"
else
	case $1 in
		all | dev | staging | production)
			setup-selected-env $1
			;;
		*)
			echo "${CTL}: Invalid env: $1"
			;;
	esac
fi