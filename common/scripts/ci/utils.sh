#!/bin/bash

_ROOT_DIR=$(echo $(cd $(dirname "${BASH_SOURCE[0]}")/../../.. && pwd -P))

function get_current_version {
  local retval=$(jq -r ".version" "${_ROOT_DIR}/libs/sdk-ui/package.json")
  echo "$retval"
}

#
# Returns 0 if current version is 'alpha' or 'beta'; otherwise 1.
#
function is_current_version_prerelease {
  version=$(get_current_version)
  retval=1

  case "$version" in
    *"alpha"*)
      retval=0
      ;;
    *"beta"*)
      retval=0
      ;;
  esac

  echo "$retval"
}

#
# Inspects value of NPM_ACCESS_LEVEL and returns either 'restricted' or 'public'. Will return 'public' if
# the value in the env variable is 'public'; otherwise always falls back to 'restricted'
#
function get_sanitized_access_level {
  retval="restricted"
  case "$NPM_ACCESS_LEVEL" in
    "public")
      retval="public"
      ;;
  esac

  echo "$retval"
}