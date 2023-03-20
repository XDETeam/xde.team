Remove-Item .next -Recurse -Force

yarn build

# Created as `podman run --name deploy -itd -vc:/Projects:/projects fedora`
podman exec deploy bash /projects/xde/xde.team/www/deploy.sh
