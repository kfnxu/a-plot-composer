## set the base image
#FROM centos:7.3.1611

## author
#MAINTAINER Kefan

## extra metadata
#LABEL name="plotserver"
#LABEL version="1.0"
#LABEL description="visengine image with Dockerfile."

# update sources list

yum -y update
yum -y install sudo
sudo yum -y install gcc gcc-c++ libffi-devel python-devel python-pip python-wheel openssl-devel libsasl2-devel openldap-devel
sudo yum -y  install python-devel.x86_64 libxml2-devel.x86_64 libxslt-devel.x86_64
sudo yum -y  install openssl.x86_64 openssl-libs.x86_64
sudo yum -y  install openssl-devel.x86_64
sudo yum -y  install cyrus-sasl-devel.x86_64
sudo yum -y  install cyrus-sasl-lib.x86_64
sudo yum -y  install cyrus-sasl.x86_64
sudo yum -y  install gcc-c++
sudo yum -y  install net-tools.x86_64
sudo yum -y  install libsemanage.x86_64
sudo yum -y  install libsemanage-python.x86_64
sudo yum -y  install policycoreutils-python
sudo yum -y  install libsemanage.x86_64
sudo yum -y  install libsemanage-python.x86_64
sudo yum -y install python-setuptools.noarch

sudo yum -y install epel-release

# install basic apps, one per line for better caching
sudo yum install -y git
sudo yum install -y sudo
sudo yum install -y wget
sudo yum -y install python-pip 
sudo yum -y install nodejs
sudo npm install -g yarn

# install app runtimes and modules
sudo pip install virtualenv
sudo mkdir --parent /srv/python/src
sudo virtualenv /srv/python/venv

# add user
adduser composer
usermod -aG wheel composer

cd /srv/python
sudo  . /srv/python/venv/bin/activate
sudo  pip install numpy
cd /srv/python/src/ 
sudo  git clone -v  https://github.com/kfnxu/a-plot-composer.git 
#COPY plotcomposer  /srv/python/src/plotcomposer 
cd /srv/python/src/a-plot-composer/superset/assets/

# yarn install start to have error loading mapgl
# it try to git clone using ssh://git@github.com
# this is the fix
git config --global url."https://github.com".insteadOf "ssh://git@github.com"

sudo  yarn install
sudo  yarn build
cd /srv/python/src/a-plot-composer
sudo  pip install flask
sudo  pip install flask-wtf
sudo  pip install flask-alembic
sudo  pip install flask-appbuilder
sudo  pip install Flask-MySQL

sudo  pip install setuptools --upgrade
sudo  python ./setup.py install

sudo  fabmanager create-admin --app superset
sudo  superset db upgrade
sudo  superset load_examples
sudo  superset init

sudo chown -R composer:composer /srv/python
sudo  superset runserver -p 8080 -t 300 &

## cleanup
#sudo yum -y autoremove

# add scripts to the container

# add the application to the container
# locales to UTF-8
#sudo locale-gen C.UTF-8 && /usr/sbin/update-locale LANG=C.UTF-8
#ENV LC_ALL C.UTF-8

