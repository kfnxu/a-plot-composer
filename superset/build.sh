Making your own build
For more advanced users, you may want to build Superset from sources. That would be the case if you fork the project to add features specific to your environment.:

# assuming $SUPERSET_HOME as the root of the repo
cd $SUPERSET_HOME/superset/assets
npm install
npm run build
cd $SUPERSET_HOME
# install package to /srv/python/venv/lib/python2.7/site-packages/superset-0.18.4a1-py2.7.egg 
python setup.py install
