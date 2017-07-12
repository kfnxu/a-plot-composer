# plot composer

A web based tool for end user to compose data visualization plots into dashboard to tell a data story.

![Compare - Dashboard](/screenshots/plot.composer.dashboard.bubble.compare.png)
![Heatmap data binding - Data and Plot](/screenshots/plot.composer.plot.heatmap.png)
![Define data set - Data Query](/screenshots/plot.composer.sqllab.png))
![Plot - List](/screenshots/plot.composer.slice.list.png)
![Dashboard - list](/screenshots/plot.composer.dashboard.png)
![Data json format - Data api](/screenshots/plot.composer.data.api.png)

## Table of Contents

* [Motivation](#Motivation]
* [Architecture](#Architecture)
* [UX design pattern](#UX design pattern)
* [Additional resources](#additional-resources)

## Motivation
* use Material Design for UX
* decouple client-side dependency from backend templates
* change data request to API based

## Architecture 
* client-side: react-redux-material-ui-d3
* server-side: Flask App Builder

## UX design pattern 
* Material design

## Prerequisites
* python 2.7
* python-setuptools
* gcc gcc-c++ libffi-devel python-devel python-pip python-wheel openssl-devel libsasl2-devel openldap-devel
* proxy/cache/loadbalancer server such as Nginx

## Additional resources
* flask-SQLAlchemy
* mariadb 
* react
* react-reduce
* react-router
* material-ui

## Changes from original codebase
* use material-ui interface instead of flask-appbuild default ui interface 
* flask-appbuilder template: mainly use newly created list.html and panel.html templates
* merge most javascript index file to use reactjs
* request data from api using ajax instead of embeded in html page ( in the progress )

## Plot Composer is based on Superset from AirBnb with Material Design interface using Material-UI lib.

## License
Apache 2.0


