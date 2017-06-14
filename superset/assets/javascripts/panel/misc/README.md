# office-addin and web integration  

The office-addin and web integration is an application which  integrate Javascript with MS Office products.
You can import json data into the workbook from TaskPane, view the imported data and chart. And load the whole GBD-compare into workbook and presentation as ContentApp.

The following figures show the main screens of this add-in.

![Office Online Add-in - TaskPane](/images/react.redux.rechart.d3.office.pos.x.y.png)

## Table of Contents

* [Architecture](#Architecture)
* [Prerequisites](#prerequisites)
* [Run the application](#run-the-app)
* [Additional resources](#additional-resources)

## Architecture ( detail: soon )
* client-side: react-redux ( flux )
* server-side: managed microservice

## UX design patterns ( detail: soon )
* Material design
* Office design patterns

## Prerequisites
You'll need the following:

* Web server such as Nginx
* Signed and trusted web server certificate
* Office online

## Status
* alpha ( full life cycle of addins, show task-pane-app, data into office product, show charts from content-app )

## Run the app

1. Setup Web server and trusted certificate for https. Then start up the web server, and use the browser to test it. See example nginx configuration files as a reference. 
2. Login to Office online, open an Excel or other office products.
3. Tab to 'Insert', then 'Add-Ins', click 'Upload', then load manifest file to Office-online.
4. Will add it to your Office product.

## Build from src
* npm run compile
* to remove http, localhost, port from bunndle files
  config/environments.config.js, change compiler_public_path to empty:
  development : (config) => ({
    //compiler_public_path : `http://${config.server_host}:${config.server_port}/`
    compiler_public_path : ``
  }),
* /dist/ should have all files for deploy
* manifest files for office-add-ins in office directory


## Use cases ( user stories )
* (soon)
 
## Known limitation
* (soon)

## Note:
-Tests are performed on Office Online

## Additional resources
* [Office Dev Center](http://dev.office.com/)
* react
* react-reduce
* react-chart
* material-design
* office-online

## Copyright
Some of the code are Copyright (c) 2016 Microsoft. others under MIT license.  

