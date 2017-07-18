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
RUN yum -y install epel-release

# install basic apps, one per line for better caching
RUN yum install -qy git
RUN yum install -qy sudo
RUN yum install -qy wget
RUN yum -y install python-pip 
RUN yum -y install nodejs
RUN npm install -g yarn

# install app runtimes and modules
RUN git clone https://github.com/kfnxu/a-plot-composer.git
RUN pip install virtualenv
RUN pip install numpy
RUN mkdir --parent /srv/python/src
RUN cd /srv/python
RUN virtualenv venv
RUN . ./venv/bin/activate
RUN cd src
RUN git clone https://github.com/kfnxu/a-plot-composer.git
RUN cd superset/superset/assets/
RUN yarn run install
RUN yarn run build
RUN cd ../../
RUN python setup.py install

# cleanup
RUN yum -qy autoremove

# add scripts to the container

# add the application to the container

# locales to UTF-8
RUN locale-gen C.UTF-8 && /usr/sbin/update-locale LANG=C.UTF-8
ENV LC_ALL C.UTF-8

