//////////////////////////////////////////
////// ihme office integration 
////// should split into excel, word, ppt
//////////////////////////////////////////
 
var ihme = window.ihme || {};
ihme.office = new function () {
        "use strict";
        this.values;
        this.valuesRaw; 
        // default position and limit
        // can defined as {} object, but keep this way for now 
        this.sheet_data_pos_y = 32, 
        this.sheet_data_pos_x = 3, 
        this.start_pos =5, 
        this.limit=30; 
        this.timer = 3000;
        this.instance; 
        this.iframe; 
        this.uuid; 

        this.inputSetting = {
             model_id: 48, 
             location_id: 6,
             age_group_id: 5,
             sex_id: 1,
             start_year:2016,
             end_year: 2040
             };
 
        this.log = function(o){ 
          //app.showNotification(JSON.stringify(o));
          console.log('ihme.office.log', o);
        }

        this.officeFuncOverwrite = function(){
          //office.js disabled window.history.pushState
          //following lines are presents in Office.js
          //window.history.replaceState = null;
          //window.history.pushState = null;

          ////to support react-router, need to use alternative
          //if (typeof(window.history.pushState) !== 'function') {
          //  window.history.pushState = function(path){  
          //    window.location.hash = window.location.pathname + '#!' + JSON.stringify(path);
          //  }
          //}
        }
 
        this.genUUID = function () {
            return Math.random().toString(36).substring(2, 15) +
                   Math.random().toString(36).substring(2, 15);
        }

        this.init = function() {
            this.uuid = this.genUUID();
            //todo need to clear these uuids 
            if ( this.getFromLocalStorage('uuids') ) this.setToLocalStorage('uuids', this.getFromLocalStorage('uuids') + ":" + this.uuid);
            else this.setToLocalStorage('uuids', this.uuid);
            var isInIframe = window.frameElement && window.frameElement.nodeName == "IFRAME";
            this.log({msg:'init', i:isInIframe, if: window.frameElement, w:window});
            //the localstorage init here. todo setup init data from react-redux configuration file instead, make less dependency on ihme.office.js 
            this.setInitLocalStorage(); 
            var url = this.setDataSourceAPI(); 
            this.setToLocalStorage('inputDataSourceAPI', url);

            if ( window.ihme.office.getFromLocalStorage('inputDataSourceAPI') == "" ) 
                 this.setToLocalStorage('inputDataSourceAPI', '/v1.0/forecasting/outputs/48?location_id=7&age_group_id=2&sex_id=2&start_year=2016&end_year=2040');
            Office.initialize = function (reason) {
              $(document).ready(function () {
               app.initialize();
             });
            };
        };

        this.setInitLocalStorage = function(){ 

                if ( !this.getFromLocalStorage('inputModel') ) this.setToLocalStorage('inputModel', 48); 
                if ( !this.getFromLocalStorage('inputAge') ) this.setToLocalStorage('inputAge', 2); 
                if ( !this.getFromLocalStorage('inputSex') ) this.setToLocalStorage('inputSex', 2); 
                if ( !this.getFromLocalStorage('inputYear') ) this.setToLocalStorage('inputYear', 2017); 
                if ( !this.getFromLocalStorage('inputStartYear') ) this.setToLocalStorage('inputStartYear', 2016); 
                if ( !this.getFromLocalStorage('inputEndYear') ) this.setToLocalStorage('inputEndYear', 2020); 
                if ( !this.getFromLocalStorage('inputLocation') ) this.setToLocalStorage('inputLocation', 7); 

        }

        this.setDataSourceAPI = function(){

                var url = '/v1.0/forecasting/outputs/';
                url += this.setParameters();
                return url;

        }

        this.setDefaultDataSourceAPI = function(){
               var url = '/v1.0/forecasting/outputs/48?location_id=7&age_group_id=2&sex_id=2&start_year=2016&end_year=2040'
               return url; 
        }

        this.setParameters = function(){

                var parameters = "";
                if ( this.getFromLocalStorage('inputModel') ) parameters += this.getFromLocalStorage('inputModel') + "?";
                if ( this.getFromLocalStorage('inputAge') ) parameters += '&age_group_id=' + this.getFromLocalStorage('inputAge');
                if ( this.getFromLocalStorage('inputSex') ) parameters += '&sex_id=' + this.getFromLocalStorage('inputSex');
                //if ( this.getFromLocalStorage('inputYear') ) parameters += '&year_id=' + this.getFromLocalStorage('inputYear');
                if ( this.getFromLocalStorage('inputStartYear') ) parameters += '&start_year=' + this.getFromLocalStorage('inputStartYear');
                if ( this.getFromLocalStorage('inputEndYear') ) parameters += '&end_year=' + this.getFromLocalStorage('inputEndYear');
                //if ( this.getFromLocalStorage('inputLocation') ) parameters += '&location_id=' + this.getFromLocalStorage('inputLocation');

                return parameters;

        }

        this.loadForecastingData = function() {

                //var url = '/v1.0/forecasting/outputs/48?location_id=7&age_group_id=2&sex_id=2&start_year=2016&end_year=2040'; 
                //$.getJSON('https://localhost/v1.0/forecasting/pop_cohorts/48?start_year=2016&end_year=2040', function (data) {
                var url = this.setDataSourceAPI(); 
                console.log('ihme.office loadforecastingData', url); 
                this.setToLocalStorage('inputDataSourceAPI', url); 

                var self = this;
                $.getJSON(url, function (data) {
                    self.valuesRaw = data; 
                    self.log({msg:'data', data:data});
                    self.values = [[]];
                    if ( typeof self.getFromLocalStorage('inputDataStartpos') === 'number' ) 
                         self.start_pos = typeof self.getFromLocalStorage('inputDataStartpos') ;
                    if ( typeof self.getFromLocalStorage('inputDataLength') === 'number' ) 
                         self.limit = typeof self.getFromLocalStorage('inputDataLength') ;
                    if ( data.length > 0 ){
                       //build column name first
                       for(var key in data[0])
                       {
                         self.values[0].push(key);
                       }
                       if ( data.length < ( self.limit + self.start_pos ) ) self.limit = data.length - self.start_pos;
                       for(var i = self.start_pos; i< ( self.limit + self.start_pos ) ; i++){
                         var r = [];
                         for(var key in data[i] ){
                             r.push(data[i][key]);
                         }
                         self.values.push(r);
                       }
                       self.log({msg:'prepared data for excel', v:self.values});
                       self.importForecastingData();  
                    }
                    else {
                       self.log({msg:'empty, no data'});
                    }
                })
                .error(function(){
                       self.log({msg:'error, no data'});
               });
        }

        // Import sample forecastringData into the workbook
        this.importForecastingData = function() {

          var self = this;
          // Run a batch operation against the Excel object model
          Excel.run(function (ctx) {
            self.log({msg:"Excel run"});
            var message = "";
            var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
                           "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
            var sheet = ctx.workbook.worksheets.getActiveWorksheet();
            var y = self.sheet_data_pos_y; //1;
            self.log({msg:"Excel run"});
            var message = "";
            var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
                           "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
            var sheet = ctx.workbook.worksheets.getActiveWorksheet();
            var y = self.sheet_data_pos_y; //1;
            var sx = parseInt(self.getFromLocalStorage('targetPosX'));
            var sy = parseInt(self.getFromLocalStorage('targetPosY'))
            if ( typeof sy === 'number' ) y = sy;
            var x = self.sheet_data_pos_x; //1;
            if (     typeof sx === 'number' 
                 &&  sx > 0 
                 &&  sx < ( letters.length - self.values[0].length - 1) ) 
                 x = sx;
            //var address = "A" + y + ":" + letters[self.values[0].length-1] + (( parseInt(y) - 1 ) + self.values.length ); //"A1:J" + self.values.length;
            var address = letters[x-1] + y + ":" + letters[ (x -1) + (self.values[0].length-1) ] + (( parseInt(y) - 1 ) + self.values.length ); //"A1:J" + self.values.length;
            self.log({msg:'address', x:x,y:y, sx: self.getFromLocalStorage('targetPosX'), sy: self.getFromLocalStorage('targetPosY'),  a:address});
            var range = sheet.getRange(address); 
            //try clear the range
            range.clear(Excel.ClearApplyTo.contents);

	    range.values = self.values;
            return ctx.sync();
          })
          .then(function () {
          })
          .catch(function (error) {
            handleError(error);
          });

       }

       // Helper function to add and format content in the workbook
       this.addContentToWorksheet = function(sheetObject, rangeAddress, displayText, typeOfText) {

        var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
                       "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

        // Format differently by the type of content
        switch (typeOfText) {
            case "SheetTitle":
                var range = sheetObject.getRange(rangeAddress);
                range.values = displayText;
                range.format.font.name = "Corbel";
                range.format.font.size = 30;
                range.format.font.color = "white";
                range.merge();
                //Fill color in the brand bar
                sheetObject.getRange("A1:M1").format.fill.color = "#41AEBD";
                break;
            case "SheetHeading":
                var range = sheetObject.getRange(rangeAddress);
                range.values = displayText;
                range.format.font.name = "Corbel";
                range.format.font.size = 18;
                range.format.font.color = "#00b3b3";
                range.merge();
                break;
            case "SheetHeadingDesc":
                var range = sheetObject.getRange(rangeAddress);
                range.values = displayText;
                range.format.font.name = "Corbel";
                range.format.font.size = 10;
                range.merge();
                break;
            case "SummaryDataHeader":
                var range = sheetObject.getRange(rangeAddress);
                range.values = displayText;
                range.format.font.name = "Corbel";
                range.format.font.size = 13;
                range.merge();
                break;
            case "SummaryDataValue":
                var range = sheetObject.getRange(rangeAddress);
                range.numberFormat = numberFormat;
                range.values = displayText;
                range.format.font.name = "Corbel";
                range.format.font.size = 13;
                range.merge();
                break;
            case "TableHeading":
                var range = sheetObject.getRange(rangeAddress);
                range.values = displayText;
                range.format.font.name = "Corbel";
                range.format.font.size = 12;
                range.format.font.color = "#00b3b3";
                range.merge();
                break;
            case "TableHeaderRow":
                var range = sheetObject.getRange(rangeAddress);
                range.format.font.name = "Corbel";
                range.format.font.size = 10;
                range.format.font.bold = true;
                range.format.font.color = "black";
                break;
            case "TableDataRows":
                var range = sheetObject.getRange(rangeAddress);
                range.format.font.name = "Corbel";
                range.format.font.size = 10;
                sheetObject.getRange(rangeAddress).format.borders.getItem('EdgeBottom').style = 'Continuous';
                sheetObject.getRange(rangeAddress).format.borders.getItem('EdgeTop').style = 'Continuous';
                break;
            case "TableTotalsRow":
                var range = sheetObject.getRange(rangeAddress);
                range.format.font.name = "Corbel";
                range.format.font.size = 10;
                range.format.font.bold = true;
                break;
         }
       }

       //////// 
       this.getTags = function(cb){
         var self = this;
         self.log('getTags', cb);
         Word.run(function (context) {
              // Create a proxy object for the content controls collection.
              var contentControls = context.document.contentControls;
              // need to specify the 'columns' to load, or will gets no-exception-dump, no error shows, really bad for debugging
              contentControls.load('text, tag, title, color');
              // Synchronize the document state by executing the queued commands,
              // and return a promise to indicate task completion.
              return context.sync().then(function () {
                 //self.log({msg:"gettags",o:contentControls});
                 if (contentControls.items.length === 0) {
                     self.log({msg:"There isn't a content control in this document."});
                 } else {
                    var c = "<br><div id='tag'>List of tags:";
                    for( var i =0; i<contentControls.items.length;i++){
                       c += "<li><input type='radio' name='" + self.getNodes().tag.webnode + "' value='" + contentControls.items[i].title + "' >" + contentControls.items[i].title +"\n";
                    }
                    c += "</div>";
                    console.log('getTags return', c); 
                    $('#'+self.getNodes().tag.webnode).html(c);
                    //callback function
                    //if(typeof cb === 'function' ) cb(contentControls.items);
                 }


             })
             .catch(function (error) {
               self.log({msg:'getTags return Error' , e:error});
               if (error instanceof OfficeExtension.Error) {
                  self.log({msg:'Debug info: ' + JSON.stringify(error.debugInfo)});
               }
             });

        })
        .catch(function (error) {
            self.log({msg:'getTags run Error', e: error});
            if (error instanceof OfficeExtension.Error) {
               self.log({msg:'Debug info: ' + JSON.stringify(error.debugInfo)});
            }
         });

       }

       this.bindingTagToData = function(){
         var self = this;
         var tagName = document.querySelector('input[name="' + self.getNodes().tag.webnode + '"]:checked').value;
         var cell = document.querySelector('input[name="' + self.getNodes().tag.datacell + '"]:checked').value;
         var cellIds = cell.split(',');
         self.log({mg:'Tag:"' + tagName + '"Cell:"' + JSON.stringify(cellIds) + '"'});
 
         Word.run(function (context) {
              // Create a proxy object for the content controls collection.
              var contentControls = context.document.contentControls;

              // need to specify the 'columns' to load, or will gets no-exception-dump, no error shows, really bad for debugging
              contentControls.load('text, tag, title, color');
              // Synchronize the document state by executing the queued commands,
              // and return a promise to indicate task completion.
              self.log({msg:'word run context', c:context, cl:contentControls});
              return context.sync().then(function () {
                 if (contentControls.items.length === 0) {
                     self.log({msg:"There isn't a content control in this document."});
                 } else {
                    var tagtitle = tagName;
                    var binding = [cellIds[0], cellIds[1]];
                    var c = "controls(tags)";
                    self.log({msg:'binding', b:binding, v: self.valuesRaw[binding[0]][binding[1]].toString()});
                    for( var i =0; i<contentControls.items.length;i++){
                         if ( contentControls.items[i].title === tagtitle ){
                              c += "<br>title:" + contentControls.items[i].title + "<br>tag:" + contentControls.items[i].tag;
                              contentControls.items[i].insertText(self.valuesRaw[binding[0]][binding[1]].toString(), 'replace');
                              self.log({msg:'controls', i:contentControls.items[i]});
                         }

                         c += "<br>title:" + contentControls.items[i].title + "<br>tag" + contentControls.items[i].tag;

                    }
                 }
                 window.ihme.office.setToLocalStorage('inputDataBinding', JSON.stringify({tn:tagName,cid:cellIds})); 
             })
             .catch(function (error) {
               self.log({msg:'bindingTagToData return Error', e:error});
               if (error instanceof OfficeExtension.Error) {
                  self.log({msg:'Debug info: ' + JSON.stringify(error.debugInfo)});
               }
             });

        })
        .catch(function (error) {
            self.log({msg:'bindingTagToData word.run Error: ' + JSON.stringify(error)});
            if (error instanceof OfficeExtension.Error) {
               self.log({msg:'Debug info: ' + JSON.stringify(error.debugInfo)});
            }
         });
       }

       //// localStorage 
       this.setToLocalStorage = function ( key, value ){
            localStorage.setItem(key, value);
       }

       this.getFromLocalStorage = function ( key ){
            return localStorage.getItem(key);
       }
     
       //// unified node name shared between office and web
       this.getNodes = function(){
             var nodes = {
               tag: {
                      webnode: "office-content-control-tag", 
                      datacell: "api-data-binding-cell",
                    },
              chart: {
                      webnode: "office-content-chart",
                     }

            };
            return nodes;
       }

       //// need to rewrite the all  pub/sub functions
       this.consumer = function(id){
            this.iframe = window; 
            var self = this;
            
            if ( !this.instance ){
                 this.instance = setInterval( function(){ self.consumerCommand(self, id);}, self.timer); 
            }
       }

       this.consumerCommand = function(obj, id){ 
            var c = obj.getFromLocalStorage(obj.uuid); //'pub'); 
            switch(c){
              case 'UPDATE_API_DATA':
                   //reload chart
                   var el = document.getElementById(id);
                   if (el.onclick) {
                        el.onclick();
                   } else if (el.click) {
                        el.click();
                   }
                   obj.log({msg:'xCommand', f:obj.iframe, c:c, o:id, t: (new Date() )} );
                   obj.setToLocalStorage(obj.uuid, '');
                   break;

              case 'linearChartCmd': 
                   //show linearChart
                   var el = document.getElementById(id);
                   if (el.onclick) {
                        el.onclick();
                   } else if (el.click) {
                        el.click();
                   }
                   //if(obj.iframe) obj.iframe.opacity=0.3;
                   obj.log({msg:'xCommand', f:obj.iframe, c:c, o:id, t: (new Date() )} );
                   obj.setToLocalStorage(obj.uuid, '');
                   break; 
              default: 
                obj.setToLocalStorage(obj.uuid, '');
                break;
            }
            obj.log({msg:'xCommand', c:c, t: (new Date() )} );
       }

       this.publishCommand = function(cmd){ 
           //loop throught each uuid and send command to them
           var uuids = (this.getFromLocalStorage('uuids')).split(":");
           console.log('publisherCOmmand', uuids, cmd); 
           for(var i = 0; i<uuids.length;i++){
              this.setToLocalStorage(uuids[i], cmd); 
           }
       }
       this.getIframes = function(){
          var iframes = document.getElementsByTagName('iframe');
          this.log({msg:"iframes", i:iframes});
          return iframes; 
       }
       // Handle errors
       this.handleError = function(error) {
        // Always be sure to catch any accumulated errors that bubble up from the Excel.run execution
        this.log({ msg:"handleError: " , e: error});
        if (error instanceof OfficeExtension.Error) {
            this.log({msg:"Debug info: " + JSON.stringify(error.debugInfo)});
        }
      }
       
};

/////////////////////// 
ihme.office.init();
///////////////////////
