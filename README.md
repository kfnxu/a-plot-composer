# plot composer

A web based tool for end user to compose data visualization plot into dashboard to tell a complete data story.

![Compare - Dashboard](/screenshots/plot.composer.dashboard.bubble.compare.png)
![Heatmap data binding - Data and Plot](/screenshots/plot.composer.plot.heatmap.png)
![Define data set - Data Query](/screenshots/plot.composer.sqllab.png))

## Table of Contents

* [Architecture](#Architecture)
* [UX design pattern](#UX design pattern)
* [Additional resources](#additional-resources)

## Architecture 
* client-side: react-redux-material-ui-d3
* server-side: Flask App Builder

## UX design pattern 
* Material design

## Prerequisites
You'll need the following:
* Web server such as Nginx

## Additional resources
* flask-SQLAlchemy
* mariadb 
* react
* react-reduce
* react-router
* material-ui

## Changes from original codebase
* use material-ui interface instead of flask-appbuild default ui interface 
* flask-appbuilder template: mainly use newly created panel.html template
* merge most javascript index file to use reactjs
* request data from api using ajas instead of embeded in html page ( in the progress )

##Plot Composer is based on Superset from AirBnb with Material Design interface using Material-UI lib.

##License
Apache 2.0


