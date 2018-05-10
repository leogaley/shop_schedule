<?php
 
if(isset($_POST['formSubmit']) && 
   $_POST['formSubmit'] == 'SUBMIT') 
{
    
    $workOrders = $_POST['updateCut'];//work order internal ID for each box checked
    $woField = $_POST['updateField'];//fields to update for design schedule
         //print '<pre>';
         //print_r($workOrders);
         //print_r($woField);
         //print '</pre>';
        
    require_once 'PHPToolkit/NetSuiteService.php';
    
    $service = new NetSuiteService();
    $index = 0;
    foreach ($workOrders as $workOrder) {//cycle through work orders that have box checked
    $wo = new workOrder();
    $index++;
  
    $booleanRef = new booleanCustomFieldRef();
    
    //determine which type of schedule was submitted 
    if($_POST["id"] == '1') {
        $booleanRef -> scriptId = 'custbody77';//cutting done
    }
    else if($_POST["id"] == '2') {
        $booleanRef -> scriptId = 'custbody145';//machining done
    }
    else if($_POST["id"] == '3') {
        $booleanRef -> scriptId = 'custbody170';//stock assembly done
    }
    else if($_POST["id"] == '4') {
        $booleanRef -> scriptId = 'custbody171';//cf assembly done
    }
    else if($_POST["id"] == '5') {
        $booleanRef -> scriptId = 'custbody172';//packing done
    }
    else if($woField[$index-1]!=null){
        //$booleanRef -> scriptId = 'custbody197';
        $booleanRef -> scriptId = $woField[$index-1];
    }
    $booleanRef -> value = true;
   
    $wo->customFieldList = new customFieldList();
    $wo->customFieldList->customField = array($booleanRef) ; 
    $wo->type = "workOrder";
    $wo->internalId = $workOrder;
    
    
    $request = new UpdateRequest();//create the request for updating the field in Netsuite
    $request->record = $wo;

    $service->setPreferences(false, false, false, true);

    $updateResponse = $service->update($request);
    if (!$updateResponse->writeResponse->status->isSuccess) {
        //print '<pre>';
        //print_r($updateResponse);
        //print '</pre>';
        echo "UPDATE ERROR";//print this text if the update to Netsuite fails 
    } else {
        
    }
    }
    
  echo  $index."  work order(s) updated successfully";  //show how many work orders were updated 
  if($woField[$index-1]!=null){
  echo "<form action='design_schedule.php' method='post'>";//go back to the appropriate version of the schedule after clicking OK post update    
  }
  else {
  echo "<form action='shop_schedule.php?id=".$_POST["id"]."&user=".$_POST["user"]."' method='post'>";//go back to the appropriate version of the schedule after clicking OK post update
  }
  echo "<input type='submit' name='formSubmit' value='OK' />";  
  echo "</form";
}
else
{
  echo "submit error";
  print_r($_POST['formSubmit']);
  print_r($_POST['formCancel']);
  
}    




?>