<?php
header("refresh: 180");
echo "<!DOCTYPE html>";
echo "<html>";
require_once 'PHPToolkit/NetSuiteService.php';
set_time_limit(0); 
print(str_repeat(" ", 120) . "\n"); 
flush();
$service = new NetSuiteService();

   function checkForNull($val){
      

      if (isset($val)){
          return $val;
      }
      else {
      return 'nope';
      }}; 
  

  $search = new TransactionSearchAdvanced();
  $searchid[1] = "1207";
  
  if($id==null){
    $search->savedSearchId = "1207";//Shop Schedule - Web Services
  }
  else if($id=='1'){
    $search->savedSearchId = "1311";//Shop Schedule - Web Services - Cutting
  }  
  else if($id=='2'){
    $search->savedSearchId = "1313";//Shop Schedule - Web Services - Machining
  }   
  else if($id=='3'){
    $search->savedSearchId = "1314";//Shop Schedule - Web Services - Stock Assembly
  }   
  else if($id=='4'){
    $search->savedSearchId = "1315";//Shop Schedule - Web Services - CF Assembly
  }   
  else if($id=='5'){
    $search->savedSearchId = "1316";//Shop Schedule - Web Services - Packing
  }     
  $service->setSearchPreferences(true, 500, true);
  $request = new SearchRequest();
  $request->searchRecord = $search;


//define array for work order build status.        
$status[1] = "In Shop";
$status[2] = "Pending WO";
$status[3] = "Pending Process";  
$status[5] = "On Hold"; 
$status[5] = "Pending Process"; 
$status[8] = "Pending Customer"; 
$status[9] = "Metal Shop"; 
$status[11] = "Pend. Appr. Drawing"; 
$status[12] = "Approval Submitted"; 
$status[13] = "Drawing Appr, Pend Process"; 

$inshopstatus[1] = "Cutting/EB";
$inshopstatus[2] = "Machining";
$inshopstatus[3] = "Assembly-STK";
$inshopstatus[4] = "Assembly-CF";
$inshopstatus[5] = "Packing";



$searchResponse = $service->search($request);
      
      $records = $searchResponse->searchResult->searchRowList->searchRow;
      $today = getdate();
      $m = $today['mon'];
      $y = $today['year'];
      $d = $today['mday'];
      
      
      $todaystr = "$y-$m-$d";
     
   ?>