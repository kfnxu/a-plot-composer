# set the base image
FROM centos:7.3.1611

# author
MAINTAINER Kefan

# extra metadata
LABEL name="plotserver"
LABEL version="1.0"
LABEL description="visengine image with Dockerfile."

# update sources list

RUN yum -y update
RUN yum -y install gcc gcc-c++ libffi-devel python-devel python-pip python-wheel openssl-devel libsasl2-devel openldap-devel
RUN yum -y  install python-devel.x86_64 libxml2-devel.x86_64 libxslt-devel.x86_64
RUN yum -y  install openssl.x86_64 openssl-libs.x86_64
RUN yum -y  install openssl-devel.x86_64
RUN yum -y  install cyrus-sasl-devel.x86_64
RUN yum -y  install cyrus-sasl-lib.x86_64
RUN yum -y  install cyrus-sasl.x86_64
RUN yum -y  install gcc-c++
RUN yum -y  install net-tools.x86_64
RUN yum -y  install libsemanage.x86_64
RUN yum -y  install libsemanage-python.x86_64
RUN yum -y  install policycoreutils-python
RUN yum -y  install libsemanage.x86_64
RUN yum -y  install libsemanage-python.x86_64
RUN yum -y install python-setuptools.noarch
RUN yum -y install mysql

RUN yum -y install epel-release

# install basic apps, one per line for better caching
RUN yum install -y git
RUN yum install -y RUN
RUN yum install -y wget
RUN yum -y install python-pip 
RUN yum -y install nodejs
RUN npm install -g yarn

# install app runtimes and modules
RUN pip install virtualenv
RUN mkdir --parent /srv/python/src
WORKDIR /srv/python
RUN virtualenv /srv/python/venv
RUN . /srv/python/venv/bin/activate
RUN pip install numpy
WORKDIR /srv/python/src/ 
RUN git clone -v  https://github.com/kfnxu/a-plot-composer.git 
#COPY plotcomposer  /srv/python/src/plotcomposer 
WORKDIR /srv/python/src/a-plot-composer/superset/assets/
# yarn install start to have error loading mapgl
# it try to git clone using ssh://git@github.com
# this is the fix
RUN git config --global url."https://github.com".insteadOf "ssh://git@github.com"
RUN yarn install
RUN yarn build
WORKDIR /srv/python/src/a-plot-composer
RUN pip install flask
RUN pip install flask-wtf
RUN pip install flask-alembic
RUN pip install flask-appbuilder
RUN pip install Flask-MySQL
RUN pip install mysql-connector-python-rf
RUN pip install setuptools --upgrade

RUN python ./setup.py install
RUN fabmanager create-admin --app superset
RUN superset db upgrade
RUN superset load_examples
RUN superset init

RUN superset runserver -p 8088 -t 300 &

# cleanup
RUN yum -y autoremove

# add scripts to the container

# add the application to the container
# locales to UTF-8
#RUN locale-gen C.UTF-8 && /usr/sbin/update-locale LANG=C.UTF-8
#ENV LC_ALL C.UTF-8

