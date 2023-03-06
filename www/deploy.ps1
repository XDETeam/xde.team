rm .next -Recurse -Force

yarn build
podman exec deploy bash /projects/xde/xde.team/www/deploy.sh

