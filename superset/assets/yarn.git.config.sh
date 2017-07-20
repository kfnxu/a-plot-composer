# yarn install start to have error loading mapgl
# it try to git clone using ssh://git@github.com
# this is the fix
git config --global url."https://github.com".insteadOf "ssh://git@github.com"
