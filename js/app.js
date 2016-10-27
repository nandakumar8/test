
var underscore = angular.module('underscore', []);
underscore.factory('_', ['$window', function() {
  return $window._;
}]);

var app=angular.module('myApp',['ui.bootstrap','highcharts-ng','ui.router','infinite-scroll','underscore']);

app.constant('_',
    window._
);

app.config(function($stateProvider){
  console.log($stateProvider);
  $stateProvider
  .state('report',{
    url: "/main",
    views:{
      "query":{templateUrl:"views/main.html",
      controller:"postController"}
    }
  })
  .state('table',{
    url: "/report",
    views:{
      "query":{templateUrl:"views/test.html",
      controller:"postController"}
    }
  })
});

app.service('sharedProperties', function($http,$rootScope) {

  /*  var stringValue =[];
  var paidValue=[];
  var blockedValue=[];*/
  var stringValue=" ";
  var paidValue=" ";
  var blockedValue=" ";
  var pubid={};
  var filter={};
  var pubdata={};
  //pubid=JSON.stringify(pubid);
  return {
    getfilter:function() {
      return filter;
    },
    setfilter: function(tminval,tmaxval,pminval,pmaxval,bminval,bmaxval,countryval,country_list,clusterval,cluster_list,datacenterval,datacenter_list,impsourceval,impsource_list,deviceval,device_list) {
      var tmin=" ";
      var tmax=" ";
      var pmin=" ";
      var pmax=" ";
      var bmin=" ";
      var bmax=" ";
      var country=[];
      var cluster=[];
      var datacenter=[];
      var impsource=[];
      var device=[];
      console.log("in filter");
      console.log(countryval);
      console.log(country_list);
      console.log(clusterval);
      console.log(cluster_list);
      console.log(datacenterval);
      console.log(datacenter_list);
      console.log(impsourceval);
      console.log(impsource_list);
      console.log(deviceval);
      console.log(device_list);
      if(tminval==undefined){
        tmin=0;
      }
      else{
        tmin=tminval;
      }
      if(tmaxval==undefined){
        tmax=1000;
      }
      else{
        tmax=tmaxval;
      }
      if(pminval==undefined){
        pmin=0;
      }
      else{
        pmin=pminval;
      }
      if(pmaxval==undefined){
        pmax=1000;
      }
      else{
        pmax=pmaxval;
      }
      if(bminval==undefined){
        bmin=0;
      }
      else{
        bmin=bminval;
      }
      if(bmaxval==undefined){
        bmax=1000;
      }
      else{
        bmax=bmaxval;
      }
      if(countryval==undefined || countryval=="All"){
        country=country_list;
      }
      else{
        country.push(countryval);
      }
      if(clusterval==undefined || clusterval=="All"){
        cluster=cluster_list;
      }
      else{
        cluster.push(clusterval);
      }
      if(datacenterval==undefined || datacenterval=="All"){
        datacenter=datacenter_list;
      }
      else{
        datacenter.push(datacenterval);
      }
      if(impsourceval==undefined || impsourceval=="All"){
        impsource=impsource_list;
      }
      else{
        impsource.push(impsourceval);
      }
      if(deviceval==undefined || deviceval=="All"){
        device=device_list;
      }
      else{
        device.push(deviceval);
      }
      filter['tmin']=tmin;
      filter['tmax']=tmax;
      filter['pmin']=pmin;
      filter['pmax']=pmax;
      filter['bmin']=bmin;
      filter['bmax']=bmax;
      filter['country']=country;
      filter['cluster']=cluster;
      filter['datacenter']=datacenter;
      filter['impsource']=impsource;
      filter['device']=device;
      //stringValue=value;
      $rootScope.$broadcast("updates");
    },
    getdata:function() {
      return pubdata;
    },
    setdata: function(tmin,tmax,pmin,pmax,bmin,bmax,country,cluster,datacenter,impsource,device) {
      pubdata={};
      console.log("in setter");
      console.log(tmin);
      console.log(tmax);
      console.log(pmin);
      console.log(pmax);
      console.log(bmin);
      console.log(bmax);
      console.log(country);
      console.log(cluster);
      console.log(datacenter);
      console.log(impsource);
      console.log(device);
      $http.get('data/dataviewsource.json').success(function(data) {
        var datax=data;
        console.log("data"+datax.length);
        var n=0;
        for(j=0;j<=datax.length;j++){

          if(datax[j] && datax[j].total_aggr>=tmin && datax[j].total_aggr<=tmax && datax[j].paid_aggr>=pmin && datax[j].paid_aggr<=pmax && datax[j].blocked_aggr>=bmin && datax[j].blocked_aggr<=bmax && country.indexOf(datax[j].countryname)>-1 && cluster.indexOf(datax[j].clustername)>-1 && datacenter.indexOf(datax[j].datacenter)>-1 && impsource.indexOf(datax[j].impsource)>-1 && device.indexOf(datax[j].device)>-1  ){
            //if(datax[j] && datax[j].total_aggr>=tmin && datax[j].total_aggr<=tmax && datax[j].paid_imp>=pmin && datax[j].paid_impressions<=pmax && datax[j].total_blocked_impressions>=bmin && datax[j].total_blocked_impressions<=bmax && country.indexOf(datax[j].countryname)>-1 && cluster.indexOf(datax[j].clustername)>-1 && datacenter.indexOf(datax[j].datacenter)>-1 && impsource.indexOf(datax[j].impsource)>-1 && device.indexOf(datax[j].device)>-1  ){
            pubdata[n]=datax[j];
            n++;
          }

        }
        $rootScope.$broadcast("pubupdates");
      });
    },
    gettmin:function() {
      return stringValue;
    },
    settmin: function(value) {
      /*stringValue[0] = minvalue;
      stringValue[1]=maxvalue;*/
      stringValue=value;
      $rootScope.$broadcast("updates");
    },
    gettmax:function() {
      return stringValue;
    },
    settmax: function(value) {
      /*stringValue[0] = minvalue;
      stringValue[1]=maxvalue;*/
      stringValue=value;
      $rootScope.$broadcast("updates");
    },
    getString:function() {
      return stringValue;
    },
    setString: function(value) {
      /*stringValue[0] = minvalue;
      stringValue[1]=maxvalue;*/
      stringValue=value;
      $rootScope.$broadcast("updates");
    },
    getPaid:function() {
      return paidValue;
    },
    setPaid: function(value) {
      /*paidValue[0] =minvalue;
      paidValue[1] =maxvalue;*/
      paidValue=value;
      $rootScope.$broadcast("updates");
    },
    getBlocked:function() {
      return blockedValue;
    },
    setBlocked: function(value) {
      /*  blockedValue[0] = minvalue;
      blockedValue[1] = maxvalue;*/
      blockedValue=value;
      $rootScope.$broadcast("updates");
    },
    getPubid:function(){
      return pubid;
    },
    setPubid:function(tval,pval,bval,countryval,country_list,clusterval,cluster_list,datacenterval,datacenter_list,impsourceval,impsource_list,deviceval,device_list){
      pubid={};
      var t=" ";
      var p=" ";
      var b=" ";
      var country=[];
      var cluster=[];
      var datacenter=[];
      var impsource=[];
      var device=[];
      /*tmin=" ";
      pmin=" ";
      bmin=" ";
      tmax=" ";
      pmax=" ";
      bmax=" ";*/
      if(isNaN(tval)){
        t=0;
      }
      else{
        t=tval;
      };
      if(isNaN(pval)){
        p=0;
      }
      else{
        p=pval;
      };
      if(isNaN(bval)){
        b=0;
      }
      else{
        b=bval;
      };
      if(countryval==undefined || countryval=="All"){
        country=country_list;
      }else{
        country.push(countryval);
      }
      if(clusterval==undefined || clusterval=="All"){
        cluster=cluster_list;
      }else{
        cluster.push(clusterval);
      }
      if(datacenterval==undefined || datacenterval=="All"){
        datacenter=datacenter_list;
      }else{
        datacenter.push(datacenterval);
      }
      if(impsourceval==undefined || impsourceval=="All"){
        impsource=impsource_list;
      }else{
        impsource.push(impsourceval);
      }
      if(deviceval==undefined || deviceval=="All"){
        device=device_list;
      }else{
        device.push(deviceval);
      }
      var items= JSON.parse(window.localStorage.getItem('data'));
      if(items === undefined ||items === null || items.length === 0){
        /*  $http({
        method :'GET',
        url:'/alldata'
      }).success(function (data, status, headers, config) {
      window.localStorage.setItem('alldata',JSON.stringify(data));
    });*/
    $http({
      method :'GET',
      url:'/data'
    }).success(function (data, status, headers, config) {
      window.localStorage.setItem('data',JSON.stringify(data));
      var n=0;
      for(j=0;j<=data.length;j++){
        if(data[j] && data[j].total_impressions>=t && data[j].paid_impressions>=p && data[j].total_blocked_impressions>=b){
          pubid[n]=data[j];
          n++;

        }
      }
      $rootScope.$broadcast("pubupdates");
    })
  }
  else{
    $http.get('data/dataviewsource.json').success(function(data) {
      //var datax=JSON.parse(window.localStorage.getItem('data'));
      var datax=data;
      console.log("data"+datax.length);
      var n=0;
      console.log(countryval);
      console.log(typeof(countryval));
      //if(countryval==undefined){
      console.log(country);
      console.log(cluster);
      console.log(datacenter);
      console.log(impsource);
      console.log(device);
      for(j=0;j<=datax.length;j++){

        if(datax[j] && datax[j].total_impressions>=t && datax[j].paid_impressions>=p && datax[j].total_blocked_impressions>=b && country.indexOf(datax[j].countryname)>-1 && cluster.indexOf(datax[j].clustername)>-1 && datacenter.indexOf(datax[j].datacenter)>-1 && impsource.indexOf(datax[j].impsource)>-1 && device.indexOf(datax[j].device)>-1){
          pubid[n]=datax[j];
          n++;
        }
      }
      //}
      /*  else{
      for(j=0;j<=datax.length;j++){
      if(datax[j] && datax[j].total_impressions>=t && datax[j].paid_impressions>=p && datax[j].total_blocked_impressions>=b && datax[j].countryname==countryval && datax[j].clustername==clustername){
      pubid[n]=datax[j];
      n++;
    }
  }
}*/
$rootScope.$broadcast("pubupdates");
});
}
}
}

});
//if(data[j] && data[j].total_impressions>=tmin  && data[j].total_impressions<=tmax && data[j].paid_impressions>=pmin && data[j].paid_impressions<=pmax && data[j].total_blocked_impressions>=bmin && data[j].total_blocked_impressions<=bmax){
//if(datax[j] && datax[j].total_impressions>=tmin  && datax[j].total_impressions<=tmax && datax[j].paid_impressions>=pmin && datax[j].paid_impressions<=pmax && datax[j].total_blocked_impressions>=bmin && datax[j].total_blocked_impressions<=bmax){
app.controller('postController',function($scope,$http,$state,$rootScope,$filter,sharedProperties,_){
  /*  $scope.curvalmin='';
  $scope.curvalmax='';
  $scope.paidcurmin='';
  $scope.paidcurmax='';
  $scope.blockedcurmin='';
  $scope.blockedcurmax='';*/
  $scope.curval='';
  $scope.paidcur='';
  $scope.blockedcur='';
  $scope.itemst=[];
  $scope.total_impressionst=[];
  $scope.paid_impressionst=[];
  $scope.blocked_impressionst=[];
  $scope.chartListx=[];
  $scope.countrytemp=[];
  var country_list=[];
  $scope.filtertemp={};
  $http.get('data/country.json').success(function(data) {
    $scope.countrydata = data;
    for(j=0;j<=$scope.countrydata.length;j++){
      if($scope.countrydata[j]){
        $scope.countrytemp.push($scope.countrydata[j].countryname);
        country_list.push($scope.countrydata[j].countryname);
      }
    }
    $scope.country=$scope.countrytemp;

  });

  $scope.cluster=["Big aggregators","Useless","Low Quality","Too many Visitors","Ad servers","Too Many Domains: Stop","Overpriced","Low Cost / Goldmine","Not interesting","All"];
  $scope.datacenter=["LGA","AMS","SJC","N/A","All"];
  $scope.impsource=["TAG","API","GI","HB","N/A","All"];
  $scope.device=["Desktop","Mobile","All"];
  $scope.totalkey=["0","10","20","30","40","50","100","250","500","750","1000"];
  $scope.paidkey=["0","10","20","30","40","50","100","250","500","750","1000"];
  $scope.blockedkey=["0","10","20","30","40","50","100","250","500","750","1000"];

  //country_list=$scope.country;
  console.log("temp list");
  console.log(country_list);
  console.log(typeof(country_list));
  console.log($scope.device_key + $scope.device);
  //console.log($scope.tmin_key);
  //sharedProperties.settmin($scope.tmin_key);
  //  sharedProperties.settmax($scope.tmax_key);
  $scope.init=function(){
    $scope.toggle=true;
    sharedProperties.setfilter($scope.tmin_key,$scope.tmax_key,$scope.pmin_key,$scope.pmax_key,$scope.bmin_key,$scope.bmax_key,$scope.country_key,country_list,$scope.cluster_key,$scope.cluster,$scope.datacenter_key,$scope.datacenter,$scope.impsource_key,$scope.impsource,$scope.device_key,$scope.device);
  }

  $scope.update=function(){
    sharedProperties.setfilter($scope.tmin_key,$scope.tmax_key,$scope.pmin_key,$scope.pmax_key,$scope.bmin_key,$scope.bmax_key,$scope.country_key,country_list,$scope.cluster_key,$scope.cluster,$scope.datacenter_key,$scope.datacenter,$scope.impsource_key,$scope.impsource,$scope.device_key,$scope.device);
  }
  $scope.slider_ticks_values = {
    minValue: 1,
    maxValue: 10,
    value: 5,
    options: {
      ceil: 10,
      floor: 0,
      showTicksValues: true,
      onEnd: function () {
        $scope.curval= $scope.slider_ticks_values.value;
        /*$scope.curvalmin = $scope.slider_ticks_values.minValue;
        $scope.curvalmax = $scope.slider_ticks_values.maxValue;
        sharedProperties.setString($scope.curvalmin,$scope.curvalmax);*/
        sharedProperties.setString($scope.curval);
      }
    }
  };

  $scope.slider_paid_values = {
    minValue: 1,
    maxValue: 10,
    value: 5,
    options: {
      ceil: 10,
      floor: 0,
      showTicksValues: true,
      onEnd: function () {
        $scope.paidcur= $scope.slider_paid_values.value;
        /*  $scope.paidcurmin = $scope.slider_paid_values.minValue;
        $scope.paidcurmax = $scope.slider_paid_values.maxValue;
        sharedProperties.setPaid($scope.paidcurmin,$scope.paidcurmax);*/
        sharedProperties.setPaid($scope.paidcur);
      }
    }
  };

  $scope.slider_blocked_values = {
    minValue: 1,
    maxValue: 10,
    value: 5,
    options: {
      ceil: 10,
      floor: 0,
      showTicksValues: true,
      onEnd: function () {
        $scope.blockedcur=$scope.slider_blocked_values.value;
        /*  $scope.blockedcurmin = $scope.slider_blocked_values.minValue;
        $scope.blockedcurmax = $scope.slider_blocked_values.maxValue;
        sharedProperties.setBlocked($scope.blockedcurmin,$scope.blockedcurmax);*/
        sharedProperties.setBlocked($scope.blockedcur);
      }
    }
  };


  $rootScope.$on("updates",function(){
    /*$scope.tarr=sharedProperties.getString();
    console.log(sharedProperties.getString());
    $scope.parr=sharedProperties.getPaid();
    $scope.barr=sharedProperties.getBlocked();
    $scope.tempmin=parseInt($scope.tarr[0])*1000000;
    $scope.tempmax=parseInt($scope.tarr[1])*1000000;
    $scope.tempPaidmin=parseInt($scope.parr[0])*100000;
    $scope.tempPaidmax=parseInt($scope.parr[1])*100000;
    $scope.tempBlockedmin=parseInt($scope.barr[0])*100000;
    $scope.tempBlockedmax=parseInt($scope.barr[1])*100000;
    console.log($scope.tempmin+" "+$scope.tempmax+" "+ $scope.tempPaidmin+" "+$scope.tempPaidmax+" "+$scope.tempBlockedmin+" "+$scope.tempBlockedmax);*/
    //sharedProperties.settmin($scope.tmin_key);
    //  sharedProperties.settmax($scope.tmax_key);
    $scope.filtertemp=sharedProperties.getfilter();
    console.log($scope.filtertemp);
    $scope.temptmin=parseInt($scope.filtertemp['tmin'])*1000000;
    $scope.temptmax=parseInt($scope.filtertemp['tmax'])*1000000;
    $scope.temppmin=parseInt($scope.filtertemp['pmin'])*1000000;
    $scope.temppmax=parseInt($scope.filtertemp['pmax'])*1000000;
    $scope.tempbmin=parseInt($scope.filtertemp['bmin'])*1000000;
    $scope.tempbmax=parseInt($scope.filtertemp['bmax'])*1000000;
    $scope.tempcountry=$scope.filtertemp['country'];
    console.log($scope.tempcountry);
    $scope.tempcluster=$scope.filtertemp['cluster'];
    $scope.tempdatacenter=$scope.filtertemp['datacenter'];
    $scope.tempimp=$scope.filtertemp['impsource'];
    $scope.tempdevice=$scope.filtertemp['device'];

    /*  $scope.temp=parseInt(sharedProperties.getString())*100000;
    console.log($scope.temp);
    $scope.tempPaid=parseInt(sharedProperties.getPaid())*100000;
    console.log($scope.tempPaid);
    $scope.tempBlocked=parseInt(sharedProperties.getBlocked())*100000;
    console.log($scope.tempBlocked);
    $scope.tminval=parseInt(sharedProperties.gettmin())*1000000;
    console.log($scope.tminval);
    $scope.tmaxval=parseInt(sharedProperties.gettmax())*1000000;
    console.log($scope.tmaxval);*/

    $scope.itemst=[];
    $scope.total_impressionst=[];
    $scope.paid_impressionst=[];
    $scope.blocked_impressionst=[];
    $scope.fillratet=[];
    $scope.passratet=[];
    $scope.margint=[];
    $scope.yieldt=[];
    $scope.revt=[];
    $scope.costt=[];
    $scope.passt=[];
    $scope.yieldsc=[];
    $scope.marginsc=[];
    $scope.fillsc=[];
    $scope.passsc=[];
    $scope.totalsc=[];
    $scope.chartListx=[];
    $scope.totalcheck=[];
    $scope.margincheck=[];
    $scope.yieldcheck=[];
    $scope.fillcheck=[];
    $scope.passcheck=[];

    sharedProperties.setdata($scope.temptmin,$scope.temptmax,$scope.temppmin,$scope.temppmax,$scope.tempbmin,$scope.tempbmax,$scope.tempcountry,$scope.tempcluster,$scope.tempdatacenter,$scope.tempimp,$scope.tempdevice);
    //sharedProperties.setPubid($scope.temp,$scope.tempPaid,$scope.tempBlocked,$scope.country_key,country_list,$scope.cluster_key,$scope.cluster,$scope.datacenter_key,$scope.datacenter,$scope.impsource_key,$scope.impsource,$scope.device_key,$scope.device);
    /*sharedProperties.setPubid($scope.tempmin,$scope.tempmax,$scope.tempPaidmin,$scope.tempPaidmax,$scope.tempBlockedmin,$scope.tempBlockedmax);*/
  });


  $rootScope.$on("pubupdates", function(){
    var tempArr={};
    /*var tempArrsort={};
    tempArrsort = sharedProperties.getdata();
    //console.log($scope.tempmin);
    //tempArr = sharedProperties.getPubid();
    for(i=0;i<tempArrsort.length;i++){
    if(tempArr.indexOf(tempArrsort[i].publisher) === -1){
    tempArr[i]=data[i];
  }
}*/
tempArr = sharedProperties.getdata();
console.log(tempArr);
console.log(Object.keys(tempArr).length);
if(Object.keys(tempArr).length==0){
  $scope.toggle=false;
}
else{
  $scope.toggle=true;

    var pubid=[];
    angular.forEach(tempArr,function(i){
      pubid.push(i.publisherid);

    });

    console.log(pubid);
    console.log(pubid.length);
    var uniquekey=[];

    var result_total=[];
    var n=0;
    var l=0;
 angular.forEach(pubid, function(value) {

   if(uniquekey.indexOf(value)==-1){

     uniquekey.push(value);
   }
   });

   console.log(uniquekey);
   console.log(uniquekey.length);
   if(uniquekey.length>100){
   l=100;
   }
   else{
     l=uniquekey.length;
   }
   for(j=0;j<l;j++){
   var temp=_.filter(tempArr,function(e){ return e.publisherid===uniquekey[j]});
//console.log(temp);
   var result={};
   _.each(temp, function(value, key, list){

    result.publisherid=value.publisherid;
    result.publisher=value.publisher;
    result.total_impressions = result.total_impressions || 0;
	  result.total_impressions += value.total_impressions;
    result.paid_impressions = result.paid_impressions || 0;
	  result.paid_impressions += value.paid_impressions;
    result.total_blocked_impressions = result.total_blocked_impressions || 0;
	  result.total_blocked_impressions += value.total_blocked_impressions;
    result.total_passed_impressions = result.total_passed_impressions || 0;
	  result.total_passed_impressions += value.total_passed_impressions;
    result.revenue = result.revenue || 0;
    result.revenue += value.revenue;
    result.cost = result.cost || 0;
    result.cost += value.cost;

});

result_total.push(result);
}
console.log(result_total);



  //}
  };
//  $scope.aggregateData(tempArr);
  /*  console.log(tempArr[0].publisher);
  console.log(tempArr);
  console.log($scope.country_key);
  console.log(Object.keys(tempArr).length);*/
  if(result_total.length>50){
  l=50;
  }
  else{
    l=result_total.length;
  }
  for(k=0;k<l;k++){

    /*$scope.itemst.push(tempArr[k].publisher);
    $scope.total_impressionst.push(tempArr[k].total_impressions);
    $scope.paid_impressionst.push(tempArr[k].paid_impressions);
    $scope.blocked_impressionst.push(tempArr[k].total_blocked_impressions);
    $scope.fillratet.push((tempArr[k].paid_impressions/tempArr[k].total_impressions)*100);
    $scope.passratet.push((tempArr[k].total_passed_impressions/tempArr[k].total_impressions)*100);
    $scope.margint.push(((tempArr[k].revenue-tempArr[k].cost)/tempArr[k].revenue)*100);
    $scope.yieldt.push((tempArr[k].revenue*1000)/tempArr[k].paid_impressions);
    $scope.revt.push(tempArr[k].revenue);
    $scope.costt.push(tempArr[k].cost);
    $scope.passt.push(tempArr[k].total_passed_impressions);*/

    $scope.itemst.push(result_total[k].publisher);
    $scope.total_impressionst.push(result_total[k].total_impressions);
    $scope.paid_impressionst.push(result_total[k].paid_impressions);
    $scope.blocked_impressionst.push(result_total[k].total_blocked_impressions);
    $scope.fillratet.push((result_total[k].paid_impressions/result_total[k].total_impressions)*100);
    $scope.passratet.push((result_total[k].total_passed_impressions/result_total[k].total_impressions)*100);
    $scope.margint.push(((result_total[k].revenue-result_total[k].cost)/result_total[k].revenue)*100);
    $scope.yieldt.push((result_total[k].revenue*1000)/result_total[k].paid_impressions);
    $scope.revt.push(result_total[k].revenue);
    $scope.costt.push(result_total[k].cost);
    $scope.passt.push(result_total[k].total_passed_impressions);

  }
  console.log("x");
  //console.log("items"+$scope.items[0]);
  //  console.log("total_impressions"+$scope.total_impressions[0]);
  //  console.log(tempArr.slice(1,10));
  $scope.items=$scope.itemst;
  $scope.total_impressions=$scope.total_impressionst;
  $scope.paid_impressions=$scope.paid_impressionst;
  $scope.blocked_impressions=$scope.blocked_impressionst;
  $scope.fillrate=$scope.fillratet;
  $scope.passrate=$scope.passratet;
  $scope.margin=$scope.margint;
  $scope.yield=$scope.yieldt;
  $scope.revenu=$scope.revt;
  $scope.cost=$scope.costt;
  $scope.pass=$scope.passt;

  /*  console.log("publisher");
  console.log($scope.items);
  console.log("yield");
  console.log($scope.yield);
  console.log("revenue");
  console.log($scope.revenu);
  console.log("cost");
  console.log($scope.cost);
  console.log("margin");
  console.log($scope.margin);
  console.log("total impressions");
  console.log($scope.total_impressions);
  console.log("paid impressions");
  console.log($scope.paid_impressions);
  console.log("fillrate");
  console.log($scope.fillrate);
  console.log("passed impressions");
  console.log($scope.pass);
  console.log("passrate");
  console.log($scope.passrate);*/

  for(j=0;j<$scope.total_impressions.length;j++){
    $scope.totalcheck.push($scope.total_impressions[j].toFixed(0));
  }
  $scope.totaltest=$scope.totalcheck;
  //console.log($scope.total_impressions);
  //  console.log($scope.totaltest);

  for(j=0;j<$scope.margin.length;j++){
    $scope.margincheck.push($scope.margin[j].toFixed(2));
  }
  $scope.margintest=$scope.margincheck;
  //  console.log($scope.margin);
  //  console.log($scope.margintest);

  for(j=0;j<$scope.yield.length;j++){
    $scope.yieldcheck.push($scope.yield[j].toFixed(2));
  }
  $scope.yieldtest=$scope.yieldcheck;
  //  console.log($scope.yield);
  //  console.log($scope.yieldtest);

  for(j=0;j<$scope.fillrate.length;j++){
    $scope.fillcheck.push($scope.fillrate[j].toFixed(2));
  }
  $scope.filltest=$scope.fillcheck;
  //  console.log($scope.fillrate);
  //  console.log($scope.filltest);

  for(j=0;j<$scope.passrate.length;j++){
    $scope.passcheck.push($scope.passrate[j].toFixed(2));
  }
  $scope.passtest=$scope.passcheck;
  //  console.log($scope.passrate);
  //  console.log($scope.passtest);
  console.log("y");
  $scope.totalscaled=d3.scaleLinear().domain([0,d3.max($scope.total_impressions)]).range([0,100]);
  $scope.yieldscaled=d3.scaleLinear().domain([0,d3.max($scope.yield)]).range([0,100]);
  $scope.marginscaled=d3.scaleLinear().domain([0,d3.max($scope.margin)]).range([0,100]);
  $scope.fillscaled=d3.scaleLinear().domain([0,d3.max($scope.fillrate)]).range([0,100]);
  $scope.passscaled=d3.scaleLinear().domain([0,d3.max($scope.passrate)]).range([0,100]);
  for(j=0;j<$scope.passrate.length;j++){
    $scope.passsc.push($scope.passscaled($scope.passrate[j]));
  }
  for(j=0;j<$scope.fillrate.length;j++){
    $scope.fillsc.push($scope.fillscaled($scope.fillrate[j]));
  }
  for(j=0;j<$scope.margin.length;j++){
    $scope.marginsc.push($scope.marginscaled($scope.margin[j]));
  }
  for(j=0;j<$scope.yield.length;j++){
    $scope.yieldsc.push($scope.yieldscaled($scope.yield[j]));
  }
  for(j=0;j<$scope.total_impressions.length;j++){
    $scope.totalsc.push($scope.totalscaled($scope.total_impressions[j]));
  }
  $scope.t=$scope.totalsc;
  $scope.yi=$scope.yieldsc;
  $scope.m=$scope.marginsc;
  $scope.p=$scope.passsc;
  $scope.f=$scope.fillsc;
  //  console.log($scope.t.length);
  //  console.log($scope.t);
  //  console.log($scope.yi);
  //  console.log($scope.total_impressions.length);
  //  console.log(d3.max($scope.total_impressions));
//}
console.log("z");
for(n=0;n<l;n++){

  $scope.chartConfig= {
    options: {
      chart: {
        height:400,
        // backgroundColor:'#546575',
        polar: true,
        type: 'line'
      },
      tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.tool:,.2f}</b><br/>'
      }
    },
    plotOptions: {
      series: {
        stacking: 'percent'
      }
    },

    title: {
      text: '',
      //x: -80
    },

    pane: {
      //  size: '80%'
      background:{

        backgroundColor:'#546575'
      }
    },

    xAxis: {
      categories: ['total','fillrate','passrate','margin','yield'],
      tickmarkPlacement: 'on',
      lineWidth: 0
    },

    yAxis: {
      gridLineInterpolation: 'polygon',
      lineWidth: 0,
      min: 0,
      max:100
    },


    legend: {
      align: 'right',
      verticalAlign: 'top',
      y: 70,
      layout: 'vertical'
    },

    series: [{
      showInLegend: false,
      name: $scope.items[n],
      data:[
        {y:$scope.t[n],
          tool:$scope.totaltest[n]},
          {y:$scope.f[n],
            tool:$scope.filltest[n]},
            {y:$scope.p[n],
              tool:$scope.passtest[n]},
              {y:$scope.m[n],
                tool:$scope.margintest[n]},
                {y:$scope.yi[n],
                  tool:$scope.yieldtest[n]}
                ],
                color:'blue',
                fillColor: 'red',
                pointPlacement: 'on'
              }]
            }
            //  $scope.chartList=chartData($scope.totaltest,$scope.t,$scope.margintest,$scope.m,$scope.yieldtest,$scope.yi,$scope.items,$scope.filltest,$scope.f,$scope.passtest,$scope.p,Object.keys(tempArr).length);
            //  function chartData(tt,t,mt,m,yt,y,p,ft,f,pt,pr,l)

            $scope.chartListx.push($scope.chartConfig);
          }
          console.log("i");
          $scope.chartList=$scope.chartListx;
          $scope.data = $scope.chartList.slice(0, 5);
          $scope.getMoreData = function () {
            console.log("trigged");
            $scope.data = $scope.chartList.slice(0, $scope.data.length + 5);
            console.log("trigged over");
          }

          /*else{
          $scope.toggle=true;
          console.log(tempArr[0].publisher);


          console.log(tempArr);
          console.log($scope.country_key);

          console.log(Object.keys(tempArr).length);
          if(Object.keys(tempArr).length >=15){
          for(k=0;k<=15;k++){

          $scope.itemst.push(tempArr[k].publisher);
          $scope.total_impressionst.push(tempArr[k].total_impressions);
          $scope.paid_impressionst.push(tempArr[k].paid_impressions);
          $scope.blocked_impressionst.push(tempArr[k].total_blocked_impressions);
          $scope.fillratet.push((tempArr[k].paid_impressions/tempArr[k].total_impressions)*100);
          $scope.passratet.push((tempArr[k].total_passed_impressions/tempArr[k].total_impressions)*100);
          $scope.margint.push(((tempArr[k].revenue-tempArr[k].cost)/tempArr[k].revenue)*100);
          $scope.yieldt.push((tempArr[k].revenue*1000)/tempArr[k].paid_impressions);
          $scope.revt.push(tempArr[k].revenue);
          $scope.costt.push(tempArr[k].cost);
          $scope.passt.push(tempArr[k].total_passed_impressions);
        }
        //console.log("items"+$scope.items[0]);
        //  console.log("total_impressions"+$scope.total_impressions[0]);
        //  console.log(tempArr.slice(1,10));
        $scope.items=$scope.itemst.slice(0,15);
        $scope.total_impressions=$scope.total_impressionst.slice(0,15);
        $scope.paid_impressions=$scope.paid_impressionst.slice(0,15);
        $scope.blocked_impressions=$scope.blocked_impressionst.slice(0,15);
        $scope.fillrate=$scope.fillratet.slice(0,15);
        $scope.passrate=$scope.passratet.slice(0,15);
        $scope.margin=$scope.margint.slice(0,15);
        $scope.yield=$scope.yieldt.slice(0,15);
        $scope.revenu=$scope.revt.slice(0,15);
        $scope.cost=$scope.costt.slice(0,15);
        $scope.pass=$scope.passt.slice(0,15);

        console.log("publisher");
        console.log($scope.items);
        console.log("yield");
        console.log($scope.yield);
        console.log("revenue");
        console.log($scope.revenu);
        console.log("cost");
        console.log($scope.cost);
        console.log("margin");
        console.log($scope.margin);
        console.log("total impressions");
        console.log($scope.total_impressions);
        console.log("paid impressions");
        console.log($scope.paid_impressions);
        console.log("fillrate");
        console.log($scope.fillrate);
        console.log("passed impressions");
        console.log($scope.pass);
        console.log("passrate");
        console.log($scope.passrate);



        for(j=0;j<$scope.total_impressions.length;j++){
        $scope.totalcheck.push($scope.total_impressions[j].toFixed(0));
      }
      $scope.totaltest=$scope.totalcheck;
      console.log($scope.total_impressions);
      console.log($scope.totaltest);

      for(j=0;j<$scope.margin.length;j++){
      $scope.margincheck.push($scope.margin[j].toFixed(2));
    }
    $scope.margintest=$scope.margincheck;
    console.log($scope.margin);
    console.log($scope.margintest);

    for(j=0;j<$scope.yield.length;j++){
    $scope.yieldcheck.push($scope.yield[j].toFixed(2));
  }
  $scope.yieldtest=$scope.yieldcheck;
  console.log($scope.yield);
  console.log($scope.yieldtest);

  for(j=0;j<$scope.fillrate.length;j++){
  $scope.fillcheck.push($scope.fillrate[j].toFixed(2));
}
$scope.filltest=$scope.fillcheck;
console.log($scope.fillrate);
console.log($scope.filltest);

for(j=0;j<$scope.passrate.length;j++){
$scope.passcheck.push($scope.passrate[j].toFixed(2));
}
$scope.passtest=$scope.passcheck;
console.log($scope.passrate);
console.log($scope.passtest);

$scope.totalscaled=d3.scaleLinear().domain([0,d3.max($scope.total_impressions)]).range([0,100]);
$scope.yieldscaled=d3.scaleLinear().domain([0,d3.max($scope.yield)]).range([0,100]);
$scope.marginscaled=d3.scaleLinear().domain([0,d3.max($scope.margin)]).range([0,100]);
$scope.fillscaled=d3.scaleLinear().domain([0,d3.max($scope.fillrate)]).range([0,100]);
$scope.passscaled=d3.scaleLinear().domain([0,d3.max($scope.passrate)]).range([0,100]);
console.log($scope.total_impressions.length);
for(j=0;j<$scope.passrate.length;j++){
$scope.passsc.push($scope.passscaled($scope.passrate[j]));
}
for(j=0;j<$scope.fillrate.length;j++){
$scope.fillsc.push($scope.fillscaled($scope.fillrate[j]));
}
for(j=0;j<$scope.margin.length;j++){
$scope.marginsc.push($scope.marginscaled($scope.margin[j]));
}
for(j=0;j<$scope.yield.length;j++){
$scope.yieldsc.push($scope.yieldscaled($scope.yield[j]));
}
for(j=0;j<$scope.total_impressions.length;j++){
$scope.totalsc.push($scope.totalscaled($scope.total_impressions[j]));
}
$scope.t=$scope.totalsc;
$scope.yi=$scope.yieldsc;
$scope.m=$scope.marginsc;
$scope.p=$scope.passsc;
$scope.f=$scope.fillsc;
console.log($scope.t.length);
console.log($scope.t);
console.log($scope.total_impressions.length);
console.log(d3.max($scope.total_impressions));
}
else{
var tempArrlength=Object.keys(tempArr).length;
for(k=0;k<tempArrlength;k++){

$scope.itemst.push(tempArr[k].publisher);
$scope.total_impressionst.push(tempArr[k].total_impressions);
$scope.paid_impressionst.push(tempArr[k].paid_impressions);
$scope.blocked_impressionst.push(tempArr[k].total_blocked_impressions);
$scope.fillratet.push((tempArr[k].paid_impressions/tempArr[k].total_impressions)*100);
$scope.passratet.push((tempArr[k].total_passed_impressions/tempArr[k].total_impressions)*100);
$scope.margint.push(((tempArr[k].revenue-tempArr[k].cost)/tempArr[k].revenue)*100);
$scope.yieldt.push((tempArr[k].revenue*1000)/tempArr[k].paid_impressions);
$scope.revt.push(tempArr[k].revenue);
$scope.costt.push(tempArr[k].cost);
$scope.passt.push(tempArr[k].total_passed_impressions);

}
//console.log("items"+$scope.items[0]);
//  console.log("total_impressions"+$scope.total_impressions[0]);
//  console.log(tempArr.slice(1,10));
$scope.items=$scope.itemst;
$scope.total_impressions=$scope.total_impressionst;
$scope.paid_impressions=$scope.paid_impressionst;
$scope.blocked_impressions=$scope.blocked_impressionst;
$scope.fillrate=$scope.fillratet;
$scope.passrate=$scope.passratet;
$scope.margin=$scope.margint;
$scope.yield=$scope.yieldt;
$scope.revenu=$scope.revt;
$scope.cost=$scope.costt;
$scope.pass=$scope.passt;

console.log("publisher");
console.log($scope.items);
console.log("yield");
console.log($scope.yield);
console.log("revenue");
console.log($scope.revenu);
console.log("cost");
console.log($scope.cost);
console.log("margin");
console.log($scope.margin);
console.log("total impressions");
console.log($scope.total_impressions);
console.log("paid impressions");
console.log($scope.paid_impressions);
console.log("fillrate");
console.log($scope.fillrate);
console.log("passed impressions");
console.log($scope.pass);
console.log("passrate");
console.log($scope.passrate);

for(j=0;j<$scope.total_impressions.length;j++){
$scope.totalcheck.push($scope.total_impressions[j].toFixed(0));
}
$scope.totaltest=$scope.totalcheck;
console.log($scope.total_impressions);
console.log($scope.totaltest);

for(j=0;j<$scope.margin.length;j++){
$scope.margincheck.push($scope.margin[j].toFixed(2));
}
$scope.margintest=$scope.margincheck;
console.log($scope.margin);
console.log($scope.margintest);

for(j=0;j<$scope.yield.length;j++){
$scope.yieldcheck.push($scope.yield[j].toFixed(2));
}
$scope.yieldtest=$scope.yieldcheck;
console.log($scope.yield);
console.log($scope.yieldtest);

for(j=0;j<$scope.fillrate.length;j++){
$scope.fillcheck.push($scope.fillrate[j].toFixed(2));
}
$scope.filltest=$scope.fillcheck;
console.log($scope.fillrate);
console.log($scope.filltest);

for(j=0;j<$scope.passrate.length;j++){
$scope.passcheck.push($scope.passrate[j].toFixed(2));
}
$scope.passtest=$scope.passcheck;
console.log($scope.passrate);
console.log($scope.passtest);

$scope.totalscaled=d3.scaleLinear().domain([0,d3.max($scope.total_impressions)]).range([0,100]);
$scope.yieldscaled=d3.scaleLinear().domain([0,d3.max($scope.yield)]).range([0,100]);
$scope.marginscaled=d3.scaleLinear().domain([0,d3.max($scope.margin)]).range([0,100]);
$scope.fillscaled=d3.scaleLinear().domain([0,d3.max($scope.fillrate)]).range([0,100]);
$scope.passscaled=d3.scaleLinear().domain([0,d3.max($scope.passrate)]).range([0,100]);
for(j=0;j<$scope.passrate.length;j++){
$scope.passsc.push($scope.passscaled($scope.passrate[j]));
}
for(j=0;j<$scope.fillrate.length;j++){
$scope.fillsc.push($scope.fillscaled($scope.fillrate[j]));
}
for(j=0;j<$scope.margin.length;j++){
$scope.marginsc.push($scope.marginscaled($scope.margin[j]));
}
for(j=0;j<$scope.yield.length;j++){
$scope.yieldsc.push($scope.yieldscaled($scope.yield[j]));
}
for(j=0;j<$scope.total_impressions.length;j++){
$scope.totalsc.push($scope.totalscaled($scope.total_impressions[j]));
}
$scope.t=$scope.totalsc;
$scope.yi=$scope.yieldsc;
$scope.m=$scope.marginsc;
$scope.p=$scope.passsc;
$scope.f=$scope.fillsc;
console.log($scope.t.length);
console.log($scope.t);
console.log($scope.yi);
console.log($scope.total_impressions.length);
console.log(d3.max($scope.total_impressions));
}


//}
console.log($scope.tempArrlength);

$scope.chartList=chartData($scope.totaltest,$scope.t,$scope.margintest,$scope.m,$scope.yieldtest,$scope.yi,$scope.items,$scope.filltest,$scope.f,$scope.passtest,$scope.p,Object.keys(tempArr).length);
console.log($scope.chartList);
console.log($scope.chartList[0].series[0].name);

console.log($scope.items);
console.log($scope.total_impressions);
console.log($scope.paid_impressions);
console.log($scope.blocked_impressions);


//for(j=0;j<=15;j++){

//var a="$scope."+$scope.items[j];
// console.log(a);

function chartData(tt,t,mt,m,yt,y,p,ft,f,pt,pr,l){
console.log("inside function");
console.log(p);
if(parseInt(l)>15) {
for(n=0;n<15;n++){
$scope.chartConfig= {
options: {
chart: {
height:400,
// backgroundColor:'#546575',
polar: true,
type: 'line'
},
tooltip: {
shared: true,
pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.tool:,.2f}</b><br/>'
},
},
plotOptions: {
series: {
stacking: 'percent'
}
},
title: {
text: '',
//x: -80
},

pane: {
//  size: '80%'
background:{

backgroundColor:'#546575'
}
},

xAxis: {
//categories: ['total', 'paid', 'blocked','fillrate'],
categories: ['total','fillrate','passrate','margin','yield'],
tickmarkPlacement: 'on',
lineWidth: 0
},

yAxis: {
gridLineInterpolation: 'polygon',
lineWidth: 0,
min: 0,
max:100
},


legend: {
align: 'right',
verticalAlign: 'top',
y: 70,
layout: 'vertical'
},

series: [{
showInLegend: false,
name: p[n],
//data: [parseInt(x[n]), parseInt(y[n]), parseInt(z[n]),f[n]],
data:[
{y:t[n],
tool:tt[n]},
{y:f[n],
tool:ft[n]},
{y:pr[n],
tool:pt[n]},
{y:m[n],
tool:mt[n]},
{y:y[n],
tool:yt[n]}
],
color:'blue',
fillColor: 'red',
pointPlacement: 'on'
}]
}

$scope.chartListx.push($scope.chartConfig);

}

$scope.chartListy=$scope.chartListx.slice(0,15);
console.log("chart");
console.log($scope.chartListy);
console.log($scope.chartListy[0].series[0].name);
return  $scope.chartListy;
}
else{

for(n=0;n<parseInt(l);n++){

$scope.chartConfig= {
options: {
chart: {
height:400,
// backgroundColor:'#546575',
polar: true,
type: 'line'
},
tooltip: {
shared: true,
pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.tool:,.2f}</b><br/>'
}
},
plotOptions: {
series: {
stacking: 'percent'
}
},

title: {
text: '',
//x: -80
},

pane: {
//  size: '80%'
background:{

backgroundColor:'#546575'
}
},

xAxis: {
categories: ['total','fillrate','passrate','margin','yield'],
tickmarkPlacement: 'on',
lineWidth: 0
},

yAxis: {
gridLineInterpolation: 'polygon',
lineWidth: 0,
min: 0,
max:100
},


legend: {
align: 'right',
verticalAlign: 'top',
y: 70,
layout: 'vertical'
},

series: [{
showInLegend: false,
name: p[n],
data:[
{y:t[n],
tool:tt[n]},
{y:f[n],
tool:ft[n]},
{y:pr[n],
tool:pt[n]},
{y:m[n],
tool:mt[n]},
{y:y[n],
tool:yt[n]}
],
color:'blue',
fillColor: 'red',
pointPlacement: 'on'
}]
}

$scope.chartListx.push($scope.chartConfig);

}

//  $scope.chartListy=$scope.chartListx.slice(0,15);
$scope.chartListy=$scope.chartListx;
console.log("chart");
console.log($scope.chartListy);
console.log($scope.chartListy[0].series[0].name);
return  $scope.chartListy;

}
}


//});


//$scope.items=tempArr.slice(1,15);
//$scope.paid_impressions=$scope.items;
//console.log("after"+tempArr.length);

}*/

});
$scope.ty=[];
$scope.tx=[];
$scope.typ=[];
$scope.tyb=[];
$scope.revtemp=[];
$scope.revpertemp=[];
$scope.submitForm=function(value){
  $scope.header=value;
  console.log("string"+value);
  $http.get('data/data.json').success(function(data) {
    $scope.phones = data;
    console.log($scope.phones.length);
    console.log($scope.phones[0].publisher);
    for(i=0;i<=$scope.phones.length;i++){
      if($scope.phones[i] && $scope.phones[i].publisher==value){
        $scope.ty.push(parseInt($scope.phones[i].total_impressions));
        $scope.tx.push($scope.phones[i].day);
        $scope.typ.push(parseInt($scope.phones[i].paid_impressions));
        $scope.tyb.push(parseInt($scope.phones[i].total_blocked_impressions));
        $scope.revtemp.push($scope.phones[i].revenue);
      }

    }

    $scope.rev=$scope.revtemp;
    console.log($scope.rev);
    for(j=0;j<=$scope.rev.length;j++){

      $scope.revpertemp.push(((parseInt($scope.rev[j+1])-parseInt($scope.rev[j]))/parseInt($scope.rev[j]))*100);
    }
    $scope.revper=$scope.revpertemp;
    console.log($scope.revper);
    for(k=0;k<=$scope.ty.length;k++){

      console.log($scope.ty[k]);
    }
    for(k=0;k<=$scope.tx.length;k++){

      console.log($scope.tx[k]);
    }
    $scope.total={

      options: {
        chart: {
          type: 'area',
          backgroundColor:'#334456'
        }
      },
      title: {
        text: 'Total Impressions 30 day trend',
        style: {
          color: 'white'
        }
      },

      tooltip: {
        shared: true,
        valueSuffix: ' units'
      },
      xAxis:{
        lineWidth: 1,
        minorGridLineWidth: 0,
        lineColor: 'black',
        labels: {enabled:true},
        minorTickLength: 0,
        tickLength: 0,
        labels: {
          style: {
            color: 'white'
          }
        }
      },
      yAxis:{
        labels: {
          style: {
            color: 'white'
          }
        },

        gridLineWidth: 0,
        minorGridLineWidth: 0

      },
      credits: {
        enabled: false
      },
      plotOptions: {
        areaspline: {
          fillOpacity: 0.5
        }
      },
      series: [{
        showInLegend: false,
        name: 'Total Impressions',
        data: $scope.ty,
        color:'#0053a0'
      }]
    }

    $scope.paid={

      options: {
        chart: {
          type: 'area',
          backgroundColor:'#334456'
        }
      },
      title: {
        text: 'Paid Impressions 30 day trend',
        style: {
          color: 'white'
        }
      },

      tooltip: {
        shared: true,
        valueSuffix: ' units'
      },
      xAxis:{
        lineWidth: 1,
        minorGridLineWidth: 0,
        lineColor: 'black',
        labels: {enabled:true},
        minorTickLength: 0,
        tickLength: 0,
        labels: {
          style: {
            color: 'white'
          }
        }

      },
      yAxis:{
        labels: {
          style: {
            color: 'white'
          }
        },
        gridLineWidth: 0,
        minorGridLineWidth: 0

      },
      credits: {
        enabled: false
      },
      plotOptions: {
        areaspline: {
          fillOpacity: 0.5
        }
      },
      series: [{
        showInLegend: false,
        name: 'Paid Impressions',
        data: $scope.typ,
        color:'#5A5A91'
      }]
    }

    $scope.blocked={

      options: {
        chart: {
          type: 'area',
          backgroundColor:'#334456'
        }
      },
      title: {
        text: 'Blocked Impressions 30 day trend',
        style: {
          color: 'white'
        }
      },
      /*legend: {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'top',
      x: 150,
      y: 100,
      floating: true,
      borderWidth: 1,
      backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
    },
    xAxis: {
    categories:$scope.tx,
    plotBands: [{ // visualize the weekend
    from: 4.5,
    to: 6.5,
    color: 'rgba(68, 170, 213, .2)'
  }]
},
yAxis: {
title: {
text: 'Impressions'
}
},*/
tooltip: {
  shared: true,
  valueSuffix: ' units'
},
xAxis:{
  lineWidth: 1,
  minorGridLineWidth: 0,
  lineColor: 'black',
  labels: {enabled:true},
  minorTickLength: 0,
  tickLength: 0,
  labels: {
    style: {
      color: 'white'
    }
  }

},
yAxis:{
  labels: {
    style: {
      color: 'white'
    }
  },
  gridLineWidth: 0,
  minorGridLineWidth: 0

},
credits: {
  enabled: false
},
plotOptions: {
  areaspline: {
    fillOpacity: 0.5
  }
},
series: [{
  showInLegend: false,
  name: 'Blocked Impressions',
  data: $scope.tyb,
  color:' #ff6666'
}]
}
$scope.revenue={
  options: {
    chart: {
      type: 'column',
      backgroundColor:'#334456'
    }
  },
  title: {
    text: 'Revenue 30 day trend',
    style: {
      color: 'white'
    }
  },
  xAxis:{
    //categories:$scope.tx,
    lineWidth: 1,
    minorGridLineWidth: 0,
    lineColor: 'black',
    labels: {enabled:true},
    minorTickLength: 0,
    tickLength: 0,
    labels: {
      style: {
        color: 'white'
      }
    }

  },
  yAxis:{
    labels: {
      style: {
        color: 'white'
      }
    },
    gridLineWidth: 0,
    minorGridLineWidth: 0

  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
    footerFormat: '</table>',
    shared: true,
    useHTML: true
  },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0
    }
  },
  series: [{
    name: 'Revenue',
    data: $scope.rev

    //  }

  }]

}
$scope.revenuechange={
  options: {
    chart: {
      type: 'bar',
      backgroundColor:'#334456'
    }
  },
  title: {
    text: '%change Day over Day',
    style: {
      color: 'white'
    }
  },
  xAxis: {
    categories: $scope.tx
  },
  credits: {
    enabled: false
  },
  series: [{
    name: 'Revenue change',
    data: $scope.revper
  }]
  /*  chart: {
  type: 'bar'
},
title: {
text: 'Revenue % change DoD'
},
xAxis: {
categories:$scope.tx,
title: {
text: null
}
},
yAxis: {
min: 0,
title: {
text: '%change',
align: 'high'
},
labels: {
overflow: 'justify'
}
},
plotOptions: {
bar: {
dataLabels: {
enabled: true
}
}
},
/*legend: {
layout: 'vertical',
align: 'right',
verticalAlign: 'top',
x: -40,
y: 80,
floating: true,
borderWidth: 1,
backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
shadow: true
},
credits: {
enabled: false
},
series: [{
name: 'Revenue change',
data: $scope.revper
}]
*/

}

});
event.preventDefault();
$state.go('table');

};



});

