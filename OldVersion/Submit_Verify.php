<?php
 
if(isset($_POST['formSubmit']) && 
   $_POST['formSubmit'] == 'Submit') 
{
    
    $workOrders = $_POST['updateCut'];//work order internal ID for each box checked
    $woUpdates = $_POST['woData']; 
    $woInternal = $_POST['woInternal'];
    $woField = $_POST['woField'];
    $test = array_search($workOrders[0],$woInternal);
    for ($x = 0; $x <= count($workOrders)-1; $x++){
    
    if(array_search($workOrders[$x],$woInternal)>=0){
         $updatedWO[$x] = array_search($workOrders[$x],$woInternal);
    }
    }
     
          //print '<pre>';
          //print_r($workOrders);
          //print_r($woInternal);
          //print_r($woUpdates);
          //print_r($woField);
          //print_r($updatedWO);
          //print_r($test);
          //print_r (count($woUpdates));
          //print_r (array_search($workOrders[0],$woInternal)!=null);
          //print '</pre>';
       
    require_once 'PHPToolkit/NetSuiteService.php';
    
    $service = new NetSuiteService();
    $index = 0;
    
    $searchid[1]="Cutting/Edgebanding";//define array for Title text for each schedule
    $searchid[2]="Machining";
    $searchid[3]="Stock Assembly";
    $searchid[4]="CF Assembly";
    $searchid[5]="Packing";
    $searchid[6]='Design/Engineering';
    
    if($_POST["id"]=='6'){
    
    echo "You are about to update the following work orders to complete the following steps on the Design/Engineering schedule:  <br><br> ";

    }
    else  {
    echo "You are about to update the following work orders as complete and remove them from the ";
    echo $searchid[$_POST["id"]];
    echo " schedule: <br><br>";
    }
    for ($x = 0; $x <= count($updatedWO)-1; $x++){
        
        echo $woUpdates[$updatedWO[$x]]."  <br>";
        
        
    }
    
  echo "<br>";
  //echo "<form action='shop_schedule.php?id=".$_POST["id"]."&user=".$_POST["user"]."' method='post'>";//go back to the appropriate version of the schedule after clicking OK post update
  //echo "<input type='submit' name='formCancel' value='CANCEL' />";  
  //echo "</form";
  
  echo "<form action='Submit_C.php' method='post'>";//go back to the appropriate version of the schedule after clicking OK post update
  echo "<input type='submit' name='formSubmit' value='SUBMIT' />"; 
  
  for ($x = 0; $x <= count($workOrders)-1; $x++){
  echo '<input type="hidden" name="updateCut[]" value="'.$workOrders[$x].'">';

  echo '<input type="hidden" name="updateField[]" value="'.$woField[$updatedWO[$x]].'">';
  }
  
  
  echo "<input type='hidden' name='id' value=".$_POST["id"]. ">";//capture 'id' parameter from URL 
  echo "<input type='hidden' name='user' value=".$_POST["user"]. ">";//capture 'user' parameter from URL
  echo "</form>";
  echo "          ";
  echo "<form action='design_schedule.php' method='post'>";//go back to the appropriate version of the schedule after clicking OK post update
  echo "<input type='submit' name='formCancel' value='CANCEL' />";  
  echo "</form>";
}

?>