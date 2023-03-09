cd /projects/xde/xde.team/www
rsync -avz --delete ./.next/standalone/ dc.hetzner1.app1:/data/volumes/team_xde/www
rsync -avz --delete ./.next/static dc.hetzner1.app1:/data/volumes/team_xde/www/www/.next
ssh dc.hetzner1.app1 docker restart team_xde