/*  for(j=0;j<$scope.total_impressions.length;j++){
$scope.totalcheck.push(Math.round($scope.total_impressions[j]));
}
$scope.totaltest=$scope.totalcheck;
console.log($scope.total_impressions);
console.log($scope.totaltest);

for(j=0;j<$scope.margin.length;j++){
$scope.margincheck.push(Math.round($scope.margin[j])+'%');
}
$scope.margintest=$scope.margincheck;
console.log($scope.margin);
console.log($scope.margintest);

for(j=0;j<$scope.yield.length;j++){
$scope.yieldcheck.push(Math.round($scope.yield[j])+'%');
}
$scope.yieldtest=$scope.yieldcheck;
console.log($scope.yield);
console.log($scope.yieldtest);

for(j=0;j<$scope.fillrate.length;j++){
$scope.fillcheck.push(Math.round($scope.fillrate[j])+'%');
}
$scope.filltest=$scope.fillcheck;
console.log($scope.fillrate);
console.log($scope.filltest);

for(j=0;j<$scope.passrate.length;j++){
$scope.passcheck.push(Math.round($scope.passrate[j])+'%');
}
$scope.passtest=$scope.passcheck;
console.log($scope.passrate);
console.log($scope.passtest);*/

/*legend: {
layout: 'vertical',
align: 'left',
verticalAlign: 'top',
x: 150,
y: 100,
floating: true,
borderWidth: 1,
backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
},
xAxis: {
categories:$scope.tx,
plotBands: [{ // visualize the weekend
from: 4.5,
to: 6.5,
color: 'rgba(68, 170, 213, .2)'
}]
},
yAxis: {
title: {
text: 'Impressions'
}
},*/
