cd /projects/xde/xde.team/www
rsync -avz --delete ./.next/standalone/ dc.hetzner1.app1:/data/volumes/team_xde/www
rsync -avz --delete ./.next/static dc.hetzner1.app1:/data/volumes/team_xde/www/.next
rsync -avz --delete ./package.json dc.hetzner1.app1:/data/volumes/team_xde/www/package.json
rsync -avz --delete ../node_modules dc.hetzner1.app1:/data/volumes/team_xde/www
ssh dc.hetzner1.app1 docker restart team_xde
