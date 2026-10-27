#!/usr/bin/env bash
set -euo pipefail

host='161.33.175.126'
user='wormdeploy'
base='/srv/wormbakery'
release="${GITHUB_RUN_ID:?}-${GITHUB_RUN_ATTEMPT:?}"
[[ "$release" =~ ^[0-9]+-[0-9]+$ ]]
: "${VM_SSH_KEY_PATH:?}"
: "${VM_SSH_KNOWN_HOSTS_PATH:?}"
test -s dist/index.html
for page in profile works sns commission; do
  test -s "dist/$page/index.html"
done

target="$user@$host"
ssh_options=(-o BatchMode=yes -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes
  -o "UserKnownHostsFile=$VM_SSH_KNOWN_HOSTS_PATH" -i "$VM_SSH_KEY_PATH")
ssh -T "${ssh_options[@]}" "$target" 'sh -s' -- "$release" <<'REMOTE'
set -eu
release="$1"
base=/srv/wormbakery
test -d "$base/releases"
mkdir "$base/releases/$release"
REMOTE

manifest="$(mktemp)"
trap 'rm -f "$manifest"' EXIT
(
  cd dist
  find . -type f -print0 | sort -z | xargs -0 sha256sum
) > "$manifest"
rsync -a -e "ssh -o BatchMode=yes -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes -o UserKnownHostsFile=$VM_SSH_KNOWN_HOSTS_PATH -i $VM_SSH_KEY_PATH" \
  -- dist/ "$target:$base/releases/$release/"
rsync -a -e "ssh -o BatchMode=yes -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes -o UserKnownHostsFile=$VM_SSH_KNOWN_HOSTS_PATH -i $VM_SSH_KEY_PATH" \
  -- "$manifest" "$target:$base/releases/$release/.manifest.sha256"

ssh -T "${ssh_options[@]}" "$target" 'sh -s' -- "$release" <<'REMOTE'
set -eu
release="$1"
base=/srv/wormbakery
cd "$base/releases/$release"
sha256sum -c .manifest.sha256 >/dev/null
rm .manifest.sha256
test -s index.html
for page in profile works sns commission; do
  test -s "$page/index.html"
done
test ! -e CNAME
test ! -e "$base/current" || test -L "$base/current"
ln -s "releases/$release" "$base/.current-$release"
mv -Tf "$base/.current-$release" "$base/current"
printf 'Activated release %s\n' "$release"
REMOTE
